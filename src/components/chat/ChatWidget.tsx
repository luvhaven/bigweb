'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Sparkles, Zap, ArrowRight } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { v4 as uuidv4 } from 'uuid'

interface QuickAction {
    label: string
    message: string
    icon: React.ReactNode
}

const quickActions: QuickAction[] = [
    { label: 'View Services', message: 'What services do you offer?', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Get Pricing', message: 'How much does a website cost?', icon: <Zap className="w-4 h-4" /> },
    { label: 'Book Consultation', message: 'I want to schedule a consultation', icon: <ArrowRight className="w-4 h-4" /> },
]

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [visitorId, setVisitorId] = useState<string>('')
    const [sessionId, setSessionId] = useState<string>('')
    const [showQuickActions, setShowQuickActions] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
        api: '/api/chat',
        body: { visitorId, sessionId },
        onResponse: (response) => {
            const newSessionId = response.headers.get('X-Session-Id')
            if (newSessionId && !sessionId) {
                setSessionId(newSessionId)
                localStorage.setItem('chat_session_id', newSessionId)
            }
            setShowQuickActions(false)
        },
    })

    // Initialize visitor
    useEffect(() => {
        let storedVisitorId = localStorage.getItem('chat_visitor_id')
        if (!storedVisitorId) {
            storedVisitorId = uuidv4()
            localStorage.setItem('chat_visitor_id', storedVisitorId)
        }
        setVisitorId(storedVisitorId)

        const storedSessionId = localStorage.getItem('chat_session_id')
        if (storedSessionId) setSessionId(storedSessionId)
    }, [])

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleQuickAction = (action: QuickAction) => {
        const syntheticEvent = {
            preventDefault: () => { },
        } as React.FormEvent

        handleInputChange({
            target: { value: action.message },
        } as React.ChangeEvent<HTMLInputElement>)

        setTimeout(() => handleSubmit(syntheticEvent), 100)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="mb-4 w-[380px] h-[600px] bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden backdrop-blur-xl"
                    >
                        {/* Header */}
                        <div className="relative p-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                                    >
                                        <Bot className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-bold text-white flex items-center gap-2">
                                            AI Assistant
                                            <Sparkles className="w-4 h-4 text-yellow-300" />
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="w-2 h-2 rounded-full bg-green-300"
                                            />
                                            <span className="text-xs text-white/90 font-medium">Always Available</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-zinc-900/50 to-zinc-900">
                            {messages.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center space-y-4 mt-8"
                                >
                                    <div className="inline-block p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20">
                                        <Sparkles className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg mb-2">
                                            Hi! I'm your AI assistant 👋
                                        </h4>
                                        <p className="text-white/60 text-sm max-w-xs mx-auto">
                                            I can help you learn about our services, pricing, and find the perfect solution for your project.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-tr-md shadow-lg shadow-emerald-500/20'
                                            : 'bg-gradient-to-br from-zinc-800 to-zinc-700 text-white rounded-tl-md border border-white/10'
                                            }`}
                                    >
                                        {msg.role === 'assistant' && (
                                            <div className="flex items-center gap-2 mb-2 text-emerald-400 text-xs font-medium">
                                                <Bot className="w-3 h-3" />
                                                <span>AI Assistant</span>
                                            </div>
                                        )}
                                        <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-700 p-4 rounded-2xl rounded-tl-md border border-white/10">
                                        <div className="flex items-center gap-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            >
                                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                            </motion.div>
                                            <span className="text-white/60 text-sm">Thinking...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {showQuickActions && messages.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-4 pb-3 space-y-2"
                            >
                                <p className="text-xs text-white/40 font-medium uppercase tracking-wide">Quick Actions</p>
                                <div className="grid grid-cols-1 gap-2">
                                    {quickActions.map((action, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleQuickAction(action)}
                                            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-xl text-left transition-all group"
                                        >
                                            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                                {action.icon}
                                            </div>
                                            <span className="text-sm text-white/80 group-hover:text-white font-medium flex-1">
                                                {action.label}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-emerald-400 transition-colors" />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 bg-zinc-900/80 backdrop-blur-xl border-t border-white/5">
                            <div className="flex items-center gap-2 bg-zinc-800/50 p-2 rounded-xl border border-white/10 focus-within:border-emerald-500/50 focus-within:bg-zinc-800 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Ask me anything..."
                                    disabled={isLoading}
                                    className="flex-1 bg-transparent text-white text-sm focus:outline-none px-2 placeholder:text-white/40 disabled:opacity-50"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    <Send className="w-4 h-4" />
                                </motion.button>
                            </div>
                            <p className="text-xs text-white/30 mt-2 text-center">
                                Powered by AI • Instant responses
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-2xl shadow-emerald-500/30 flex items-center justify-center text-white hover:from-emerald-500 hover:to-emerald-400 transition-all group overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            className="relative"
                        >
                            <MessageSquare className="w-6 h-6" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-emerald-600"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}
