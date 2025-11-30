import { Resend } from "resend";
import { ENV } from "./env.js";

export const resend = new Resend(ENV.RESEND_API_KEY);

export async function sendWelcomeEmail(to, name) {
  try {
    await resend.emails.send({
      from: "Intervue <onboarding@resend.dev>", // works without domain verification
      to,
      subject: "Welcome to Intervue 🎉",
      html: `
        <h2>Welcome, ${name}!</h2>
        <p>Your Intervue account has been created successfully.</p>
        <p>We're excited to have you onboard!</p>
      `,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}
