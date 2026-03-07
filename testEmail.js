import dotenv from "dotenv";
import { sendEmail } from "./services/emailService.js";

dotenv.config();

await sendEmail({
    to: process.env.UKRNET_EMAIL,
    subject: "Test email",
    html: "<h1>Email works</h1>",
});

console.log("Email sent");