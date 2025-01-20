import axios from 'axios';
import config from '../config';

export const addressIoInstance = axios.create({
  baseURL: config().addressIoBaseUrl,
});
