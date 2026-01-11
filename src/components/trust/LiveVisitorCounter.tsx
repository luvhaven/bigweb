'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Users } from 'lucide-react'

export default function LiveVisitorCounter() {
    const [count, setCount] = useState(124)
    const [isVisible, setIsVisible] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const docHeight = document.documentElement.scrollHeight
        const winHeight = window.innerHeight
        const footerThreshold = 400 // Hide when 400px from bottom (footer area)
        const heroThreshold = 300   // Hide when less than 300px from top (hero area)

        if (latest < heroThreshold || latest > (docHeight - winHeight - footerThreshold)) {
            setIsVisible(false)
        } else {
            setIsVisible(true)
        }
    })

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
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed bottom-6 left-6 z-30 hidden lg:flex items-center gap-3 bg-background/60 backdrop-blur-xl border border-border/50 px-4 py-2.5 rounded-full shadow-2xl shadow-black/20"
                >
                    <div className="relative">
                        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <Users className="w-5 h-5 text-accent" />
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
                        <span className="text-muted-foreground/80 lowercase">live visitors lab</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
