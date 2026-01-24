import os
import zipfile
import kagglehub

# 1. Authenticate
kagglehub.login()

# 2. Download the compressed archive (still downloads the full size)
print("Downloading dataset archive...")
archive_path = kagglehub.dataset_download("philosopher0808/real-vs-ai-generated-faces-dataset")

# 3. Targeted Extraction
target_folders = ["sfhq", "stable_diffusion", "thispersondoesnotexist"]
output_dir = "./filtered_faces"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print("Extracting only requested folders...")
# Note: kagglehub usually downloads unzipped files to a cache. 
# If it's already unzipped in the cache, we just move the folders:
import shutil

for folder in target_folders:
    source = os.path.join(archive_path, folder)
    dest = os.path.join(output_dir, folder)
    
    if os.path.exists(source):
        print(f"Plucking {folder}...")
        shutil.copytree(source, dest, dirs_exist_ok=True)

print(f"Success! Your specific folders are in: {os.path.abspath(output_dir)}")