#!/bin/bash

# This script sets up and runs the Medical Report Analyzer app (both Flask and React)

# Step 1: Setting up the backend (Flask)
echo "Setting up the Flask backend..."

# Navigate to the backend directory
cd backend

# Create and activate the virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi


#echo "Activating virtual environment..."
#source venv/bin/activate

# Install required Python packages
#echo "Installing Python dependencies..."
#pip install -r requirements.txt

# Step 2: Setting up the frontend (React)
echo "Setting up the React frontend..."

# Navigate to the frontend directory
cd ../frontend

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing React dependencies..."
    npm install
fi

# Step 3: Running both the Flask and React servers
echo "Running both Flask and React servers..."

# Run Flask server in the background
cd ../backend
#source venv/bin/activate
python app.py &

# Run React server
cd ../frontend
npm start

# After executing the script, Flask will be running on http://127.0.0.1:5000
# React will be running on http://localhost:3000
