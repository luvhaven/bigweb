'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ExitIntentModal() {
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

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10001]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "20px" }}
                        className="fixed top-1/2 left-1/2 w-full max-w-lg bg-[#1a1a1a] border border-orange-500/20 rounded-2xl p-8 z-[10002] shadow-2xl overflow-hidden"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 z-50 p-2 text-white/40 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative text-center space-y-6">
                            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gift className="w-8 h-8 text-orange-500" />
                            </div>

                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                Wait! Don't Miss Out
                            </h2>

                            <p className="text-white/60 text-lg">
                                Get a <span className="text-orange-400 font-semibold">Free Conversion Audit</span> for your website usually worth $500. Limited time offer for new visitors.
                            </p>

                            <div className="flex flex-col gap-3">
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        onClick={() => setIsVisible(false)}
                                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold h-12 text-lg group"
                                    >
                                        Claim My Free Audit
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-white/40 hover:text-white text-sm mt-2 transition-colors"
                                >
                                    No thanks, I don't want to improve my conversion rate
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
