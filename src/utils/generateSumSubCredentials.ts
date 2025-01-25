import crypto from 'crypto';
import configuration from '../config';

// const generateSumSubCredentials = async (
//   isFormData: boolean,
//   method: 'POST' | 'GET',
//   url: string,
// ) => {
//   const ts = Math.floor(Date.now() / 1000);
//   const signature = crypto.createHmac('sha256', config().sumsubSecretKey);
//   signature.update(ts + method + url);
// };

export function createSignature(config: any) {
  console.log('Creating a signature for the request...');
  // if (config.baseURL === config().sumsubBaseUrl) {
  var ts = Math.floor(Date.now() / 1000);
  console.log(configuration().sumsubSecretKey);
  const signature = crypto.createHmac(
    'sha256',
    configuration().sumsubSecretKey,
  );
  signature.update(ts + config.method.toUpperCase() + config.url);

  if (config.data instanceof FormData) {
    signature.update(config.data.getBuffer());
  } else if (config.data) {
    signature.update(JSON.stringify(config.data));
  }
  config.headers['X-App-Access-Ts'] = ts;
  config.headers['X-App-Access-Sig'] = signature.digest('hex');
  // }

  return config;
}


