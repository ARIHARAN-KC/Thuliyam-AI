from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import torch

from app.api.image import router as image_router
from app.models.image_model import load_image_model

app = FastAPI(
    title="Thuliyam AI – Deepfake Detection API",
    version="1.0.0"
)

# CORS (restrict origins in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
@app.on_event("startup")
def startup_event():
    load_image_model()

app.include_router(image_router)

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model": "ViT Real vs Fake",
        "device": "cuda" if torch.cuda.is_available() else "cpu"
    }
