from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
from AI.openAI import OpenAILLM
from AI.preprocessing import read_pdf_text_and_tables

app = Flask(__name__)
CORS(app)

llm=OpenAILLM()

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

nltk.download('punkt')
nltk.download('stopwords')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_keywords(text):
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(text.lower())
    filtered_text = [word for word in word_tokens if word.isalnum() and word not in stop_words]
    fdist = FreqDist(filtered_text)
    return [word for word, _ in fdist.most_common(5)]


@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json  # Get the JSON payload from the request
        if not data or 'message' not in data:
            return jsonify({"error": "Invalid request"}), 400

        message = data['message']  # Extract the 'message' field

        # Generate a response (here, just echoing the message)
        response = f"Received: {message}"

        print(f"Received message: {message}")  # Debugging: Log the received message
        return jsonify({"response": response}), 200  # Explicitly return status 200 OK

    except Exception as e:
        print(f"Error: {str(e)}")  # Log any unexpected errors
        return jsonify({"error": "An error occurred"}), 500  # Return a 500 error if something goes wrong
    
@app.route('/chat', methods=['OPTIONS'])
def options_chat():
    return '', 200  # Respond with 200 OK for preflight checks


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        with open(filepath, 'r') as f:
            content = f.read()

        table,text=read_pdf_text_and_tables(content)
        keywords=llm.get_keywords(text) ##TODO:this is json so send this accordingly

        return jsonify({"message": "File uploaded successfully", "keywords": keywords})
    return jsonify({"error": "File type not allowed"}), 400

#TODO:rework this after the frontend  ... probabal not need keyword and summary in 
@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    keyword = data['keyword']
    # In a real application, you would retrieve the relevant text for the keyword
    # For this example, we'll use a placeholder text

    return jsonify({"summary": summary})

#TODO: This is Images data
@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image = request.files['image']
    
    if image.filename == '':
        return jsonify({"error": "No selected image file"}), 400
    
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(filepath)
        
        # TODO: Implement image processing logic here
        # For now, we'll just return a placeholder message

        return jsonify({"message": "Image received and saved. Processing logic to be implemented (WIP)."})
    
    return jsonify({"error": "File type not allowed"}), 400

if __name__ == '__main__':
    app.run(debug=False)