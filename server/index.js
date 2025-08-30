require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('LeelaMaps backend running!');
});

// Example: get all maps
app.get('/maps', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM maps');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: create a user
app.post('/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    const { rows } = await db.query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});