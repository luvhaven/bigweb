'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Magnetic from '@/components/ui/Magnetic'
import { ChromeShimmer } from '@/components/ui/ChromeShimmer'

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

export const EliteImmersiveHero = ({ heroData }: EliteImmersiveHeroProps) => {
    const title = "REVENUE. ENGINEERED."
    const subtitle = "We replace creative guesswork with high-performance conversion systems."

    return (
        <section className="relative h-[100svh] w-full overflow-hidden bg-black text-white border-b border-zinc-900 flex flex-col items-center justify-center">
            {/* Background Dynamics */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,77,0,0.03),_transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.02]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Clinical Status Badge */}
                    <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-zinc-950 border border-zinc-900 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-zinc-500">System_Active_v26.04</span>
                    </div>

                    <h1 className="text-6xl md:text-[11rem] font-black leading-[0.85] tracking-tighter-extreme uppercase mb-12">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className="inline-block hover:italic transition-all duration-300">
                                {word}<br className="md:hidden" />{' '}
                            </span>
                        ))}
                    </h1>

                    <p className="text-xl md:text-3xl text-zinc-400 font-medium max-w-3xl mx-auto mb-16 leading-tight tracking-tight">
                        {subtitle}
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Link href="/offers/revenue-roadmap">
                            <Magnetic strength={0.3}>
                                <Button className="h-20 px-12 bg-white text-black hover:bg-orange-600 hover:text-white font-black text-xs uppercase tracking-[0.4em] rounded-none transition-all duration-500 shadow-2xl">
                                    INITIALIZE DIAGNOSTIC
                                    <ArrowRight className="ml-4 w-5 h-5" />
                                </Button>
                            </Magnetic>
                        </Link>

                        <Link href="/case-studies" className="group">
                            <span className="text-[10px] font-mono font-black text-zinc-600 hover:text-white uppercase tracking-[0.5em] transition-all flex items-center gap-2">
                                VIEW EVIDENCE <span className="w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-orange-500 transition-all duration-500" />
                            </span>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Immersive Background Visualization (Absolute centered/large) */}
            <div className="absolute inset-0 -z-10 opacity-30 mask-radial-fade">
                <ChromeShimmer />
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-zinc-800"
            >
                <span className="text-[9px] font-mono font-black uppercase tracking-[0.8em]">Scroll_to_Deploy</span>
                <ChevronDown className="w-5 h-5" />
            </motion.div>
        </section>
    )
}
