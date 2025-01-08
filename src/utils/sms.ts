// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from 'twilio';

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendSms(otp: string, to: string) {
  try {
    const message = await client.messages.create({
      body: `Your verification OTP is ${otp}`,
      from: '',
      to,
    });

    console.log(message.body);
  } catch (error) {
    console.log(error);
  }
}

export default sendSms;
