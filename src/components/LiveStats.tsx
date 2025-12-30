'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { Users, Code, Coffee, Award } from 'lucide-react'
import { calculateDynamicStats, formatNumber } from '@/lib/dynamicStats'

export default function LiveStats() {
    // Initialize with dynamic stats based on current date
    const [stats, setStats] = useState(() => calculateDynamicStats())

    // Update stats on mount and periodically (for visual effect)
    useEffect(() => {
        // Recalculate on mount in case user left page open
        setStats(calculateDynamicStats())

        // Visual effect: +2 lines per second, updated every 5 seconds
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                linesOfCode: prev.linesOfCode + 10, // 5 seconds × 2 lines/second = 10 lines
                coffeesConsumed: prev.coffeesConsumed + (Math.random() > 0.7 ? 1 : 0)
            }))
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const statItems = [
        {
            icon: Award,
            label: 'Projects Completed',
            value: stats.projectsCompleted,
            suffix: '+',
            color: 'text-blue-500'
        },
        {
            icon: Users,
            label: 'Happy Clients',
            value: stats.happyClients,
            suffix: '+',
            color: 'text-green-500'
        },
        {
            icon: Code,
            label: 'Lines of Code',
            value: stats.linesOfCode,
            suffix: '',
            color: 'text-purple-500'
        },
        {
            icon: Coffee,
            label: 'Coffees Consumed',
            value: stats.coffeesConsumed,
            suffix: '+',
            color: 'text-orange-500'
        }
    ]

    return (
        <section className="py-24 px-6 bg-secondary/5">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Live Statistics
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Real-time metrics that showcase our impact
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statItems.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 hover:shadow-glow">
                                <div className={`w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 ${stat.color}`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-4xl font-bold mb-2 flex items-baseline gap-1">
                                    <AnimatedCounter
                                        value={stat.value}
                                        duration={2000}
                                    />
                                    <span className="text-2xl">{stat.suffix}</span>
                                </div>
                                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                                    {stat.label}
                                </div>

                                {/* Live Indicator */}
                                {(stat.label.includes('Code') || stat.label.includes('Coffee')) && (
                                    <div className="absolute top-4 right-4 flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <span className="text-xs text-green-500 font-medium">LIVE</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
