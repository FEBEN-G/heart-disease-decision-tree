from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import os

app = FastAPI(title="Heart Disease Prediction API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False, # Changed to False to work with allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model/decision_tree_model.joblib")
model = joblib.load(MODEL_PATH)

class HeartData(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@app.get("/")
def read_root():
    return {"message": "Heart Disease Prediction API is running"}

@app.post("/predict")
def predict(data: HeartData):
    # Convert input data to a dictionary and then to a DataFrame
    input_data = data.dict()
    df = pd.DataFrame([input_data])
    
    # The pipeline includes scaling, so we just call predict
    prediction = model.predict(df)
    probabilities = None
    if hasattr(model, 'predict_proba'):
        prob_array = model.predict_proba(df)[0]
        # Map class indices to labels
        probabilities = {
            "Healthy": float(prob_array[0]) * 100,
            "Heart Disease": float(prob_array[1]) * 100
        }
    
    # Log for debugging
    print(f"Prediction for data {input_data}: {prediction[0]}, Probabilities: {probabilities}")
    
    return {
        "prediction": int(prediction[0]),
        "probabilities": probabilities,
        "status": "Healthy" if prediction[0] == 0 else "Heart Disease Detected"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
