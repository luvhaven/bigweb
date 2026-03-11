'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Home, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error for diagnostics
        console.error('System Exception:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans overflow-hidden relative">
            {/* Sophisticated Atmosphere */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.05] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-2xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12 inline-flex items-center justify-center w-28 h-28 rounded-[2rem] bg-accent/5 border border-accent/20 shadow-[0_0_50px_rgba(255,107,53,0.1)] relative group"
                >
                    <div className="absolute inset-0 bg-accent/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <AlertCircle className="w-12 h-12 text-accent relative z-10" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none mb-8"
                >
                    System <br />
                    <span className="text-zinc-600 italic">Interruption.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-zinc-400 mb-16 max-w-lg mx-auto leading-relaxed font-light"
                >
                    We encountered an unexpected error while processing your request.
                    Our engineering team has been notified and we are working to restore service immediately.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <Button
                        onClick={() => reset()}
                        variant="primary"
                        size="lg"
                        className="rounded-full px-12 group"
                    >
                        <RefreshCw className="mr-3 w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                        Refresh Experience
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="rounded-full px-12 border-white/10 hover:border-white/20"
                    >
                        <Link href="/">
                            <Home className="mr-3 w-4 h-4" />
                            Return Home
                        </Link>
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center gap-6"
                >
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Diagnostic Information</span>
                    <div className="flex flex-wrap justify-center gap-3">
                        <div className="px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                            Signal: Interrupted
                        </div>
                        {error.digest && (
                            <div className="px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                                Trace ID: {error.digest}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
