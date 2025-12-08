'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Show after scrolling past hero (e.g., 600px)
            // Hide if scrolling up significantly or at very top
            if (currentScrollY > 600) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none"
                >
                    <div className="max-w-4xl mx-auto bg-background/80 backdrop-blur-xl border border-border/50 rounded-full shadow-2xl p-2 pl-6 flex items-center justify-between pointer-events-auto">
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="font-medium text-sm">Accepting New Projects for Q1 2026</span>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                            <span className="sm:hidden font-medium text-sm">Start your project</span>
                            <Link href="/contact">
                                <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 group">
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Get a Proposal
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
