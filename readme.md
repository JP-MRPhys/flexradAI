# Medical Report Analyzer

A web-based application that analyzes medical reports, provides explanations, and has a chat interface.

<img width="717" alt="Screenshot 2024-10-15 at 15 31 28" src="https://github.com/user-attachments/assets/1398a746-c2d8-4275-b747-8d31f3b8a1ef">


## Setup

```markdown
# Flask and React Application with Ollama, OpenAI

This project contains a Flask backend and a React frontend, packaged together in a Docker container, and deployed on Heroku. It also integrates the Ollama platform to run AI models.




## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- A Heroku account

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/JP-MRPhys/flexradAI
cd your-repo
```

### 2. Update Environment Variables (Optional)

If your Flask application requires any environment variables (e.g., API keys), you can set them using the Heroku CLI after creating the app.

### 3. Build the Docker Image

Make sure you are in the root directory of your project (where the Dockerfile is located):

```bash
docker build -t your-app-name .
```

### 4. Log in to Heroku

Log in to your Heroku account using the CLI:

```bash
heroku login
```

### 5. Create a Heroku App

Create a new Heroku application:

```bash
heroku create your-app-name
```

### 6. Enable Container Registry on Heroku

Enable the container registry for your application:

```bash
heroku stack:set container -a your-app-name
```

### 7. Log in to Heroku Container Registry

Log in to Heroku Container Registry:

```bash
heroku container:login
```

### 8. Push the Docker Image to Heroku

Push the Docker image you built to Heroku:

```bash
heroku container:push web -a your-app-name
```

### 9. Release Your Application

Release your application on Heroku:

```bash
heroku container:release web -a your-app-name
```

### 10. Open Your Application

Once the release is successful, open your application in the browser:

```bash
heroku open -a your-app-name
```

## Start Script

The application runs both the Flask backend and the React frontend. The `start_servers.sh` script is responsible for starting the servers. It also initializes the Ollama service.

### start_servers.sh

```bash
#!/bin/bash

# Start Ollama server
ollama start &

# Start the Flask backend
python app.py &

# Start serving the React frontend
cd frontend/build
serve -s . -l 3000
```

## Notes

- Ensure that the Flask app is configured to serve the React app correctly
- If Ollama requires specific configurations or environment variables, make sure to set them in your Heroku app.
- Monitor the resource usage, as running multiple servers in a single Heroku dyno may lead to performance issues depending on your app’s complexity and load.

#TODO

FRONTEND development for keyword handling and related 
and completing the necessary refactoring enables the backend, the backend can be deployed independently as well to provide and API


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Ollama](https://ollama.com/) for AI model deployment.
- [Flask](https://flask.palletsprojects.com/) for the backend framework.
- [React](https://reactjs.org/) for the frontend framework.
```

