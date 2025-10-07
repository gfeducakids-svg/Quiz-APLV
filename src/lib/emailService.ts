// src/lib/emailService.ts
import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Credenciais do Gmail não configuradas nas variáveis de ambiente.');
    throw new Error('Serviço de email não configurado.');
  }

  const mailOptions = {
    from: `"Carol - Mãe Prevenida" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error('Falha ao enviar o email.');
  }
}
