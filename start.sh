#!/bin/bash
# Get the directory where the script is located
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Function to handle cleanup on exit
cleanup() {
    echo -e "\nStopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT

echo "Starting Heart Disease Prediction Project..."

# Start Backend
echo "Starting FastAPI Backend..."
# Use the full path to the python executable in the venv for robustness
cd "$PROJECT_ROOT/backend"
"$PROJECT_ROOT/venv/bin/python" -m uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!

# Start Frontend
echo -e "\nStarting React Frontend..."
cd "$PROJECT_ROOT/frontend"
npm run dev &
FRONTEND_PID=$!

echo -e "\nBoth servers are starting up!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop both servers."

# Wait for processes
wait
