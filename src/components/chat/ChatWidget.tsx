'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Zap, ExternalLink, MessageSquare, ChevronDown, Sparkles, ArrowRight, Bot } from 'lucide-react'
import { useChat } from '@/hooks/useChat'

const QUICK_ACTIONS = [
    "📈 Request SEO Audit",
    "⚡ Book Strategy Call",
    "💼 View Case Studies",
    "📅 Talk to a Founder"
]

const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
    if (!text) return null
    const paragraphs = text.split('\n\n')
    return (
        <div className="space-y-4">
            {paragraphs.map((p, i) => {
                const parts = p.split(/(\*\*.*?\*\*|https?:\/\/[^\s]+)/g)
                const processedLine = parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>
                    }
                    if (part.startsWith('http')) {
                        return (
                            <a key={j} href={part} target="_blank" rel="noopener noreferrer" className="text-accent-light underline hover:text-accent-light break-all transition-colors">
                                {part.replace('https://', '').replace('www.', '')}
                            </a>
                        )
                    }
                    return part
                })

                if (p.trim().startsWith('- ') || p.trim().startsWith('* ')) {
                    const items = p.split(/\n[-*]\s/).filter(item => item.trim() !== '')
                    return (
                        <ul key={i} className="space-y-2">
                            {items.map((item, k) => (
                                <li key={k} className="flex items-start">
                                    <span className="text-accent mr-2 mt-1.5 w-1 h-1 bg-accent rounded-full" />
                                    <span className="leading-relaxed opacity-80 text-sm">{item.trim()}</span>
                                </li>
                            ))}
                        </ul>
                    )
                }
                return <p key={i} className="leading-relaxed text-[15px] opacity-90">{processedLine}</p>
            })}
        </div>
    )
}

const BookingCard: React.FC<{ booking: any }> = ({ booking }) => (
    <div className="w-full mt-4 bg-zinc-950/50 border border-accent/20 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
                <span className="text-sm text-accent">✓</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Confirmed</span>
        </div>
        <h4 className="text-white font-bold text-base mb-2">Audit Confirmed</h4>
        <p className="text-zinc-400 text-xs mb-4 leading-relaxed">We're analyzing **{booking.website}**. A senior partner will email **{booking.name}** at **{booking.email}** shortly.</p>
    </div>
)

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
        api: '/api/chat',
    })

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages, isLoading])

    // Initial greeting if no messages
    useEffect(() => {
        if (messages.length === 0 && isOpen) {
            setMessages([
                {
                    id: 'greeting',
                    role: 'assistant',
                    content: "Hi. I'm here to help you evaluate BigWeb's capabilities.\n\nWould you like a *free performance audit* or do you have specific questions about our stack?",
                    createdAt: new Date()
                }
            ])
        }
    }, [isOpen, messages.length, setMessages])

    const handleActionClick = (action: string) => {
        setInput(action)
        const syntheticEvent = {
            preventDefault: () => { },
        } as React.FormEvent

        setTimeout(() => {
            handleSubmit(syntheticEvent)
        }, 50)
    }

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end print:hidden pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                        className="pointer-events-auto mb-4 w-[90vw] sm:w-[420px] h-[650px] max-h-[80vh] bg-black/80 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl border border-white/10 ring-1 ring-white/5"
                    >
                        {/* Header */}
                        <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white tracking-tight">Concierge</h3>
                                    <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        Online Now
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-zinc-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                    <div className={`
                                        max-w-[85%] p-4 rounded-2xl text-[14px] shadow-sm
                                        ${msg.role === 'user'
                                            ? 'bg-white text-black rounded-tr-sm font-medium'
                                            : 'bg-zinc-900 text-zinc-200 rounded-tl-sm border border-white/5'
                                        }
                                    `}>
                                        {msg.role === 'assistant' ? <FormattedMessage text={msg.content} /> : <p className="leading-relaxed">{msg.content}</p>}
                                        {msg.metadata?.booking && <BookingCard booking={msg.metadata.booking} />}
                                    </div>
                                    <span className="text-[9px] text-zinc-600 mt-2 font-medium px-1">
                                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex flex-col items-start animate-in fade-in">
                                    <div className="bg-zinc-900 p-4 rounded-2xl rounded-tl-sm border border-white/5 flex items-center space-x-1.5">
                                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-xl">
                            {messages.length < 3 && (
                                <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mask-gradient-x">
                                    {QUICK_ACTIONS.map((action, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleActionClick(action)}
                                            className="whitespace-nowrap px-4 py-2 bg-zinc-900 text-zinc-300 rounded-full text-[11px] font-medium border border-white/5 hover:bg-white hover:text-black transition-all active:scale-95"
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your message..."
                                    className="w-full bg-zinc-900/80 border border-white/10 rounded-full px-6 py-4 text-sm text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all outline-none pr-14 shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all ${input.trim() && !isLoading ? 'bg-accent text-white shadow-lg hover:scale-105 active:scale-90' : 'bg-transparent text-zinc-700 cursor-not-allowed'}`}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-500 relative group
          ${isOpen ? 'bg-zinc-800 rotate-90 text-zinc-400' : 'bg-white text-black'}
        `}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6 fill-current" />}
            </button>
        </div>
    )
}
