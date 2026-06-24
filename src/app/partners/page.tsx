'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import TopographyField from '@/components/ui/TopographyField';
import AnimateIn from '@/components/ui/AnimateIn';
import { ArrowRight, CheckCircle, Users, DollarSign, Zap, Shield, TrendingUp, Globe } from 'lucide-react';

const BENEFITS = [
    {
        icon: DollarSign,
        title: '10% Upfront Commission',
        desc: 'Earn a massive 10% of the initial contract payment for every client you refer. Get rewarded fast and upfront — paid within 30 days of execution.',
    },
    {
        icon: Zap,
        title: 'Instant Tracking Dashboard',
        desc: 'Real-time visibility into click-throughs, referral status, and cumulative earnings via your dedicated partner link.',
    },
    {
        icon: Shield,
        title: 'Full Legal Protection',
        desc: 'A comprehensive Partner Agreement governs every referral. Your commission is contractually guaranteed upon client payment.',
    },
    {
        icon: TrendingUp,
        title: 'High-Value Contracts',
        desc: 'Our average engagement starts at $8,000. A single referral can yield $800+ in passive commission. Our highest contracts exceed $120K.',
    },
    {
        icon: Users,
        title: 'Dedicated Partner Support',
        desc: 'You get a named account contact, co-selling support, and access to our full pitch deck to close your referrals faster.',
    },
    {
        icon: Globe,
        title: 'Global Tier-1 Markets',
        desc: 'We work with clients across North America, Europe, and the GCC. Any qualified referral from any region is eligible.',
    },
];

const TIERS = [
    { label: 'Conversion Audit + Fix Sprint', value: '$4,200', commission: '$420', badge: 'Entry', color: '#9B9793' },
    { label: 'Authority Redesign Package', value: '$12,000', commission: '$1,200', badge: 'Popular', color: '#D4AF6A' },
    { label: 'Digital Revenue Transformation', value: '$38,000+', commission: '$3,800+', badge: 'Enterprise', color: '#5B8DEF' },
];

