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
          <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 40px;">
            <div style="max-width: 520px; margin: auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

              <h2 style="color: #333; margin-bottom: 10px;">Welcome to Intervue 👋</h2>

              <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                Hi <strong>${name}</strong>, we're really happy to have you with us!  
                Your account is now ready, and you're all set to explore everything Intervue has to offer.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://intervue-frontend.onrender.com"
                  style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-size: 16px;">
                  Get Started
                </a>
              </div>

              <p style="color: #555; line-height: 1.6;">
                If you ever need help or have questions, just reply to this email — we’re here for you.
              </p>

              <p style="margin-top: 30px; color: #999; font-size: 14px; text-align: center;">
                — The Intervue Team
              </p>

            </div>
          </div>
        `,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}
