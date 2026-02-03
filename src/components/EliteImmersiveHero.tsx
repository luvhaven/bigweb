'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Pause, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { PhysicsReveal } from '@/components/ui/PhysicsReveal'
import Magnetic from '@/components/ui/Magnetic'

interface HeroData {
    title: string
    subtitle?: string
    description?: string
    cta_primary_text?: string
    cta_primary_url?: string
    cta_secondary_text?: string
    cta_secondary_url?: string
    stats?: Array<{ label: string; value: string; suffix?: string }>
}

interface EliteImmersiveHeroProps {
    heroData?: HeroData | null
}

export const EliteImmersiveHero = ({ heroData }: EliteImmersiveHeroProps) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    // Default slides (fallback if no CMS data)
    const defaultSlides = [
        {
            headline: "CONVERSION IS NOT AN ACCIDENT",
            description: "We replace creative guesswork with engineered systems that turn traffic into predictable revenue.",
            image: "/images/hero/revenue_system.png",
            cta: "DIAGNOSE MY SYSTEM",
            link: "/offers/revenue-roadmap",
            stats: { label: "SUCCESS RATE", value: "94.2%" }
        },
        {
            headline: "THE CONVERSION LAB™",
            description: "We build the infrastructure of market dominance through high-performance engineering & optimization.",
            image: "/images/hero/growth_team.png",
            cta: "EXPLORE OUR LAB",
            link: "/offers/revenue-system",
            stats: { label: "TESTS RUN", value: "1,240+" }
        },
        {
            headline: "ENGINEERED FOR SCALE",
            description: "We construct the full-funnel architecture required for industrial-scale revenue generation.",
            image: "/images/hero/design_fix.png",
            cta: "BUILD MY SYSTEM",
            link: "/offers/revenue-system",
            stats: { label: "REVENUE FIXED", value: "$4.2M+" }
        }
    ]

    // Use CMS data if available, otherwise use default
    const slides = heroData ? [{
        headline: heroData.title.toUpperCase(),
        description: heroData.description || heroData.subtitle || '',
        image: "/images/hero/revenue_system.png",
        cta: heroData.cta_primary_text || "GET STARTED",
        link: heroData.cta_primary_url || "/contact",
        stats: heroData.stats?.[0] ? { label: heroData.stats[0].label, value: heroData.stats[0].value + (heroData.stats[0].suffix || '') } : { label: "SUCCESS RATE", value: "99%" }
    }] : defaultSlides

    useEffect(() => {
        if (!isPlaying) return

        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 8000)

        return () => clearTimeout(timer)
    }, [currentSlide, isPlaying, slides.length])

    return (
        <section className="relative h-[100svh] w-full overflow-hidden bg-black text-white border-b border-zinc-900">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(255,77,0,0.05),_transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:60px_60px] opacity-[0.03]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-60" />
            </div>

            <div className="flex flex-col lg:flex-row h-full relative z-10">
                {/* Left Side: Content (50%) */}
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-10 lg:pt-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-[700px] relative z-20 flex flex-col justify-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className="inline-flex items-center gap-4 mb-4"
                            >
                                <span className="w-12 h-[2px] bg-zinc-800" />
                                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.8em] text-zinc-600">ENGAGEMENT_SEQUENCER_0{currentSlide + 1}</span>
                            </motion.div>

                            <motion.h1
                                className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] 2xl:text-[6.5rem] font-black mb-6 leading-[0.8] uppercase italic tracking-tighter break-words"
                            >
                                {slides[currentSlide].headline.split(' ').map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.8 }}
                                        className="inline-block mr-[0.1em] last:mr-0"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-lg md:text-xl text-zinc-500 mb-8 leading-snug font-medium max-w-lg border-l border-orange-600/30 pl-6"
                            >
                                {slides[currentSlide].description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
                            >
                                <Link href={slides[currentSlide].link} className="w-full sm:w-auto">
                                    <Magnetic strength={0.2} className="w-full sm:w-auto">
                                        <Button
                                            size="lg"
                                            className="w-full sm:w-auto bg-white text-black hover:bg-orange-600 hover:text-white font-black text-xs px-8 h-14 rounded-full transition-all duration-500 uppercase tracking-[0.4em] group/btn"
                                        >
                                            {slides[currentSlide].cta}
                                            <ArrowRight className="ml-4 w-4 h-4 group-hover:btn:translate-x-3 transition-transform" />
                                        </Button>
                                    </Magnetic>
                                </Link>

                                <Link href="/case-studies" className="w-full sm:w-auto h-14 flex items-center">
                                    <span className="text-white hover:text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] transition-colors cursor-pointer ml-4">
                                        THE EVIDENCE
                                    </span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Side: Immersive Image (50%) */}
                <div className="w-full lg:w-1/2 h-full relative overflow-hidden hidden lg:block border-l border-zinc-900 bg-black">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, filter: 'blur(20px) grayscale(1)' }}
                            animate={{ opacity: 1, filter: 'blur(0px) grayscale(0)' }}
                            exit={{ opacity: 0, filter: 'blur(20px) grayscale(1)' }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            <div className="relative w-full h-full">
                                <PhysicsReveal
                                    className="w-full h-full"
                                    revealSize={300}
                                    dampening={20}
                                    cover={
                                        <Image
                                            src={slides[currentSlide].image}
                                            alt="Revenue Visualization"
                                            fill
                                            className="object-cover opacity-60 grayscale-[0.5]"
                                            priority
                                        />
                                    }
                                >
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src={slides[currentSlide].image}
                                            alt="Revenue Visualization Revealed"
                                            fill
                                            className="object-cover contrast-125"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-orange-600/10 mix-blend-color-dodge" />
                                        <div className="absolute inset-x-0 h-[2px] bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.8)] top-1/2 -translate-y-1/2 opacity-20" />
                                    </div>
                                </PhysicsReveal>
                                {/* Scanners & Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
                                <motion.div
                                    animate={{ y: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-x-0 h-[1px] bg-orange-500/40 z-20 shadow-[0_0_20px_rgba(249,115,22,1)]"
                                />


                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Vertical Bar Navigation & Controls */}
            <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-12">
                <div className="flex flex-col gap-6">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setCurrentSlide(i)
                                setIsPlaying(false)
                            }}
                            className="group relative h-16 w-6 flex flex-col items-center justify-center p-2"
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            <div className="relative h-full w-[2px] overflow-hidden">
                                <div className="absolute inset-0 bg-white/5" />
                                <motion.div
                                    animate={{
                                        height: i === currentSlide ? "100%" : "0%",
                                        opacity: i === currentSlide ? 1 : 0
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 20
                                    }}
                                    className="absolute top-0 w-full bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                                />
                            </div>

                            <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-x-4 group-hover:translate-x-0">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap bg-zinc-950 border border-zinc-900 px-4 py-2 shadow-2xl">
                                    Strategic_Layer_0{i + 1}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-zinc-950 border border-zinc-900 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-all text-zinc-600 hover:text-white group/play"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
            </div>

            {/* Bottom Global Indicator */}
            <div className="absolute bottom-12 left-24 right-20 z-30 flex items-center justify-end pointer-events-none">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden lg:flex flex-col items-center gap-3 text-zinc-800 opacity-40"
                >
                    <span className="text-[10px] uppercase font-black tracking-[0.8em]">Scroll to Decode</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </div>
        </section>
    )
}
