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
            label: 'UPTIME PERFORMANCE',
            value: 99.9,
            suffix: '%',
            description: 'Guaranteed Reliability',
            color: 'text-white'
        },
        {
            icon: TrendingUp,
            label: 'REVENUE IMPACT',
            value: stats.happyClients * 2.5,
            prefix: '$',
            suffix: 'M+',
            description: 'Client Success',
            color: 'text-orange-600'
        },
        {
            icon: Globe,
            label: 'GLOBAL DEPLOYMENTS',
            value: 450,
            suffix: '+',
            description: 'Active Systems',
            color: 'text-white'
        },
        {
            icon: ShieldCheck,
            label: 'SECURITY PROTOCOLS',
            value: 100,
            suffix: '%',
            description: 'Data Sovereign',
            color: 'text-white'
        }
    ]

    return (
        <section className="py-20 px-6 bg-black border-y border-white/5 relative overflow-hidden group">
            {/* Contextual Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_rgba(255,75,0,0.05),_transparent_60%)]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-[size:30px_30px]" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
                    {/* Integrated Monitoring Badge */}
                    <div className="flex items-center gap-4 bg-white/[0.02] backdrop-blur-3xl border border-white/10 px-6 py-2.5 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full bg-orange-500 opacity-40 rounded-full"></span>
                            <span className="relative inline-flex h-2 w-2 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] rounded-full"></span>
                        </div>
                        <span className="text-[10px] font-black text-zinc-400 tracking-[0.4em] uppercase">
                            Operational Intelligence <span className="text-zinc-700 ml-2">Monitor_v4</span>
                        </span>
                    </div>

                    {/* Elite Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 w-full md:w-auto">
                        {statItems.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                className="flex flex-col gap-3 group/stat"
                            >
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl md:text-5xl font-black italic tracking-tighter-clinical leading-none ${stat.color} brightness-110 drop-shadow-lg`}>
                                        {stat.prefix}<AnimatedCounter value={stat.value} duration={2500} />{stat.suffix}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full opacity-60 scale-0 group-hover/stat:scale-100 transition-transform" />
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] group-hover/stat:text-zinc-400 transition-colors">
                                        {stat.label}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
