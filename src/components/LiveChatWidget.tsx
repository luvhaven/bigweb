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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-orange-600 text-white shadow-[0_0_40px_-10px_rgba(255,107,53,0.5)] flex items-center justify-center relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(255,107,53,0.6)] transition-all duration-300"
                    >
                        <MessageCircle className="w-8 h-8" />
                        {onlineAgents > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold shadow-sm">
                                {onlineAgents}
                            </span>
                        )}
                        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 pointer-events-none" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                            height: isMinimized ? 'auto' : '650px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        className={cn(
                            "fixed bottom-6 right-6 z-50 w-[400px] bg-background/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col font-sans",
                            isMinimized ? "rounded-b-none" : ""
                        )}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-accent to-orange-600 p-5 flex items-center justify-between relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-inner">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg tracking-tight">Support</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <p className="text-xs text-white/90 font-medium">
                                            {onlineAgents > 0 ? `${onlineAgents} agent${onlineAgents > 1 ? 's' : ''} online` : 'We\'ll reply instantly'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 relative z-10">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-transparent to-black/5">
                                    {chatMessages.map((msg, idx) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            {msg.sender === 'agent' && (
                                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                                                    <MessageCircle className="w-4 h-4 text-accent" />
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${msg.sender === 'user'
                                                    ? 'bg-gradient-to-br from-accent to-accent-dark text-white rounded-tr-sm'
                                                    : 'bg-secondary/50 border border-border/50 text-foreground rounded-tl-sm backdrop-blur-sm'
                                                    }`}
                                            >
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                                <p className={`text-[10px] mt-1.5 opacity-70 ${msg.sender === 'user' ? 'text-white' : 'text-muted-foreground'}`}>
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                                                <MessageCircle className="w-4 h-4 text-accent" />
                                            </div>
                                            <div className="bg-secondary/50 border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <span className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <span className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-bounce" />
                                            </div>
                                        </motion.div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 bg-background/50 backdrop-blur-md border-t border-border">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            handleSend()
                                        }}
                                        className="relative flex items-center gap-2 bg-secondary/30 rounded-full border border-border/50 p-1 focus-within:border-accent/50 focus-within:bg-secondary/50 transition-all duration-300 shadow-inner"
                                    >
                                        <Input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 h-10 px-4 text-base placeholder:text-muted-foreground/50"
                                        />
                                        <Button
                                            type="submit"
                                            size="icon"
                                            disabled={!message.trim()}
                                            className="rounded-full w-10 h-10 bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-accent/25"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </form>
                                    <div className="flex items-center justify-center gap-2 mt-3 opacity-60">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                                            Encrypted & Secure
                                        </p>
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
