import { resendClient, sender } from "../services/email.service.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to VibeChat 👋",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.log("Error sending Welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome Email sent successfully:", data);
};
