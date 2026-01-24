import os
import random
import shutil

# Source folder (all real images)
source_folder = r"D:\ZT\Thuliyam AI\thuliyam_AI\datasets\archive\data_source\data_source\fake\stable_diffusion"

# Destination folder (where 2250 random images will go)
dest_folder = r"final_dataset\test\fake"

# Number of images you want
num_images = 750

# Make destination folder if it doesn't exist
os.makedirs(dest_folder, exist_ok=True)

# List all image files in source folder
all_images = [f for f in os.listdir(source_folder) if f.lower().endswith(('.jpg'))]

# Randomly select N images
selected_images = random.sample(all_images, num_images)

# Copy selected images to destination
for img_name in selected_images:
    shutil.copy(os.path.join(source_folder, img_name),
                os.path.join(dest_folder, img_name))

print(f"Copied {num_images} random images to {dest_folder}")
