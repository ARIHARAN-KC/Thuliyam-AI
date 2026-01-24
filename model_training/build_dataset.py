# import os
# import random
# import shutil

# # =====================================================
# # CONFIG
# # =====================================================
# random.seed(42)
# IMG_EXT = (".jpg", ".jpeg", ".png")

# # -------------------------
# # SOURCE PATHS
# # -------------------------
# REAL_SRC = r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\ffhq"

# FAKE_SOURCES = {
#     "faceswap": r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\faceswap",
#     "sfhq": [
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\sfhq\pt1",
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\sfhq\pt2",
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\sfhq\pt3",
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\sfhq\pt4",
#     ],
#     "thisperson": r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\thispersondoesnotexist",
#     "stable_diffusion": [
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\512\man",
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\512\woman",
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\768\man",
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\768\woman",
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\1024\man",
#         r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\1024\woman",
#     ],
# }

# DEST_ROOT = r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\final_dataset"

# # =====================================================
# # FIXED VALIDATION / TEST (LOCKED)
# # =====================================================
# VAL_TEST = {
#     "real": 6000,
#     "faceswap": 1200,
#     "sfhq": 1400,
#     "thisperson": 1600,
#     "stable_diffusion": 1200,
# }

# # =====================================================
# # HELPERS
# # =====================================================
# def get_images(folder):
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(IMG_EXT)
#     ]

# def get_images_from_multiple(folders):
#     images = []
#     for folder in folders:
#         images.extend(get_images(folder))
#     return images

# def copy_images(images, dest, prefix, split):
#     os.makedirs(dest, exist_ok=True)
#     for i, img in enumerate(images):
#         ext = os.path.splitext(img)[1]
#         name = f"{prefix}_{split}_{i:06d}{ext}"
#         shutil.copy2(img, os.path.join(dest, name))

# # =====================================================
# # LOAD DATA
# # =====================================================
# print("\nLoading images...")

# real_images = get_images(REAL_SRC)
# fake_images = {
#     "faceswap": get_images(FAKE_SOURCES["faceswap"]),
#     "sfhq": get_images_from_multiple(FAKE_SOURCES["sfhq"]),
#     "thisperson": get_images(FAKE_SOURCES["thisperson"]),
#     "stable_diffusion": get_images_from_multiple(FAKE_SOURCES["stable_diffusion"]),
# }

# random.shuffle(real_images)
# for k in fake_images:
#     random.shuffle(fake_images[k])

# print("\nAvailable images:")
# print(f"REAL: {len(real_images)}")
# for k in fake_images:
#     print(f"{k.upper()}: {len(fake_images[k])}")

# # =====================================================
# # SAFE TRAIN SIZE CALCULATION
# # =====================================================
# def max_train_available(cls):
#     return len(fake_images[cls]) - 2 * VAL_TEST[cls]

# max_faceswap = max_train_available("faceswap")
# assert max_faceswap > 0, "Not enough FaceSwap images"

# TRAIN_FAKE_PER_CLASS = min(
#     max_faceswap,
#     max_train_available("sfhq"),
#     max_train_available("thisperson"),
#     max_train_available("stable_diffusion"),
# )

# # ---- REAL SAFETY CAP ----
# max_real_train = len(real_images) - 2 * VAL_TEST["real"]
# assert max_real_train > 0, "Not enough REAL images"

# TRAIN_REAL = min(TRAIN_FAKE_PER_CLASS * 2, max_real_train)

# TRAIN_TARGET = {
#     "faceswap": TRAIN_FAKE_PER_CLASS,
#     "sfhq": TRAIN_FAKE_PER_CLASS,
#     "thisperson": TRAIN_FAKE_PER_CLASS,
#     "stable_diffusion": TRAIN_FAKE_PER_CLASS,
#     "real": TRAIN_REAL,
# }

# print(f"\nTRAIN FAKE PER CLASS : {TRAIN_FAKE_PER_CLASS}")
# print(f"TRAIN REAL IMAGES   : {TRAIN_REAL}")
# print("Fake : Real ratio   :", round((TRAIN_FAKE_PER_CLASS * 4) / TRAIN_REAL, 2))

