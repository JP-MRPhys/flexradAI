import React, { useState, useRef } from 'react';
import { Upload, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardContent } from './ui/card';

const MedicalReportAnalyzer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const fileInputRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setMessages(prevMessages => [...prevMessages, { text: `Echo: ${input}`, sender: 'bot' }]);
      setInput('');
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setKeywords(['fever', 'cough', 'headache', 'fatigue']);
  };

  const handleKeywordClick = (keyword) => {
    setMessages(prevMessages => [...prevMessages, { 
      text: `Summary for ${keyword}: This is a placeholder summary for the selected keyword.`, 
      sender: 'bot' 
    }]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 mr-2"
          />
          <Button onClick={handleSendMessage}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
      <div className="w-64 bg-white p-4 border-l flex flex-col">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button onClick={() => fileInputRef.current.click()} className="mb-4">
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
        {file && (
          <Card className="mb-4">
            <CardHeader>Uploaded File</CardHeader>
            <CardContent>{file.name}</CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>Keywords</CardHeader>
          <CardContent>
            <ul>
              {keywords.map((keyword, index) => (
                <li 
                  key={index} 
                  onClick={() => handleKeywordClick(keyword)}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MedicalReportAnalyzer;
