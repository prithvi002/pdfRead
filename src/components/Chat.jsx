import React, { useState } from 'react';
import './css/Chat.css'; // Ensure the path is correct based on your project structure

function Chat() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [pdf, setPdf] = useState(null); // State to hold the uploaded PDF file

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleFileChange = (event) => {
    setPdf(event.target.files[0]); // Save the uploaded PDF to state
    console.log("PDF file uploaded:", event.target.files[0].name); // Just log the file name for now
  };

  const handleAskQuestion = async () => {
    if (!pdf) {
      alert('Please upload a PDF file first.'); // Check if a PDF has been uploaded
      return;
    }

    // Comment out below to disable posting to backend
    /* 
    const formData = new FormData(); // Using FormData to handle file upload
    formData.append('pdf', pdf); // Append the PDF file
    formData.append('question', question); // Append the question text

    const response = await fetch('http://localhost:3000/ask-pdf', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    const newAnswer = { question: question, answer: data.answer };
    setAnswers([...answers, newAnswer]);
    */

    // For now, just add a static response for testing
    const newAnswer = { question: question, answer: "Response based on PDF content will be implemented later." };
    setAnswers([...answers, newAnswer]);
    setQuestion(''); // Clear input after sending
  };

  const handleClearMessages = () => {
    setAnswers([]); // Clear all messages
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat Application</h1>
        <button className="clear-button" onClick={handleClearMessages}>Clear</button>
        <div className="file-upload">
          <input type="file" onChange={handleFileChange} accept="application/pdf" /> {/* PDF file input */}
        </div>
      </header>
      <div className="messages">
        {answers.map((entry, index) => (
          <div key={index} className="message-group">
            <div className="message question">{entry.question}</div>
            <div className="message answer">{entry.answer}</div>
          </div>
        ))}
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
