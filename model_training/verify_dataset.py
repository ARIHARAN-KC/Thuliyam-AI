import os

ROOT = r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\final_dataset"
IMG_EXT = (".jpg", ".jpeg", ".png")

def count_images(folder):
    if not os.path.exists(folder):
        return 0
    return sum(
        1 for f in os.listdir(folder)
        if f.lower().endswith(IMG_EXT)
    )

print("\nDATASET SUMMARY\n")

for split in ["train", "validation", "test"]:
    print(f"=== {split.upper()} ===")

    # REAL
    real_path = os.path.join(ROOT, split, "real")
    real_count = count_images(real_path)
    print("Real:", real_count)

    # FAKE
    fake_root = os.path.join(ROOT, split, "fake")
    total_fake = 0

    if os.path.exists(fake_root):
        for fake_type in sorted(os.listdir(fake_root)):
            p = os.path.join(fake_root, fake_type)
            if not os.path.isdir(p):
                continue
            c = count_images(p)
            total_fake += c
            print(f"{fake_type}: {c}")

    print("Total Fake:", total_fake)
    print("-" * 30)
