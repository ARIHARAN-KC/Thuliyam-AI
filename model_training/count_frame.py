import os

DATASET_PATH = "video_swin_dataset"

structure = {
    "train": ["fake", "real"],
    "val": ["fake", "real"],
    "test": ["fake", "real"]
}

for split, classes in structure.items():
    print(f"\n===== {split.upper()} =====")
    for cls in classes:
        folder_path = os.path.join(DATASET_PATH, split, cls)

        if not os.path.exists(folder_path):
            print(f"{split}/{cls} -> Folder not found")
            continue

        count = len([
            f for f in os.listdir(folder_path)
            if f.lower().endswith((".jpg", ".jpeg", ".png"))
        ])

        print(f"{split}/{cls} -> {count} frames")
