import torch
from transformers import ViTForImageClassification, ViTConfig
from app.config import IMAGE_MODEL_PATH

MODEL_NAME = "google/vit-base-patch16-224"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

_model = None


def load_image_model():
    global _model

    if _model is not None:
        return _model

    # Secure loading
    checkpoint = torch.load(
        IMAGE_MODEL_PATH,
        map_location=DEVICE,
        weights_only=True
    )

    num_classes = checkpoint.get("num_classes", 2)

    config = ViTConfig.from_pretrained(
        MODEL_NAME,
        num_labels=num_classes
    )

    model = ViTForImageClassification.from_pretrained(
        MODEL_NAME,
        config=config,
        ignore_mismatched_sizes=True
    )

    model.load_state_dict(checkpoint["model_state_dict"])
    model.to(DEVICE)
    model.eval()

    _model = model
    return model
