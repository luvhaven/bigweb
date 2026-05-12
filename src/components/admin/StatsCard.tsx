'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
    title: string
    value: string | number
    change?: number
    trend?: 'up' | 'down' | 'neutral'
    icon: React.ReactNode
    loading?: boolean
    description?: string
}

export default function StatsCard({
    title,
    value,
    change,
    trend,
    icon,
    loading,
    description
}: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-all shadow-sm"
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                    <div className="flex items-baseline gap-2">
                        {loading ? (
                            <div className="h-8 w-24 bg-secondary animate-pulse rounded" />
                        ) : (
                            <h3 className="text-3xl font-bold text-foreground">{value}</h3>
                        )}

                        {change !== undefined && (
                            <div className={cn(
                                'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                                trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' :
                                    trend === 'down' ? 'bg-red-500/10 text-red-500' :
                                        'bg-zinc-500/10 text-zinc-500'
                            )}>
                                {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> :
                                    trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
                                <span>{Math.abs(change)}%</span>
                            </div>
                        )}
                    </div>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-2">{description}</p>
                    )}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {icon}
                </div>
            </div>
        </motion.div>
    )
}
