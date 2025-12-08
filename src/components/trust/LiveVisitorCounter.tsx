'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

export default function LiveVisitorCounter() {
    const [count, setCount] = useState(124)

    useEffect(() => {
        // Simulate live fluctuation
        const interval = setInterval(() => {
            setCount(prev => {
                const change = Math.floor(Math.random() * 5) - 2 // -2 to +2
                return Math.max(80, prev + change)
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed bottom-6 left-6 z-30 hidden lg:flex items-center gap-3 bg-background/50 backdrop-blur-md border border-border/50 px-4 py-2 rounded-full shadow-lg">
            <div className="relative">
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <Users className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium">
                <motion.span
                    key={count}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold text-foreground mr-1"
                >
                    {count}
                </motion.span>
                <span className="text-muted-foreground">live visitors</span>
            </div>
        </div>
    )
}
