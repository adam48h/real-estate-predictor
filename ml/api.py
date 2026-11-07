
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pathlib import Path
import pandas as pd
import joblib

# Load trained model
MODEL_PATH = Path(__file__).resolve().parent / "ames_simple_model.joblib"
model = joblib.load(MODEL_PATH)

app = FastAPI(title="Real Estate Price Predictor API")

# Allow requests from Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Property information received from website
class PropertyInput(BaseModel):
    bedrooms: int = Field(ge=0, le=10)
    bathrooms: float = Field(ge=0, le=10)
    squareFeet: float = Field(gt=0, le=20000)
    propertyType: str

@app.get("/")
def home():
    return {"message": "Real Estate Predictor API is running!"}

@app.post("/predict")
def predict_price(property: PropertyInput):

    allowed_types = [
        "Single Family Home",
        "Townhouse",
        "Duplex",
        "Two-Family Home"
    ]

    if property.propertyType not in allowed_types:
        return {"error": "Unsupported property type"}

    # Match the model's training column names
    features = pd.DataFrame([{
        "bedrooms": property.bedrooms,
        "bathrooms": property.bathrooms,
        "squareFeet": property.squareFeet,
        "propertyType": property.propertyType
    }])

    prediction = model.predict(features)[0]

    return {
        "estimatedPrice": round(float(prediction), 2),
        "currency": "USD"
    }