export default function PartnersPage() {
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', companyName: '', website: '', payoutEmail: '', referralSource: '', agreeToTerms: false,
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success?: boolean; referralCode?: string; error?: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setForm(f => ({ ...f, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/affiliates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setResult(data);
        } catch {
            setResult({ error: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, color: 'var(--color-text-primary)', padding: '12px 14px', fontSize: 14,
        outline: 'none', transition: 'border-color 0.2s',
    };
    const labelStyle: React.CSSProperties = {
        display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em',
        color: 'var(--color-text-tertiary)', marginBottom: 6,
    };

    return (
        <div style={{ position: 'relative', overflowX: 'hidden' }}>
            <TopographyField />

            {/* ── HERO ── */}
            <section style={{ paddingTop: 'calc(var(--nav-height) + 80px)', paddingBottom: 100, position: 'relative', zIndex: 1 }}>
                <div className="container" style={{ maxWidth: 900, textAlign: 'center' }}>
                    <AnimateIn>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,106,0.08)',
                            border: '1px solid rgba(212,175,106,0.2)', borderRadius: 100, padding: '6px 16px',
                            fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-muted)',
                            marginBottom: 32,
                        }}>
                            <span style={{ width: 6, height: 6, background: '#D4AF6A', borderRadius: '50%', boxShadow: '0 0 8px #D4AF6A' }} />
                            BIGWEB Partner Programme
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05,
                            letterSpacing: '-0.03em', marginBottom: 24, color: 'var(--color-text-primary)',
                        }}>
                            Earn{' '}
                            <span style={{ color: 'var(--color-gold-bright)', position: 'relative', display: 'inline-block' }}>
                                10% Commission
                                <span style={{
                                    position: 'absolute', bottom: -4, left: 0, right: 0, height: 2,
                                    background: 'linear-gradient(90deg, transparent, #D4AF6A, transparent)',
                                }} />
                            </span>
                            <br />on Every Client You Send.
                        </h1>

                        <p style={{ fontSize: 18, color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 40px' }}>
                            Refer a qualified brand to BIGWEB Digital and earn a massive 10% commission upfront on their very first payment — automatically and contractually. A high-leverage reward for a single introduction.
                        </p>

                        <a href="#apply" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'var(--color-gold-bright)', color: '#0a0a0b',
                            padding: '14px 32px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                            textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
                        }}>
                            Apply for Partnership <ArrowRight size={16} />
                        </a>
                    </AnimateIn>
                </div>
            </section>

            {/* ── COMMISSION TIERS ── */}
            <section style={{ paddingBottom: 100, position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <AnimateIn>
                        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 48, color: 'var(--color-text-primary)' }}>
                            What a Referral is Worth
                        </h2>
                    </AnimateIn>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
                        {TIERS.map((t) => (
                            <AnimateIn key={t.label}>
                                <div style={{
                                    background: 'rgba(255,255,255,0.03)', border: `1px solid ${t.color}33`,
                                    borderRadius: 12, padding: '28px 24px', position: 'relative', overflow: 'hidden',
                                }}>
                                    <span style={{
                                        position: 'absolute', top: 16, right: 16, fontSize: 10, fontWeight: 700,
                                        letterSpacing: '0.1em', textTransform: 'uppercase', color: t.color,
                                        background: `${t.color}15`, padding: '3px 10px', borderRadius: 100,
                                    }}>{t.badge}</span>
                                    <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>{t.label}</p>
                                    <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: 4 }}>{t.value}</p>
                                    <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 16 }}>initial contract payment</p>
                                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 16 }} />
                                    <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-tertiary)', marginBottom: 4 }}>Your Commission</p>
                                    <p style={{ fontSize: 24, fontWeight: 800, color: t.color }}>{t.commission}</p>
                                </div>
                            </AnimateIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BENEFITS GRID ── */}
            <section style={{ paddingBottom: 100, position: 'relative', zIndex: 1 }}>
                <div className="container">
                    <AnimateIn>
                        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 48, color: 'var(--color-text-primary)' }}>
                            Why This Programme is Different
                        </h2>
                    </AnimateIn>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                        {BENEFITS.map((b) => {
                            const Icon = b.icon;
                            return (
                                <AnimateIn key={b.title}>
                                    <div className="tilt-card" style={{
                                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                                        borderRadius: 12, padding: '28px 24px',
                                        transition: 'border-color 0.3s',
                                    }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 10,
                                            background: 'rgba(212,175,106,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            marginBottom: 16,
                                        }}>
                                            <Icon size={20} color="#D4AF6A" />
                                        </div>
                                        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>{b.title}</h3>
                                        <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', lineHeight: 1.65 }}>{b.desc}</p>
                                    </div>
                                </AnimateIn>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section style={{ paddingBottom: 100, position: 'relative', zIndex: 1 }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <AnimateIn>
                        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 56, color: 'var(--color-text-primary)' }}>
                            How It Works
                        </h2>
                    </AnimateIn>
                    {[
                        { step: '01', title: 'Apply & Get Approved', desc: 'Complete the application below. Our team reviews every application within 48 business hours. Upon approval, you receive your unique referral link and a partner onboarding deck.' },
                        { step: '02', title: 'Refer a Qualified Brand', desc: 'Send your link to any brand that needs serious digital growth. Use our provided pitch assets, or simply make a warm introduction by email. We handle all closing.' },
                        { step: '03', title: 'We Close the Contract', desc: 'Once the client signs and their first payment clears, your referral status updates to CONVERTED. Our legal team records the exact contract value.' },
                        { step: '04', title: 'Get Paid in 30 Days', desc: 'Within 30 days of contract execution, 10% of the contract value is transferred to your nominated payout account. Full transparency, zero ambiguity.' },
                    ].map(({ step, title, desc }) => (
                        <AnimateIn key={step}>
                            <div style={{ display: 'flex', gap: 28, marginBottom: 40, alignItems: 'flex-start' }}>
                                <div style={{
                                    flexShrink: 0, width: 52, height: 52, borderRadius: 12,
                                    background: 'rgba(212,175,106,0.08)', border: '1px solid rgba(212,175,106,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 13, fontWeight: 800, color: '#D4AF6A', letterSpacing: '0.05em',
                                }}>{step}</div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 6 }}>{title}</h3>
                                    <p style={{ fontSize: 14, color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>{desc}</p>
                                </div>
                            </div>
                        </AnimateIn>
                    ))}
                </div>
            </section>

            {/* ── APPLICATION FORM ── */}
            <section id="apply" style={{ paddingBottom: 120, position: 'relative', zIndex: 1 }}>
                <div className="container" style={{ maxWidth: 640 }}>
                    <AnimateIn>
                        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 12, color: 'var(--color-text-primary)' }}>
                            Apply to Become a Partner
                        </h2>
                        <p style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: 14, lineHeight: 1.6, marginBottom: 48 }}>
                            Applications are reviewed manually. We only approve partners who can refer clients that meet our minimum engagement threshold.
                        </p>
                    </AnimateIn>

                    {result?.success ? (
                        <AnimateIn>
                            <div style={{
                                background: 'rgba(76,175,80,0.06)', border: '1px solid rgba(76,175,80,0.3)',
                                borderRadius: 12, padding: '40px 32px', textAlign: 'center',
                            }}>
                                <CheckCircle size={48} color="#4CAF50" style={{ marginBottom: 20 }} />
                                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>Application Received</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
                                    Your application is under review. Expect a response within 48 business hours.
                                </p>
                                <div style={{
                                    background: 'rgba(212,175,106,0.08)', border: '1px solid rgba(212,175,106,0.25)',
                                    borderRadius: 8, padding: '16px 20px', display: 'inline-block',
                                }}>
                                    <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-tertiary)', marginBottom: 4 }}>Your Referral Code</p>
                                    <p style={{ fontSize: 22, fontWeight: 800, color: '#D4AF6A', letterSpacing: '0.1em' }}>{result.referralCode}</p>
                                </div>
                                <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 16 }}>
                                    Your personalised partner dashboard and referral link will be emailed upon approval.
                                </p>
                            </div>
                        </AnimateIn>
                    ) : (
                        <AnimateIn>
                            <form onSubmit={handleSubmit} style={{
                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 16, padding: '40px 36px',
                            }}>
                                {result?.error && (
                                    <div style={{ background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 24, color: '#E74C3C', fontSize: 13 }}>
                                        {result.error}
                                    </div>
                                )}

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                                    <div>
                                        <label style={labelStyle}>First Name *</label>
                                        <input name="firstName" value={form.firstName} onChange={handleChange} required style={inputStyle} placeholder="Jane" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Last Name *</label>
                                        <input name="lastName" value={form.lastName} onChange={handleChange} required style={inputStyle} placeholder="Okafor" />
                                    </div>
                                </div>

                                <div style={{ marginBottom: 16 }}>
                                    <label style={labelStyle}>Business Email *</label>
                                    <input name="email" type="email" value={form.email} onChange={handleChange} required style={inputStyle} placeholder="jane@company.com" />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                                    <div>
                                        <label style={labelStyle}>Company / Platform Name</label>
                                        <input name="companyName" value={form.companyName} onChange={handleChange} style={inputStyle} placeholder="Growth Agency Ltd" />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Website</label>
                                        <input name="website" value={form.website} onChange={handleChange} style={inputStyle} placeholder="https://yoursite.com" />
                                    </div>
                                </div>

                                <div style={{ marginBottom: 16 }}>
                                    <label style={labelStyle}>Payout Email (PayPal / Wise)</label>
                                    <input name="payoutEmail" type="email" value={form.payoutEmail} onChange={handleChange} style={inputStyle} placeholder="payments@yourbank.com" />
                                </div>

                                <div style={{ marginBottom: 28 }}>
                                    <label style={labelStyle}>How did you hear about us?</label>
                                    <select name="referralSource" value={form.referralSource} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                                        <option value="">Select one…</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="client">Existing BIGWEB Client</option>
                                        <option value="google">Google Search</option>
                                        <option value="twitter">Twitter / X</option>
                                        <option value="referral">Word of Mouth</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: 28, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <input
                                        type="checkbox" name="agreeToTerms"
                                        checked={form.agreeToTerms} onChange={handleChange}
                                        id="agreeToTerms" required
                                        style={{ marginTop: 3, accentColor: '#D4AF6A', width: 16, height: 16, cursor: 'pointer', flexShrink: 0 }}
                                    />
                                    <label htmlFor="agreeToTerms" style={{ fontSize: 13, color: 'var(--color-text-tertiary)', lineHeight: 1.6, cursor: 'pointer' }}>
                                        I have read and agree to the{' '}
                                        <a href="/affiliate-agreement" target="_blank" style={{ color: '#D4AF6A', textDecoration: 'underline' }}>
                                            BIGWEB Affiliate Partner Agreement
                                        </a>{' '}
                                        and understand that commissions are subject to a 30-day client payment confirmation hold and are exclusively governed by the terms therein.
                                    </label>
                                </div>

                                <button type="submit" disabled={loading || !form.agreeToTerms} style={{
                                    width: '100%', background: loading ? 'rgba(212,175,106,0.5)' : 'var(--color-gold-bright)',
                                    color: '#0a0a0b', border: 'none', borderRadius: 8, padding: '14px 24px',
                                    fontSize: 14, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                    cursor: loading || !form.agreeToTerms ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                }}>
                                    {loading ? 'Submitting Application…' : <>Submit Application <ArrowRight size={16} /></>}
                                </button>

                                <p style={{ fontSize: 12, color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
                                    By submitting, you confirm all information is accurate. Fraudulent referrals result in immediate termination and forfeiture of any outstanding commissions.
                                </p>
                            </form>
                        </AnimateIn>
                    )}
                </div>
            </section>
        </div>
    );
}
