import React, { useState } from 'react';
import { uploadPdf } from './api';

function ChatHeader({ addAnswer }) {
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("PDF file uploaded:", event.target.files[0].name);
  };

  const handleSendPdf = async () => {
    if (!file) {
      alert('Please upload a PDF file first.');
      return;
    }
    uploadPdf(file);
  };

  return (
    <header className="chat-header">
      <h1>Chat Application</h1>
      <div className="file-upload">
        <div className="file-input">
          <input type="file" onChange={handleFileChange} accept="application/pdf" />
        </div>
        <button className="upload-pdf-button" onClick={handleSendPdf}>Upload</button>
      </div>
    </header>
  );
}

export default ChatHeader;
