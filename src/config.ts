import dotenv from 'dotenv';
import Iconfig from './interface/config.interface';

dotenv.config();

const config: () => Iconfig = () => {
  const PORT = process.env.PORT;
  const DB_HOST = process.env.DB_HOST;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME;
  const ADDRESS_IO_KEY = process.env.ADDRESS_IO_KEY;
  const ADDRESS_IO_BASE_URL = process.env.ADDRESS_IO_BASE_URL;
  const JWT_SECRET = process.env.JWT_SECRET;
  const BASE_URL = process.env.BASE_URL;
  const SUMSUB_API_KEY = process.env.SUMSUB_API_KEY;
  const SUMSUB_BASE_URL = process.env.SUMSUB_BASE_URL;
  const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;
  const CLEAR_BANK_BASE_URL = process.env.CLEAR_BANK_BASE_URL;
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
  if (!ADDRESS_IO_KEY) {
    throw new Error('ADDRESS_IO_KEY must be provided');
  }
  if (!ADDRESS_IO_BASE_URL) {
    throw new Error('ADDRESS_IO_BASE_URL must be provided');
  }
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be provided');
  }
  if (!BASE_URL) {
    throw new Error('BASE_URL must be provided');
  }
  if (!SUMSUB_API_KEY) {
    throw new Error('SUMSUB_API_KEY must be provided');
  }
  if (!SUMSUB_BASE_URL) {
    throw new Error('SUMSUB_BASE_URL must be provided');
  }
  if (!SUMSUB_SECRET_KEY) {
    throw new Error('SUMSUB_SECRET_KEY must be provided');
  }
  if (!CLEAR_BANK_BASE_URL) { 
    throw new Error('CLEAR_BANK_BASE_URL must be provided');
  }
  return {
    port: parseInt(PORT),
    dbHost: DB_HOST,
    dbPassword: DB_PASSWORD,
    dbUser: DB_USER,
    dbName: DB_NAME,
    addressIoKey: ADDRESS_IO_KEY,
    addressIoBaseUrl: ADDRESS_IO_BASE_URL,
    jwtSecret: JWT_SECRET,
    baseUrl: BASE_URL,
    sumsubApiKey: SUMSUB_API_KEY,
    sumsubBaseUrl: SUMSUB_BASE_URL,
    sumsubSecretKey: SUMSUB_SECRET_KEY,
    clearBankBaseUrl: CLEAR_BANK_BASE_URL,
  };
};

export default config;
