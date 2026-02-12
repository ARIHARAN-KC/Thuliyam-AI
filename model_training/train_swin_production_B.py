import os
import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from transformers import SwinForImageClassification
from sklearn.metrics import balanced_accuracy_score, recall_score, f1_score
from tqdm import tqdm


def main():
    # ================= CONFIG =================

    DATASET_PATH = "video_swin_dataset"
    MODEL_NAME = "microsoft/swin-base-patch4-window7-224"
    BATCH_SIZE = 8
    EPOCHS = 15
    LR = 3e-5
    PATIENCE = 3
    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

    # ================= TRANSFORMS =================

    train_transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(10),
        transforms.ColorJitter(
            brightness=0.2,
            contrast=0.2,
            saturation=0.2,
            hue=0.05
        ),
        transforms.ToTensor(),
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
        num_workers=0
    )

    val_loader = DataLoader(
        val_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=0
    )

    # ================= MODEL =================

    model = SwinForImageClassification.from_pretrained(
        MODEL_NAME,
        num_labels=2,
        ignore_mismatched_sizes=True
    )

    model.to(DEVICE)

    # Label smoothing
    criterion = torch.nn.CrossEntropyLoss(label_smoothing=0.1)

    optimizer = torch.optim.AdamW(model.parameters(), lr=LR)

    # Cosine Scheduler
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
        optimizer,
        T_max=EPOCHS
    )

    scaler = torch.amp.GradScaler("cuda")

    best_bal_acc = 0
    epochs_no_improve = 0

    # ================= TRAINING LOOP =================

    for epoch in range(EPOCHS):
        print(f"\nEpoch {epoch+1}/{EPOCHS}")
        model.train()
        running_loss = 0

        for imgs, labels in tqdm(train_loader):
            imgs = imgs.to(DEVICE)
            labels = labels.to(DEVICE)

            optimizer.zero_grad()

            with torch.amp.autocast("cuda"):
                outputs = model(imgs)
                loss = criterion(outputs.logits, labels)

            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()

            running_loss += loss.item()

        scheduler.step()

        print("Loss:", running_loss / len(train_loader))
        print("Current LR:", scheduler.get_last_lr()[0])

        # ================= VALIDATION =================

        model.eval()
        all_preds = []
        all_trues = []

        with torch.no_grad():
            for imgs, labels in val_loader:
                imgs = imgs.to(DEVICE)
                labels = labels.to(DEVICE)

                outputs = model(imgs)
                preds = torch.argmax(outputs.logits, dim=1)

                all_preds.extend(preds.cpu().numpy())
                all_trues.extend(labels.cpu().numpy())

        bal_acc = balanced_accuracy_score(all_trues, all_preds)
        fake_recall = recall_score(all_trues, all_preds, pos_label=fake_idx)
        f1 = f1_score(all_trues, all_preds, pos_label=fake_idx)

        print(f"Balanced Acc: {bal_acc:.4f}")
        print(f"Fake Recall: {fake_recall:.4f}")
        print(f"F1 Score: {f1:.4f}")

        # ================= EARLY STOPPING =================

        if bal_acc > best_bal_acc:
            best_bal_acc = bal_acc
            torch.save(model.state_dict(), "best_swin_model.pth")
            print("Best model saved!")
            epochs_no_improve = 0
        else:
            epochs_no_improve += 1
            print(f"No improvement for {epochs_no_improve} epoch(s)")

        if epochs_no_improve >= PATIENCE:
            print("Early stopping triggered!")
            break

    print("\nTraining Complete!")


if __name__ == "__main__":
    main()
