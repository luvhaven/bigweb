'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { MouseReveal, RevealPatterns } from '@/components/ui/MouseReveal'

interface HeroPremiumProps {
    title: string
    highlight: string
    description: string
    badgeText?: string
    themeColor: 'blue' | 'purple' | 'green' | 'orange' | 'cyan' | 'emerald' | 'indigo' | 'violet'
    backgroundImage?: StaticImageData | string
    pattern?: keyof typeof RevealPatterns
    children?: React.ReactNode
}

export default function HeroPremium({
    title,
    highlight,
    description,
    badgeText = "Premium Service",
    themeColor = 'blue',
    backgroundImage,
    pattern = 'Grid',
    children
}: HeroPremiumProps) {
    const SelectedPattern = RevealPatterns[pattern] || RevealPatterns.Grid

    return (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-background py-24 md:py-32">

            {/* 1. Background Layer (Always Visible, Lowest Z-Index) */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                {backgroundImage && (
                    <>
                        <Image
                            src={backgroundImage}
                            alt="Background"
                            fill
                            className="object-cover opacity-20"
                            priority
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
                    </>
                )}

                {/* Fallback abstract background if no image */}
                {!backgroundImage && (
                    <div className="absolute inset-0 bg-grid-white/[0.02]" />
                )}
            </div>

            {/* 2. Effect Layer (MouseReveal) - Decorative Only (Z-Index 10) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <MouseReveal
                    revealContent={<SelectedPattern />}
                    revealSize={400} // Slightly smaller for better performance
                    className="w-full h-full"
                >
                    {/* Empty children because content is handled separately */}
                    <div className="w-full h-full" />
                </MouseReveal>
            </div>

            {/* 3. Content Layer (Interactive, Highest Z-Index 20) */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <Badge variant="outline" className={`px-4 py-1.5 text-sm uppercase tracking-widest border-${themeColor}-500/30 text-${themeColor}-400 bg-${themeColor}-500/5 backdrop-blur-md`}>
                            <Sparkles className="w-3 h-3 mr-2 fill-current" />
                            {badgeText}
                        </Badge>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                        {title} <br className="hidden md:block" />
                        <span className="text-white relative inline-block font-black">
                            {highlight}
                            {/* Underline decoration */}
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-current opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.3 }}
                                    transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                                />
                            </svg>
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>

                    {/* CTAs */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/estimator">
                            <Button size="lg" className={`h-14 px-8 text-lg rounded-full bg-${themeColor}-600 hover:bg-${themeColor}-500 text-white shadow-[0_0_30px_-10px_var(--${themeColor}-500)] transition-all transform hover:scale-105`}>
                                Get Free Estimate
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="#process">
                            <Button variant="ghost" size="lg" className="h-14 px-8 text-lg rounded-full hover:bg-white/5 border border-white/10 hover:border-white/20">
                                How We Work
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Additional Children (if any) */}
                    {children && (
                        <div className="mt-12">
                            {children}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            >
                <div className={`w-[1px] h-16 bg-gradient-to-b from-transparent via-${themeColor}-500/50 to-transparent`} />
            </motion.div>
        </section>
    )
}
