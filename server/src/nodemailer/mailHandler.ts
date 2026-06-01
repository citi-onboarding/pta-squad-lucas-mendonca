import nodemailer, { Transporter } from "nodemailer"


let transporter: Transporter | null = null;

export function getTransporter(): Transporter { 
    if (transporter) {
        return transporter;
    }

    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },   
    });

  return transporter;
}

export async function MailHandler(emailConfig: {
  userName: string;
  userEmail: string;
  subjectText: string;
  html: string;
}): Promise<boolean> {
  try {
    const transport = getTransporter();

    await transport.sendMail({
      from: process.env.EMAIL,
      to: emailConfig.userEmail,
      subject: emailConfig.subjectText,
      html: emailConfig.html,
    });

    console.log(`✅ E-mail enviado para: ${emailConfig.userEmail}`);
    return true;
  } catch (error) {
    console.error(`❌ Falha ao enviar e-mail para: ${emailConfig.userEmail}`, error);
    return false;
  }
}