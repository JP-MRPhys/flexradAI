#!/bin/bash

# URL of your Flask backend
FLASK_URL="http://localhost:5000/chat"

# JSON payload for the chat message
CHAT_MESSAGE='{"message": "Hello, how are you?"}'

# Send the POST request and capture both response and HTTP status code
response=$(curl -X POST $FLASK_URL \
                 -H "Content-Type: application/json" \
                 -d "$CHAT_MESSAGE" \
                 --write-out "HTTPSTATUS:%{http_code}" --silent)

# Extract the body and the status code from the response
body=$(echo $response | sed -e 's/HTTPSTATUS\:.*//g')
status_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')

# Check if the status code is 200 (OK)
if [ $status_code -eq 200 ]; then
  echo "Chat message sent successfully!"
  echo "Response body: $body"
else
  echo "Failed to send chat message. Status code: $status_code"
  echo "Response body: $body"
fi
