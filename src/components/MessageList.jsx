import React, { useEffect, useRef } from 'react';

function MessageList({ answers, clearAnswers }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answers]);

  return (
    <div className="messages">
      {answers.map((entry, index) => (
        <div key={index} className="message-group">
          <div className="message question">{entry.question}</div>
          <div className="message answer">{entry.answer}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      <button className="clear-button" onClick={clearAnswers}>Clear</button>
    </div>
  );
}

export default MessageList;
