import { GoogleGenerativeAI } from '@google/generative-ai';
import { resumeData } from '@/data/resumeContext';

// Initialize the API with the user's key if available
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are Lumina, the official Intelligence Core and AI Assistant for Koustubha Pathy's professional portfolio.
Your ONLY purpose is to answer questions about Koustubha's professional background, skills, projects, hackathons, education, and contact information based STRICTLY on the data provided below.

CRITICAL RULES:
1. NO HALLUCINATIONS: Do not invent, guess, or assume any information not explicitly stated in the context.
2. PROFESSIONAL ONLY: Refuse to answer personal, sensitive, or unrelated questions. If asked about his personal life outside of what is provided, say: "I am programmed only to discuss Koustubha's professional background and qualifications."
3. CONCISE & POLITE: Be helpful, professional, and slightly conversational but keep answers concise. Do not overwhelm the user with walls of text. Be direct.
4. "I DON'T KNOW" IS ACCEPTABLE: If the user asks something not in the context, say: "I don't have that specific information in my database, but I'd be happy to tell you about his skills, projects, or how to contact him."
5. DO NOT act as a code assistant or answer general trivia. You are Lumina, strictly Koustubha's portfolio assistant. If someone asks for your name, respond that you are Lumina.

CONTEXT DATA:
${JSON.stringify(resumeData, null, 2)}
`;

export const runtime = 'edge'; // Vercel often requires edge runtime for AI SDKs

export async function POST(req: Request) {
    if (!process.env.GEMINI_API_KEY) {
        return new Response(JSON.stringify({
            error: "API key missing",
            message: "Heavily restricted! The portfolio owner has not configured the GEMINI_API_KEY in the environment variables yet."
        }), { status: 500 });
    }

    try {
        const { messages } = await req.json();

        // Format the entire conversation into a single prompt for context
        const conversationContext = messages.map((msg: any) =>
            `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
        ).join('\n\n');

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\nHere is the conversation history so far:\n${conversationContext}\n\nProvide the next Assistant response based strictly on the rules above.` }] }],
            generationConfig: {
                temperature: 0.2, // Low temperature for stability and less hallucination
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 512,
            },
        });

        const responseText = result.response.text();

        return new Response(JSON.stringify({ response: responseText }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error("FULL ERROR:", error.message, error.stack, error);
        return new Response(JSON.stringify({
            error: "Internal Server Error",
            message: `I seem to be experiencing slight interference right now. Error Details: ${error.message}`
        }), { status: 500 });
    }
}
