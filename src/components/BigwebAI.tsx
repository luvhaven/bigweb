'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';

// ── Service Recommendation Logic ───────────────────────────────────────────
const SERVICES_MAP = [
    { id: 'conversion-audit', name: 'Conversion Rate Audit', price: 'From $2,500', tier: 1, tags: ['quick', 'data', 'ecommerce', 'leadgen'] },
    { id: 'ux-redesign', name: 'UX & Website Redesign', price: 'From $5,000', tier: 1, tags: ['brand', 'startup', 'credibility'] },
    { id: 'seo-engine', name: 'SEO Revenue Engine', price: 'From $3,500/mo', tier: 2, tags: ['traffic', 'longterm', 'content'] },
    { id: 'funnel-system', name: 'Full Funnel Build', price: 'From $8,000', tier: 2, tags: ['ecommerce', 'leadgen', 'scale'] },
    { id: 'growth-partnership', name: 'Monthly Growth Partnership', price: 'From $4,500/mo', tier: 2, tags: ['scale', 'ongoing', 'startup'] },
    { id: 'digital-transformation', name: 'Digital Revenue Transformation', price: 'From $15,000', tier: 3, tags: ['enterprise', 'scale', 'longterm'] },
];

const CONVERSATION_STEPS = [
    {
        id: 'welcome',
        type: 'bot',
        message: "Hi! I'm BIGWEB AI. I help businesses find the right digital growth solution. Ready to find yours?",
        next: 'goal',
    },
    {
        id: 'goal',
        type: 'question',
        message: "What's your primary goal right now?",
        options: [
            { label: '📈 Increase revenue & conversions', value: 'ecommerce' },
            { label: '🧲 Generate more leads', value: 'leadgen' },
            { label: '🚀 Scale my brand online', value: 'scale' },
            { label: '🎨 Improve website design & UX', value: 'brand' },
            { label: '🔍 Rank higher on Google', value: 'traffic' },
        ],
        next: 'timeline',
        key: 'goal',
    },
    {
        id: 'timeline',
        type: 'question',
        message: 'How quickly do you need results?',
        options: [
            { label: '⚡ ASAP — I need wins now', value: 'quick' },
            { label: '📅 3–6 months strategic build', value: 'longterm' },
            { label: '🔄 Ongoing monthly retainer', value: 'ongoing' },
        ],
        next: 'stage',
        key: 'timeline',
    },
    {
        id: 'stage',
        type: 'question',
        message: "What best describes your business?",
        options: [
            { label: '🌱 Startup / Early stage', value: 'startup' },
            { label: '📊 Growing — $10K–$500K/mo revenue', value: 'scale' },
            { label: '🏢 Enterprise / $500K+ revenue', value: 'enterprise' },
        ],
        next: 'budget',
        key: 'stage',
    },
    {
        id: 'budget',
        type: 'question',
        message: "What's your monthly investment range?",
        options: [
            { label: '$1K – $3K/mo', value: 'small' },
            { label: '$3K – $10K/mo', value: 'medium' },
            { label: '$10K+ /mo', value: 'large' },
            { label: "I'm not sure yet", value: 'unsure' },
        ],
        next: 'capture',
        key: 'budget',
    },
    {
        id: 'capture',
        type: 'capture',
        message: "Based on your answers, I have the perfect plan for you! Just tell me where to send your custom proposal:",
    },
];

function recommendServices(answers: Record<string, string>): typeof SERVICES_MAP {
    const tags = Object.values(answers).filter(Boolean);
    const scored = SERVICES_MAP.map(s => ({
        ...s,
        score: tags.filter(t => s.tags.includes(t)).length,
    }));
    return scored.sort((a, b) => b.score - a.score).slice(0, 2);
}

// ── Animated Message ──────────────────────────────────────────────────────
function BotMessage({ text, delay = 0 }: { text: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 16,
            }}
        >
            <div style={{
                width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF6A, #7A5E2A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
                <Bot size={14} color="#0A0A0B" />
            </div>
            <div style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px 16px 16px 16px', padding: '12px 16px',
                fontSize: 14, lineHeight: 1.5, color: '#F2F0EB', maxWidth: '85%',
            }}>
                {text}
            </div>
        </motion.div>
    );
}

