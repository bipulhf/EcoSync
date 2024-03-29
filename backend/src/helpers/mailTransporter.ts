import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import Mail from "nodemailer/lib/mailer";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", // SMTP host (e.g., 'smtp.example.com')
  port: 587, // SMTP port (e.g., 587 for TLS)
  secure: false, // Use TLS (true for 465, false for other ports)
  auth: {
    user: process.env.SMTP_EMAIL, // SMTP username
    pass: process.env.SMTP_PASSWORD, // SMTP password
  },
});

export const mailOptions: Mail.Options = {
  from: `EcoSync <${process.env.SMTP_EMAIL}>`,
  to: "",
  subject: "",
  html: "",
};
