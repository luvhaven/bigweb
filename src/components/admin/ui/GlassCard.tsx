'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: React.ReactNode
    variant?: 'default' | 'elevated' | 'subtle'
    hover?: boolean
    glow?: boolean
    className?: string
}

const variants = {
    default: 'bg-zinc-900/60 border-zinc-800/50',
    elevated: 'bg-zinc-900/80 border-zinc-700/50 shadow-xl',
    subtle: 'bg-zinc-900/40 border-zinc-800/30'
}

export function GlassCard({
    children,
    variant = 'default',
    hover = true,
    glow = false,
    className,
    ...props
}: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
            className={cn(
                'relative rounded-xl border backdrop-blur-xl overflow-hidden',
                variants[variant],
                glow && 'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-emerald-500/10 before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Stat widget for dashboard metrics
interface StatWidgetProps {
    title: string
    value: string | number
    change?: number
    icon: React.ReactNode
    trend?: 'up' | 'down' | 'neutral'
    loading?: boolean
}

export function StatWidget({
    title,
    value,
    change,
    icon,
    trend = 'neutral',
    loading = false
}: StatWidgetProps) {
    const trendColors = {
        up: 'text-emerald-500',
        down: 'text-red-500',
        neutral: 'text-zinc-400'
    }

    return (
        <GlassCard className="p-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-400 mb-1">{title}</p>
                    {loading ? (
                        <div className="h-8 w-24 bg-zinc-800 rounded animate-pulse" />
                    ) : (
                        <p className="text-3xl font-bold text-white">{value}</p>
                    )}
                    {change !== undefined && !loading && (
                        <div className={cn('flex items-center gap-1 mt-2 text-sm', trendColors[trend])}>
                            {trend === 'up' && (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                            )}
                            {trend === 'down' && (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            )}
                            <span>{change > 0 ? '+' : ''}{change}%</span>
                            <span className="text-zinc-500">vs last week</span>
                        </div>
                    )}
                </div>
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
                    {icon}
                </div>
            </div>
        </GlassCard>
    )
}

// Activity item for timeline
interface ActivityItemProps {
    icon: React.ReactNode
    title: string
    description: string
    time: string
    status?: 'success' | 'warning' | 'error' | 'info'
}

export function ActivityItem({
    icon,
    title,
    description,
    time,
    status = 'info'
}: ActivityItemProps) {
    const statusColors = {
        success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        error: 'bg-red-500/10 text-red-500 border-red-500/20',
        info: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    }

    return (
        <div className="flex gap-4 p-4 rounded-lg hover:bg-zinc-800/50 transition-colors">
            <div className={cn('p-2 rounded-lg border', statusColors[status])}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{title}</p>
                <p className="text-sm text-zinc-400 truncate">{description}</p>
            </div>
            <span className="text-xs text-zinc-500 whitespace-nowrap">{time}</span>
        </div>
    )
}

// Section header
interface SectionHeaderProps {
    title: string
    description?: string
    action?: React.ReactNode
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
                {description && (
                    <p className="text-sm text-zinc-400 mt-1">{description}</p>
                )}
            </div>
            {action}
        </div>
    )
}

// Empty state
interface EmptyStateProps {
    icon: React.ReactNode
    title: string
    description: string
    action?: React.ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-zinc-800/50 text-zinc-400 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-400 max-w-sm mb-6">{description}</p>
            {action}
        </div>
    )
}

// Loading skeleton
export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn('bg-zinc-800 rounded animate-pulse', className)} />
    )
}
