import os

FOLDER_PATH = r"final_dataset\validation\fake\thisperson"

VALID_EXTS = (".jpg")

count = sum(
    1 for f in os.listdir(FOLDER_PATH)
    if f.lower().endswith(VALID_EXTS)
)

print(f"Total images in folder {FOLDER_PATH}: {count}")
 
# import os
# import glob

# DATA_ROOT = "deepfake_video_frames"

# def analyze_split(split):
#     print(f"\n===== {split.upper()} =====")
    
#     total_videos = 0
#     total_frames = 0
    
#     for cls in ["real", "fake"]:
#         folder = os.path.join(DATA_ROOT, split, cls)
#         if not os.path.exists(folder):
#             continue
        
#         video_dirs = os.listdir(folder)
#         num_videos = len(video_dirs)
#         total_videos += num_videos
        
#         class_frames = 0
        
#         for vd in video_dirs:
#             frames = glob.glob(os.path.join(folder, vd, "*.jpg"))
#             class_frames += len(frames)
        
#         total_frames += class_frames
        
#         avg_frames = class_frames / num_videos if num_videos > 0 else 0
        
#         print(f"{cls.upper()} videos : {num_videos}")
#         print(f"{cls.upper()} frames : {class_frames}")
#         print(f"{cls.upper()} avg frames/video : {avg_frames:.2f}")
#         print("-" * 30)
    
#     print(f"TOTAL videos : {total_videos}")
#     print(f"TOTAL frames : {total_frames}")
#     print(f"OVERALL avg frames/video : {total_frames / total_videos:.2f}")

# for split in ["train", "val", "test"]:
#     analyze_split(split)