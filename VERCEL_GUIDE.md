# ⚡ Vercel Deployment Guide (Frontend)

Since you now have your Render Backend URL, follow these steps to deploy your React frontend to **Vercel** professionally.

---

## 1. Prepare your URL
- Your **Render Backend URL** is: `https://heart-disease-decision-tree.onrender.com`.
- **Note**: The API endpoint is: `https://heart-disease-decision-tree.onrender.com/predict`.

## 2. Deploy on Vercel Dashboard
1. Go to [vercel.com](https://vercel.com/) and click **Add New** > **Project**.
2. Import your GitHub repository: `FEBEN-G/heart-disease-decision-tree`.
3. **Configure the Project**:
   - **Framework Preset**: `Vite` (Vercel usually detects this automatically).
   - **Root Directory**: `frontend` (Click **Edit** and select the `frontend` folder).
4. **Environment Variables**:
   - Expand the **Environment Variables** section.
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/predict`
   - Click **Add**.

## 3. Finalize
1. Click **Deploy**.
2. Vercel will build your app and give you a production link (e.g., `https://heart-disease-ai.vercel.app`).

---

## 💡 Why this way?
By using `VITE_API_URL` as an environment variable:
- **Local Testing**: When you run `npm run dev` locally, it will automatically fallback to `http://localhost:8000/predict`.
- **Production**: When Vercel builds the app, it injects your real Render URL.
- **No Code Changes**: You never have to manually edit `App.jsx` again when switching between local work and live deployment.

---

## 🛑 Important: CORS Setup
Once your Vercel app is live, your backend might block it for security. 
1. Open `backend/main.py`.
2. Update `allow_origins`:
   ```python
   allow_origins=[
       "http://localhost:5173",          # Local development
       "https://your-app.vercel.app"      # Your new Vercel URL
   ]
   ```
3. Push to GitHub to update the backend on Render.
