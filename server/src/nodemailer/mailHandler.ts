import nodemailer, { Transporter } from "nodemailer"
import dotenv from 'dotenv';

dotenv.config();

let transporter: Transporter | null = null;

export function getTransporter(): Transporter { 
    if (transporter) {
        return transporter;
    }

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },   
    });

    return transporter;
}

export async function MailHandler(emailConfig: {
  userName: string;
  userEmail: string;
  subjectText: string;
  html: string;
}) {
  try {
    const transport = getTransporter(); // pega o existente ou cria uma vez

    await transport.sendMail({
      from: process.env.EMAIL,
      to: emailConfig.userEmail,
      subject: emailConfig.subjectText,
      html: emailConfig.html,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}