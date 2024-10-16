#!/bin/bash

# Start Ollama server
ollama start &

# Start the Flask backend
python app.py &

# Start serving the React frontend
cd frontend/build
serve -s . -l 3000
