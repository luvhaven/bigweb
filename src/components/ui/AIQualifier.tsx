'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Sparkles, ChevronRight } from 'lucide-react';
import { useCompletion } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import AnimatedAILogo from '@/components/branding/AnimatedAILogo';

// ── Conversation script ──────────────────────────────────────────────────────
const SCRIPT = [
    {
        id: 'welcome',
        from: 'ai',
        text: "Hi. I'm the BIGWEB revenue diagnostic engine. Answer 4 fast questions and I'll tell you exactly what's blocking your growth — before we talk to a human.",
        next: 'q1',
        isOpener: true,
    },
    {
        id: 'q1',
        from: 'ai',
        text: 'What best describes your current situation?',
        questionKey: 'Goal',
        choices: [
            { label: 'We have traffic but poor conversion', next: 'q2', tag: 'cro' },
            { label: 'We need a new website or platform', next: 'q2', tag: 'build' },
            { label: "We're scaling ads but our site can't keep up", next: 'q2', tag: 'ads' },
            { label: 'We need an AI sales or automation system', next: 'q2', tag: 'ai' },
        ],
    },
    {
        id: 'q2',
        from: 'ai',
        text: "What's your approximate monthly online revenue (or target)?",
        questionKey: 'Revenue',
        choices: [
            { label: 'Under $20K / mo', next: 'q3', tag: 'smb' },
            { label: '$20K – $100K / mo', next: 'q3', tag: 'growth' },
            { label: '$100K – $500K / mo', next: 'q3', tag: 'scale' },
            { label: '$500K+ / mo', next: 'q3', tag: 'enterprise' },
        ],
    },
    {
        id: 'q3',
        from: 'ai',
        text: 'How quickly do you need to see results?',
        questionKey: 'Urgency',
        choices: [
            { label: 'Within 30 days — urgent', next: 'q4', tag: 'urgent' },
            { label: '1–3 months is fine', next: 'q4', tag: 'planned' },
            { label: 'Building for Q3 / Q4', next: 'q4', tag: 'strategic' },
            { label: "I'm still researching", next: 'q4', tag: 'early' },
        ],
    },
    {
        id: 'q4',
        from: 'ai',
        text: "Last one. What's your budget range for this engagement?",
        questionKey: 'Budget',
        choices: [
            { label: 'Under $5,000', next: 'result', tag: 'tier1' },
            { label: '$5,000 – $15,000', next: 'result', tag: 'tier2' },
            { label: '$15,000 – $50,000', next: 'result', tag: 'tier3' },
            { label: '$50,000+', next: 'result', tag: 'enterprise' },
        ],
    },
];

