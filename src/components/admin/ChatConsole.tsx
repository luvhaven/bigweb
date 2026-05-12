
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, User, Clock, Send, CheckCheck } from 'lucide-react';

interface Session {
    id: string;
    visitorId: string;
    lastMessageAt: string;
    unreadCount: number;
    status: string;
}

interface Message {
    id: string;
    content: string;
    senderType: 'VISITOR' | 'AGENT';
    createdAt: string;
}

export default function ChatConsole() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [reply, setReply] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch Sessions
    useEffect(() => {
        const fetchSessions = async () => {
            // In a real app, this would be a dedicated API endpoint for listing sessions
            // For now, we'll mock the list or assume an endpoint exists
            // setSessions(mockSessions); 
        };
        // fetchSessions();
        // const interval = setInterval(fetchSessions, 5000);
        // return () => clearInterval(interval);

        // MOCK DATA for Demo
        setSessions([
            { id: '1', visitorId: 'Visitor #1234', lastMessageAt: new Date().toISOString(), unreadCount: 2, status: 'OPEN' },
            { id: '2', visitorId: 'Visitor #5678', lastMessageAt: new Date(Date.now() - 100000).toISOString(), unreadCount: 0, status: 'OPEN' },
        ]);
    }, []);

    // Poll Messages for Active Session
    useEffect(() => {
        if (!activeSessionId) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/chat?sessionId=${activeSessionId}`);
                const data = await res.json();
                if (data.messages) setMessages(data.messages);
            } catch (err) {
                console.error('Error fetching messages', err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [activeSessionId]);

    const sendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim() || !activeSessionId) return;

        const tempMsg: Message = {
            id: Date.now().toString(),
            content: reply,
            senderType: 'AGENT',
            createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, tempMsg]);
        setReply('');

        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: tempMsg.content,
                    visitorId: 'AGENT', // Placeholder
                    sessionId: activeSessionId,
                    senderType: 'AGENT'
                }),
            });
        } catch (err) {
            console.error('Error sending reply', err);
        }
    };

    return (
        <div className="flex h-[600px] bg-[#1a1c20] rounded-2xl border border-white/5 overflow-hidden">
            {/* Sidebar: Sessions */}
            <div className="w-80 border-r border-white/5 flex flex-col bg-[#0f1115]">
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search visitors..."
                            className="w-full bg-[#1a1c20] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {sessions.map(session => (
                        <div
                            key={session.id}
                            onClick={() => setActiveSessionId(session.id)}
                            className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${activeSessionId === session.id ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-white text-sm">{session.visitorId}</span>
                                <span className="text-xs text-white/40">
                                    {new Date(session.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-white/60 truncate max-w-[180px]">Last message preview...</span>
                                {session.unreadCount > 0 && (
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">
                                        {session.unreadCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-[#1a1c20]">
                {activeSessionId ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#1a1c20]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    V
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Visitor #{activeSessionId.slice(0, 4)}</h3>
                                    <span className="text-xs text-emerald-400">Online now</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0a0a0a]">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.senderType === 'AGENT' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.senderType === 'AGENT'
                                            ? 'bg-emerald-600 text-white rounded-tr-none'
                                            : 'bg-[#2a2d35] text-white rounded-tl-none'
                                        }`}>
                                        {msg.content}
                                        <div className="flex justify-end mt-1">
                                            <span className="text-[10px] opacity-60 flex items-center gap-1">
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                {msg.senderType === 'AGENT' && <CheckCheck className="w-3 h-3" />}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/5 bg-[#1a1c20]">
                            <form onSubmit={sendReply} className="flex gap-3">
                                <input
                                    type="text"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type your reply..."
                                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                                >
                                    <Send className="w-4 h-4" /> Send
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/40">
                        <User className="w-16 h-16 mb-4 opacity-20" />
                        <p>Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}
