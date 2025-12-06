'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useBroadcast, usePresence } from '@/hooks/useRealtime'
import { supabase } from '@/lib/supabase/client'

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
    }, [chatMessages])

    // Listen for broadcast messages
    useEffect(() => {
        if (broadcastMessages.length > 0) {
            const latestMessage = broadcastMessages[broadcastMessages.length - 1]
            if (latestMessage.sender === 'agent') {
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

        setMessage('')

        // Simulate agent response (in production, this would come from real agents)
        setTimeout(() => {
            const responses = [
                "Thanks for reaching out! Let me help you with that.",
                "I understand. Can you tell me more about what you're looking for?",
                "Great question! Let me get you the information you need.",
                "I'd be happy to help! What specific service are you interested in?"
            ]
            const randomResponse = responses[Math.floor(Math.random() * responses.length)]

            setChatMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: randomResponse,
                sender: 'agent',
                timestamp: new Date(),
                avatar: '/team/support.jpg'
            }])
        }, 1500)
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
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-full shadow-2xl flex items-center justify-center text-white group"
                    >
                        <MessageCircle className="w-7 h-7" />
                        {onlineAgents > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold">
                                {onlineAgents}
                            </span>
                        )}
                        <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20" />
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
                            height: isMinimized ? 'auto' : '600px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-96 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-accent to-accent-dark p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Live Chat</h3>
                                    <p className="text-xs text-white/80">
                                        {onlineAgents > 0 ? `${onlineAgents} agent${onlineAgents > 1 ? 's' : ''} online` : 'We\'ll respond soon'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/5">
                                    {chatMessages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            {msg.sender === 'agent' && (
                                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                                    <MessageCircle className="w-4 h-4 text-accent" />
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === 'user'
                                                    ? 'bg-accent text-white'
                                                    : 'bg-card border border-border'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.text}</p>
                                                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-white/60' : 'text-muted-foreground'}`}>
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-4 border-t border-border bg-background">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            handleSend()
                                        }}
                                        className="flex gap-2"
                                    >
                                        <Input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1"
                                        />
                                        <Button
                                            type="submit"
                                            size="icon"
                                            className="bg-accent hover:bg-accent-dark shrink-0"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </form>
                                    <p className="text-xs text-muted-foreground mt-2 text-center">
                                        We typically reply within minutes
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
