-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Maps table
CREATE TABLE IF NOT EXISTS maps (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  geom GEOMETRY, -- for geospatial data (enable PostGIS if needed)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add password_hash column for authentication
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);