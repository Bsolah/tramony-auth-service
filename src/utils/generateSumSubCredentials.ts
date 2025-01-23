import crypto from 'crypto';
import config from '../config';

const generateSumSubCredentials = async (
  isFormData: boolean,
  method: 'POST' | 'GET',
  url: string,
) => {
  const ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac('sha256', config().sumsubSecretKey);
  signature.update(ts + method + url);
};

function createSignature(config: any) {
  console.log('Creating a signature for the request...');

  var ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac('sha256', config().sumsubSecretKey);
  signature.update(ts + config.method.toUpperCase() + config.url);

  if (config.data instanceof FormData) {
    signature.update(config.data.getBuffer());
  } else if (config.data) {
    signature.update(config.data);
  }

  config.headers['X-App-Access-Ts'] = ts;
  config.headers['X-App-Access-Sig'] = signature.digest('hex');

  return config;
}

const a = createSignature({
  method: 'POST',
  url: '/resources/applicants/123/info/idDoc',
  data: 'some data',
});
