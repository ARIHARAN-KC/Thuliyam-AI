# Production version v4.1.2

import os
import random
import torch
import numpy as np
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
from transformers import ViTForImageClassification
from sklearn.metrics import classification_report, balanced_accuracy_score, recall_score
from tqdm import tqdm
from pathlib import Path
from collections import Counter

# =============================
# CONFIG
# =============================
SEED = 42
BATCH_SIZE = 16
EPOCHS = 40
LR = 5e-6
PATIENCE = 5
NUM_CLASSES = 2

MODEL_NAME = "google/vit-base-patch16-224"
DATASET_ROOT = r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\final_dataset"

TRAIN_DIR = os.path.join(DATASET_ROOT, "train")
VAL_DIR   = os.path.join(DATASET_ROOT, "validation")
TEST_DIR  = os.path.join(DATASET_ROOT, "test")

MODEL_OUT = Path("model/best_vit_real_vs_fake.pt")
MODEL_OUT.parent.mkdir(parents=True, exist_ok=True)

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
AMP = DEVICE == "cuda"

# =============================
# REPRODUCIBILITY
# =============================
torch.manual_seed(SEED)
np.random.seed(SEED)
random.seed(SEED)
if DEVICE == "cuda":
    torch.cuda.manual_seed_all(SEED)

# =============================
# TRANSFORMS
# =============================
IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD  = [0.229, 0.224, 0.225]

train_tfms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(0.1, 0.1, 0.1),
    transforms.ToTensor(),
    transforms.Normalize(IMAGENET_MEAN, IMAGENET_STD),
])

val_tfms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(IMAGENET_MEAN, IMAGENET_STD),
])

# =============================
# MAIN
# =============================
def main():

    train_ds = datasets.ImageFolder(TRAIN_DIR, train_tfms)
    val_ds   = datasets.ImageFolder(VAL_DIR, val_tfms)
    test_ds  = datasets.ImageFolder(TEST_DIR, val_tfms)

    class_map = train_ds.class_to_idx
    idx_to_class = {v: k for k, v in class_map.items()}
    target_names = [idx_to_class[i] for i in range(NUM_CLASSES)]

    print("Class mapping:", class_map)

    # =============================
    # DATALOADERS
    # =============================
    train_loader = DataLoader(
        train_ds,
        batch_size=BATCH_SIZE,
        shuffle=True,
        drop_last=True,
        num_workers=min(8, os.cpu_count()),
        pin_memory=True
    )

    val_loader = DataLoader(
        val_ds,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=min(8, os.cpu_count()),
        pin_memory=True
    )

    test_loader = DataLoader(
        test_ds,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=min(8, os.cpu_count()),
        pin_memory=True
    )

    # =============================
    # MODEL
    # =============================
    model = ViTForImageClassification.from_pretrained(
        MODEL_NAME,
        num_labels=NUM_CLASSES,
        ignore_mismatched_sizes=True
    ).to(DEVICE)

    for p in model.parameters():
        p.requires_grad = False

    for p in model.vit.encoder.layer[-3:].parameters():
        p.requires_grad = True

    for p in model.classifier.parameters():
        p.requires_grad = True

    # =============================
    # LOSS (AUTO CLASS WEIGHTS)
    # =============================
    targets = [label for _, label in train_ds.samples]
    counts = Counter(targets)
    total = sum(counts.values())

    class_weights = torch.tensor(
        [total / counts[i] for i in range(NUM_CLASSES)],
        dtype=torch.float
    ).to(DEVICE)

    criterion = nn.CrossEntropyLoss(
        weight=class_weights,
        label_smoothing=0.1
    )

    optimizer = torch.optim.AdamW(
        filter(lambda p: p.requires_grad, model.parameters()),
        lr=LR
    )

    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, mode="max", factor=0.5, patience=2
    )

    scaler = torch.cuda.amp.GradScaler(enabled=AMP)

    # =============================
    # TRAIN LOOP
    # =============================
    best_val_score = 0.0
    patience_counter = 0

    for epoch in range(EPOCHS):
        model.train()
        epoch_loss = 0.0

        for imgs, labels in tqdm(train_loader, desc=f"Epoch {epoch+1}/{EPOCHS}"):
            imgs = imgs.to(DEVICE, non_blocking=True)
            labels = labels.to(DEVICE, non_blocking=True)

            optimizer.zero_grad(set_to_none=True)

            with torch.cuda.amp.autocast(enabled=AMP):
                logits = model(imgs).logits
                loss = criterion(logits, labels)

            scaler.scale(loss).backward()
            scaler.step(optimizer)
            scaler.update()

            epoch_loss += loss.item()

        # =============================
        # VALIDATION
        # =============================
        model.eval()
        preds, trues = [], []

        with torch.no_grad():
            for imgs, labels in val_loader:
                imgs = imgs.to(DEVICE, non_blocking=True)
                logits = model(imgs).logits
                preds.extend(logits.argmax(1).cpu().numpy())
                trues.extend(labels.cpu().numpy())

        bal_acc = balanced_accuracy_score(trues, preds)
        fake_recall = recall_score(trues, preds, pos_label=class_map["fake"])

        scheduler.step(bal_acc)

        print(f"\nEpoch {epoch+1}")
        print(f"Train Loss: {epoch_loss / len(train_loader):.4f}")
        print(f"Balanced Val Acc: {bal_acc:.4f}")
        print(f"Fake Recall: {fake_recall:.4f}")
        print(classification_report(trues, preds, target_names=target_names))

        if bal_acc > best_val_score:
            best_val_score = bal_acc
            patience_counter = 0
            torch.save({
                "model_state_dict": model.state_dict(),
                "class_mapping": class_map,
                "balanced_val_acc": bal_acc
            }, MODEL_OUT)
            print("Best model saved")
        else:
            patience_counter += 1
            if patience_counter >= PATIENCE:
                print("Early stopping triggered")
                break

    # =============================
    # TEST
    # =============================
    print("\nTesting best model...")
    ckpt = torch.load(MODEL_OUT, map_location=DEVICE)
    model.load_state_dict(ckpt["model_state_dict"])
    model.eval()

    preds, trues = [], []
    with torch.no_grad():
        for imgs, labels in test_loader:
            imgs = imgs.to(DEVICE, non_blocking=True)
            logits = model(imgs).logits
            preds.extend(logits.argmax(1).cpu().numpy())
            trues.extend(labels.cpu().numpy())

    print("Test Balanced Accuracy:", balanced_accuracy_score(trues, preds))
    print(classification_report(trues, preds, target_names=target_names))


if __name__ == "__main__":
    torch.multiprocessing.freeze_support()
    main()
