'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle, Loader2, Bot, Send, Calendar, CreditCard } from 'lucide-react';
import BookingModal from '@/components/ui/BookingModal';

// BIGWEB Digital logo mark (matches Navigation)
function BigwebMark({ size = 22 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="9" height="9" stroke="#0A0A0B" strokeWidth="1.5" />
            <rect x="12" y="1" width="9" height="9" fill="#0A0A0B" opacity="0.8" />
            <rect x="1" y="12" width="9" height="9" fill="#0A0A0B" opacity="0.4" />
            <rect x="12" y="12" width="9" height="9" stroke="#0A0A0B" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
    );
}

// ── Types ──────────────────────────────────────────────────────────────────
interface ServiceRec {
    id: string; name: string; price: string; tier: number; tags: string[];
}

interface Message {
    role: 'bot' | 'user';
    text: string;
}

// ── Service Library ────────────────────────────────────────────────────────
const SERVICES_MAP: ServiceRec[] = [
    { id: 'conversion-audit', name: 'Conversion Rate Audit', price: 'From $2,500', tier: 1, tags: ['quick', 'data', 'ecommerce', 'leadgen'] },
    { id: 'ux-redesign', name: 'UX & Website Redesign', price: 'From $5,000', tier: 1, tags: ['brand', 'startup', 'credibility'] },
    { id: 'seo-engine', name: 'SEO Revenue Engine', price: 'From $3,500/mo', tier: 2, tags: ['traffic', 'longterm', 'content'] },
    { id: 'funnel-system', name: 'Full Funnel Build', price: 'From $8,000', tier: 2, tags: ['ecommerce', 'leadgen', 'scale'] },
    { id: 'growth-partnership', name: 'Monthly Growth Partnership', price: 'From $4,500/mo', tier: 2, tags: ['scale', 'ongoing', 'startup'] },
    { id: 'digital-transformation', name: 'Digital Revenue Transformation', price: 'From $15,000', tier: 3, tags: ['enterprise', 'scale', 'longterm'] },
];

// ── Conversation Script ────────────────────────────────────────────────────
const STEPS = [
    {
        id: 'goal', key: 'goal',
        message: "What's your #1 goal right now?",
        options: [
            { label: 'Increase revenue & conversions', value: 'ecommerce', emoji: '📈' },
            { label: 'Generate more qualified leads', value: 'leadgen', emoji: '🧲' },
            { label: 'Scale my brand online', value: 'scale', emoji: '🚀' },
            { label: 'Improve website design & UX', value: 'brand', emoji: '🎨' },
            { label: 'Rank higher on Google', value: 'traffic', emoji: '🔍' },
        ],
        next: 'timeline',
    },
    {
        id: 'timeline', key: 'timeline',
        message: 'How quickly do you need results?',
        options: [
            { label: 'ASAP — I need wins now', value: 'quick', emoji: '⚡' },
            { label: '3–6 months strategic build', value: 'longterm', emoji: '📅' },
            { label: 'Ongoing monthly partnership', value: 'ongoing', emoji: '🔄' },
        ],
        next: 'stage',
    },
    {
        id: 'stage', key: 'stage',
        message: 'Best describes your business:',
        options: [
            { label: 'Startup / Early stage', value: 'startup', emoji: '🌱' },
            { label: 'Growing — $10K–$500K/mo revenue', value: 'scale', emoji: '📊' },
            { label: 'Enterprise / $500K+ revenue', value: 'enterprise', emoji: '🏢' },
        ],
        next: 'budget',
    },
    {
        id: 'budget', key: 'budget',
        message: 'Monthly investment range:',
        options: [
            { label: '$1K – $3K / mo', value: 'small', emoji: '💰' },
            { label: '$3K – $10K / mo', value: 'medium', emoji: '💎' },
            { label: '$10K+ / mo', value: 'large', emoji: '👑' },
            { label: "Not sure yet", value: 'unsure', emoji: '🤔' },
        ],
        next: 'capture',
    },
];

