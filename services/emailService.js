import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: process.env.UKRNET_EMAIL,
        pass: process.env.UKRNET_PASSWORD,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    const email = {
        from: process.env.UKRNET_EMAIL,
        to,
        subject,
        html,
    };

    await transporter.sendMail(email);
};