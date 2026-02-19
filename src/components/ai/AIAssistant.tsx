"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import { ChatWindow } from './ChatWindow';
import { useAI } from '@/hooks/useAI';

import { useState } from 'react';

export const AIAssistant = () => {
    const { messages, sendMessage, isTyping, isOpen, toggleChat, suggestedQuestions } = useAI();
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleToggle = () => {
        setHasInteracted(true);
        toggleChat();
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2 group">
                {/* Tooltip Popup */}
                <div className={`
                    bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-3 py-1.5 rounded-lg text-xs text-slate-200 
                    shadow-lg transition-all duration-500 whitespace-nowrap pointer-events-none
                    ${isOpen ? 'opacity-0 translate-y-2' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
                `}>
                    Have questions? Ask my AI Assistant
                </div>

                <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    <motion.button
                        onClick={handleToggle}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative w-14 h-14 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 shadow-xl overflow-hidden group/btn"
                        aria-label="Toggle AI Assistant"
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-20 group-hover/btn:opacity-40 transition-opacity duration-300" />

                        {/* Animated Shine */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />

                        {/* Icon */}
                        <div className="relative z-10 text-white">
                            {isOpen ? (
                                <Sparkles className="w-6 h-6 animate-pulse text-blue-200" />
                            ) : (
                                <Bot className="w-6 h-6 text-blue-100" />
                            )}
                        </div>
                    </motion.button>
                </motion.div>
            </div>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <ChatWindow
                        messages={messages}
                        sendMessage={sendMessage}
                        isTyping={isTyping}
                        onClose={toggleChat}
                        suggestedQuestions={suggestedQuestions}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
