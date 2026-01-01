"use server";

import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@gradeup.solutions";
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@gradeup.solutions";

export type ContactFormData = {
    name: string;
    company: string;
    email: string;
    budget: string;
    timeline: string;
    message: string;
};

export type ContactFormResult = {
    success: boolean;
    message: string;
};

export async function sendContactEmail(
    data: ContactFormData
): Promise<ContactFormResult> {
    try {
        if (!data.email || !data.message) {
            return {
                success: false,
                message: "Email and message are required.",
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return {
                success: false,
                message: "Please enter a valid email address.",
            };
        }

        const subject = `New inquiry — ${data.name || "Website"}${data.company ? ` (${data.company})` : ""
            }`;

        const emailBody = `
            New Contact Form Submission

            Name: ${data.name || "Not provided"}
            Company: ${data.company || "Not provided"}
            Email: ${data.email}
            Budget: ${data.budget || "Not specified"}
            Timeline: ${data.timeline || "Not specified"}

            Message:
            ${data.message}

            ---
            This email was sent from the Grade Up Solutions contact form.
                `
            .trim();

        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is missing");
            return {
                success: false,
                message: "Email service is not configured. Please contact the administrator.",
            };
        }

        const result = await resend.emails.send({
            from: FROM_EMAIL,
            to: CONTACT_EMAIL,
            replyTo: data.email,
            subject: subject,
            text: emailBody,
        });

        if (result.error) {
            console.error("Resend error:", result.error);

            let errorMessage = "Failed to send email. Please try again later.";

            if (result.error.message) {
                if (result.error.message.includes("domain") || result.error.message.includes("not verified")) {
                    errorMessage = "Email domain is not verified. Please use a verified email address.";
                } else if (result.error.message.includes("API key") || result.error.message.includes("Unauthorized")) {
                    errorMessage = "Email service configuration error. Please check your API key.";
                } else {
                    errorMessage = `Email error: ${result.error.message}`;
                }
            }

            return {
                success: false,
                message: errorMessage,
            };
        }

        return {
            success: true,
            message: "Thank you! Your message has been sent successfully.",
        };
    } catch (error) {
        console.error("Contact form error:", error);

        return {
            success: false,
            message: "An unexpected error occurred. Please try again later.",
        };
    }
}

