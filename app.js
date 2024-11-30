// app.js
import express from 'express';
import bodyParser from 'body-parser';
import pool from './config/database.js';
import { initializeTables } from './config/database.js';

const { json } = bodyParser;
import schoolRoutes from './routes/schoolRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api', schoolRoutes);


async function startServer() {
    try {
      // Initialize tables before starting the server
      await initializeTables();
  
      app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
    } catch (error) {
      console.error('Server startup failed:', error);
      process.exit(1);
    }
  }


  startServer();
