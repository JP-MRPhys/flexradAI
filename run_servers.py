import subprocess
import os
import sys

def run_flask():
    try:
        subprocess.Popen([sys.executable, 'app.py'], cwd=os.path.join(os.getcwd(), 'backend'))
        print("Flask server started on http://127.0.0.1:5000")
    except Exception as e:
        print(f"Failed to start Flask server: {e}")

def run_react():
    try:
        subprocess.Popen(['npm', 'start'], cwd=os.path.join(os.getcwd(), 'frontend'))
        print("React server started on http://localhost:3000")
    except Exception as e:
        print(f"Failed to start React server: {e}")

if __name__ == "__main__":
    
    print("Starting backend")
    run_flask()
    
    print("Starting frontend")
    run_react()
