// socket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3333', {
    transports: ['websocket'], // Ensure WebSocket transport
    withCredentials: true // Include credentials if needed
});

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});



export default socket;
