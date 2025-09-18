import React, { useState } from 'react';
import '../../style.css';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() === '') return;
    onSend(message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-input-wrapper">
      <input
        type="text"
        placeholder="What's today's agenda?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="chat-input"
      />
      <button className="chat-send-btn" onClick={handleSend}>
        +
      </button>
    </div>
  );
};

export default ChatInput;