# # =====================================================
# # BUILD DATASET (VAL → TEST → TRAIN)
# # =====================================================
# print("\nBuilding FINAL DATASET")

# idx_real = 0
# idx_fake = {k: 0 for k in fake_images}

# for split in ["validation", "test", "train"]:
#     print(f"\nCreating {split.upper()}")

#     cfg = VAL_TEST if split != "train" else TRAIN_TARGET

#     # REAL
#     real_subset = real_images[idx_real: idx_real + cfg["real"]]
#     copy_images(
#         real_subset,
#         os.path.join(DEST_ROOT, split, "real"),
#         "real",
#         split
#     )
#     idx_real += cfg["real"]

#     # FAKE
#     for k in fake_images:
#         fake_subset = fake_images[k][idx_fake[k]: idx_fake[k] + cfg[k]]
#         copy_images(
#             fake_subset,
#             os.path.join(DEST_ROOT, split, "fake", k),
#             k,
#             split
#         )
#         idx_fake[k] += len(fake_subset)

# print("\nDATASET CREATED SUCCESSFULLY")
# print("Output path:", DEST_ROOT)

# # =====================================================
# # DATASET SUMMARY
# # =====================================================
# print("\n" + "="*40)
# print("FINAL DATASET SUMMARY")
# print("="*40)

# for split in ["train", "validation", "test"]:
#     split_path = os.path.join(DEST_ROOT, split)
#     print(f"\n[{split.upper()}]")
#     total = 0

#     real_count = len(os.listdir(os.path.join(split_path, "real")))
#     print(f"  Real: {real_count}")
#     total += real_count

#     fake_root = os.path.join(split_path, "fake")
#     for k in os.listdir(fake_root):
#         count = len(os.listdir(os.path.join(fake_root, k)))
#         print(f"  Fake/{k}: {count}")
#         total += count

#     print(f"  TOTAL {split.upper()}: {total}")

# print("\n" + "="*40)
# ==============================================================================#



import os
import random
import shutil

# =====================================================
# CONFIG
# =====================================================
random.seed(42)
IMG_EXT = (".jpg", ".jpeg", ".png")

# -------------------------
# SOURCE PATHS
# -------------------------
REAL_SRC = r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\ffhq"

FAKE_SOURCES = {
    "faceswap": r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\faceswap",
    "sfhq": [
        r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\sfhq\pt1",
        r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\sfhq\pt2",
        r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\sfhq\pt3",
        r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\sfhq\pt4",
    ],
    "thisperson": r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\thispersondoesnotexist",
    "stable_diffusion": [
        r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\512\man",
        r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\512\woman",
        r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\768\man",
        r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\768\woman",
        r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\1024\man",
        r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\stable-diffusion-face-dataset\1024\woman",
    ],
}

DEST_ROOT = r"D:\ZT\Thuliyam AI\thuliyam_AI\model_training\final_dataset"

# =====================================================
# FIXED VALIDATION / TEST (LOCKED)
# =====================================================
VAL_TEST = {
    "real": 6000,
    "faceswap": 1200,
    "sfhq": 1400,
    "thisperson": 1600,
    "stable_diffusion": 1200,
}

# =====================================================
# HELPERS
# =====================================================
def get_images(folder):
    if not os.path.exists(folder): return []
    return [
        os.path.join(folder, f)
        for f in os.listdir(folder)
        if f.lower().endswith(IMG_EXT)
    ]

def get_images_from_multiple(folders):
    images = []
    for folder in folders:
        images.extend(get_images(folder))
    return images

def copy_images(images, dest, prefix, split):
    os.makedirs(dest, exist_ok=True)
    for i, img in enumerate(images):
        ext = os.path.splitext(img)[1]
        name = f"{prefix}_{split}_{i:06d}{ext}"
        shutil.copy2(img, os.path.join(dest, name))