function recommendServices(answers: Record<string, string>): ServiceRec[] {
    const tags = Object.values(answers).filter(Boolean);
    return [...SERVICES_MAP]
        .map(s => ({ ...s, score: tags.filter(t => s.tags.includes(t)).length }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);
}

// ── Sub-components ─────────────────────────────────────────────────────────
function TypingIndicator() {
    return (
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 12, paddingLeft: 2 }}>
            <AvatarDot />
            <div style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px 16px 16px 16px', padding: '14px 18px',
                display: 'flex', gap: 5, alignItems: 'center',
            }}>
                {[0, 1, 2].map(i => (
                    <span key={i} style={{
                        width: 5, height: 5, borderRadius: '50%', background: '#5A5753',
                        animation: `bw-dot 1.3s ease-in-out ${i * 0.2}s infinite`,
                        display: 'inline-block',
                    }} />
                ))}
            </div>
        </div>
    );
}

function AvatarDot() {
    return (
        <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #D4AF6A 0%, #7A5E2A 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(212,175,106,0.25)',
        }}>
            <Bot size={13} color="#0A0A0B" />
        </div>
    );
}

function BotBubble({ text }: { text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 12 }}
        >
            <AvatarDot />
            <div style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '6px 16px 16px 16px', padding: '13px 17px',
                fontSize: 13.5, lineHeight: 1.55, color: '#E8E5DF', maxWidth: '82%',
                whiteSpace: 'pre-line',
            }}>
                {text}
            </div>
        </motion.div>
    );
}

function UserBubble({ text }: { text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}
        >
            <div style={{
                background: 'linear-gradient(135deg, rgba(212,175,106,0.15) 0%, rgba(212,175,106,0.08) 100%)',
                border: '1px solid rgba(212,175,106,0.25)',
                borderRadius: '16px 6px 16px 16px', padding: '11px 15px',
                fontSize: 13, color: '#F2F0EB', maxWidth: '80%',
            }}>
                {text}
            </div>
        </motion.div>
    );
}

