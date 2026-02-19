import { motion } from 'framer-motion';
import { Send, X, Sparkles, Bot, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/hooks/useAI';

interface ChatWindowProps {
    messages: Message[];
    sendMessage: (text: string) => void;
    isTyping: boolean;
    onClose: () => void;
    suggestedQuestions: string[];
}

export const ChatWindow = ({ messages, sendMessage, isTyping, onClose, suggestedQuestions }: ChatWindowProps) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[550px] rounded-2xl overflow-hidden shadow-2xl z-50 border border-slate-800/50 bg-slate-950/80 backdrop-blur-xl flex flex-col"
        >
            {/* Header */}
            <div className="p-4 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-100 text-sm">AI Assistant</h3>
                        <p className="text-xs text-slate-400">Always here to help</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        {msg.sender === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-blue-400" />
                            </div>
                        )}

                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'ai'
                                ? 'bg-slate-800/50 text-slate-200 rounded-tl-none'
                                : 'bg-blue-600 text-white rounded-tr-none'
                            }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}

                {/* Suggested Questions */}
                {messages.length < 3 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {suggestedQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => sendMessage(q)}
                                className="text-xs bg-slate-800/50 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-md">
                <div className="relative flex items-center bg-slate-950 rounded-xl border border-slate-800 focus-within:border-blue-500/50 transition-colors">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="w-full bg-transparent border-none py-3 pl-4 pr-12 text-sm text-slate-200 placeholder:text-slate-500 focus:ring-0"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="absolute right-2 p-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
