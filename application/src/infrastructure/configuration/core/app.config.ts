import express from 'express';
import { createExpressApp } from '../../web/express/express.app';
import { DatabaseConnect } from '../../database/connection/database.connect';
import { Config } from '../env/dotenv.config';

const app = express();

const startServer = async () => {
  try {
    const configService = Config.getInstance();
    const db = DatabaseConnect.getInstance(configService);

    await db.connect();
    createExpressApp(app);
    console.log('Server started successfully.');
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1);
  }
};

startServer();

export { app };
