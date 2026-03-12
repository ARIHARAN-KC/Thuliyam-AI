# =====================================
# Production Version v5.2 (Threshold Optimized)
# =====================================

import os
import torch
import numpy as np
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from transformers import SwinForImageClassification, get_cosine_schedule_with_warmup
from sklearn.metrics import balanced_accuracy_score, recall_score, f1_score, roc_auc_score
from tqdm import tqdm
from collections import defaultdict
import torch.multiprocessing as mp


# ================= CONFIG =================

DATASET_PATH = "video_dataset_pro"
MODEL_NAME = "microsoft/swin-base-patch4-window7-224"
BATCH_SIZE = 8
EPOCHS = 30
LR_BACKBONE = 1e-5
LR_CLASSIFIER = 5e-5
PATIENCE = 6
CHECKPOINT_PATH = "swin_video_model.pt"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"


# ================= FOCAL LOSS =================

class FocalLoss(torch.nn.Module):
    def __init__(self, gamma=2.5):
        super().__init__()
        self.gamma = gamma
        self.ce = torch.nn.CrossEntropyLoss(reduction='none')

    def forward(self, logits, targets):
        ce_loss = self.ce(logits, targets)
        pt = torch.exp(-ce_loss)
        loss = ((1 - pt) ** self.gamma) * ce_loss
        return loss.mean()


# ================= MIXUP =================

def mixup_data(x, y, alpha=0.4):
    if alpha > 0:
        lam = np.random.beta(alpha, alpha)
    else:
        lam = 1
    index = torch.randperm(x.size(0)).to(x.device)
    mixed_x = lam * x + (1 - lam) * x[index]
    y_a, y_b = y, y[index]
    return mixed_x, y_a, y_b, lam


# ================= MAIN =================

def main():

    print("Using device:", DEVICE)

    # ================= TRANSFORMS =================

    train_transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.RandomResizedCrop(224, scale=(0.7, 1.0)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(10),
        transforms.ColorJitter(0.3, 0.3, 0.3, 0.1),
        transforms.RandomGrayscale(p=0.1),
        transforms.GaussianBlur(3),
        transforms.ToTensor(),
        transforms.RandomErasing(p=0.2),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    # ================= DATASETS =================

    train_dataset = datasets.ImageFolder(
        os.path.join(DATASET_PATH, "train"),
        transform=train_transform
    )

    val_dataset = datasets.ImageFolder(
        os.path.join(DATASET_PATH, "val"),
        transform=val_transform
    )

    class_map = train_dataset.class_to_idx
    print("Class mapping:", class_map)
    fake_idx = class_map["fake"]

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=2,
        pin_memory=True
    )

    val_loader = DataLoader(
        val_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=2,
        pin_memory=True
    )

    # ================= MODEL =================

    model = SwinForImageClassification.from_pretrained(
        MODEL_NAME,
        num_labels=2,
        ignore_mismatched_sizes=True
    )

    for name, param in model.named_parameters():
        if "patch_embed" in name:
            param.requires_grad = False

    model.to(DEVICE)

    # ================= OPTIMIZER =================

    criterion = FocalLoss()

    optimizer = torch.optim.AdamW([
        {"params": model.swin.parameters(), "lr": LR_BACKBONE},
        {"params": model.classifier.parameters(), "lr": LR_CLASSIFIER},
    ], weight_decay=0.05)

    total_steps = len(train_loader) * EPOCHS
    warmup_steps = int(0.1 * total_steps)

    scheduler = get_cosine_schedule_with_warmup(
        optimizer,
        num_warmup_steps=warmup_steps,
        num_training_steps=total_steps
    )

    scaler = torch.amp.GradScaler("cuda")

    best_bal_acc = 0
    epochs_no_improve = 0

    # ================= TRAIN LOOP =================

    for epoch in range(EPOCHS):

        print(f"\nEpoch {epoch+1}/{EPOCHS}")

        if epoch == 5:
            print("Unfreezing entire backbone...")
            for param in model.parameters():
                param.requires_grad = True

        model.train()
        running_loss = 0

        for imgs, labels in tqdm(train_loader):

            imgs = imgs.to(DEVICE, non_blocking=True)
            labels = labels.to(DEVICE, non_blocking=True)

            imgs, labels_a, labels_b, lam = mixup_data(imgs, labels)

            optimizer.zero_grad()

            with torch.amp.autocast("cuda"):
                outputs = model(imgs)
                loss = lam * criterion(outputs.logits, labels_a) + \
                       (1 - lam) * criterion(outputs.logits, labels_b)

            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()
            scheduler.step()

            running_loss += loss.item()

        print("Train Loss:", running_loss / len(train_loader))

        # ================= VIDEO-LEVEL VALIDATION =================

        model.eval()
        video_preds = defaultdict(list)
        video_labels = {}

        sample_index = 0

        with torch.no_grad():
            for imgs, labels in val_loader:

                imgs = imgs.to(DEVICE)
                labels = labels.to(DEVICE)

                with torch.amp.autocast("cuda"):
                    outputs = model(imgs)

                probs = torch.softmax(outputs.logits, dim=1)
                fake_probs = probs[:, fake_idx]

                for i in range(len(fake_probs)):
                    path, _ = val_dataset.samples[sample_index]
                    video_name = os.path.basename(os.path.dirname(path))

                    video_preds[video_name].append(fake_probs[i].item())
                    video_labels[video_name] = labels[i].item()

                    sample_index += 1

        # -------- Median aggregation --------

        all_probs = []
        all_labels = []

        for vid in video_preds:
            median_prob = np.median(video_preds[vid])
            all_probs.append(median_prob)
            all_labels.append(video_labels[vid])

        # -------- Dynamic threshold tuning --------

        best_threshold = 0.5
        best_score = 0

        for t in np.arange(0.3, 0.7, 0.02):
            preds = [int(p >= t) for p in all_probs]
            score = balanced_accuracy_score(all_labels, preds)
            if score > best_score:
                best_score = score
                best_threshold = t

        final_preds = [int(p >= best_threshold) for p in all_probs]
        final_trues = all_labels

        bal_acc = balanced_accuracy_score(final_trues, final_preds)
        fake_recall = recall_score(final_trues, final_preds, pos_label=fake_idx)
        f1 = f1_score(final_trues, final_preds, pos_label=fake_idx)
        auc = roc_auc_score(final_trues, all_probs)

        print(f"Best Threshold: {best_threshold:.2f}")
        print(f"Balanced Acc: {bal_acc:.4f}")
        print(f"Fake Recall: {fake_recall:.4f}")
        print(f"F1 Score: {f1:.4f}")
        print(f"AUC Score: {auc:.4f}")

        # ================= SAVE BEST =================

        if bal_acc > best_bal_acc:
            best_bal_acc = bal_acc

            torch.save({
                "epoch": epoch,
                "model_state_dict": model.state_dict(),
                "optimizer_state_dict": optimizer.state_dict(),
                "scheduler_state_dict": scheduler.state_dict(),
                "best_bal_acc": best_bal_acc
            }, CHECKPOINT_PATH)

            print("Best model saved!")
            epochs_no_improve = 0
        else:
            epochs_no_improve += 1
            print(f"No improvement for {epochs_no_improve} epoch(s)")

        if epochs_no_improve >= PATIENCE:
            print("Early stopping triggered!")
            break

    print("\nTraining Complete!")
    print("Best Balanced Accuracy:", best_bal_acc)


if __name__ == "__main__":
    mp.freeze_support()
    main()