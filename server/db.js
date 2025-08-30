require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Uncomment for SSL in production:
  // ssl: { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('Connected to Postgres database');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};