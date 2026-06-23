'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Calendar, CreditCard } from 'lucide-react';
import BookingModal from '@/components/ui/BookingModal';

// ── BIGWEB Logo Mark (matches Navigation) ────────────────────────────────
function BigwebMark({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
    const s = size / 22;
    return (
        <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="9" height="9" stroke={color} strokeWidth="1.5" />
            <rect x="12" y="1" width="9" height="9" fill={color} opacity="0.8" />
            <rect x="1" y="12" width="9" height="9" fill={color} opacity="0.4" />
            <rect x="12" y="12" width="9" height="9" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
    );
}

// ── Step configuration ────────────────────────────────────────────────────
const STEPS = [
    {
        id: 'basics',
        label: 'Your Details',
        headline: 'Let\'s start with the basics.',
        sub: 'We\'ll use these to personalise your diagnostic.',
    },
    {
        id: 'business',
        label: 'Your Business',
        headline: 'Tell us about your business.',
        sub: 'This helps us understand where you are right now.',
    },
    {
        id: 'challenge',
        label: 'The Challenge',
        headline: 'What\'s the core challenge?',
        sub: 'Be as specific as you like — the more context, the better we can prepare.',
    },
    {
        id: 'confirm',
        label: 'Review & Send',
        headline: 'Everything look right?',
        sub: 'We\'ll review your submission and get back within 4 hours.',
    },
];

const SERVICES = [
    'Conversion Rate Audit',
    'UX & Website Redesign',
    'SEO Revenue Engine',
    'Full Funnel Build',
    'Monthly Growth Partnership',
    'AI Sales Agent',
    'Digital Revenue Transformation',
    'SaaS MVP Build',
    'Not sure yet — help me decide',
];

const REVENUE_RANGES = [
    'Under $10,000/mo',
    '$10K – $50K/mo',
    '$50K – $200K/mo',
    '$200K – $500K/mo',
    '$500K+/mo',
];

// ── Input styles ─────────────────────────────────────────────────────────
const field: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '14px 18px',
    fontSize: 14,
    color: '#F2F0EB',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
};

const label: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: '#9B9793',
    marginBottom: 8,
};

function FieldGroup({ children }: { children: React.ReactNode }) {
    return <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>;
}

