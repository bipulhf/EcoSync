import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
 
export const mailTransporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.mailersend.net', // SMTP host (e.g., 'smtp.example.com')
  port: 587, // SMTP port (e.g., 587 for TLS)
  secure: false, // Use TLS (true for 465, false for other ports)
  auth: {
    user: 'MS_eBR9qp@trial-yzkq340k2nxgd796.mlsender.net', // SMTP username
    pass: '4F0fnRgbFrLKZtop' // SMTP password
  }
}));

