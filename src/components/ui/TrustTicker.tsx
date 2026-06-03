'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

const EVENTS = [
    { text: 'E-commerce Brand ({city}) booked a Revenue Diagnostic', time: 'Just now' },
    { text: 'A B2B SaaS startup ({city}) downloaded the 2026 Report', time: '12m ago' },
    { text: 'Fintech client (Toronto) increased conversion rate by 180%', time: '1h ago' },
    { text: 'Creative Agency ({city}) just upgraded to a Growth Retainer', time: '3h ago' },
    { text: 'A Professional Services firm (London) submitted an application', time: 'Just now' },
    { text: 'Enterprise client (Amsterdam) just booked a Strategy Session', time: '5m ago' },
    { text: 'Real Estate firm ({city}) completed Digital Transformation', time: '4h ago' }
];

// Helper to reliably read un-encoded cookies on the client side
function getCookie(name: string) {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
}

export default function TrustTicker() {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isVisible, setIsVisible] = useState(false);
    const [userCity, setUserCity] = useState<string>('');

    useEffect(() => {
        // Read the Vercel edge-injected cookie
        const city = getCookie('bw_city');
        if (city) {
            setUserCity(city);
        }

        // Wait a bit before showing the first toast
        const initialDelay = setTimeout(() => {
            showNextToast();
        }, 4500);

        return () => clearTimeout(initialDelay);
    }, []);

    const showNextToast = () => {
        // Pick a random event
        const randomIndex = Math.floor(Math.random() * EVENTS.length);
        setCurrentIndex(randomIndex);
        setIsVisible(true);

        // Hide after 5 seconds
        setTimeout(() => {
            setIsVisible(false);

            // Schedule next toast (random interval between 15s and 45s)
            const nextDelay = Math.floor(Math.random() * (45000 - 15000 + 1) + 15000);
            setTimeout(() => {
                showNextToast();
            }, nextDelay);

        }, 5000);
    };

    return (
        <AnimatePresence>
            {isVisible && currentIndex >= 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    style={{
                        position: 'fixed',
                        bottom: 'var(--space-6)',
                        left: 'var(--space-6)',
                        zIndex: 9990,
                        pointerEvents: 'none',
                    }}
                >
                    <div style={{
                        background: 'var(--color-bg-secondary)',
                        border: '1px solid rgba(212,175,106,0.3)',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        maxWidth: '320px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 12px rgba(212,175,106,0.1)',
                        backdropFilter: 'blur(10px)',
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'var(--color-gold-bright)',
                            boxShadow: '0 0 8px rgba(212,175,106,0.8)',
                            marginTop: '6px',
                            flexShrink: 0,
                            animation: 'pulsate 2s infinite ease-out'
                        }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <p style={{
                                fontSize: '13px',
                                color: 'var(--color-text-primary)',
                                lineHeight: 1.4,
                                fontWeight: 500
                            }}>
                                {EVENTS[currentIndex].text.replace('{city}', userCity || 'London')}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <MapPin size={10} color="var(--color-text-tertiary)" />
                                <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
                                    {EVENTS[currentIndex].time}
                                </span>
                            </div>
                        </div>
                    </div>
                    <style>{`
            @keyframes pulsate {
              0% { transform: scale(0.8); opacity: 0.5; }
              50% { transform: scale(1.2); opacity: 1; boxShadow: 0 0 12px rgba(212,175,106,1); }
              100% { transform: scale(0.8); opacity: 0.5; }
            }
          `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
