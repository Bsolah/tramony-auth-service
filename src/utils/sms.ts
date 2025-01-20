// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from 'twilio';
import { BadRequest } from '../errors';

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function sendSmsOtp(otp: string, to: string) {
  try {
    // const message = await client.messages.create({
    //   body: `Your verification OTP is ${otp}`,
    //   from: '+447887295425',
    //   to: '+447401868226',
    // });
    const message = await client.verify.v2
      .services('VA075be2a0db8067bb1a064dc831e303ce')
      .verifications.create({
        to: to,
        channel: 'sms',
        customCode: otp,
      });
    // .services('VA075be2a0db8067bb1a064dc831e303ce')

    console.log(message);
  } catch (error) {
    console.log(error);
    throw new BadRequest('Error sending SMS');
  }
}

export default sendSmsOtp;
