'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Zap, Gauge } from 'lucide-react'

const badges = [
    { icon: ShieldCheck, label: "CLINICAL_VERIFIED", detail: "Secured_Infrastructure" },
    { icon: Zap, label: "PHASE_DETECTION", detail: "Rapid_Deployment" },
    { icon: Gauge, label: "PERFORMANCE_LOCK", detail: "Optimized_Yield" }
]

export default function TrustBadges() {
    return (
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center py-10 border-y border-white/5 bg-black/20 backdrop-blur-xl">
            {badges.map((badge, i) => {
                const Icon = badge.icon
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-4 group"
                    >
                        <div className="w-10 h-10 flex items-center justify-center bg-zinc-950 border border-zinc-900 group-hover:border-orange-600 transition-colors duration-500">
                            <Icon className="w-5 h-5 text-zinc-700 group-hover:text-orange-500 transition-colors" />
                        </div>
                        <div className="text-left">
                            <div className="text-[9px] font-mono font-black text-white uppercase tracking-[0.4em] mb-1">{badge.label}</div>
                            <div className="text-[8px] font-mono font-bold text-zinc-800 uppercase tracking-widest">{badge.detail}</div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
