import { useEffect, useState } from 'react'
import socket from './services/socket'

const ClientChat = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Join the chat and load previous conversation history
    const clientId = '01HQ2J3K5N6M7P8R9T0V1W2Y6'
    socket.emit('joinChat', clientId)

    // Load chat history
    socket.on('loadChatHistory', (conversation) => {
      console.log("conversation----", conversation)
      setMessages(conversation.map((msg: { from: string; message: string }) => `${msg.from === clientId ? 'You' : 'Admin'}: ${msg.message}`))
    })

    // Listen for new admin messages
    socket.on('newMessageFromAdmin', (data) => {
      setMessages((prevMessages) => [...prevMessages, `Admin: ${data.message}`])
    })

    // Clean up event listeners on unmount
    return () => {
      socket.off('loadChatHistory')
      socket.off('newMessageFromAdmin')
    }
  }, [])

  const sendMessage = () => {
    const clientId = '01HQ2J3K5N6M7P8R9T0V1W2Y6'
    socket.emit('userMessage', { senderId: clientId, message })
    setMessages((prevMessages) => [...prevMessages, `You: ${message}`])
    setMessage('')
  }

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
  )
}

export default ClientChat
