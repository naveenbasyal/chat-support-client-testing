import  { useEffect, useState } from 'react';
import socket from './services/socket';

const ClientChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for messages from the admin
    socket.on('newMessageFromAdmin', (data) => {
        console.log("New message from admin",data)
      setMessages((prevMessages) => [...prevMessages, `Admin: ${data.message}`]);
    });

    // Clean up on component unmount
    return () => {
      socket.off('newMessageFromAdmin');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('userMessage', {
      senderId: '01HQ2J3K5N6M7P8R9T0V1W2Y6', //client id or user id
      message
    });
    setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
    setMessage('');
  };

  return (
    <div>
      <h2>Client Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ClientChat;
