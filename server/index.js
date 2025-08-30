require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const db = require('./db');
const { register, login, requireAuth } = require('./auth');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
    // In production, specify your frontend origin here
  }
});

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors({
  origin: '*', // For development only! Lock this down for production.
  credentials: false // set to true if using cookies/auth headers
}));

// Example HTTP route
app.get('/', (req, res) => {
  res.send('LeelaMaps backend running with WebSocket!');
});

// Example API route
app.get('/maps', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM maps');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Authentication endpoints
app.post('/auth/register', register);
app.post('/auth/login', login);

// Example protected route
app.get('/profile', requireAuth, async (req, res) => {
  // req.user is available here!
  const { userId } = req.user;
  const { rows } = await db.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);
  res.json(rows[0]);
});

// WebSocket event handlers
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Example: Broadcast a chat message to all clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Example: Broadcast map update
  socket.on('map update', (update) => {
    io.emit('map update', update);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (WebSocket enabled)`);
});