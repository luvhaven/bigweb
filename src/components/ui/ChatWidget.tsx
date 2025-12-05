'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Sparkles, Mail, ArrowRight, Loader2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { messagesAPI } from '@/lib/api/messages'
import { toast } from 'sonner'

interface ChatWidgetProps {
    isEmbedded?: boolean
    onClose?: () => void
}

interface Message {
    text: string
    isUser: boolean
    timestamp: Date
}

export default function ChatWidget({ isEmbedded = false, onClose }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [chatStarted, setChatStarted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '' })
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hi there! 👋 Welcome to BIGWEB. How can we help you elevate your digital presence today?", isUser: false, timestamp: new Date() }
    ])
    const [input, setInput] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    useEffect(() => {
        if (isEmbedded) {
            setIsOpen(true)
        }
    }, [isEmbedded])

    const handleClose = () => {
        if (isEmbedded && onClose) {
            onClose()
        } else {
            setIsOpen(false)
        }
    }

    const handleStartChat = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.email) {
            toast.error("Please fill in all fields to start chatting.")
            return
        }
        setChatStarted(true)
        setMessages(prev => [...prev, {
            text: `Nice to meet you, ${formData.name}! What's on your mind?`,
            isUser: false,
            timestamp: new Date()
        }])
    }

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg = input
        setMessages(prev => [...prev, { text: userMsg, isUser: true, timestamp: new Date() }])
        setInput("")
        setLoading(true)

        try {
            // Send to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: 'Live Chat Message',
                    content: userMsg
                })
            })

            if (!response.ok) throw new Error('Failed to send message')

            // Simulate response delay for natural feel
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: "Thanks for your message! Our team has received your inquiry and will get back to you shortly via email.",
                    isUser: false,
                    timestamp: new Date()
                }])
                setLoading(false)
            }, 1000)

        } catch (error) {
            console.error('Failed to send message:', error)
            toast.error("Failed to send message. Please try again.")
            setLoading(false)
        }
    }

    const chatContent = (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${isEmbedded ? 'w-full h-full' : 'fixed bottom-24 right-6 w-[380px]'} bg-background/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-50`}
            style={{ maxHeight: isEmbedded ? '100%' : '600px', height: isEmbedded ? '100%' : '500px' }}
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-accent to-purple-600 p-4 flex justify-between items-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="flex items-center gap-3 relative z-10">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-accent shadow-sm" />
                    </div>
                    <div>
                        <div className="font-bold text-lg">BIGWEB Support</div>
                        <div className="text-xs opacity-90 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Online & Ready
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="hover:bg-white/20 p-2 rounded-full transition-colors relative z-10"
                >
                    {isEmbedded ? <X className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
                </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden relative bg-secondary/5">
                {!chatStarted ? (
                    <div className="h-full flex flex-col p-6 justify-center space-y-6">
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Let's get started</h3>
                            <p className="text-sm text-muted-foreground">Please fill in your details so we can reach you.</p>
                        </div>

                        <form onSubmit={handleStartChat} className="space-y-4">
                            <div className="space-y-2">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="pl-9 bg-background/50 border-white/10 focus:border-accent/50 transition-colors"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="pl-9 bg-background/50 border-white/10 focus:border-accent/50 transition-colors"
                                        required
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/20 group">
                                Start Chatting
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div className="h-full flex flex-col">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-accent/20 scrollbar-track-transparent">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm relative group ${msg.isUser
                                        ? 'bg-accent text-white rounded-tr-none'
                                        : 'bg-white dark:bg-card border border-border rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                        <div className={`text-[10px] mt-1 opacity-70 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-card border border-border p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-background/80 backdrop-blur-md border-t border-white/10">
                            <form onSubmit={handleSend} className="flex gap-2 relative">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-secondary/50 border-transparent focus:border-accent/50 pr-10 rounded-xl"
                                    disabled={loading}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-1 top-1 h-8 w-8 bg-accent hover:bg-accent-dark text-white rounded-lg transition-all hover:scale-105"
                                    disabled={!input.trim() || loading}
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )

    if (isEmbedded) return chatContent

    return (
        <>
            <AnimatePresence>
                {isOpen && chatContent}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-600 text-white shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] flex items-center justify-center relative overflow-hidden group"
                aria-label="Open Chat"
            >
                {/* Animated background */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Icon transition */}
                <div className="relative z-10 transition-transform duration-300">
                    {isOpen ? (
                        <X className="w-7 h-7" />
                    ) : (
                        <MessageCircle className="w-7 h-7" />
                    )}
                </div>

                {/* Notification dot */}
                {!isOpen && (
                    <span className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full border-2 border-accent animate-pulse" />
                )}

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
            </motion.button>
        </>
    )
}
