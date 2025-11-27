from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

import tensorflow as tf
import numpy as np
import io, json

app = FastAPI()

# CORS (for Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = tf.keras.models.load_model("plant_disease_model")

# Load class names
with open("class_names.json", "r") as f:
    class_names = json.load(f)

IMAGE_SIZE = 224

@app.post("/analyze")
async def analyze_crop(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((IMAGE_SIZE, IMAGE_SIZE))

    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    index = np.argmax(predictions)
    confidence = float(np.max(predictions))

    result = {
        "crop_disease": class_names[index],
        "confidence": round(confidence, 3),
        "suggestion": get_solution(class_names[index])
    }

    return result


def get_solution(disease_name: str):
    solutions = {
        "Tomato___Leaf_Mold": "Use copper fungicide & remove infected leaves.",
        "Tomato___Late_blight": "Apply Mancozeb & avoid overhead irrigation.",
        "Tomato___Septoria_leaf_spot": "Use chlorothalonil & prune lower leaves.",
        "Tomato___healthy": "Your plant is healthy!"
    }
    return solutions.get(disease_name, "No solution found.")
