// Example Node.js WebSocket client for testing
const { io } = require('socket.io-client');
const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Send a test chat message
  socket.emit('chat message', 'Hello from client!');
});

// Listen for broadcast chat messages
socket.on('chat message', (msg) => {
  console.log('Received chat message:', msg);
});

// Listen for map updates
socket.on('map update', (update) => {
  console.log('Received map update:', update);
});