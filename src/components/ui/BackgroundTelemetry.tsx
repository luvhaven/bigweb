'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TELEMETRY_STRINGS = [
    "CONVERSION_DELTA_0.42",
    "LATENCY_MS_12",
    "LOAD_BALANCER_ACTIVE",
    "HYDRATION_STABLE",
    "UX_FRICTION_0.02",
    "RENDER_CYCLE_OPTIMIZED",
    "BINARY_GUARDIAN_LIVE",
    "MESH_STABILITY_0.99",
    "DATA_OBJECT_FETCH",
    "CACHE_HIT_RATE_98%",
    "TRAFFIC_INTENT_DETECTED",
    "BEHAVIORAL_LOGIC_SYNC"
]

export default function BackgroundTelemetry() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-[0.03]">
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0
                    }}
                    animate={{
                        y: ["0%", "100%"],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 20 + Math.random() * 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                    className="absolute font-mono text-[10px] whitespace-nowrap text-white font-bold tracking-[0.3em] uppercase"
                    style={{
                        left: `${Math.random() * 100}%`,
                        writingMode: 'vertical-lr'
                    }}
                >
                    {TELEMETRY_STRINGS[Math.floor(Math.random() * TELEMETRY_STRINGS.length)]}
                </motion.div>
            ))}

            {/* Horizontal drifting strings */}
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    initial={{
                        x: "100%",
                        y: Math.random() * 100 + "%",
                        opacity: 0
                    }}
                    animate={{
                        x: ["-10%", "110%"],
                        opacity: [0, 0.5, 0.5, 0]
                    }}
                    transition={{
                        duration: 30 + Math.random() * 30,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 15
                    }}
                    className="absolute font-mono text-[9px] font-bold text-orange-500 whitespace-nowrap tracking-widest uppercase"
                >
                    {TELEMETRY_STRINGS[Math.floor(Math.random() * TELEMETRY_STRINGS.length)]} // RUN_ID_{Math.floor(Math.random() * 10000)}
                </motion.div>
            ))}
        </div>
    )
}
