import axios from 'axios';
import config from '../config';

export const addressIoInstance = axios.create({
  baseURL: config().addressIoBaseUrl,
});

export const sumsubInstance = axios.create({
  baseURL: config().sumsubBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-App-Token': config().sumsubApiKey,
  },
});