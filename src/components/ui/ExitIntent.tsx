'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ExitIntent() {
    const [isVisible, setIsVisible] = useState(false)
    const [hasShown, setHasShown] = useState(false)

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true)
                setHasShown(true)
            }
        }

        document.addEventListener('mouseleave', handleMouseLeave)
        return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }, [hasShown])

    if (!isVisible) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                onClick={() => setIsVisible(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-background border border-border rounded-3xl p-8 max-w-lg w-full relative shadow-2xl overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-purple-500 to-accent" />

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Gift className="w-8 h-8 text-accent" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Wait! Don't Miss Out</h2>
                        <p className="text-muted-foreground">
                            Get our exclusive "2025 Web Trends Report" completely free before you go.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <Input placeholder="Enter your email address" className="h-12 bg-muted/50" />
                        <Button className="w-full h-12 bg-accent hover:bg-accent-dark text-white text-lg font-bold shadow-glow">
                            Send Me The Report
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            No spam, unsubscribe anytime.
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
