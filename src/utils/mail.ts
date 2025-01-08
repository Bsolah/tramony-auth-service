import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config(); // Load .env file with SENDGRID_API_KEY

const sendMail = async (to: string, subject: string, html: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const msg = {
    to, // Change to your recipient
    from: 'test@example.com', // Change to your verified sender
    subject,
    html,
  };

  try {
    const s = sgMail.send(msg);
    console.log(s);
  } catch (error) {
    console.log(error);
  }
};
