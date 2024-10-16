curl -X POST http://localhost:5000/chat \
-H "Content-Type: application/json" \
-H "Origin: http://localhost:3000" \
-d '{"message": "Hi"}'
