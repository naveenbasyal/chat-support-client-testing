import { useEffect, useState } from 'react'
import socket from './services/socket'

const AdminChat = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [currentUserId] = useState('01HQ2J3K5N6M7P8R9T0V1W2Y6') // Admin will choose the user to chat with

  const adminId = '01HQ2J3K5N6M7P8R9T0V1W2Y4'

  useEffect(() => {
    if (!currentUserId) return

    // Join the chat for the specific user
    socket.emit('joinChat', currentUserId)

    // Load chat history for the user
    socket.on('loadChatHistory', (conversation) => {
      console.log("Conversation history: ", conversation)
      setMessages(conversation.map((msg: { from: string, message: string }) => `${msg.from === adminId ? 'You' : 'User'}: ${msg.message}`))
    })

    // Listen for new messages from the user
    socket.on('newMessageToAdmin', (data) => {
      if (data.senderId === currentUserId) {
        setMessages((prevMessages) => [...prevMessages, `User: ${data.message}`])
      }
    })

    // Cleanup listeners on unmount
    return () => {
      socket.off('loadChatHistory')
      socket.off('newMessageToAdmin')
    }
  }, [currentUserId]) // Reload when the selected user changes

  const sendMessage = () => {
    if (!message || !currentUserId) return

    // Send the message to the currently selected user
    socket.emit('adminMessage', { receiverId: currentUserId, message })
    setMessages((prevMessages) => [...prevMessages, `You: ${message}`])
    setMessage('') // Clear the input
  }

  return (
    <div>
      <h2>Admin Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      {/* Input field for admin to send message */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={!currentUserId}>Send</button>
    </div>
  )
}

export default AdminChat
