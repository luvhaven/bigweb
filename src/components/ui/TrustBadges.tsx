'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Award, Star, CheckCircle } from 'lucide-react'

const badges = [
    { icon: Shield, label: "Secure Payment", sub: "256-bit SSL" },
    { icon: Award, label: "Award Winning", sub: "Top Agency 2024" },
    { icon: Star, label: "5-Star Rated", sub: "100+ Reviews" },
    { icon: CheckCircle, label: "Satisfaction", sub: "100% Guaranteed" },
]

export default function TrustBadges() {
    return (
        <div className="flex flex-wrap justify-center gap-8 py-8">
            {badges.map((badge, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 px-4 py-2 bg-secondary/5 rounded-full border border-border/50"
                >
                    <badge.icon className="w-5 h-5 text-accent" />
                    <div className="text-left">
                        <div className="text-sm font-bold leading-none">{badge.label}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{badge.sub}</div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
