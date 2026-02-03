'use client'

import { motion } from 'framer-motion'

export const ChromeShimmer = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
            {/* Ambient Base Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(254,80,0,0.1),_transparent_70%)] opacity-50" />

            {/* The Main Abstract "Object" */}
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="relative w-96 h-96 md:w-[500px] md:h-[500px]"
            >
                {/* Layered Glass/Chrome Orbs */}
                <div className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-3xl bg-gradient-to-tr from-white/5 via-orange-500/10 to-transparent shadow-[inset_0_0_80px_rgba(255,255,255,0.05)]" />

                {/* Shimmer Streaks */}
                <motion.div
                    animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-45 scale-150"
                />

                {/* Internal Pulsing Core */}
                <motion.div
                    animate={{
                        boxShadow: [
                            '0 0 40px rgba(254,80,0,0.2)',
                            '0 0 100px rgba(254,80,0,0.4)',
                            '0 0 40px rgba(254,80,0,0.2)'
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-20 rounded-full bg-gradient-to-br from-zinc-900 to-black border border-white/5 flex items-center justify-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:10px_10px] opacity-10" />
                    <div className="text-[10px] font-mono font-bold text-orange-500 tracking-[0.5em] opacity-30 select-none uppercase">
                        Clinical_Engineering
                    </div>
                </motion.div>
            </motion.div>

            {/* Scanning Laser Line */}
            <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent z-10 shadow-[0_0_20px_rgba(254,80,0,0.5)]"
            />

            {/* Corner Metadata (Apple Newsroom Style) */}
            <div className="absolute bottom-12 right-12 text-zinc-800 font-mono text-[9px] flex flex-col items-end gap-1 uppercase tracking-widest opacity-40">
                <span>System_Status: Optimal</span>
                <span>Latency: 2ms</span>
                <span>Kernel: v2.026.4</span>
            </div>
        </div>
    )
}
