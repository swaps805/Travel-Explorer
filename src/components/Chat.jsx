import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles/Chat.css';
import { marked } from 'marked';

Modal.setAppElement('#root'); // Set this to your root element

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { message: input };
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { html: marked(data.response), sender: 'ai' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to fetch response from the server.');
    }
  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <div>
      <button onClick={toggleModal} className="modal-chat-button">Chat</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel="Chat Modal"
        className="chat-modal"
        overlayClassName="chat-overlay"
      >
        <div className="chat-container">
          <button onClick={toggleModal} className="close-modal-button">X</button>
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
              >
                {msg.sender === 'user' ? (
                  <p>{msg.text}</p>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: msg.html }} />
                )}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
              placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default Chat;

