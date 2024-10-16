# Medical Report Analyzer

A web-based application that analyzes medical reports, provides explanations, and has a chat interface.

## Setup

### Backend (Flask)

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use: venv\Scripts\activate
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask server:
    ```bash
    python app.py
    ```

### Frontend (React)

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the React development server:
    ```bash
    npm start
    ```

### Running Both Servers

To run both the Flask and React servers at the same time:
```bash
python run_servers.py
