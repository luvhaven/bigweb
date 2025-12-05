'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const { scrollYProgress } = useScroll()
    const scalePath = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed bottom-24 right-6 z-40 hidden md:block"
                >
                    <button
                        onClick={scrollToTop}
                        className="relative w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center group hover:border-accent transition-colors"
                    >
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-muted/20"
                            />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-accent"
                                style={{ pathLength: scalePath }}
                            />
                        </svg>
                        <ArrowUp className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
