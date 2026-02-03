'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Minimize2, Maximize2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useBroadcast, usePresence } from '@/hooks/useRealtime'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { cn } from '@/lib/utils'

interface Message {
    id: string
    text: string
    sender: 'user' | 'agent'
    timestamp: Date
    avatar?: string
}

export default function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [message, setMessage] = useState('')
    const [chatMessages, setChatMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hi! How can we help you today?',
            sender: 'agent',
            timestamp: new Date(),
            avatar: '/team/support.jpg'
        }
    ])
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { messages: broadcastMessages, sendMessage } = useBroadcast('live-chat')
    const { count: onlineAgents } = usePresence('support-agents')

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatMessages, isTyping])

    // Listen for broadcast messages
    useEffect(() => {
        if (broadcastMessages.length > 0) {
            const latestMessage = broadcastMessages[broadcastMessages.length - 1]
            if (latestMessage.sender === 'agent') {
                setIsTyping(false)
                setChatMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    text: latestMessage.text,
                    sender: 'agent',
                    timestamp: new Date(),
                    avatar: latestMessage.avatar
                }])
            }
        }
    }, [broadcastMessages])

    const handleSend = async () => {
        if (!message.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            text: message,
            sender: 'user',
            timestamp: new Date()
        }

        setChatMessages(prev => [...prev, newMessage])
        setMessage('')
        setIsTyping(true)

        // Send to broadcast channel
        await sendMessage({
            text: message,
            sender: 'user',
            timestamp: new Date().toISOString()
        })

        // Save to database
        if (supabase) {
            await supabase.from('chat_messages').insert({
                message: message,
                sender_type: 'visitor',
                session_id: getSessionId()
            })
        }

        // Simulate agent response (in production, this would come from real agents)
        setTimeout(() => {
            const responses = [
                "Thanks for reaching out! Let me help you with that.",
                "I understand. Can you tell me more about what you're looking for?",
                "Great question! Let me get you the information you need.",
                "I'd be happy to help! What specific service are you interested in?"
            ]
            const randomResponse = responses[Math.floor(Math.random() * responses.length)]

            setIsTyping(false)
            setChatMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: randomResponse,
                sender: 'agent',
                timestamp: new Date(),
                avatar: '/team/support.jpg'
            }])
        }, 2000)
    }

    const getSessionId = () => {
        let sessionId = localStorage.getItem('chat_session_id')
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            localStorage.setItem('chat_session_id', sessionId)
        }
        return sessionId
    }

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-10 right-10 z-50 w-20 h-20 bg-zinc-950 border border-zinc-900 text-zinc-600 flex flex-col items-center justify-center relative overflow-hidden group hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all duration-300"
                    >
                        <MessageCircle className="w-8 h-8 mb-1" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest">RELAY_v1</span>
                        {onlineAgents > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        )}
                        <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '650px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={cn(
                            "fixed bottom-10 right-10 z-50 w-[400px] bg-black border border-zinc-900 shadow-2xl flex flex-col font-mono",
                            isMinimized ? "" : ""
                        )}
                    >
                        {/* Header */}
                        <div className="bg-zinc-950 border-b border-zinc-900 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-black border border-zinc-900 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-emerald-500 animate-pulse" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-zinc-400 text-[10px] uppercase tracking-[0.2em]">Live_Relay_v1</h3>
                                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest">
                                        {onlineAgents > 0 ? `Agents_Online:[${onlineAgents}]` : 'Auto_Response_Mode'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="w-8 h-8 flex items-center justify-center bg-black border border-zinc-900 hover:bg-zinc-900 text-zinc-500 transition-colors"
                                >
                                    {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center bg-black border border-zinc-900 hover:bg-orange-600 hover:text-white hover:border-orange-600 text-zinc-500 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-black">
                                    {chatMessages.map((msg, idx) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            {msg.sender === 'agent' && (
                                                <div className="w-8 h-8 bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0">
                                                    <span className="text-[8px] font-bold text-zinc-500">SYS</span>
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[75%] p-4 border ${msg.sender === 'user'
                                                    ? 'bg-zinc-950 border-zinc-900 text-zinc-300'
                                                    : 'bg-black border-zinc-900 text-zinc-500'
                                                    }`}
                                            >
                                                <p className="text-[11px] leading-relaxed font-bold tracking-wide uppercase">{msg.text}</p>
                                                <p className="text-[9px] mt-2 opacity-50 uppercase tracking-widest text-zinc-700">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex gap-4"
                                        >
                                            <div className="w-8 h-8 bg-zinc-950 border border-zinc-900 flex items-center justify-center shrink-0">
                                                <span className="text-[8px] font-bold text-zinc-500">SYS</span>
                                            </div>
                                            <div className="bg-black border border-zinc-900 p-4 flex items-center gap-1">
                                                <span className="w-1 h-1 bg-orange-600 animate-pulse" />
                                                <span className="w-1 h-1 bg-orange-600 animate-pulse delay-75" />
                                                <span className="w-1 h-1 bg-orange-600 animate-pulse delay-150" />
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-6 bg-zinc-950 border-t border-zinc-900">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            handleSend()
                                        }}
                                        className="relative flex items-center gap-2"
                                    >
                                        <div className="flex-1 relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 text-xs font-bold">{'>'}</span>
                                            <Input
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="ENTER_COMMAND..."
                                                className="w-full bg-black border border-zinc-900 h-12 pl-8 pr-4 text-xs font-bold text-white placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-orange-600 transition-colors uppercase tracking-widest rounded-none"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={!message.trim()}
                                            className="w-12 h-12 bg-white hover:bg-orange-600 text-black hover:text-white rounded-none border border-zinc-900 transition-all font-bold"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </form>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
                                                ENCRYPTED_V4
                                            </p>
                                        </div>
                                        <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-700 font-bold">Try: /Help</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
