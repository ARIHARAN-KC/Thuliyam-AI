import os
import cv2
import random
import mediapipe as mp
from pathlib import Path
from sklearn.model_selection import train_test_split

# ================= CONFIG =================

SEED = 42
FRAME_RATE = 2                 # 2 FPS better for Swin
IMG_SIZE = 224                 # Swin input size
TRAIN_RATIO = 0.7
VAL_RATIO = 0.15
TEST_RATIO = 0.15

random.seed(SEED)

# ================= INPUT PATHS =================

DFD_REAL = r"Google-DS\DFD_original sequences"
DFD_FAKE = r"Google-DS\DFD_manipulated_sequences\DFD_manipulated_sequences"

FF_ROOT = r"FaceForensics-DS\FaceForensics++_C23"

FF_FAKE_CATEGORIES = [
    "DeepFakeDetection",
    "Deepfakes",
    "Face2Face",
    "FaceShifter",
    "FaceSwap",
    "NeuralTextures"
]

FF_REAL = "original"

OUT_ROOT = Path("video_swin_dataset")

# ================= FACE DETECTOR =================

mp_face = mp.solutions.face_detection
face_detector = mp_face.FaceDetection(
    model_selection=1,
    min_detection_confidence=0.6
)

# ================= UTILS =================

def list_videos(folder):
    return [
        os.path.join(folder, f)
        for f in os.listdir(folder)
        if f.lower().endswith((".mp4", ".avi", ".mov"))
    ]

def split_videos(videos):
    train, temp = train_test_split(
        videos, train_size=TRAIN_RATIO, random_state=SEED, shuffle=True
    )
    val, test = train_test_split(
        temp,
        test_size=TEST_RATIO / (VAL_RATIO + TEST_RATIO),
        random_state=SEED,
        shuffle=True
    )
    return train, val, test

# ================= FACE CROP FUNCTION =================

def extract_face(frame):
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_detector.process(rgb)

    if results.detections:
        det = results.detections[0]
        bbox = det.location_data.relative_bounding_box

        h, w, _ = frame.shape
        x = int(bbox.xmin * w)
        y = int(bbox.ymin * h)
        bw = int(bbox.width * w)
        bh = int(bbox.height * h)

        # Padding
        pad = int(0.2 * bw)
        x = max(0, x - pad)
        y = max(0, y - pad)
        bw = min(w - x, bw + pad)
        bh = min(h - y, bh + pad)

        face = frame[y:y+bh, x:x+bw]
        face = cv2.resize(face, (IMG_SIZE, IMG_SIZE))
        return face

    return None

# ================= FRAME EXTRACTION =================

def extract_frames(video_path, out_dir, label):
    cap = cv2.VideoCapture(video_path)

    fps = int(cap.get(cv2.CAP_PROP_FPS))
    step = max(fps // FRAME_RATE, 1)

    video_name = Path(video_path).stem
    frame_id = 0
    saved = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_id % step == 0:
            face = extract_face(frame)
            if face is not None:
                out_path = out_dir / label / f"{video_name}_f{saved:04d}.jpg"
                cv2.imwrite(str(out_path), face)
                saved += 1

        frame_id += 1

    cap.release()

# ================= MAIN =================

def main():

    print("Collecting videos...")

    # REAL
    real_videos = []
    real_videos.extend(list_videos(DFD_REAL))
    real_videos.extend(list_videos(os.path.join(FF_ROOT, FF_REAL)))

    # FAKE
    fake_videos = []
    fake_videos.extend(list_videos(DFD_FAKE))

    for cat in FF_FAKE_CATEGORIES:
        fake_videos.extend(list_videos(os.path.join(FF_ROOT, cat)))

    # ================= BALANCE DATASET =================
    min_count = min(len(real_videos), len(fake_videos))

    random.shuffle(real_videos)
    random.shuffle(fake_videos)

    real_videos = real_videos[:min_count]
    fake_videos = fake_videos[:min_count]

    print(f"Balanced Dataset → REAL: {len(real_videos)}, FAKE: {len(fake_videos)}")

    # ================= SPLIT =================
    splits = {"train": {}, "val": {}, "test": {}}

    splits["train"]["real"], splits["val"]["real"], splits["test"]["real"] = split_videos(real_videos)
    splits["train"]["fake"], splits["val"]["fake"], splits["test"]["fake"] = split_videos(fake_videos)

    # Create folders
    for split in splits:
        for label in ["real", "fake"]:
            (OUT_ROOT / split / label).mkdir(parents=True, exist_ok=True)

    # ================= EXTRACT =================
    print("Extracting faces...")

    for split in splits:
        for label in ["real", "fake"]:
            for video in splits[split][label]:
                extract_frames(video, OUT_ROOT / split, label)

    print("Swin Dataset Ready.")
    print("Location:", OUT_ROOT.resolve())


if __name__ == "__main__":
    main()
