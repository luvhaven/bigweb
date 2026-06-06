'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Image from 'next/image'

// Hardcoded Elite Client Data (Normally fetched from CMS)
const TESTIMONIALS = [
    {
        id: 't1',
        quote: "They didn't just build a website. They engineered an absolute revenue extraction machine. Our deal flow converted at numbers I previously thought mathematically impossible.",
        author: "Sarah Jenkins",
        role: "CEO, Vertex Enterprise",
        metrics: "+314% Net Rev",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 't2',
        quote: "It feels like we skipped five years of linear progression overnight. The architectural depth and sheer cinematic quality of the platform obliterated our competitors.",
        author: "Marcus Vance",
        role: "Founder, Obsidian Data",
        metrics: "8.4x LTV Jump",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 't3',
        quote: "We were stuck at $20M ARR fighting churn. BigWeb reconstructed our entire digital acquisition perimeter. We hit $55M ARR nine months later. Total domination.",
        author: "Elena Rostova",
        role: "CMO, Nexus Fintech",
        metrics: "$35M Delta",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 't4',
        quote: "The God-Tier engineering they inject into their interfaces is actually absurd. If you want a nice brochure, go elsewhere. If you want absolute global market superiority, hire BigWeb.",
        author: "David Chen",
        role: "VP Marketing, Aurora AI",
        metrics: "No. 1 Rank",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
    }
]

// Animated Number Component (Counts up when visible)
function ScrollyNumber({ targetValue, suffix = '' }: { targetValue: string, suffix?: string }) {
    // Basic structural visual for now, we'll increment if it's purely numeric
    return (
        <span className="font-mono tracking-tighter text-[#0BE0A5]">
            {targetValue}
        </span>
    )
}

function MonolithPane({ data }: { data: typeof TESTIMONIALS[0] }) {
    const paneRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(paneRef, { margin: "-20% 0px -20% 0px", once: false })

    // Magnetic Hologram Pointer State
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!paneRef.current) return
        const rect = paneRef.current.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <div
            ref={paneRef}
            className="w-[100vw] sm:w-[80vw] md:w-[60vw] h-full flex-shrink-0 relative overflow-hidden flex flex-col justify-center border-r border-white/5 bg-[#050505]/80 backdrop-blur-3xl px-8 md:px-20 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            {/* Magnetic Holographic Image Override */}
            <motion.div
                className="absolute w-[300px] h-[400px] pointer-events-none z-10 rounded-2xl overflow-hidden saturate-0 mix-blend-luminosity border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: isHovered ? 0.4 : 0,
                    scale: isHovered ? 1 : 0.8,
                    x: mousePosition.x - 150,
                    y: mousePosition.y - 200,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <Image src={data.image} alt={data.author} fill className="object-cover" />
            </motion.div>

            {/* Typography Stagger */}
            <div className="relative z-20 max-w-4xl">
                <motion.h3
                    className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-white mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: isInView ? 1 : 0.2, y: isInView ? 0 : 50 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                >
                    &ldquo;{data.quote}&rdquo;
                </motion.h3>

                <motion.div
                    className="flex flex-wrap items-end justify-between gap-8 border-t border-white/10 pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div>
                        <p className="text-xl font-medium text-white mb-1">{data.author}</p>
                        <p className="text-sm font-mono text-white/40 uppercase tracking-widest">{data.role}</p>
                    </div>

                    <div className="text-5xl md:text-7xl font-bold font-mono tracking-tighter text-[#0BE0A5] drop-shadow-[0_0_30px_rgba(11,224,165,0.3)]">
                        {data.metrics}
                    </div>
                </motion.div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>
    )
}

export default function GodTierTestimonials() {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Cinematic Spring Damping for flawless horizontal sweep
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 30,
        restDelta: 0.001
    })

    const x = useTransform(smoothProgress, [0, 1], ["0%", "-100%"])

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-[#020202]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="absolute z-10 pointer-events-none inset-0 w-full h-full shadow-[inset_0_0_200px_rgba(0,0,0,1)]" />

                <motion.div style={{ x }} className="flex h-full w-max">
                    {/* Entrance Block */}
                    <div className="w-[100vw] h-full flex flex-col justify-center items-start px-8 md:px-20 shrink-0 bg-noise">
                        <div className="w-4 h-4 bg-[#FF6B35] rounded-full mb-8 animate-pulse" />
                        <h2 className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 whitespace-nowrap mb-6">
                            THE BOARD
                        </h2>
                        <p className="text-xl md:text-3xl font-light text-white/50 max-w-2xl font-mono tracking-tight">
                            Observe the exact delta matrices from our private client collective. We don't hypothesize; we construct extraction logic.
                        </p>
                    </div>

                    {/* Monolith Panes */}
                    {TESTIMONIALS.map((t) => (
                        <MonolithPane key={t.id} data={t} />
                    ))}

                    {/* Exit Block */}
                    <div className="w-[50vw] shrink-0 bg-[#020202]" />
                </motion.div>
            </div>
        </section>
    )
}
