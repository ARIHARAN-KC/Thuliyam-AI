import os
import random
import shutil
from pathlib import Path

# ================= CONFIG =================

random.seed(42)

# Raw dataset paths
RAW_PATHS = {
    "real": [
        r"Google-DS\DFD_original sequences",
        r"FaceForensics-DS\FaceForensics++_C23\original"
    ],
    "fake": [
        r"Google-DS\DFD_manipulated_sequences\DFD_manipulated_sequences",
        r"FaceForensics-DS\FaceForensics++_C23\DeepFakeDetection",
        r"FaceForensics-DS\FaceForensics++_C23\Deepfakes",
        r"FaceForensics-DS\FaceForensics++_C23\Face2Face",
        r"FaceForensics-DS\FaceForensics++_C23\FaceShifter",
        r"FaceForensics-DS\FaceForensics++_C23\FaceSwap",
        r"FaceForensics-DS\FaceForensics++_C23\NeuralTextures",
    ]
}

OUTPUT_DIR = "deepfake_video_dataset"

# Split sizes
SPLIT_CONFIG = {
    "train": {"real": 900, "fake": 1800},
    "val":   {"real": 230, "fake": 230},
    "test":  {"real": 233, "fake": 233},
}

# ================= FUNCTIONS =================

def collect_videos(folder_list):
    videos = []
    for folder in folder_list:
        for root, _, files in os.walk(folder):
            for file in files:
                if file.lower().endswith((".mp4", ".avi", ".mov")):
                    videos.append(os.path.join(root, file))
    return videos


def create_folders():
    for split in SPLIT_CONFIG:
        for cls in ["real", "fake"]:
            Path(os.path.join(OUTPUT_DIR, split, cls)).mkdir(parents=True, exist_ok=True)


def copy_videos(video_list, split, label):
    for video_path in video_list:
        filename = os.path.basename(video_path)
        dst_path = os.path.join(OUTPUT_DIR, split, label, filename)

        # Avoid name collision
        if os.path.exists(dst_path):
            base = Path(filename).stem
            ext = Path(filename).suffix
            dst_path = os.path.join(
                OUTPUT_DIR, split, label,
                f"{base}_{random.randint(0,9999)}{ext}"
            )

        shutil.copy2(video_path, dst_path)


# ================= MAIN =================

def main():

    print("Collecting videos...")

    real_videos = collect_videos(RAW_PATHS["real"])
    fake_videos = collect_videos(RAW_PATHS["fake"])

    print(f"Total real found: {len(real_videos)}")
    print(f"Total fake found: {len(fake_videos)}")

    random.shuffle(real_videos)
    random.shuffle(fake_videos)

    # Select required amount
    total_real_needed = sum(SPLIT_CONFIG[s]["real"] for s in SPLIT_CONFIG)
    total_fake_needed = sum(SPLIT_CONFIG[s]["fake"] for s in SPLIT_CONFIG)

    real_selected = real_videos[:total_real_needed]
    fake_selected = fake_videos[:total_fake_needed]

    print(f"Using real: {len(real_selected)}")
    print(f"Using fake: {len(fake_selected)}")

    create_folders()

    real_idx = 0
    fake_idx = 0

    for split in ["train", "val", "test"]:

        real_count = SPLIT_CONFIG[split]["real"]
        fake_count = SPLIT_CONFIG[split]["fake"]

        print(f"\nProcessing {split}...")

        split_real = real_selected[real_idx:real_idx + real_count]
        split_fake = fake_selected[fake_idx:fake_idx + fake_count]

        real_idx += real_count
        fake_idx += fake_count

        copy_videos(split_real, split, "real")
        copy_videos(split_fake, split, "fake")

    print("\nDataset creation complete!")
    print("No video appears in multiple splits.")
    print("Ready for face extraction stage.")


if __name__ == "__main__":
    main()