// ── Main Widget ────────────────────────────────────────────────────────────
export default function BigwebAI() {
    const [open, setOpen] = useState(false);
    const [stepIdx, setStepIdx] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [messages, setMessages] = useState<Message[]>([]);
    const [typing, setTyping] = useState(false);
    const [phase, setPhase] = useState<'chat' | 'capture' | 'done'>('chat');
    const [recs, setRecs] = useState<ServiceRec[]>([]);
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [submitting, setSubmitting] = useState(false);
    const [unread, setUnread] = useState(0);
    const [paymentLink, setPaymentLink] = useState('');
    const [isBookingOpen, setBookingOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('/api/settings/public')
            .then(res => res.json())
            .then(data => {
                if (data?.payment_link_consultation) {
                    setPaymentLink(data.payment_link_consultation);
                }
            })
            .catch(() => { });
    }, []);

    // ── Auto-trigger: open once after 60% scroll depth or 45s inactivity ─────
    const autoTriggered = useRef(false);
    useEffect(() => {
        if (autoTriggered.current) return;

        const trigger = () => {
            if (autoTriggered.current) return;
            autoTriggered.current = true;
            setOpen(true);
            setUnread(1);
        };

        // Scroll depth trigger
        const onScroll = () => {
            const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrolled >= 0.60) trigger();
        };

        // Inactivity trigger
        let inactivityTimer = setTimeout(trigger, 45000);
        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            if (!autoTriggered.current) inactivityTimer = setTimeout(trigger, 45000);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);

        return () => {
            clearTimeout(inactivityTimer);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
        };
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, typing]);

    // Unread badge
    useEffect(() => {
        if (!open && messages.length > 0) setUnread(1);
    }, [messages, open]);

    const botSay = useCallback((text: string, delay = 600) => {
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMessages(prev => [...prev, { role: 'bot', text }]);
        }, delay);
    }, []);

    // Init on open (handles both manual click and auto-trigger)
    useEffect(() => {
        if (open && messages.length === 0 && !typing) {
            setUnread(0);
            setTyping(true);
            const timer = setTimeout(() => {
                setTyping(false);
                setMessages([{ role: 'bot', text: "Hi! I'm BIGWEB AI 👋\n\nI help businesses find the exact digital solution they need. This takes about 60 seconds.\n\nLet's start with the big picture:" }]);
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [open, messages.length, typing]);

    const handleOpen = () => {
        setOpen(true);
        setUnread(0);
    };

    const currentStep = STEPS[stepIdx];

    const handleOption = (opt: { label: string; value: string; emoji: string }) => {
        const step = STEPS[stepIdx];
        const newAnswers = { ...answers, [step.key]: opt.value };
        setAnswers(newAnswers);

        // User reply
        setMessages(prev => [...prev, { role: 'user', text: `${opt.emoji} ${opt.label}` }]);
        setTyping(true);

        const nextIdx = STEPS.findIndex(s => s.id === step.next);

        setTimeout(() => {
            setTyping(false);
            if (step.next === 'capture') {
                const recommended = recommendServices(newAnswers);
                setRecs(recommended);
                const recText = `Based on your answers, here are the two engagements most likely to drive results for you:\n\n${recommended.map(r => `✦ ${r.name}\n   ${r.price}`).join('\n\n')}\n\nTo send your personalised proposal, I just need a few details:`;
                setMessages(prev => [...prev, { role: 'bot', text: recText }]);
                setPhase('capture');
            } else if (nextIdx >= 0) {
                setMessages(prev => [...prev, { role: 'bot', text: STEPS[nextIdx].message }]);
                setStepIdx(nextIdx);
            }
        }, 800);
    };

    const handleSubmit = async () => {
        if (!form.name.trim() || !form.email.trim()) return;
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
                    recommendations: recs,
                    source: 'BIGWEB AI Widget',
                }),
            });
        } catch { }
        setSubmitting(false);
        setPhase('done');
        const firstName = form.name.split(' ')[0];
        setMessages(prev => [...prev,
        { role: 'bot', text: `🎉 Done, ${firstName}!\n\nYour personalised proposal is heading to ${form.email} right now.\n\nOur strategy team will also reach out within 24 hours to walk through the exact game-plan.` },
        ]);
    };

    const canSubmit = form.name.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email);

    return (
        <>
            {/* ── Trigger ────────────────────────────────────────────────── */}
            <AnimatePresence>
                {!open && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.7, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.7, y: 20 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 22 }}
                        onClick={handleOpen}
                        aria-label="Open BIGWEB AI"
                        style={{
                            position: 'fixed', bottom: 28, right: 24, zIndex: 950,
                            width: 58, height: 58, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #D4AF6A 0%, #9A7035 100%)',
                            border: 'none', boxShadow: '0 8px 32px rgba(212,175,106,0.4), 0 2px 8px rgba(0,0,0,0.6)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#0A0A0B',
                        }}
                    >
                        <BigwebMark size={22} />
                        {unread > 0 && (
                            <span style={{
                                position: 'absolute', top: 0, right: 0, width: 16, height: 16,
                                background: '#EF4444', borderRadius: '50%', border: '2px solid #0A0A0B',
                                fontSize: 9, fontWeight: 800, color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>1</span>
                        )}
                        {/* Pulse rings */}
                        <span style={{
                            position: 'absolute', inset: -8, borderRadius: '50%',
                            border: '1.5px solid rgba(212,175,106,0.35)',
                            animation: 'bw-ring 2.2s ease-out infinite',
                        }} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── Panel ──────────────────────────────────────────────────── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="bigweb-ai-panel"
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                        style={{
                            position: 'fixed', bottom: 28, right: 24, width: 374,
                            maxHeight: '76dvh', background: '#0C0C0F',
                            border: '1px solid rgba(212,175,106,0.18)', borderRadius: 22, zIndex: 960,
                            display: 'flex', flexDirection: 'column', overflow: 'hidden',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,106,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '15px 18px', background: 'rgba(10,10,11,0.6)',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
                            backdropFilter: 'blur(20px)',
                        }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                                background: 'linear-gradient(135deg, #D4AF6A 0%, #7A5E2A 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 20px rgba(212,175,106,0.3)',
                            }}>
                                <Bot size={18} color="#0A0A0B" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: '#F2F0EB', letterSpacing: '-0.01em' }}>BIGWEB AI</div>
                                <div style={{ fontSize: 11, color: '#4CAF50', display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }} />
                                    Online · Replies instantly
                                </div>
                            </div>
                            <button onClick={() => setOpen(false)} style={{
                                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                                width: 30, height: 30, borderRadius: '50%', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9B9793',
                            }}>
                                <X size={14} />
                            </button>
                        </div>

                        {/* Progress dots */}
                        {phase === 'chat' && (
                            <div style={{
                                display: 'flex', gap: 4, padding: '10px 20px 0', flexShrink: 0,
                            }}>
                                {STEPS.map((_, i) => (
                                    <div key={i} style={{
                                        flex: 1, height: 2, borderRadius: 2,
                                        background: i <= stepIdx ? '#D4AF6A' : 'rgba(255,255,255,0.07)',
                                        transition: 'background 0.4s ease',
                                    }} />
                                ))}
                            </div>
                        )}

                        {/* Messages */}
                        <div ref={scrollRef} style={{
                            flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
                            display: 'flex', flexDirection: 'column',
                            scrollbarWidth: 'thin', scrollbarColor: '#1F1F24 transparent',
                        }}>
                            {messages.map((msg, i) => (
                                msg.role === 'bot'
                                    ? <BotBubble key={i} text={msg.text} />
                                    : <UserBubble key={i} text={msg.text} />
                            ))}
                            {typing && <TypingIndicator />}
                            <div style={{ height: 4 }} />
                        </div>

                        {/* Input area */}
                        <div style={{
                            padding: '10px 14px 14px', borderTop: '1px solid rgba(255,255,255,0.05)',
                            flexShrink: 0, background: 'rgba(8,8,10,0.5)', backdropFilter: 'blur(10px)',
                        }}>
                            {/* Conversation options */}
                            {phase === 'chat' && !typing && messages.length > 0 && currentStep && (
                                <motion.div
                                    key={currentStep.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
                                >
                                    {currentStep.options.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleOption(opt)}
                                            style={{
                                                background: 'rgba(255,255,255,0.033)', border: '1px solid rgba(255,255,255,0.09)',
                                                borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
                                                fontSize: 13, color: '#E0DDD7', textAlign: 'left',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                                                transition: 'all 0.18s ease', fontFamily: 'inherit',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.borderColor = 'rgba(212,175,106,0.4)';
                                                e.currentTarget.style.background = 'rgba(212,175,106,0.08)';
                                                e.currentTarget.style.color = '#F2F0EB';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.033)';
                                                e.currentTarget.style.color = '#E0DDD7';
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontSize: 15 }}>{opt.emoji}</span>
                                                <span>{opt.label}</span>
                                            </span>
                                            <ChevronRight size={13} style={{ opacity: 0.3, flexShrink: 0 }} />
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            {/* Capture form */}
                            {phase === 'capture' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                                >
                                    <input
                                        type="text" placeholder="Your full name" value={form.name}
                                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                        style={inputStyle}
                                    />
                                    <input
                                        type="email" placeholder="Email address" value={form.email}
                                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                        style={inputStyle}
                                    />
                                    <input
                                        type="tel" placeholder="Phone (optional)" value={form.phone}
                                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                                        style={{ ...inputStyle, borderColor: 'rgba(255,255,255,0.07)' }}
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitting || !canSubmit}
                                        style={{
                                            marginTop: 2,
                                            background: canSubmit
                                                ? 'linear-gradient(135deg, #D4AF6A 0%, #9A7035 100%)'
                                                : 'rgba(212,175,106,0.15)',
                                            border: canSubmit ? 'none' : '1px solid rgba(212,175,106,0.2)',
                                            borderRadius: 11, padding: '13px 16px',
                                            fontSize: 13.5, fontWeight: 700, color: canSubmit ? '#0A0A0B' : '#7A5E2A',
                                            cursor: canSubmit ? 'pointer' : 'not-allowed',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                            transition: 'all 0.25s ease', fontFamily: 'inherit',
                                            boxShadow: canSubmit ? '0 4px 20px rgba(212,175,106,0.3)' : 'none',
                                        }}
                                    >
                                        {submitting
                                            ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</>
                                            : <><Send size={14} /> Send My Proposal</>
                                        }
                                    </button>
                                </motion.div>
                            )}

                            {/* Done state */}
                            {phase === 'done' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, paddingTop: 4, textAlign: 'center' }}
                                >
                                    <div style={{
                                        width: 48, height: 48, borderRadius: '50%',
                                        background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <CheckCircle size={24} color="#D4AF6A" />
                                    </div>
                                    <p style={{ margin: 0, fontSize: 12, color: '#9B9793', lineHeight: 1.5, marginBottom: 16 }}>
                                        Proposal sent to <strong style={{ color: '#D4AF6A' }}>{form.email}</strong>.<br />
                                        We'll follow up within 24 hours.
                                    </p>

                                    {paymentLink ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            <a
                                                href={paymentLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                                    width: '100%', background: 'linear-gradient(135deg, #D4AF6A, #9A7035)',
                                                    borderRadius: 10, padding: '12px 16px', fontSize: 13, fontWeight: 700,
                                                    color: '#0A0A0B', textDecoration: 'none', boxShadow: '0 4px 16px rgba(212,175,106,0.25)',
                                                }}
                                            >
                                                <CreditCard size={15} /> Book Immediate Call ($350)
                                            </a>
                                            <button
                                                onClick={() => setBookingOpen(true)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                                    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: 10, padding: '10px 16px', fontSize: 12, fontWeight: 600,
                                                    color: '#E8E5DF', cursor: 'pointer', fontFamily: 'inherit'
                                                }}
                                            >
                                                <Calendar size={14} /> Wait in Line: Free Diagnostic
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setBookingOpen(true)}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                                width: '100%', background: 'linear-gradient(135deg, #D4AF6A, #9A7035)', border: 'none',
                                                borderRadius: 10, padding: '12px 16px', fontSize: 13, fontWeight: 700,
                                                color: '#0A0A0B', cursor: 'pointer', fontFamily: 'inherit',
                                                boxShadow: '0 4px 16px rgba(212,175,106,0.25)',
                                            }}
                                        >
                                            <Calendar size={15} /> Book a Strategy Call
                                        </button>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sub-modal: Booking overlay renders above all widgets */}
            <BookingModal isOpen={isBookingOpen} onClose={() => setBookingOpen(false)} />

            {/* ── Keyframes ──────────────────────────────────────────────── */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes bw-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes bw-ring {
          0%   { transform: scale(1); opacity: 0.6; }
          80%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); }}
        .bigweb-ai-panel::-webkit-scrollbar { width: 4px; }
        .bigweb-ai-panel::-webkit-scrollbar-track { background: transparent; }
        .bigweb-ai-panel::-webkit-scrollbar-thumb { background: #1F1F24; border-radius: 4px; }
      ` }} />
        </>
    );
}

const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: 13,
    color: '#F2F0EB',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
};