// ── Main Widget ───────────────────────────────────────────────────────────
export default function BigwebAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [messages, setMessages] = useState<Array<{ role: 'bot' | 'user'; text: string }>>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [phase, setPhase] = useState<'conversation' | 'capture' | 'done'>('conversation');
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [recommendations, setRecommendations] = useState<typeof SERVICES_MAP>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Init conversation
    const handleOpen = () => {
        setIsOpen(true);
        if (messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages([{ role: 'bot', text: CONVERSATION_STEPS[0].message }]);
                setStepIndex(1); // Move past welcome to first question
            }, 900);
        }
    };

    const currentStep = CONVERSATION_STEPS[stepIndex];

    const handleOption = (option: { label: string; value: string }) => {
        const step = CONVERSATION_STEPS[stepIndex];
        const newAnswers = step.key ? { ...answers, [step.key]: option.value } : answers;
        setAnswers(newAnswers);

        setMessages(prev => [...prev, { role: 'user', text: option.label }]);
        setIsTyping(true);

        const nextStep = CONVERSATION_STEPS.find(s => s.id === step.next);

        setTimeout(() => {
            setIsTyping(false);
            if (nextStep?.type === 'capture') {
                const recs = recommendServices(newAnswers);
                setRecommendations(recs);
                setMessages(prev => [...prev,
                { role: 'bot', text: `Great! Based on what you've shared, I recommend:` },
                { role: 'bot', text: recs.map(r => `✅ ${r.name} — ${r.price}`).join('\n') },
                { role: 'bot', text: nextStep.message },
                ]);
                setPhase('capture');
            } else if (nextStep) {
                setMessages(prev => [...prev, { role: 'bot', text: nextStep.message }]);
                setStepIndex(CONVERSATION_STEPS.indexOf(nextStep));
            }
        }, 600);
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email) return;
        setSubmitting(true);

        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    answers,
                    recommendations: recommendations.map(r => r.name),
                    source: 'BIGWEB AI Widget',
                }),
            });
        } catch { }

        setSubmitting(false);
        setSubmitted(true);
        setPhase('done');
        setMessages(prev => [...prev,
        { role: 'bot', text: `🎉 Thanks, ${form.name}! Your personalized proposal has been queued. We'll be in touch within 24 hours to walk you through the exact strategy we'd deploy for your business.` },
        { role: 'bot', text: "In the meantime, feel free to explore our work or book a strategy call directly." },
        ]);
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={handleOpen}
                        style={{
                            position: 'fixed',
                            bottom: 28,
                            right: 24,
                            zIndex: 950,
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #D4AF6A 0%, #7A5E2A 100%)',
                            border: 'none',
                            boxShadow: '0 8px 32px rgba(212,175,106,0.35), 0 2px 8px rgba(0,0,0,0.6)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#0A0A0B',
                        }}
                        aria-label="Open BIGWEB AI"
                    >
                        <Bot size={26} />
                        {/* Pulse ring */}
                        <span style={{
                            position: 'absolute', inset: -6, borderRadius: '50%',
                            border: '2px solid rgba(212,175,106,0.4)',
                            animation: 'ai-pulse 2s ease-in-out infinite',
                        }} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="bigweb-ai-panel"
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                        style={{
                            position: 'fixed',
                            bottom: 28,
                            right: 24,
                            width: 380,
                            maxHeight: '75dvh',
                            background: '#0D0D10',
                            border: '1px solid rgba(212,175,106,0.2)',
                            borderRadius: 20,
                            zIndex: 960,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,106,0.05)',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '16px 20px', background: 'rgba(212,175,106,0.05)',
                            borderBottom: '1px solid rgba(212,175,106,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #D4AF6A, #7A5E2A)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Bot size={18} color="#0A0A0B" />
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#F2F0EB' }}>BIGWEB AI</div>
                                    <div style={{ fontSize: 11, color: '#D4AF6A', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                                        Online · Usually replies instantly
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} style={{
                                background: 'rgba(255,255,255,0.05)', border: 'none',
                                width: 32, height: 32, borderRadius: '50%', cursor: 'pointer', color: '#9B9793',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} style={{
                            flex: 1, overflowY: 'auto', padding: '20px 16px 8px',
                            display: 'flex', flexDirection: 'column',
                        }}>
                            {messages.map((msg, i) => (
                                msg.role === 'bot' ? (
                                    <BotMessage key={i} text={msg.text} />
                                ) : (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{
                                            display: 'flex', justifyContent: 'flex-end', marginBottom: 12,
                                        }}
                                    >
                                        <div style={{
                                            background: 'rgba(212,175,106,0.12)', border: '1px solid rgba(212,175,106,0.2)',
                                            borderRadius: '16px 4px 16px 16px', padding: '10px 14px',
                                            fontSize: 13, color: '#F2F0EB', maxWidth: '80%', textAlign: 'right',
                                        }}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                )
                            ))}

                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                                    <div style={{
                                        width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#D4AF6A,#7A5E2A)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    }}>
                                        <Bot size={14} color="#0A0A0B" />
                                    </div>
                                    <div style={{
                                        background: 'rgba(255,255,255,0.05)', borderRadius: '4px 16px 16px 16px',
                                        padding: '12px 16px', display: 'flex', gap: 4, alignItems: 'center',
                                    }}>
                                        {[0, 1, 2].map(i => (
                                            <span key={i} style={{
                                                width: 6, height: 6, borderRadius: '50%', background: '#9B9793',
                                                animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                                            }} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Options / Capture Form / Done */}
                        <div style={{ padding: '12px 16px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                            {phase === 'conversation' && !isTyping && currentStep?.type === 'question' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {currentStep.options?.map(opt => (
                                        <motion.button
                                            key={opt.value}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ x: 4 }}
                                            onClick={() => handleOption(opt)}
                                            style={{
                                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
                                                fontSize: 13, color: '#F2F0EB', textAlign: 'left',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                transition: 'border-color 0.2s ease, background 0.2s ease',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.borderColor = 'rgba(212,175,106,0.4)';
                                                e.currentTarget.style.background = 'rgba(212,175,106,0.06)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                            }}
                                        >
                                            {opt.label}
                                            <ChevronRight size={14} style={{ opacity: 0.4, flexShrink: 0 }} />
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {phase === 'capture' && !submitted && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    <input
                                        type="text" placeholder="Your full name"
                                        value={form.name}
                                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                        style={inputStyle}
                                    />
                                    <input
                                        type="email" placeholder="Email address"
                                        value={form.email}
                                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                        style={inputStyle}
                                    />
                                    <input
                                        type="tel" placeholder="Phone (optional)"
                                        value={form.phone}
                                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                        style={inputStyle}
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitting || !form.name || !form.email}
                                        style={{
                                            background: 'linear-gradient(135deg, #D4AF6A, #7A5E2A)',
                                            border: 'none', borderRadius: 10, padding: '12px 16px',
                                            fontSize: 14, fontWeight: 700, color: '#0A0A0B', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                            opacity: (!form.name || !form.email) ? 0.5 : 1,
                                            transition: 'opacity 0.2s ease',
                                        }}
                                    >
                                        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                        {submitting ? 'Sending...' : 'Get My Custom Proposal'}
                                    </button>
                                </div>
                            )}

                            {phase === 'done' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{
                                        display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center', paddingTop: 4,
                                    }}
                                >
                                    <CheckCircle size={40} color="#D4AF6A" />
                                    <p style={{ fontSize: 13, color: '#9B9793', margin: 0 }}>We'll be in touch within 24 hours.</p>
                                    <a href="/contact" style={{
                                        background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.3)',
                                        borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600,
                                        color: '#D4AF6A', textDecoration: 'none', width: '100%', textAlign: 'center',
                                    }}>
                                        Book a Strategy Call Directly →
                                    </a>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes ai-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}} />
        </>
    );
}

const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: 13,
    color: '#F2F0EB',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
};
