import dotenv from 'dotenv';
import Iconfig from './interface/config.interface';

dotenv.config();

const config: () => Iconfig = () => {
  const PORT = process.env.PORT;
  const DB_HOST = process.env.DB_HOST;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME;

  if (!PORT) {
    throw new Error('PORT must be provided');
  }
  if (!DB_HOST) {
    throw new Error('DB_HOST must be provided');
  }
  if (!DB_USER) {
    throw new Error('DB_USER must be provided');
  }
  if (!DB_PASSWORD) {
    throw new Error('DB_PASSWORD must be provided');
  }
  if (!DB_NAME) {
    throw new Error('DB_NAME must be provided');
  }
  return {
    port: parseInt(PORT),
    dbHost: DB_HOST,
    dbPassword: DB_PASSWORD,
    dbUser: DB_USER,
    dbName: DB_NAME,
  };
};

export default config;
