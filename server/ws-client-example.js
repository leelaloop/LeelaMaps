const { io } = require('socket.io-client');
const socket = io('http://localhost:4000'); // Change port if needed

socket.on('connect', () => {
  console.log('Connected to WebSocket server as', socket.id);

  // Send a test chat message
  socket.emit('chat message', 'Hello from ws-client!');
});

// Listen for broadcast chat messages
socket.on('chat message', (msg) => {
  console.log('Received chat message:', msg);
});

// Listen for map updates
socket.on('map update', (update) => {
  console.log('Received map update:', update);
});

// Optionally, send a map update
// socket.emit('map update', { mapId: 1, update: "Sample update" });