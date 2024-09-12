import  { useEffect, useState } from 'react';
import socket from './services/socket';

const AdminChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for user messages
    socket.on('newMessageToAdmin', (data) => {
        console.log("New message from client",data)
      setMessages((prevMessages) => [...prevMessages, `User: ${data.message}`]);
    });

    // Clean up on component unmount
    return () => {
      socket.off('newMessageToAdmin');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('adminMessage', {
      receiverId: '01HQ2J3K5N6M7P8R9T0V1W2Y6', // Replace with actual client ID
      message
    });
    setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);
    setMessage('');
  };

  return (
    <div>
      <h2>Admin Chat</h2>
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

export default AdminChat;
