import os

FOLDER_PATH = r"video_final_dataset\test\fake"

VALID_EXTS = (".jpg")

count = sum(
    1 for f in os.listdir(FOLDER_PATH)
    if f.lower().endswith(VALID_EXTS)
)

print(f"Total vidoes in folder {FOLDER_PATH}: {count}")
 