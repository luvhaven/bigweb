'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function BookingModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        (async function () {
            const cal = await getCalApi();
            cal('ui', {
                theme: 'dark',
                styles: { branding: { brandColor: '#D4AF6A' } },
                hideEventTypeDetails: false,
                layout: 'month_view'
            });
        })();
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(10, 10, 11, 0.85)', backdropFilter: 'blur(12px)',
                        padding: '24px'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        style={{
                            width: '100%', maxWidth: 1000, height: '85vh',
                            background: '#0D0D10', borderRadius: 24, padding: 0,
                            boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)',
                            position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(212,175,106,0.02)'
                        }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 18, fontFamily: 'var(--font-display)', color: '#F2F0EB' }}>
                                    Schedule Your Diagnostic
                                </h3>
                                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9B9793' }}>
                                    Select a time for your free 30-minute strategy call.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#9B9793', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#F2F0EB'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#9B9793'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Cal Embed */}
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Cal
                                calLink="bigwebdigital/revenue-diagnostic"
                                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                                config={{ layout: 'month_view' }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
