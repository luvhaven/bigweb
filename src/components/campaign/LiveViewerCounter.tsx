'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Users } from 'lucide-react'

interface LiveViewerCounterProps {
    packageSlug: string
    baseCount?: number
    className?: string
}

export default function LiveViewerCounter({ packageSlug, baseCount = 12, className = '' }: LiveViewerCounterProps) {
    const [viewerCount, setViewerCount] = useState(baseCount)
    const [recentAction, setRecentAction] = useState<string | null>(null)

    useEffect(() => {
        // Simulate realistic viewer fluctuation
        const interval = setInterval(() => {
            setViewerCount(prev => {
                const change = Math.random() > 0.5 ? 1 : -1
                const newCount = prev + change
                return Math.max(baseCount - 3, Math.min(baseCount + 8, newCount))
            })
        }, 3000 + Math.random() * 5000)

        // Simulate recent actions
        const actions = [
            "Someone from New York just viewed this offer",
            "A business owner from London is checking this out",
            "2 people from Dubai are viewing now",
            "Someone from Toronto just opened this page",
            "A startup founder from Sydney is interested"
        ]

        const actionInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                setRecentAction(actions[Math.floor(Math.random() * actions.length)])
                setTimeout(() => setRecentAction(null), 4000)
            }
        }, 8000)

        return () => {
            clearInterval(interval)
            clearInterval(actionInterval)
        }
    }, [baseCount])

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Live Viewer Count */}
            <motion.div
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <Eye className="w-4 h-4 text-white/50" />
                <span className="text-white/70">
                    <motion.span
                        key={viewerCount}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-semibold text-white"
                    >
                        {viewerCount}
                    </motion.span>
                    {' '}people viewing this offer right now
                </span>
            </motion.div>

            {/* Recent Action Notification */}
            <AnimatePresence>
                {recentAction && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        className="flex items-center gap-2 text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                    >
                        <Users className="w-3 h-3 text-accent" />
                        <span className="text-white/60">{recentAction}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
