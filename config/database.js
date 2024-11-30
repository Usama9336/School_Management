// config/database.js
import { createPool } from 'mysql2/promise.js';
import dotenv from 'dotenv';
dotenv.config();


const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false
  }
});


// Add this method to create tables
export async function initializeTables() {
  try {
    // Create schools table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Schools table created or already exists');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

export default pool;
