'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const toasts = [
    { company: 'Nexora SaaS', action: 'booked a Revenue Roadmap', time: '3 mins ago', country: '🇺🇸' },
    { company: 'Luminary Labs', action: 'just started onboarding', time: '11 mins ago', country: '🇬🇧' },
    { company: 'FlowStack', action: 'booked a Discovery Call', time: '22 mins ago', country: '🇩🇪' },
    { company: 'Apex Commerce', action: 'signed a Growth Retainer', time: '34 mins ago', country: '🇦🇺' },
    { company: 'Venture Pulse', action: 'requested a free site audit', time: '1 hr ago', country: '🇨🇦' },
    { company: 'MintLayer', action: 'launched with BIGWEB', time: '2 hrs ago', country: '🇸🇬' },
]

export default function SocialProofToast() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Initial delay before first toast
        const initialTimer = setTimeout(() => {
            setVisible(true)
        }, 5000)

        return () => clearTimeout(initialTimer)
    }, [])

    useEffect(() => {
        if (!visible || dismissed) return

        const hideTimer = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => clearTimeout(hideTimer)
    }, [visible, dismissed])

    useEffect(() => {
        if (visible || dismissed) return

        const cycleTimer = setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % toasts.length)
            setVisible(true)
        }, 8000)

        return () => clearTimeout(cycleTimer)
    }, [visible, dismissed])

    if (!mounted || dismissed) return null

    const toast = toasts[currentIndex]

    return (
        <div className="fixed bottom-6 left-6 z-[150] pointer-events-none">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, x: -10, scale: 0.97 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-auto max-w-[280px] relative"
                    >
                        <div
                            className="relative rounded-2xl border border-white/[0.06] p-4 pr-8"
                            style={{
                                background: 'linear-gradient(135deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.95) 100%)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
                            }}
                        >
                            <button
                                onClick={() => setDismissed(true)}
                                className="absolute top-2.5 right-2.5 text-zinc-600 hover:text-zinc-400 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-base shrink-0">
                                    {toast.country}
                                </div>
                                <div>
                                    <p className="text-[12px] text-zinc-200 leading-snug">
                                        <span className="font-semibold text-white">{toast.company}</span>
                                        {' '}{toast.action}
                                    </p>
                                    <span className="text-[10px] font-mono text-zinc-600 mt-1 block">{toast.time}</span>
                                </div>
                            </div>

                            {/* Live green dot */}
                            <div className="absolute top-3 left-3 -translate-x-1 -translate-y-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
