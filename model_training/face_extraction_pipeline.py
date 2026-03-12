import os
import cv2
import random
import numpy as np
import mediapipe as mp
from pathlib import Path
from tqdm import tqdm

# ================= CONFIG =================

INPUT_ROOT = "deepfake_video_dataset"
OUTPUT_ROOT = "deepfake_face_dataset"

FRAME_SIZE = 224
FRAMES_PER_VIDEO = 32
SEED = 42

random.seed(SEED)
np.random.seed(SEED)

VIDEO_EXTENSIONS = (".mp4", ".avi", ".mov")

# ================= MEDIAPIPE SETUP =================

mp_face = mp.solutions.face_detection
face_detector = mp_face.FaceDetection(
    model_selection=1,
    min_detection_confidence=0.5
)

# ================= FUNCTIONS =================

def sample_frame_indices(total_frames, num_samples):
    """Uniformly sample frame indices"""
    if total_frames <= num_samples:
        return list(range(total_frames))
    return np.linspace(0, total_frames - 1, num_samples, dtype=int)


def extract_face(frame):
    """Detect and crop the largest face"""
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_detector.process(rgb)

    if not results.detections:
        return None

    h, w, _ = frame.shape
    best_box = None
    max_area = 0

    for det in results.detections:
        bbox = det.location_data.relative_bounding_box
        x = int(bbox.xmin * w)
        y = int(bbox.ymin * h)
        bw = int(bbox.width * w)
        bh = int(bbox.height * h)

        area = bw * bh
        if area > max_area:
            max_area = area
            best_box = (x, y, bw, bh)

    if best_box is None:
        return None

    x, y, bw, bh = best_box

    # Expand box slightly
    pad = int(0.2 * bw)
    x1 = max(0, x - pad)
    y1 = max(0, y - pad)
    x2 = min(w, x + bw + pad)
    y2 = min(h, y + bh + pad)

    face = frame[y1:y2, x1:x2]
    face = cv2.resize(face, (FRAME_SIZE, FRAME_SIZE))

    return face


def process_video(video_path, output_dir):
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    if total_frames == 0:
        cap.release()
        return

    indices = sample_frame_indices(total_frames, FRAMES_PER_VIDEO)

    saved_count = 0
    frame_id = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if frame_id in indices:
            face = extract_face(frame)
            if face is not None:
                save_path = os.path.join(output_dir, f"{saved_count:03d}.jpg")
                cv2.imwrite(save_path, face)
                saved_count += 1

        frame_id += 1

    cap.release()


# ================= MAIN =================

def main():

    print("Starting face extraction pipeline...\n")

    for split in ["train", "val", "test"]:
        for label in ["real", "fake"]:

            input_dir = os.path.join(INPUT_ROOT, split, label)
            output_dir = os.path.join(OUTPUT_ROOT, split, label)

            Path(output_dir).mkdir(parents=True, exist_ok=True)

            videos = [
                f for f in os.listdir(input_dir)
                if f.lower().endswith(VIDEO_EXTENSIONS)
            ]

            print(f"\nProcessing {split}/{label} ({len(videos)} videos)")

            for video_file in tqdm(videos):

                video_path = os.path.join(input_dir, video_file)

                video_name = Path(video_file).stem
                video_output_dir = os.path.join(output_dir, video_name)
                Path(video_output_dir).mkdir(parents=True, exist_ok=True)

                process_video(video_path, video_output_dir)

    print("\nFace dataset creation complete!")
    print("Dataset ready for SOTA deepfake training.")


if __name__ == "__main__":
    main()