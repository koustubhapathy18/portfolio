import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Zod schema for input validation
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

// Simple in-memory rate limiter (Note: resets on server restart/cold boot)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;
const ipRequestMap = new Map<string, { count: number; lastRequest: number }>();

export async function POST(req: Request) {
    try {
        // 1. IP Rate Limiting (Basic)
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        const now = Date.now();
        const clientData = ipRequestMap.get(ip) || { count: 0, lastRequest: 0 };

        if (now - clientData.lastRequest < RATE_LIMIT_WINDOW) {
            if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
                return NextResponse.json(
                    { success: false, message: "Too many requests. Please try again later." },
                    { status: 429 }
                );
            }
            clientData.count++;
        } else {
            clientData.count = 1;
            clientData.lastRequest = now;
        }
        ipRequestMap.set(ip, clientData);

        // 2. Validate Input
        const body = await req.json();
        const validationResult = contactSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Validation Error",
                    errors: validationResult.error.format(),
                },
                { status: 400 }
            );
        }

        const { name, email, subject, message } = validationResult.data;

        // Debug Logging
        console.log("Contact API: Starting email send process...");
        console.log("Contact API: Env vars check - User:", process.env.EMAIL_USER ? "Defined" : "Missing", ", Pass:", process.env.EMAIL_PASS ? "Defined" : "Missing");

        // 3. Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 4. Send Email
        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address (must be authenticated user for Gmail)
            replyTo: email, // Valid reply-to address
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `Portfolio Contact: ${subject || "New Message"}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0070f3;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
          <hr />
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { success: true, message: "Email sent successfully!" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Email sending error (Detailed):", error);
        return NextResponse.json(
            { success: false, message: "Failed to send email", error: error.message },
            { status: 500 }
        );
    }
}