function SelectChip({
    options, value, onChange,
}: { options: string[]; value: string; onChange: (v: string) => void }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {options.map(opt => (
                <button
                    key={opt}
                    type="button"
                    onClick={() => onChange(opt)}
                    style={{
                        padding: '9px 14px',
                        borderRadius: 9999,
                        fontSize: 13,
                        border: value === opt
                            ? '1px solid rgba(212,175,106,0.6)'
                            : '1px solid rgba(255,255,255,0.09)',
                        background: value === opt
                            ? 'rgba(212,175,106,0.12)'
                            : 'rgba(255,255,255,0.03)',
                        color: value === opt ? '#D4AF6A' : '#9B9793',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                        if (value !== opt) {
                            e.currentTarget.style.borderColor = 'rgba(212,175,106,0.3)';
                            e.currentTarget.style.color = '#E8E5DF';
                        }
                    }}
                    onMouseLeave={e => {
                        if (value !== opt) {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                            e.currentTarget.style.color = '#9B9793';
                        }
                    }}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function ContactWizard() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState('');
    const [paymentLink, setPaymentLink] = useState('');
    const [isBookingOpen, setBookingOpen] = useState(false);

    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        company: '', website: '', revenue: '', service: '',
        message: '',
    });

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

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(p => ({ ...p, [k]: e.target.value }));

    const canAdvance = [
        form.firstName && form.email,
        form.company && form.revenue,
        form.service,
        true,
    ][step];

    const go = (delta: number) => {
        setDirection(delta);
        setStep(s => s + delta);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('Submission failed');
            setDone(true);
        } catch {
            setError('Something went wrong. Please try again or email us directly.');
        } finally {
            setLoading(false);
        }
    };

    // ── Done state
    if (done) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: '#0D0D10', border: '1px solid rgba(212,175,106,0.2)',
                    borderRadius: 20, padding: '48px 40px', textAlign: 'center',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                }}
            >
                <BookingModal isOpen={isBookingOpen} onClose={() => setBookingOpen(false)} />
                <div style={{
                    width: 64, height: 64, borderRadius: '50%', margin: '0 auto 24px',
                    background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <CheckCircle size={30} color="#D4AF6A" />
                </div>
                <h3 style={{ fontSize: 26, fontFamily: 'var(--font-display)', marginBottom: 12, color: '#F2F0EB' }}>
                    <em style={{ fontStyle: 'italic', color: '#D4AF6A' }}>Received.</em> We'll be in touch.
                </h3>
                <p style={{ color: '#9B9793', fontSize: 14, lineHeight: 1.7, maxWidth: 380, margin: '0 auto 28px' }}>
                    Your submission is with the team. We review every inquiry personally and will reach out within 4 hours.
                </p>
                {paymentLink ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                        <a
                            href={paymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'center',
                                background: 'linear-gradient(135deg, #D4AF6A, #9A7035)',
                                color: '#0A0A0B', padding: '16px 28px', borderRadius: 12,
                                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                                boxShadow: '0 8px 24px rgba(212,175,106,0.3)',
                            }}
                        >
                            <CreditCard size={18} />
                            Book Immediate Consultation ($350)
                        </a>
                        <button
                            onClick={() => setBookingOpen(true)}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'center',
                                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                                color: '#E8E5DF', padding: '14px 28px', borderRadius: 12,
                                fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit'
                            }}
                        >
                            <Calendar size={16} />
                            Wait in Line: Request Private Audit
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setBookingOpen(true)}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'linear-gradient(135deg, #D4AF6A, #9A7035)',
                            color: '#0A0A0B', padding: '14px 28px', borderRadius: 9999, border: 'none',
                            fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                            boxShadow: '0 8px 24px rgba(212,175,106,0.3)',
                        }}
                    >
                        <Calendar size={16} />
                        Book a Strategy Call Directly
                    </button>
                )}
            </motion.div>
        );
    }

    const variants = {
        enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
        center: { opacity: 1, x: 0 },
        exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
    };

    const currentStep = STEPS[step];

    return (
        <div style={{
            background: '#0D0D10', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>
            {/* Header */}
            <div style={{
                padding: '24px 32px',
                background: 'rgba(212,175,106,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
                {/* Progress steps */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 20 }}>
                    {STEPS.map((s, i) => (
                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                            }}>
                                <div style={{
                                    width: 26, height: 26, borderRadius: '50%',
                                    background: i < step ? '#D4AF6A' : i === step ? 'rgba(212,175,106,0.15)' : 'rgba(255,255,255,0.04)',
                                    border: i === step ? '1px solid rgba(212,175,106,0.5)' : i < step ? 'none' : '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 11, fontWeight: 700,
                                    color: i < step ? '#0A0A0B' : i === step ? '#D4AF6A' : '#5A5753',
                                    transition: 'all 0.3s ease',
                                }}>
                                    {i < step ? '✓' : i + 1}
                                </div>
                                <span style={{
                                    fontSize: 11, fontWeight: 600,
                                    color: i === step ? '#D4AF6A' : i < step ? '#7A6030' : '#5A5753',
                                    display: 'none', // show on larger screens via media query
                                    whiteSpace: 'nowrap',
                                }}>
                                    {s.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div style={{
                                    flex: 1, height: 1,
                                    background: i < step ? 'rgba(212,175,106,0.4)' : 'rgba(255,255,255,0.06)',
                                    transition: 'background 0.4s ease',
                                }} />
                            )}
                        </div>
                    ))}
                </div>

                <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF6A' }}>
                    Step {step + 1} of {STEPS.length}
                </p>
                <h2 style={{ margin: 0, fontSize: 22, fontFamily: 'var(--font-display)', color: '#F2F0EB', lineHeight: 1.2 }}>
                    {currentStep.headline}
                </h2>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: '#9B9793' }}>{currentStep.sub}</p>
            </div>

            {/* Step body */}
            <div style={{ padding: '28px 32px', minHeight: 280, position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {step === 0 && (
                            <FieldGroup>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                    <div>
                                        <span style={label}>First Name *</span>
                                        <input style={field} type="text" value={form.firstName} onChange={set('firstName')} placeholder="Jane" required
                                            onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,106,0.5)'}
                                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                    <div>
                                        <span style={label}>Last Name</span>
                                        <input style={field} type="text" value={form.lastName} onChange={set('lastName')} placeholder="Smith"
                                            onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,106,0.5)'}
                                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span style={label}>Email Address *</span>
                                    <input style={field} type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" required
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,106,0.5)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>
                                <div>
                                    <span style={label}>Phone (optional)</span>
                                    <input style={field} type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000"
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,106,0.5)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>
                            </FieldGroup>
                        )}

                        {step === 1 && (
                            <FieldGroup>
                                <div>
                                    <span style={label}>Company / Business Name *</span>
                                    <input style={field} type="text" value={form.company} onChange={set('company')} placeholder="Acme Corp"
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,106,0.5)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>
                                <div>
                                    <span style={label}>Website URL</span>
                                    <input style={field} type="url" value={form.website} onChange={set('website')} placeholder="https://yourwebsite.com"
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,106,0.5)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>
                                <div>
                                    <span style={label}>Monthly Revenue *</span>
                                    <SelectChip options={REVENUE_RANGES} value={form.revenue} onChange={v => setForm(p => ({ ...p, revenue: v }))} />
                                </div>
                            </FieldGroup>
                        )}

                        {step === 2 && (
                            <FieldGroup>
                                <div>
                                    <span style={label}>Service You're Most Interested In *</span>
                                    <SelectChip options={SERVICES} value={form.service} onChange={v => setForm(p => ({ ...p, service: v }))} />
                                </div>
                                <div>
                                    <span style={label}>Tell Us About Your Challenge</span>
                                    <textarea
                                        style={{ ...field, resize: 'none' }}
                                        rows={4}
                                        value={form.message}
                                        onChange={set('message')}
                                        placeholder="What's the #1 thing you'd fix about your digital presence right now?"
                                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(212,175,106,0.5)'}
                                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>
                            </FieldGroup>
                        )}

                        {step === 3 && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    ['Name', `${form.firstName} ${form.lastName}`.trim()],
                                    ['Email', form.email],
                                    ['Company', form.company],
                                    ['Revenue', form.revenue],
                                    ['Service Interest', form.service],
                                    ['Website', form.website || '—'],
                                ].map(([k, v]) => v && (
                                    <div key={k} style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.03)', borderRadius: 10,
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        gap: 16,
                                    }}>
                                        <span style={{ fontSize: 12, color: '#5A5753', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>{k}</span>
                                        <span style={{ fontSize: 13, color: '#E8E5DF', textAlign: 'right' }}>{v}</span>
                                    </div>
                                ))}
                                {form.message && (
                                    <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <span style={{ fontSize: 12, color: '#5A5753', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Challenge</span>
                                        <p style={{ fontSize: 13, color: '#E8E5DF', lineHeight: 1.6, margin: 0 }}>{form.message}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer nav */}
            <div style={{
                padding: '20px 32px', borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(8,8,10,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
                {step > 0 ? (
                    <button
                        onClick={() => go(-1)}
                        style={{
                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 10, padding: '11px 18px', fontSize: 13, color: '#9B9793',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
                        }}
                    >
                        <ArrowLeft size={14} /> Back
                    </button>
                ) : <div />}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flex: 1 }}>
                    {error && <p style={{ fontSize: 12, color: '#EF4444', margin: 0 }}>{error}</p>}
                    {step < STEPS.length - 1 ? (
                        <button
                            onClick={() => go(1)}
                            disabled={!canAdvance}
                            style={{
                                background: canAdvance ? 'linear-gradient(135deg, #D4AF6A, #9A7035)' : 'rgba(212,175,106,0.12)',
                                border: 'none', borderRadius: 10, padding: '12px 24px',
                                fontSize: 13.5, fontWeight: 700, color: canAdvance ? '#0A0A0B' : '#7A5E2A',
                                cursor: canAdvance ? 'pointer' : 'not-allowed',
                                display: 'flex', alignItems: 'center', gap: 7,
                                boxShadow: canAdvance ? '0 4px 20px rgba(212,175,106,0.25)' : 'none',
                                transition: 'all 0.2s ease', fontFamily: 'inherit',
                            }}
                        >
                            Continue <ArrowRight size={14} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            style={{
                                background: 'linear-gradient(135deg, #D4AF6A, #9A7035)',
                                border: 'none', borderRadius: 10, padding: '13px 28px',
                                fontSize: 14, fontWeight: 700, color: '#0A0A0B',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', gap: 8,
                                boxShadow: '0 6px 24px rgba(212,175,106,0.3)',
                                fontFamily: 'inherit',
                            }}
                        >
                            {loading ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />Submitting…</> : <>Request Private Audit <ArrowRight size={14} /></>}
                        </button>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { to { transform: rotate(360deg); } }` }} />
        </div>
    );
}
