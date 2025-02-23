import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
});

export const sendWelcomeEmail = async (email: string, name: string) => {
  const mailOptions = {
    from: `"No Reply" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome',
    text: `Hello ${name}, welcome.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};
