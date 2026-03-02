import { useState } from 'react';
import { suggestedQuestions } from '@/data/resumeContext';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export const useAI = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init-1',
            text: "Megron Online. Welcome. I am Koustubha's Intelligence Core. How may I assist you?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };

        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            const data = await response.json();

            let responseText = data.response;

            // Handle missing API key or server error gracefully
            if (!response.ok) {
                responseText = data.message || "My connection to the mainframe is currently unstable. Please configure the GEMINI_API_KEY.";
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Failed to fetch AI response:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "My neural link is currently offline. Please try again later or contact Koustubha directly via email.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return {
        messages,
        isOpen,
        isTyping,
        suggestedQuestions,
        toggleChat,
        sendMessage
    };
};