export default function AIQualifier() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<string>('welcome');
    const [messages, setMessages] = useState<{ from: 'ai' | 'user'; text: string; isCompletion?: boolean }[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [thinking, setThinking] = useState(false);
    const [done, setDone] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Set up Vercel AI useCompletion to stream the diagnostic roadmap
    const { completion, complete, isLoading, setCompletion } = useCompletion({
        api: '/api/diagnostic',
        onFinish: () => {
            setThinking(false);
        }
    });

    const current = SCRIPT.find(s => s.id === step);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, thinking, done, completion]);

    // Push opener message on first open
    const handleOpen = useCallback(() => {
        setOpen(true);
        if (!hasOpened) {
            setHasOpened(true);
            setTimeout(() => {
                const opener = SCRIPT.find(s => s.id === 'welcome')!;
                setMessages([{ from: 'ai', text: opener.text }]);
                setStep('q1');
            }, 500);
        }
    }, [hasOpened]);

    const handleChoice = (choice: { label: string; next: string; tag: string }) => {
        const userMsg = { from: 'user' as const, text: choice.label };
        setMessages(m => [...m, userMsg]);

        const newTags = [...tags, choice.tag];
        setTags(newTags);

        // Store the answer context for the generative AI
        const newAnswers = { ...answers };
        if (current && 'questionKey' in current && current.questionKey) {
            newAnswers[current.questionKey] = choice.label;
            setAnswers(newAnswers);
        }

        if (choice.next === 'result') {
            setThinking(true);
            setDone(true);
            // Trigger the generative AI endpoint with the collected inputs
            complete('', {
                body: {
                    tags: newTags,
                    answers: newAnswers
                }
            });
            return;
        }

        setThinking(true);
        setTimeout(() => {
            setThinking(false);
            const nextNode = SCRIPT.find(s => s.id === choice.next);
            if (nextNode) {
                setMessages(m => [...m, { from: 'ai', text: nextNode.text }]);
                setStep(choice.next);
            }
        }, 350);
    };

    const currentNode = !done ? SCRIPT.find(s => s.id === step) : null;

    return (
        <>
            {/* Floating trigger */}
            <AnimatePresence>
                {!open && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: 3, type: 'spring', stiffness: 260, damping: 20 }}
                        onClick={handleOpen}
                        aria-label="Open AI Revenue Qualifier"
                        style={{
                            position: 'fixed',
                            bottom: 'clamp(80px, 10vw, 100px)',
                            right: 'clamp(16px, 3vw, 32px)',
                            zIndex: 8000,
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-gold-bright) 0%, #b8943f 100%)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 30px rgba(212,175,106,0.4)',
                        }}
                    >
                        <AnimatedAILogo size={22} color="#0a0a0b" isProcessing={thinking || isLoading} />
                        <span style={{
                            position: 'absolute', inset: -4, borderRadius: '50%',
                            border: '2px solid rgba(212,175,106,0.4)',
                            animation: 'aiq-pulse 2s ease-out infinite',
                        }} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.96 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed',
                            bottom: 'clamp(80px, 10vw, 100px)',
                            right: 'clamp(16px, 3vw, 32px)',
                            width: 'min(400px, calc(100vw - 32px))',
                            maxHeight: '70vh',
                            zIndex: 8000,
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'rgba(8, 8, 9, 0.96)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(212, 175, 106, 0.08)',
                            borderRadius: '12px',
                            boxShadow: '0 0 0 1px rgba(212,175,106,0.05), 0 30px 100px -10px rgba(0,0,0,0.8), 0 0 80px rgba(212,175,106,0.15)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '14px 18px',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            background: 'rgba(212,175,106,0.04)',
                            flexShrink: 0,
                        }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--color-gold-bright), #b8943f)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <AnimatedAILogo size={16} color="#0a0a0b" isProcessing={thinking || isLoading} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 }}>BIGWEB AI</p>
                                <p style={{ fontSize: '11px', color: 'var(--color-gold-muted)', marginTop: 2 }}>Revenue Diagnostic Engine</p>
                            </div>
                            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', display: 'flex' }}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Message thread */}
                        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        alignSelf: m.from === 'ai' ? 'flex-start' : 'flex-end',
                                        maxWidth: '86%',
                                        padding: '10px 13px',
                                        borderRadius: m.from === 'ai' ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
                                        background: m.from === 'ai' ? 'rgba(255,255,255,0.05)' : 'rgba(212,175,106,0.15)',
                                        border: m.from === 'ai' ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(212,175,106,0.1)',
                                        fontSize: '13px',
                                        lineHeight: 1.55,
                                        color: m.from === 'ai' ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                                    }}
                                >
                                    {m.text}
                                </motion.div>
                            ))}

                            {/* Streaming Diagnostic Node */}
                            {(completion || isLoading) && done && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        alignSelf: 'flex-start',
                                        maxWidth: '92%',
                                        padding: '14px 16px',
                                        borderRadius: '4px 12px 12px 12px',
                                        background: 'rgba(212,175,106,0.08)',
                                        border: '1px solid rgba(212,175,106,0.3)',
                                        fontSize: '13px',
                                        lineHeight: 1.6,
                                        color: 'var(--color-text-primary)',
                                    }}
                                >
                                    <h4 style={{ color: 'var(--color-gold-bright)', marginBottom: 8, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        <Sparkles size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} />
                                        Calculated Diagnostic Roadmap
                                    </h4>
                                    <div className="prose prose-sm prose-invert" style={{ margin: 0 }}>
                                        <ReactMarkdown>{completion}</ReactMarkdown>
                                    </div>
                                </motion.div>
                            )}

                            {/* Thinking indicator */}
                            {thinking && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '10px 13px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px 12px 12px 12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    {[0, 1, 2].map(i => (
                                        <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-muted)', animation: `aiq-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                                    ))}
                                </motion.div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Choices or result CTA */}
                        <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                            {done && !isLoading && completion ? (
                                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <a
                                        href="/contact"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                                            background: 'var(--color-gold-bright)', color: '#0a0a0b',
                                            padding: '11px 16px', borderRadius: 6, textDecoration: 'none',
                                            fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                        }}
                                    >
                                        Execute the Roadmap <ArrowRight size={14} />
                                    </a>
                                    <button
                                        onClick={() => { setMessages([]); setTags([]); setAnswers({}); setDone(false); setCompletion(''); setHasOpened(false); setStep('welcome'); setTimeout(handleOpen, 50); }}
                                        style={{ background: 'none', border: 'none', color: 'var(--color-text-tertiary)', fontSize: '11px', cursor: 'pointer', textAlign: 'center' }}
                                    >
                                        Start over
                                    </button>
                                </motion.div>
                            ) : (
                                !thinking && currentNode?.choices && !done && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        {currentNode.choices.map((c) => (
                                            <motion.button
                                                key={c.label}
                                                initial={{ opacity: 0, x: -6 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                onClick={() => handleChoice(c)}
                                                style={{
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.09)',
                                                    color: 'var(--color-text-secondary)',
                                                    borderRadius: 6,
                                                    padding: '9px 12px',
                                                    fontSize: '12.5px',
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                                                }}
                                                onMouseEnter={e => {
                                                    const t = e.currentTarget;
                                                    t.style.borderColor = 'rgba(212,175,106,0.35)';
                                                    t.style.color = 'var(--color-text-primary)';
                                                    t.style.background = 'rgba(212,175,106,0.06)';
                                                }}
                                                onMouseLeave={e => {
                                                    const t = e.currentTarget;
                                                    t.style.borderColor = 'rgba(255,255,255,0.09)';
                                                    t.style.color = 'var(--color-text-secondary)';
                                                    t.style.background = 'rgba(255,255,255,0.04)';
                                                }}
                                            >
                                                {c.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @keyframes aiq-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes aiq-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 6px;
        }
        
        .prose p { margin-bottom: 0.5em; }
        .prose ul, .prose ol { padding-left: 1.25em; margin-bottom: 0.5em; }
        .prose li { margin-bottom: 0.25em; }
        .prose code { background: rgba(212,175,106,0.15); padding: 2px 4px; border-radius: 4px; color: var(--color-gold-bright); font-size: 0.9em; }
        .prose strong { color: var(--color-text-primary); font-weight: 700; }
      `}</style>
        </>
    );
}
