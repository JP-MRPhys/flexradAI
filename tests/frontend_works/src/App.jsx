// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [chatInput, setChatInput] = useState('');
  const [file, setFile] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [selectedSummary, setSelectedSummary] = useState(null);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (chatInput.trim() !== '') {
      const response = await axios.post('http://localhost:5000/detect-keywords', { text: chatInput });
      setKeywords(response.data.keywords);
      setSummaries(response.data.summaries);
      setSelectedSummary(null);  // Reset selection
    }
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    const formData = new FormData();
    formData.append('file', uploadedFile);

    const response = await axios.post('http://localhost:5000/upload-file', formData);
    setKeywords(response.data.keywords);
    setSummaries(response.data.summaries);
    setSelectedSummary(null);  // Reset selection
  };

  const handleKeywordClick = (keyword) => {
    setSelectedSummary(summaries[keyword]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Keyword Summarizer</h1>
      </header>
      <div className="container">
        {/* Chat Input Section */}
        <div className="chat-box">
          <h3>Chat with AI</h3>
          <form onSubmit={handleChatSubmit}>
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>

        {/* File Upload Section */}
        <div className="file-upload">
          <h3>Upload a File</h3>
          <input type="file" onChange={handleFileUpload} />
        </div>

        {/* Keyword List Section */}
        <div className="keywords">
          <h3>Detected Keywords</h3>
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index} onClick={() => handleKeywordClick(keyword)}>
                {keyword}
              </li>
            ))}
          </ul>
        </div>

        {/* Side Pane for Keyword Summary */}
        <div className="side-pane">
          <h3>Summary</h3>
          {selectedSummary ? (
            <div>
              <h4>{selectedSummary.title}</h4>
              <p>{selectedSummary.content}</p>
            </div>
          ) : (
            <p>Select a keyword to see the summary</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
