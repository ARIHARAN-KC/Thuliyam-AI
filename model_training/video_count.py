import os

FOLDER_PATH = r"deepfake_video_dataset\val\real"

VALID_EXTS = (".mp4")

count = sum(
    1 for f in os.listdir(FOLDER_PATH)
    if f.lower().endswith(VALID_EXTS)
)

print(f"Total vidoes in folder {FOLDER_PATH}: {count}")
 