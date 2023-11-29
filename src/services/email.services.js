import { createTransport } from "nodemailer";
import { EMAIL, EMAIL_PASSWORD } from "../config.js";

export const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmailWithText = async ({ email, subject, text }) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: 'Bienvenido/a',
      text,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendEmailWithTemplate = async ({ email, subject, html }) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }}



