
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
    id: string;
    content: string;
    senderType: 'VISITOR' | 'AGENT' | 'SYSTEM';
    createdAt: string;
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [visitorId, setVisitorId] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Visitor
    useEffect(() => {
        let storedVisitorId = localStorage.getItem('chat_visitor_id');
        if (!storedVisitorId) {
            storedVisitorId = uuidv4();
            localStorage.setItem('chat_visitor_id', storedVisitorId);
        }
        setVisitorId(storedVisitorId);

        const storedSessionId = localStorage.getItem('chat_session_id');
        if (storedSessionId) setSessionId(storedSessionId);
    }, []);

    // Poll for messages
    useEffect(() => {
        if (!sessionId || !isOpen) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/chat?sessionId=${sessionId}`);
                const data = await res.json();
                if (data.messages) {
                    setMessages(data.messages);
                }
            } catch (err) {
                console.error('Polling error', err);
            }
        };

        fetchMessages(); // Initial fetch
        const interval = setInterval(fetchMessages, 3000); // Poll every 3s
        return () => clearInterval(interval);
    }, [sessionId, isOpen]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!message.trim() || !visitorId) return;

        const tempMsg: Message = {
            id: Date.now().toString(),
            content: message,
            senderType: 'VISITOR',
            createdAt: new Date().toISOString(),
        };

        setMessages(prev => [...prev, tempMsg]);
        setMessage('');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: tempMsg.content,
                    visitorId,
                    sessionId,
                    senderType: 'VISITOR'
                }),
            });

            const data = await res.json();
            if (data.sessionId && !sessionId) {
                setSessionId(data.sessionId);
                localStorage.setItem('chat_session_id', data.sessionId);
            }
        } catch (err) {
            console.error('Send error', err);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] h-[500px] bg-[#1a1c20] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-emerald-600 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Support Team</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                                        <span className="text-xs text-white/80">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]">
                            {messages.length === 0 && (
                                <div className="text-center text-white/40 text-sm mt-10">
                                    👋 Hi there! How can we help you today?
                                </div>
                            )}
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.senderType === 'VISITOR' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.senderType === 'VISITOR'
                                                ? 'bg-emerald-600 text-white rounded-tr-none'
                                                : 'bg-[#2a2d35] text-white rounded-tl-none'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-4 bg-[#1a1c20] border-t border-white/5">
                            <div className="flex items-center gap-2 bg-[#0a0a0a] p-2 rounded-xl border border-white/10 focus-within:border-emerald-500/50 transition-colors">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent text-white text-sm focus:outline-none px-2"
                                />
                                <button
                                    type="submit"
                                    disabled={!message.trim()}
                                    className="p-2 bg-emerald-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-500 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20 flex items-center justify-center text-white hover:bg-emerald-400 transition-colors"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
