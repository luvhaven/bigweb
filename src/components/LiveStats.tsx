'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { TrendingUp, Activity, Database, Zap, Globe, ShieldCheck } from 'lucide-react'
import { calculateDynamicStats } from '@/lib/dynamicStats'

export default function LiveStats() {
    const [stats, setStats] = useState(() => calculateDynamicStats())

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(calculateDynamicStats())
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const statItems = [
        {
            icon: Zap,
            label: 'THROUGHPUT_EFFICIENCY',
            value: 98.4,
            suffix: '%',
            description: 'Uptime Efficiency',
            color: 'text-white'
        },
        {
            icon: TrendingUp,
            label: 'CAPITAL_CAPTURED',
            value: stats.happyClients * 12.5,
            prefix: '$',
            suffix: 'M+',
            description: 'Client Growth',
            color: 'text-orange-600'
        },
        {
            icon: Globe,
            label: 'ACTIVE_NODES',
            value: 842,
            suffix: '+',
            description: 'Active Deployments',
            color: 'text-white'
        },
        {
            icon: ShieldCheck,
            label: 'THREATS_REMEDIATED',
            value: 1240,
            suffix: '+',
            description: 'Security Protocols',
            color: 'text-white'
        }
    ]

    return (
        <section className="py-16 px-6 bg-black border-y border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:20px_20px]" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
                    {/* Status Indicator */}
                    <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-900 px-6 py-2">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full bg-orange-600 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 bg-orange-600"></span>
                        </div>
                        <span className="text-[10px] font-mono font-black text-zinc-600 tracking-[0.5em] uppercase">
                            Telemetry_Inbound_v4
                        </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 w-full md:w-auto">
                        {statItems.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col gap-2"
                            >
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-3xl md:text-4xl font-black italic tracking-tighter leading-none ${stat.color}`}>
                                        {stat.prefix}<AnimatedCounter value={stat.value} duration={2000} />{stat.suffix}
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
