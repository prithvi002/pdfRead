import React, { useState } from 'react';
import '../css/Chat.css'; // Check path based on your project structure
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function Chat() {
  const [answers, setAnswers] = useState([]);

  const addAnswer = (newAnswer) => {
    setAnswers([...answers, newAnswer]);
  };

  const clearAnswers = () => {
    setAnswers([]);
  };

  return (
    <div className="chat-container">
      <ChatHeader addAnswer={addAnswer} />
      <MessageList answers={answers} clearAnswers={clearAnswers} />
      <MessageInput addAnswer={addAnswer} />
    </div>
  );
}

export default Chat;