# =====================================================
# LOAD DATA
# =====================================================
print("\nLoading images...")

real_images = get_images(REAL_SRC)
fake_images = {
    "faceswap": get_images(FAKE_SOURCES["faceswap"]),
    "sfhq": get_images_from_multiple(FAKE_SOURCES["sfhq"]),
    "thisperson": get_images(FAKE_SOURCES["thisperson"]),
    "stable_diffusion": get_images_from_multiple(FAKE_SOURCES["stable_diffusion"]),
}

random.shuffle(real_images)
for k in fake_images:
    random.shuffle(fake_images[k])

# =====================================================
# SAFE TRAIN SIZE CALCULATION (1:1 RATIO)
# =====================================================
def max_train_available(cls):
    return len(fake_images[cls]) - 2 * VAL_TEST[cls]

# Bottleneck check for Fakes
TRAIN_FAKE_PER_CLASS = min(
    max_train_available("faceswap"),
    max_train_available("sfhq"),
    max_train_available("thisperson"),
    max_train_available("stable_diffusion"),
)

# For 1:1, TRAIN_REAL must equal the sum of all fakes (4 classes)
TOTAL_FAKES_NEEDED = TRAIN_FAKE_PER_CLASS * 4
max_real_train_avail = len(real_images) - 2 * VAL_TEST["real"]

# If real images are the bottleneck, reduce fakes to match
if max_real_train_avail < TOTAL_FAKES_NEEDED:
    TRAIN_REAL = max_real_train_avail
    TRAIN_FAKE_PER_CLASS = TRAIN_REAL // 4
else:
    TRAIN_REAL = TOTAL_FAKES_NEEDED

TRAIN_TARGET = {
    "faceswap": TRAIN_FAKE_PER_CLASS,
    "sfhq": TRAIN_FAKE_PER_CLASS,
    "thisperson": TRAIN_FAKE_PER_CLASS,
    "stable_diffusion": TRAIN_FAKE_PER_CLASS,
    "real": TRAIN_REAL,
}

print(f"\nAvailable REAL: {len(real_images)}")
print(f"TRAIN FAKE PER CLASS : {TRAIN_FAKE_PER_CLASS}")
print(f"TOTAL FAKES (4 classes): {TRAIN_FAKE_PER_CLASS * 4}")
print(f"TRAIN REAL IMAGES     : {TRAIN_REAL}")
print(f"Target Ratio (Real:Total Fake): 1:1")

# =====================================================
# BUILD DATASET
# =====================================================
print("\nBuilding FINAL DATASET...")

idx_real = 0
idx_fake = {k: 0 for k in fake_images}

for split in ["validation", "test", "train"]:
    print(f"Creating {split.upper()}...")
    cfg = VAL_TEST if split != "train" else TRAIN_TARGET

    # REAL
    real_subset = real_images[idx_real: idx_real + cfg["real"]]
    copy_images(real_subset, os.path.join(DEST_ROOT, split, "real"), "real", split)
    idx_real += cfg["real"]

    # FAKE
    for k in fake_images:
        fake_subset = fake_images[k][idx_fake[k]: idx_fake[k] + cfg[k]]
        copy_images(fake_subset, os.path.join(DEST_ROOT, split, "fake", k), k, split)
        idx_fake[k] += len(fake_subset)

print("\nDATASET CREATED SUCCESSFULLY at:", DEST_ROOT)

# =====================================================
# SUMMARY
# =====================================================
print("\n" + "="*40)
print("FINAL BALANCED DATASET SUMMARY (1:1)")
print("="*40)
for split in ["train", "validation", "test"]:
    split_path = os.path.join(DEST_ROOT, split)
    r_count = len(os.listdir(os.path.join(split_path, "real")))
    f_total = 0
    fake_root = os.path.join(split_path, "fake")
    for k in os.listdir(fake_root):
        f_total += len(os.listdir(os.path.join(fake_root, k)))
    print(f"[{split.upper()}] Real: {r_count} | Total Fake: {f_total} | Ratio: {round(r_count/f_total, 2)}:1")