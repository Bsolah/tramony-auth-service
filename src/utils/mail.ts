import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config(); // Load .env file with SENDGRID_API_KEY

const sendMail = async (to: string, subject: string, html: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const msg = {
    to, // Change to your recipient
    from: 'no-reply@tapp.com', // Change to your verified sender
    subject,
    html,
  };

  try {
    console.log(process.env.SENDGRID_API_KEY);
    const s = await sgMail.send(msg);
    console.log(s);
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;