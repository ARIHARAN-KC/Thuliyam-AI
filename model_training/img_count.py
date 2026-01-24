import os

FOLDER_PATH = r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\thispersondoesnotexist"

VALID_EXTS = (".jpg")

count = sum(
    1 for f in os.listdir(FOLDER_PATH)
    if f.lower().endswith(VALID_EXTS)
)

print(f"Total images in folder thispersondoesnotexist: {count}")
 