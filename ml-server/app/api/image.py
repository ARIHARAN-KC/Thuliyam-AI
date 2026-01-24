from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io

from app.services.image_service import predict_image

router = APIRouter(
    prefix="/predict",
    tags=["Image"]
)


@router.post("/image")
async def predict_image_api(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(
            status_code=400,
            detail="Only JPEG and PNG images are supported"
        )

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    return predict_image(image)
