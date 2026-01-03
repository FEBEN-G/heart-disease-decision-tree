# 🚀 Deployment Guide - Heart Guard AI

This guide explains how to deploy the **Heart Guard AI** application to production using **Render** (for the Backend) and **Vercel** (for the Frontend).

---

## 1. Backend Deployment (FastAPI)
We recommend using [Render](https://render.com/) or [Railway](https://railway.app/).

### Steps for Render:
1. **Create Account**: Sign up at [render.com](https://render.com/).
2. **New Web Service**: Click **New +** and select **Web Service**.
3. **Connect GitHub**: Connect your repository `FEBEN-G/heart-disease-decision-tree`.
4. **Configure Service**:
   - **Name**: `heart-disease-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Auto-Deploy**: Click **Create Web Service**.
6. **Save URL**: Once deployed, Render will give you a URL (e.g., `https://heart-disease-api.onrender.com`). **Copy this.**

---

## 2. Connect Frontend to Backend
Before deploying the frontend, you must point it to your new production API.

1. In `frontend/src/App.jsx`, update the `API_URL`:
   ```javascript
   // Change from localhost to your Render URL
   const API_URL = 'https://heart-disease-api.onrender.com/predict';
   ```
   *(Alternatively, use an environment variable `VITE_API_URL`)*.
2. **Push changes** to GitHub:
   ```bash
   git add .
   git commit -m "Configure production API URL"
   git push origin main
   ```

---

## 3. Frontend Deployment (React/Vite)
We recommend [Vercel](https://vercel.com/).

### Steps for Vercel:
1. **Connect Repository**: Go to [vercel.com](https://vercel.com/) and import your GitHub repo.
2. **Configure Project**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environmental Variables** (Optional):
   - If you used `VITE_API_URL` in your code, add it here.
4. **Deploy**: Click **Deploy**.
5. **Done!**: Vercel will provide your public application URL.

---

## 🔒 Security & CORS Note
Your backend `main.py` currently allows all origins:
```python
allow_origins=["*"]
```
For better security in production, you should replace `*` with your specific Vercel URL:
```python
allow_origins=["https://your-app-name.vercel.app"]
```

---

## 🛠️ Common Troubleshooting
- **ModuleNotFoundError**: Ensure `scikit-learn`, `pandas`, and `joblib` are listed in `backend/requirements.txt`.
- **Model Loading**: Render uses a Linux environment, so `os.path.join` in `main.py` will work correctly.
- **Port Error**: Always use the `$PORT` environment variable in your start command on Render.
