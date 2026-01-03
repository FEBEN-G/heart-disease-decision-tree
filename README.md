# 🫀 Heart Guard AI - End-to-End Heart Disease Prediction

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)

Heart Guard AI is a full-stack Machine Learning application designed to predict the likelihood of heart disease in patients based on 13 clinical features. It features a robust FastAPI backend serving a Decision Tree model and a modern, high-contrast React frontend for clinical use.

> [!TIP]
> **Looking to deploy?** See our [Deployment Guide](DEPLOYMENT_GUIDE.md) for step-by-step instructions on going live.

## 🌟 Features

- **Decision Tree ML Pipeline**: Cleanly separated training logic with data scaling and automated export.
- **Real-time Predictions**: Instant classification of "Healthy" vs "Heart Disease Detected".
- **Advanced Confidence Metrics**: Detailed percentage distribution for each classification.
- **Premium UI/UX**: Built with React, Vite, and Framer Motion for smooth animations and a professional clinical aesthetic.
- **Diagnostic Tooling**: Built-in sample data buttons to quickly verify model behavior in different clinical scenarios.

## 📂 Project Structure

```text
heart-disease-decision-tree/
├── notebook/
│   └── decision_tree_pipeline.ipynb   # Model training & EDA in Colab/Jupyter
├── backend/
│   ├── main.py                       # FastAPI application & Prediction logic
│   ├── model/
│   │   └── decision_tree_model.joblib # Serialized Scikit-Learn pipeline
│   └── requirements.txt              # Backend dependencies
├── data/                             # Raw Dataset folder (Gitignored)
│   └── heart.csv                     # 303 feature records
├── frontend/
│   ├── src/                          # React components (App.jsx, index.css)
│   ├── package.json                  # Frontend dependencies
│   └── vite.config.js                # Vite configuration
├── heart.csv                         # Raw Dataset (303 records)
├── start.sh                          # One-click startup script for local dev
└── README.md                         # Professional documentation
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js & npm
- Git

### 1-Click Startup (Recommended)
You can start both the backend and frontend simultaneously using the provided bash script:
```bash
chmod +x start.sh
./start.sh
```

### Manual Installation

#### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🛠️ Tech Stack

- **ML Core**: Scikit-Learn, Pandas, NumPy, Joblib
- **Back-End**: FastAPI (Asynchronous Python Framework), Pydantic
- **Front-End**: React 18, Vite, Framer Motion (Animations), Lucide (Icons)
- **Deployment Ready**: Configured for Vercel (Frontend) and Render/Railway (Backend).

## 📊 Dataset Overview
The model uses 13 clinical features:
- `age`, `sex`, `cp` (chest pain), `trestbps`, `chol`, `fbs`, `restecg`, `thalach`, `exang`, `oldpeak`, `slope`, `ca`, `thal`.

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
Developed by [FEBEN-G](https://github.com/FEBEN-G)
