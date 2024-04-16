import React, { useRef, useState, useEffect } from 'react';
import './css/Chat.css'; // Ensure the path is correct based on your project structure
import axios from 'axios';

function Chat() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [file, setFile] = useState(); // State to hold the uploaded PDF file
  const messagesEndRef = useRef(null); // Ref for the messages container

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };
  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Save the uploaded PDF to state
    console.log("PDF file uploaded:", event.target.files[0].name); // Just log the file name for now
  };

  const handleAskQuestion = async () => {
    if (!file) {
      alert('Please upload a PDF file first.'); // Check if a PDF has been uploaded
      return;
    }
    const formData = new FormData();
    formData.append('question', question);

    //request to post question
    axios.post('http://localhost:5000/ask-question', formData,   
    {headers: {
      'Content-Type': 'application/json'
    }})
    .then(response => {
        const newAnswer = { question: question, answer: response.data.answer};
        setAnswers([...answers, newAnswer]);
        setQuestion(''); // Clear input after sending
    })
    .catch(error => {
      console.error(error);
    });

  };


  const handleSendPdf = async () => {
    if (!file) {
      alert('Please upload a PDF file first.');
      return;
    }
    console.log("Uploading PDF file:", file.name);
    const formData = new FormData();
    formData.append('file', file);
    //axios request
    axios.post('http://localhost:5000/upload-pdf', formData)
    .then(response => {
      console.log("testing", response);
    })
    .catch(error => {
      console.error(error);
    });
  };
  

  const handleClearMessages = () => {
    setAnswers([]); // Clear all messages
  };


    // Effect to scroll to bottom every time messages update
  useEffect(() => {
    scrollToBottom();
  }, [answers]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat Application</h1>
        <button className="clear-button" onClick={handleClearMessages}>Clear</button>
        <div className="file-upload">
        <div className="file-input">
          <input type="file" onChange={handleFileChange} accept="application/pdf" />
        </div>
          <button className="upload-pdf-button" onClick={handleSendPdf}>Upload</button>
        </div>

      </header>
      <div className="messages">
        {answers.map((entry, index) => (
          <div key={index} className="message-group">
            <div className="message question">{entry.question}</div>
            <div className="message answer">{entry.answer}</div>
          </div>
        ))}
        <div ref={messagesEndRef} /> 
      </div>
      <div className="input-area">
        <input
          className="input-box"
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Ask a question..."
          onKeyDown={event => event.key === 'Enter' ? handleAskQuestion() : null}
        />
        <button className="send-button" onClick={handleAskQuestion}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
