import { useState } from 'react';
import { getAIResponse, suggestedQuestions } from '@/data/resumeContext';

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
            text: "System Online. Welcome to Koustubha's Neural Link. How may I assist you?",
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

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate network delay for "AI thinking"
        setTimeout(() => {
            const response = getAIResponse(text);
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500); // 1.5s delay
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
