import os
import cv2
from tqdm import tqdm
from pathlib import Path

# ================= CONFIG =================
VIDEO_ROOT = "deepfake_video_dataset"
FRAME_ROOT = "deepfake_video_frames"
FRAME_SIZE = 224
MAX_FRAMES = 64   # maximum frames per video
FRAME_SKIP = 2    # take every 2nd frame (controls speed + dataset size)

# ==========================================

def extract_frames_from_video(video_path, save_dir):
    os.makedirs(save_dir, exist_ok=True)

    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    frame_id = 0
    saved_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_id % FRAME_SKIP == 0:
            frame = cv2.resize(frame, (FRAME_SIZE, FRAME_SIZE))
            frame_name = os.path.join(save_dir, f"{saved_count:04d}.jpg")
            cv2.imwrite(frame_name, frame)
            saved_count += 1

            if saved_count >= MAX_FRAMES:
                break

        frame_id += 1

    cap.release()


def process_split(split):
    for label in ["fake", "real"]:
        input_folder = os.path.join(VIDEO_ROOT, split, label)
        output_folder = os.path.join(FRAME_ROOT, split, label)

        if not os.path.exists(input_folder):
            continue

        videos = [f for f in os.listdir(input_folder)
                  if f.lower().endswith((".mp4", ".avi", ".mov", ".mkv"))]

        for video in tqdm(videos, desc=f"{split}/{label}"):
            video_path = os.path.join(input_folder, video)
            video_name = Path(video).stem
            save_dir = os.path.join(output_folder, video_name)

            extract_frames_from_video(video_path, save_dir)


if __name__ == "__main__":
    for split in ["train", "val", "test"]:
        process_split(split)

    print("\nFrame extraction completed.")