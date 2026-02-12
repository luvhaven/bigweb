'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, BarChart3, Globe, Fingerprint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Magnetic from '@/components/ui/Magnetic'

interface HeroData {
    title: string
    subtitle?: string
    description?: string
    cta_primary_text?: string
    cta_primary_url?: string
    cta_secondary_text?: string
    cta_secondary_url?: string
}

interface EliteImmersiveHeroProps {
    heroData?: HeroData | null
}

const CinematicBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
        {/* Deep Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,75,0,0.18),_transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,_rgba(20,20,255,0.12),_transparent_60%)]" />

        {/* Grid System - Always Visible */}
        <div className="absolute inset-0 opacity-[0.06] bg-[url('/grid.svg')] bg-[size:50px_50px]" />

        {/* Cinematic Noise Layer */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
    </div>
)

const MetricBadge = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-4 p-4 bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center text-orange-500">
            <Icon size={18} />
        </div>
        <div className="flex flex-col">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
            <span className="text-sm font-bold text-white">{value}</span>
        </div>
    </div>
)

export const EliteImmersiveHero = ({ heroData }: EliteImmersiveHeroProps) => {
    // 1. Data Safety Guard - Guaranteed Fallbacks
    const title = heroData?.title || "We Build Websites That Sell."
    const subtitle = heroData?.subtitle || "High-performance web engineering for elite teams who measure success in revenue, not traffic."

    // 2. Rendering Strategy: Plain HTML with CSS Entry Animations to bypass any Framer Motion issues
    return (
        <section className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden selection:bg-orange-600/30">
            <CinematicBackground />

            {/* Main Conversion Stage - HIGH PRIORITY Z-INDEX */}
            <div className="relative z-[60] container mx-auto px-6 text-center max-w-7xl">

                {/* 1. Status Indicator - CSS Animated */}
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full mb-12 shadow-2xl animate-fade-in [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
                    <div className="relative h-2.5 w-2.5">
                        <span className="absolute h-full w-full rounded-full bg-orange-500 animate-ping opacity-50"></span>
                        <span className="relative h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_12px_#f97316] block"></span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-100">
                        Operational Status: <span className="text-orange-500">Elite</span>
                    </span>
                </div>

                {/* 2. Primary Headline - Guaranteed Visible */}
                <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-bold leading-[0.85] tracking-tighter-epic text-white mb-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] animate-fade-in [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
                    {title}
                </h1>

                {/* 3. Sub-Headline */}
                <p className="text-lg md:text-2xl text-white/70 font-medium max-w-3xl mx-auto mb-16 leading-tight tracking-tight animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
                    {subtitle}
                </p>

                {/* 4. Action Engine */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-12 animate-fade-in [animation-delay:800ms] opacity-0 [animation-fill-mode:forwards]">
                    <Link href="/offers/revenue-roadmap">
                        <Magnetic strength={0.2}>
                            <Button size="xl" className="h-24 px-16 bg-white text-black hover:bg-orange-600 hover:text-white rounded-xl font-bold text-xs tracking-[0.6em] transition-all duration-700 shadow-[0_20px_50px_rgba(255,100,0,0.2)] border-0">
                                START PROJECT <ArrowRight className="ml-6 w-5 h-5" />
                            </Button>
                        </Magnetic>
                    </Link>

                    <Link href="/case-studies" className="group flex items-center gap-6">
                        <div className="w-16 h-[1px] bg-zinc-800 group-hover:w-24 group-hover:bg-orange-500 transition-all duration-700" />
                        <span className="text-[11px] font-bold text-zinc-500 group-hover:text-white uppercase tracking-[0.7em] transition-colors">
                            THE ARCHIVE
                        </span>
                    </Link>
                </div>
            </div>

            {/* Desktop-Only HUD Elements - Pure HTML/CSS for stability */}
            <div className="absolute inset-x-12 bottom-12 z-50 flex justify-between items-end pointer-events-none hidden md:flex">
                <div className="flex flex-col gap-5 animate-fade-in [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
                    <MetricBadge icon={Zap} label="Optimization" value="99.8% Core Web Vitals" />
                    <MetricBadge icon={BarChart3} label="Revenue Lift" value="+412% Project Median" />
                </div>

                <div className="flex flex-col items-end gap-10 h-full justify-end animate-fade-in [animation-delay:1200ms] opacity-0 [animation-fill-mode:forwards]">
                    <div className="text-[10px] font-mono font-bold text-orange-500 tracking-[0.4em] uppercase bg-orange-600/10 px-6 py-3 border border-orange-500/30 shadow-2xl backdrop-blur-3xl">
                        ESTABLISHED 2018 | HKG.LND.SFO
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-zinc-800 to-zinc-500" />
                        <span className="text-[9px] font-bold tracking-[1.2em] text-zinc-600 uppercase">EXPLORE SYSTEMS</span>
                    </div>
                </div>
            </div>

            {/* Ambient Atmosphere - Non-interfering Layers */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.07]">
                <Globe className="absolute top-[12%] left-[4%] w-[380px] h-[380px] text-zinc-100" strokeWidth={0.3} />
                <Fingerprint className="absolute bottom-[15%] right-[2%] w-[480px] h-[480px] text-zinc-100" strokeWidth={0.2} />
            </div>

            {/* Deep Dynamic Accents (Framer Motion used ONLY for background pulse) */}
            <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none z-0"
            />
        </section>
    )
}
