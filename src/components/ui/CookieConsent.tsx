'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ConsentState = {
    analytics: boolean;
    marketing: boolean;
};

const CONSENT_KEY = 'bigweb_consent_v1';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [consent, setConsent] = useState<ConsentState>({
        analytics: true,
        marketing: true,
    });

    useEffect(() => {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (!stored) {
            // Delay slightly so it doesn't compete with page load animations
            const t = setTimeout(() => setVisible(true), 2200);
            return () => clearTimeout(t);
        }
    }, []);

    const save = (c: ConsentState) => {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...c, timestamp: Date.now() }));
        setVisible(false);
    };

    const acceptAll = () => save({ analytics: true, marketing: true });
    const rejectAll = () => save({ analytics: false, marketing: false });
    const saveCustom = () => save(consent);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    role="dialog"
                    aria-label="Cookie consent"
                    aria-live="polite"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: 'fixed',
                        bottom: 'clamp(16px, 3vw, 32px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'min(680px, calc(100vw - 32px))',
                        zIndex: 9999,
                        background: 'rgba(10, 10, 11, 0.92)',
                        backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(212, 175, 106, 0.15)',
                        borderRadius: '6px',
                        padding: 'var(--space-6) var(--space-8)',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                >
                    {/* Gold accent line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.6), transparent)', borderRadius: '6px 6px 0 0' }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 260 }}>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gold-bright)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 'var(--space-2)', fontWeight: 600 }}>
                                Cookie Preferences
                            </p>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                We use cookies to analyse site performance and personalise your experience. Essential cookies are always active.{' '}
                                <button
                                    onClick={() => setShowDetails(d => !d)}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-gold-muted)', cursor: 'pointer', fontSize: 'inherit', padding: 0, textDecoration: 'underline' }}
                                >
                                    {showDetails ? 'Hide details' : 'Manage preferences'}
                                </button>
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
                            <button
                                onClick={rejectAll}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    color: 'var(--color-text-tertiary)',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    fontSize: 'var(--text-xs)',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    letterSpacing: '0.05em',
                                    transition: 'border-color 0.2s, color 0.2s',
                                }}
                                onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.target as HTMLButtonElement).style.color = 'var(--color-text-secondary)'; }}
                                onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.target as HTMLButtonElement).style.color = 'var(--color-text-tertiary)'; }}
                            >
                                Reject All
                            </button>
                            <button
                                onClick={acceptAll}
                                style={{
                                    background: 'var(--color-gold-bright)',
                                    border: '1px solid var(--color-gold-bright)',
                                    color: '#0a0a0b',
                                    padding: '8px 20px',
                                    borderRadius: '4px',
                                    fontSize: 'var(--text-xs)',
                                    cursor: 'pointer',
                                    fontWeight: 700,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => { (e.target as HTMLButtonElement).style.opacity = '0.85'; }}
                                onMouseLeave={e => { (e.target as HTMLButtonElement).style.opacity = '1'; }}
                            >
                                Accept All
                            </button>
                        </div>
                    </div>

                    {/* Expanded preferences */}
                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-5)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                    {[
                                        { key: 'essential', label: 'Essential', desc: 'Required for the site to function. Cannot be disabled.', locked: true },
                                        { key: 'analytics', label: 'Analytics', desc: 'Help us understand how visitors use the site (Google Analytics 4).', locked: false },
                                        { key: 'marketing', label: 'Marketing', desc: 'Enable personalised content and retargeting on external platforms.', locked: false },
                                    ].map(item => (
                                        <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)' }}>
                                            <div>
                                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontWeight: 600, marginBottom: '2px' }}>{item.label}</p>
                                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>{item.desc}</p>
                                            </div>
                                            <button
                                                disabled={item.locked}
                                                onClick={() => !item.locked && setConsent(c => ({ ...c, [item.key]: !c[item.key as keyof ConsentState] }))}
                                                style={{
                                                    width: 44,
                                                    height: 24,
                                                    borderRadius: 12,
                                                    border: 'none',
                                                    cursor: item.locked ? 'not-allowed' : 'pointer',
                                                    background: item.locked
                                                        ? 'rgba(212,175,106,0.4)'
                                                        : consent[item.key as keyof ConsentState]
                                                            ? 'var(--color-gold-bright)'
                                                            : 'rgba(255,255,255,0.1)',
                                                    position: 'relative',
                                                    flexShrink: 0,
                                                    transition: 'background 0.25s',
                                                }}
                                                aria-checked={item.locked ? true : consent[item.key as keyof ConsentState]}
                                                role="switch"
                                            >
                                                <span style={{
                                                    position: 'absolute',
                                                    top: 3,
                                                    left: item.locked ? 23 : consent[item.key as keyof ConsentState] ? 23 : 3,
                                                    width: 18,
                                                    height: 18,
                                                    borderRadius: '50%',
                                                    background: '#fff',
                                                    transition: 'left 0.25s',
                                                }} />
                                            </button>
                                        </div>
                                    ))}

                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
                                        <button
                                            onClick={saveCustom}
                                            style={{
                                                background: 'transparent',
                                                border: '1px solid rgba(212,175,106,0.4)',
                                                color: 'var(--color-gold-muted)',
                                                padding: '7px 18px',
                                                borderRadius: '4px',
                                                fontSize: 'var(--text-xs)',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                letterSpacing: '0.05em',
                                            }}
                                        >
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
