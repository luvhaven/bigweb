'use client'

/**
 * LiveVisitorCounter — Honest Social Proof
 * ──────────────────────────────────────────
 * IMPORTANT: The previous version of this component used Math.random()
 * to simulate a fluctuating live visitor count. This was a dark pattern —
 * fabricating numbers to create artificial urgency.
 *
 * This version displays factual, static social proof only.
 * It shows when the user has scrolled mid-page and hides near top/footer.
 */

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function LiveVisitorCounter() {
    const [isVisible, setIsVisible] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const docHeight = document.documentElement.scrollHeight
        const winHeight = window.innerHeight
        const footerThreshold = 400
        const heroThreshold = 300

        if (latest < heroThreshold || latest > docHeight - winHeight - footerThreshold) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
    })

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="fixed bottom-6 left-6 z-30 hidden lg:flex items-center gap-3 bg-[#0c0c0c]/80 backdrop-blur-xl border border-white/[0.08] px-4 py-2.5 rounded-full shadow-2xl shadow-black/40 select-none"
                >
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-zinc-400">
                        <span className="font-semibold text-white">200+ projects</span>{' '}
                        shipped across 28 countries
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
