import React, { useState, useRef } from 'react';
import { Upload, MessageSquare, Image, Paperclip } from 'lucide-react';

const MedicalReportAnalyzer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  
  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      try {
        const response = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });
        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, { text: data.response, sender: 'bot' }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Error processing message. Please try again.', sender: 'bot' }]);
      }
    }
  };

  
 
  
  
const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setMessages(prevMessages => [...prevMessages, { text: `Uploading file: ${uploadedFile.name}`, sender: 'user' }]);

      const formData = new FormData();
      formData.append('file', uploadedFile);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setKeywords(data.keywords);
        setMessages(prevMessages => [
          ...prevMessages, 
          { text: `File uploaded successfully. Keywords: ${data.keywords.join(', ')}`, sender: 'bot' }
        ]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Error uploading file. Please try again.', sender: 'bot' }]);
      }
    }
  };

  const handleImageUpload = async (event) => {
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setMessages(prevMessages => [...prevMessages, { text: `Uploading image: ${uploadedImage.name}`, sender: 'user' }]);

      const formData = new FormData();
      formData.append('image', uploadedImage);

      try {
        const response = await fetch('http://localhost:5000/process_image', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, { text: `Image processed: ${data.message}`, sender: 'bot' }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prevMessages => [...prevMessages, { text: 'Error processing image. Please try again.', sender: 'bot' }]);
      }
    }
  };

  const handleKeywordClick = async (keyword) => {
    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });
      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { 
        text: `Summary for ${keyword}: ${data.summary}`, 
        sender: 'bot' 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'Error fetching summary. Please try again.', sender: 'bot' }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-white">
        <div className="flex items-center mb-2">
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg mr-2"
          />
          <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send
          </button>
        </div>
        <div className="flex justify-between">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button onClick={() => fileInputRef.current.click()} className="text-gray-500 hover:text-gray-700 mr-4">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button onClick={() => imageInputRef.current.click()} className="text-gray-500 hover:text-gray-700">
              <Image className="h-5 w-5" />
            </button>
          </div>
          <div>
            {keywords.map((keyword, index) => (
              <button 
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-sm mr-2 hover:bg-gray-300"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalReportAnalyzer;