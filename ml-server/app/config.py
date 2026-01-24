from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent

MODEL_WEIGHTS_DIR = PROJECT_ROOT / "model_weights"
MODEL_WEIGHTS_DIR.mkdir(parents=True, exist_ok=True)

IMAGE_MODEL_PATH = MODEL_WEIGHTS_DIR / "best_vit_real_vs_fake_model_A.pt"
