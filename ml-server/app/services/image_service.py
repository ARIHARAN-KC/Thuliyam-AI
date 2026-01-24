import torch
from PIL import Image
from torchvision import transforms
from app.models.image_model import load_image_model

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

IMAGENET_MEAN = [0.485, 0.456, 0.406]
IMAGENET_STD = [0.229, 0.224, 0.225]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(IMAGENET_MEAN, IMAGENET_STD)
])


def predict_image(image: Image.Image):
    model = load_image_model()

    image_tensor = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(image_tensor)
        probs = torch.softmax(outputs.logits, dim=1)[0]

    pred_idx = torch.argmax(probs).item()
    confidence = probs[pred_idx].item()

    label = "Fake" if pred_idx == 0 else "Real"

    return {
        "success": True,
        "label": label,
        "confidence": round(confidence, 4),
        "scores": {
            "fake": round(probs[0].item(), 4),
            "real": round(probs[1].item(), 4)
        }
    }
