import os
import glob
import random
import numpy as np
from PIL import Image
from pathlib import Path
from tqdm import tqdm

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms
import timm

from sklearn.metrics import roc_auc_score

# ================= CUDA SPEED OPT =================
torch.backends.cudnn.benchmark = True
torch.set_float32_matmul_precision("high")

# ================= CONFIG =================
DATA_ROOT = "deepfake_video_frames"
BATCH_SIZE = 6
EPOCHS = 30
LEARNING_RATE = 3e-4
FRAMES_PER_VIDEO = 16
IMG_SIZE = 224
SEED = 42
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
CHECKPOINT_PATH = "deepfake_video_model/effnetv2_lstm_best.pt"
PATIENCE = 6
NUM_WORKERS = 6


# ================= SEED =================
def set_seed(seed):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if DEVICE == "cuda":
        torch.cuda.manual_seed_all(seed)


# ================= DATASET =================
class DeepFakeVideoDataset(Dataset):

    def __init__(self, split="train", transform=None):

        self.samples = []
        self.labels = []
        self.transform = transform
        self.split = split

        for label, cls in enumerate(["real", "fake"]):

            folder = os.path.join(DATA_ROOT, split, cls)

            if not os.path.exists(folder):
                continue

            for vd in os.listdir(folder):

                frames = sorted(
                    glob.glob(os.path.join(folder, vd, "*.jpg"))
                )

                if len(frames) > 0:
                    self.samples.append(frames)
                    self.labels.append(label)

        print(split, "samples:", len(self.samples))

    def __len__(self):
        return len(self.samples)

    def sample_frames(self, frames):

        if self.split == "train":

            indices = np.random.choice(
                len(frames),
                FRAMES_PER_VIDEO,
                replace=len(frames) < FRAMES_PER_VIDEO
            )

        else:

            indices = np.linspace(
                0,
                len(frames) - 1,
                FRAMES_PER_VIDEO,
                dtype=int
            )

        return [frames[i] for i in sorted(indices)]

    def __getitem__(self, idx):

        frame_paths = self.sample_frames(self.samples[idx])

        frames = []

        for fp in frame_paths:

            img = Image.open(fp).convert("RGB")

            if self.transform:
                img = self.transform(img)

            frames.append(img)

        frames = torch.stack(frames)

        label = torch.tensor(self.labels[idx], dtype=torch.float32)

        return frames, label


# ================= TRANSFORMS =================

train_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(0.2,0.2,0.2),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

val_transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])


# ================= MODEL =================

class EfficientNetV2_LSTM(nn.Module):

    def __init__(self, hidden_dim=512):

        super().__init__()

        self.backbone = timm.create_model(
            "tf_efficientnetv2_s",
            pretrained=True,
            num_classes=0
        )

        feature_dim = self.backbone.num_features

        self.lstm = nn.LSTM(
            input_size=feature_dim,
            hidden_size=hidden_dim,
            num_layers=2,
            batch_first=True,
            bidirectional=True,
            dropout=0.3
        )

        self.attention = nn.Linear(hidden_dim * 2, 1)

        self.classifier = nn.Sequential(
            nn.Dropout(0.4),
            nn.Linear(hidden_dim * 2, 256),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(256, 1)
        )

        # Freeze backbone initially
        for p in self.backbone.parameters():
            p.requires_grad = False


    def forward(self, x):

        B, F, C, H, W = x.shape

        x = x.view(B * F, C, H, W)

        # Apply channels_last after reshape
        x = x.to(memory_format=torch.channels_last)

        features = self.backbone(x)

        features = features.view(B, F, -1)

        lstm_out, _ = self.lstm(features)

        attn_weights = torch.softmax(
            self.attention(lstm_out),
            dim=1
        )

        video_feat = torch.sum(
            attn_weights * lstm_out,
            dim=1
        )

        logits = self.classifier(video_feat)

        return logits.squeeze(1)


# ================= TRAIN =================

def train(model, train_loader, val_loader, train_dataset):

    fake_count = sum(train_dataset.labels)
    real_count = len(train_dataset.labels) - fake_count

    pos_weight = torch.tensor(
        [real_count / max(fake_count,1)]
    ).to(DEVICE)

    criterion = nn.BCEWithLogitsLoss(
        pos_weight=pos_weight
    )

    optimizer = torch.optim.AdamW(
        model.parameters(),
        lr=LEARNING_RATE,
        weight_decay=1e-4
    )

    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
        optimizer,
        T_max=EPOCHS
    )

    scaler = torch.amp.GradScaler("cuda") if DEVICE=="cuda" else None

    best_auc = 0
    patience_counter = 0


    for epoch in range(EPOCHS):

        if epoch == 5:
            for p in model.backbone.parameters():
                p.requires_grad = True
            print("Backbone unfrozen")

        model.train()

        total_loss = 0

        for frames, labels in tqdm(train_loader, desc=f"Epoch {epoch+1}/{EPOCHS}"):

            frames = frames.to(DEVICE)
            labels = labels.to(DEVICE)

            optimizer.zero_grad()

            with torch.amp.autocast("cuda", enabled=(DEVICE=="cuda")):

                logits = model(frames)

                loss = criterion(logits, labels)

            if scaler:

                scaler.scale(loss).backward()

                torch.nn.utils.clip_grad_norm_(model.parameters(),1.0)

                scaler.step(optimizer)

                scaler.update()

            else:

                loss.backward()

                optimizer.step()

            total_loss += loss.item()

        scheduler.step()

        print("Train Loss:", total_loss/len(train_loader))


        # ===== Validation =====

        model.eval()

        all_labels = []
        all_probs = []

        with torch.no_grad():

            for frames, labels in val_loader:

                frames = frames.to(DEVICE)

                logits = model(frames)

                probs = torch.sigmoid(logits)

                all_labels.extend(labels.numpy())
                all_probs.extend(probs.cpu().numpy())

        auc = roc_auc_score(all_labels, all_probs)

        print("Validation AUC:", round(auc,4))

        if auc > best_auc:

            best_auc = auc
            patience_counter = 0

            Path(os.path.dirname(CHECKPOINT_PATH)).mkdir(
                parents=True,
                exist_ok=True
            )

            torch.save({
                "model_state": model.state_dict(),
                "auc": float(best_auc)
            }, CHECKPOINT_PATH)

            print("Best model saved.")

        else:

            patience_counter += 1

            if patience_counter >= PATIENCE:
                print("Early stopping triggered.")
                break


# ================= MAIN =================

if __name__ == "__main__":

    set_seed(SEED)

    train_dataset = DeepFakeVideoDataset("train", train_transform)

    val_dataset = DeepFakeVideoDataset("val", val_transform)

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=NUM_WORKERS,
        pin_memory=True,
        persistent_workers=True,
        prefetch_factor=2
    )

    val_loader = DataLoader(
        val_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=NUM_WORKERS,
        pin_memory=True,
        persistent_workers=True,
        prefetch_factor=2
    )

    model = EfficientNetV2_LSTM().to(DEVICE)

    train(model, train_loader, val_loader, train_dataset)

    print("\nTraining Complete.")