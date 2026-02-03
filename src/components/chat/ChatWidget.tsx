'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Zap, ExternalLink, MessageSquare, ChevronDown, Sparkles, ArrowRight } from 'lucide-react'
import { useChat } from '@/hooks/useChat'

const QUICK_ACTIONS = [
    "📈 SEO Audit Request",
    "⚡ Book My Free Audit",
    "💼 View Recent ROI",
    "📅 Talk to a Human"
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
                        return <strong key={j} className="font-extrabold text-emerald-400">{part.slice(2, -2)}</strong>
                    }
                    if (part.startsWith('http')) {
                        return (
                            <a key={j} href={part} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300 break-all transition-colors">
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
                                    <span className="text-emerald-400 mr-2 font-bold">•</span>
                                    <span className="leading-relaxed opacity-95">{item.trim()}</span>
                                </li>
                            ))}
                        </ul>
                    )
                }
                return <p key={i} className="leading-relaxed opacity-90">{processedLine}</p>
            })}
        </div>
    )
}

const BookingCard: React.FC<{ booking: any }> = ({ booking }) => (
    <div className="w-full mt-4 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-400/30 rounded-3xl p-6 shadow-xl animate-in fade-in zoom-in-95 duration-700">
        <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-400/20">
                <span className="text-2xl text-black">✅</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Confirmed</span>
        </div>
        <h4 className="text-white font-black text-lg mb-2">Audit Booked!</h4>
        <p className="text-white/60 text-xs mb-4 leading-relaxed">Our senior strategists are now analyzing **{booking.website}**. We will reach out to **{booking.name}** at **{booking.email}** shortly.</p>
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight text-white/30">
                <span>Project Scope</span>
                <span className="text-emerald-400">{booking.niche}</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-emerald-400 animate-pulse"></div>
            </div>
        </div>
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
                    content: "Strategic growth mode **Activated**. \n\nI'm **BigBot**, and I'm here to help you dominate your market using BigWeb Digital's high-performance growth stacks. \n\nReady to scale? Let's start with your **Free 30-Point Growth Audit**.",
                    createdAt: new Date()
                }
            ])
        }
    }, [isOpen, messages.length, setMessages])

    const handleActionClick = (action: string) => {
        setInput(action)
        // Need to trigger submit manually after setting input
        const syntheticEvent = {
            preventDefault: () => { },
        } as React.FormEvent

        // We need to wait for state to update or just call with the action string if handleSubmit supported it
        // Since useChat uses 'input' from state, we use a timeout or a cleaner approach
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
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className="pointer-events-auto mb-4 w-[95vw] sm:w-[480px] h-[750px] max-h-[85vh] bg-[#09090b]/95 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden backdrop-blur-xl border border-white/10 ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="p-8 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center space-x-5">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-emerald-400/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                        <Zap className="w-8 h-8 text-emerald-400 animate-pulse" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-4 border-[#09090b]"></div>
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-2xl tracking-tighter text-white">BigBot <span className="text-xs font-black bg-emerald-400/10 text-emerald-400 px-2 py-0.5 rounded-full ml-2">PRO</span></h3>
                                    <p className="text-[10px] text-emerald-400/60 mt-1 font-black uppercase tracking-[0.25em]">Lead Strategist</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors border border-white/10">
                                <X className="w-5 h-5 text-white/50" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar scroll-smooth">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                                    <div className={`
                                        max-w-[90%] p-6 rounded-[2rem] text-[15px] shadow-2xl transition-all
                                        ${msg.role === 'user'
                                            ? 'bg-emerald-600 text-white rounded-tr-none border border-white/10'
                                            : 'bg-white/5 text-white/90 rounded-tl-none border border-white/10 backdrop-blur-sm'
                                        }
                                    `}>
                                        {msg.role === 'assistant' ? <FormattedMessage text={msg.content} /> : <p className="leading-relaxed opacity-90">{msg.content}</p>}

                                        {msg.metadata?.booking && <BookingCard booking={msg.metadata.booking} />}

                                        {msg.sources && msg.sources.length > 0 && (
                                            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-1 gap-2">
                                                <p className="text-[9px] font-black text-emerald-400/40 uppercase tracking-widest mb-1">Live Benchmarks:</p>
                                                {msg.sources.map((s, idx) => (
                                                    <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 bg-white/5 border border-white/5 rounded-2xl text-[11px] text-emerald-400 font-bold hover:bg-emerald-400/10 transition-all group">
                                                        <ExternalLink className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform" />
                                                        <span className="truncate">{s.title}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-[9px] text-white/20 mt-3 font-bold uppercase tracking-widest px-2">
                                        {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; BigWeb AI
                                    </span>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex flex-col items-start animate-in fade-in">
                                    <div className="bg-white/5 p-6 rounded-[2rem] rounded-tl-none border border-white/10 flex items-center space-x-3">
                                        <div className="flex space-x-1.5">
                                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce delay-100 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce delay-200 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-white/5 border-t border-white/5">
                            <div className="flex overflow-x-auto pb-6 gap-3 no-scrollbar">
                                {QUICK_ACTIONS.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleActionClick(action)}
                                        className="whitespace-nowrap px-6 py-3 bg-white/5 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-[#09090b] transition-all border border-white/10 active:scale-90"
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Ask about your ROI growth..."
                                    className="w-full bg-[#09090b] border-2 border-white/5 rounded-3xl px-8 py-5 text-sm text-white placeholder:text-white/20 focus:ring-4 focus:ring-emerald-400/10 focus:border-emerald-400/30 transition-all outline-none pr-20 shadow-2xl"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all ${input.trim() && !isLoading ? 'bg-emerald-400 text-black shadow-[0_0_30px_rgba(52,211,153,0.3)] hover:scale-105 active:scale-90' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-90 transition-all duration-700 relative overflow-hidden group
          ${isOpen ? 'rotate-90 scale-90 opacity-0 pointer-events-none' : 'bg-[#09090b] border border-white/10'}
        `}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-400 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute inset-0 animate-pulse bg-emerald-400/5 blur-3xl"></div>
                <Zap className="w-10 h-10 text-white relative z-10" />
                <span className="absolute top-2 right-2 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-400 border-4 border-[#09090b]"></span>
                </span>
            </button>
        </div>
    )
}
