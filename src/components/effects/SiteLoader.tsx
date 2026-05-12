'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SiteLoader() {
    const [show, setShow] = useState(true)
    const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')

    useEffect(() => {
        // Check if already loaded in this session
        if (sessionStorage.getItem('bw_loaded')) { setShow(false); return }

        const t1 = setTimeout(() => setPhase('hold'), 400)
        const t2 = setTimeout(() => setPhase('out'), 1400)
        const t3 = setTimeout(() => {
            setShow(false)
            sessionStorage.setItem('bw_loaded', '1')
        }, 2000)

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="site-loader"
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                >
                    {/* Ambient glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/[0.06] blur-[120px] rounded-full pointer-events-none" />

                    {/* Logo mark */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={phase !== 'in' ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex flex-col items-center gap-6"
                    >
                        {/* Animated logo ring */}
                        <div className="relative w-14 h-14">
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                                <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                                <motion.circle
                                    cx="28" cy="28" r="24"
                                    fill="none"
                                    stroke="hsl(var(--accent))"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 24}`}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                                    animate={phase === 'out'
                                        ? { strokeDashoffset: 0 }
                                        : phase === 'hold'
                                            ? { strokeDashoffset: 2 * Math.PI * 24 * 0.25 }
                                            : { strokeDashoffset: 2 * Math.PI * 24 }
                                    }
                                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                />
                            </svg>
                            {/* Inner pulse dot */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="w-2 h-2 rounded-full bg-accent"
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
                                />
                            </div>
                        </div>

                        {/* Wordmark */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={phase !== 'in' ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-col items-center gap-1"
                        >
                            <span className="font-display font-black text-xl tracking-[0.08em] text-white uppercase">
                                BIGWEB
                            </span>
                            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.5em]">
                                Digital
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Loading bar at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.04]">
                        <motion.div
                            className="h-full bg-gradient-to-r from-transparent via-accent to-transparent"
                            initial={{ width: '0%', x: '-100%' }}
                            animate={phase !== 'in'
                                ? { width: phase === 'out' ? '100%' : '60%', x: '0%' }
                                : {}
                            }
                            transition={{ duration: phase === 'out' ? 0.5 : 0.9, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </div>

                    {/* Curtain wipe exit */}
                    <motion.div
                        className="absolute inset-0 bg-[#030303] origin-top"
                        initial={{ scaleY: 0 }}
                        animate={phase === 'out' ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: phase === 'out' ? 0.05 : 0 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
