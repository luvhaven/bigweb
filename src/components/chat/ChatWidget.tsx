'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Sparkles, Zap, ArrowRight, Calendar, CheckCircle2, ChevronDown } from 'lucide-react'
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

// --- Sub-Components ---
const LeadForm = ({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email || !name) return
        setStatus('submitting')
        await onSubmit({ name, email })
        setStatus('success')
    }

    if (status === 'success') {
        return (
            <div className="my-2 bg-emerald-950/50 border border-emerald-500/30 rounded-xl p-4 shadow-lg flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mb-2 shadow-emerald-500/20 shadow-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="text-emerald-100 font-bold mb-1">Quote Requested!</div>
                <div className="text-emerald-200/60 text-xs">We'll be in touch shortly.</div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="my-2 bg-zinc-900 border border-white/10 rounded-xl p-4 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                    <Zap className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-bold text-white text-xs">Get Your Custom Quote</span>
            </div>
            <div className="space-y-2">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-black/40 text-white text-xs border border-white/10 rounded-lg p-2.5 focus:border-emerald-500 focus:bg-black/60 outline-none transition-all placeholder:text-zinc-600"
                    disabled={status === 'submitting'}
                />
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-black/40 text-white text-xs border border-white/10 rounded-lg p-2.5 focus:border-emerald-500 focus:bg-black/60 outline-none transition-all placeholder:text-zinc-600"
                    disabled={status === 'submitting'}
                />
            </div>
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 hover:translate-y-[-1px]"
            >
                {status === 'submitting' ? 'Sending...' : 'Request Quote'}
                {!status && <ArrowRight className="w-3 h-3" />}
            </button>
        </form>
    )
}

const BookingCard = () => (
    <div className="my-2 bg-zinc-900 border border-white/10 rounded-xl p-4 shadow-xl group hover:border-emerald-500/30 transition-all">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors border border-emerald-500/10">
                <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
                <div className="font-bold text-white text-sm">Ready to Schedule?</div>
                <div className="text-white/60 text-xs">Book a 15-min discovery call</div>
            </div>
        </div>
        <a
            href="/contact"
            target="_blank"
            className="block w-full bg-white text-black hover:bg-emerald-50 text-center text-xs font-bold py-2.5 rounded-lg transition-all shadow-lg shadow-white/5 hover:translate-y-[-1px]"
        >
            Select a Time
        </a>
    </div>
)

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
    }, [messages, isLoading])

    const handleQuickAction = (action: QuickAction) => {
        const syntheticEvent = {
            preventDefault: () => { },
        } as React.FormEvent

        handleInputChange({
            target: { value: action.message },
        } as React.ChangeEvent<HTMLInputElement>)

        setTimeout(() => handleSubmit(syntheticEvent), 100)
    }

    const handleLeadSubmit = async (data: { name: string, email: string }) => {
        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.error('Lead submit failed', error)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end print:hidden pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className="pointer-events-auto mb-4 w-[360px] md:w-[380px] h-[580px] md:h-[600px] bg-[#09090b] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden backdrop-blur-xl ring-1 ring-black/5"
                    >
                        {/* Compact Header */}
                        <div className="relative px-4 py-3 bg-[#022c22] border-b border-emerald-500/10">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent opacity-60" />
                            <div className="relative flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white border border-emerald-400/20 shadow-sm shadow-black/20">
                                            <Bot className="w-5 h-5" />
                                        </div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#022c22] rounded-full"></span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm leading-tight tracking-wide">
                                            AI Assistant
                                        </h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                                            <span className="text-[10px] text-emerald-100/70 font-medium uppercase tracking-wider">Online Now</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-emerald-100/40 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-md"
                                        aria-label="Minimize chat"
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#09090b] scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center space-y-4 mt-8 px-4"
                                >
                                    <div className="inline-block p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
                                        <Sparkles className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-base mb-2">
                                            Welcome! 👋
                                        </h4>
                                        <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px] mx-auto text-balance">
                                            I can help with services, custom quotes, or scheduling a consultation.
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
                                        className={`max-w-[88%] p-3.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-[#022c22] text-emerald-50 rounded-tr-sm border border-emerald-500/20 shadow-emerald-900/10'
                                            : 'bg-zinc-800/80 text-zinc-100 rounded-tl-sm border border-white/5'
                                            }`}
                                    >

                                        {/* Rich Content Parsing */}
                                        <div className="whitespace-pre-wrap space-y-3">
                                            {msg.content.split(/(\{\{.*?\}\})/).map((part, i) => {
                                                if (part === '{{BOOKING_CALENDAR}}') {
                                                    return <BookingCard key={i} />
                                                }
                                                if (part === '{{LEAD_FORM}}') {
                                                    return <LeadForm key={i} onSubmit={handleLeadSubmit} />
                                                }
                                                // Return text part
                                                return part ? <span key={i}>{part}</span> : null
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-zinc-800/80 p-4 rounded-2xl rounded-tl-sm border border-white/5">
                                        <div className="flex items-center gap-1.5 h-1.5">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                                className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                                className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                                className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full"
                                            />
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
                                className="px-4 pb-3 space-y-2 bg-[#09090b]"
                            >
                                <div className="grid grid-cols-1 gap-2">
                                    {quickActions.map((action, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ scale: 1.01, x: 2 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => handleQuickAction(action)}
                                            className="flex items-center gap-3 p-3 bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 hover:border-emerald-500/20 rounded-xl text-left transition-all group"
                                        >
                                            <div className="p-2 bg-zinc-900 rounded-lg text-emerald-500 group-hover:text-emerald-400 transition-colors shadow-inner shadow-white/5">
                                                {action.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm text-zinc-200 font-medium truncate">{action.label}</div>
                                                <div className="text-[10px] text-zinc-500 truncate">{action.message}</div>
                                            </div>
                                            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-3 bg-[#09090b] border-t border-white/5 relative z-10">
                            <div className="flex items-center gap-2 bg-zinc-800/40 p-1.5 rounded-xl border border-white/5 focus-within:border-emerald-500/30 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type a message..."
                                    disabled={isLoading}
                                    className="flex-1 bg-transparent text-white text-sm focus:outline-none px-3 py-2 placeholder:text-zinc-600 disabled:opacity-50"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2.5 bg-emerald-600 rounded-lg text-white disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/20"
                                >
                                    <Send className="w-4 h-4" />
                                </motion.button>
                            </div>
                            <div className="mt-2 flex justify-center items-center gap-1.5 opacity-30">
                                <Sparkles className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] text-white font-medium">Powered by Gemini AI</span>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-600 shadow-[0_8px_30px_rgb(5,150,105,0.4)] flex items-center justify-center text-white hover:bg-emerald-500 transition-all group overflow-hidden border border-emerald-400/20"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <ChevronDown className="w-7 h-7" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            className="relative"
                        >
                            <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-300 rounded-full border-2 border-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}
