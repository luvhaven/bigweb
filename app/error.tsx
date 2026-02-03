'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Home, AlertTriangle, ArrowRight } from 'lucide-react'
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
        console.error('System Exception:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 font-sans">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-orange-600/10 border border-orange-500/20 shadow-[0_0_50px_rgba(234,88,12,0.1)]"
                >
                    <AlertTriangle className="w-10 h-10 text-orange-500" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black mb-6 uppercase italic tracking-tighter"
                >
                    Circuit <span className="text-orange-600">Disruption</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-zinc-500 mb-12 font-medium leading-relaxed"
                >
                    Our automated protocols encountered an unexpected logic exception. We are diagnosticating the root cause to restore pure ROI performance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        onClick={() => reset()}
                        className="h-16 px-8 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl group transition-all"
                    >
                        <RefreshCw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                        Retry Connection
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="h-16 px-8 border-white/10 hover:bg-white/5 text-white font-black uppercase tracking-widest rounded-2xl"
                    >
                        <Link href="/">
                            <Home className="mr-2 w-5 h-5" />
                            Emergency Home
                        </Link>
                    </Button>
                </motion.div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">System Diagnostic Logs</p>
                    <div className="flex gap-4">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-500">
                            STATUS: OFFLINE
                        </div>
                        {error.digest && (
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-500">
                                LOG_ID: {error.digest}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
