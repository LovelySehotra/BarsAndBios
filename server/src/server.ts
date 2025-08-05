import dotenv from 'dotenv';
import { App } from './app';

// Load environment variables
dotenv.config();

// Start the application
const app = new App();
app.start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 