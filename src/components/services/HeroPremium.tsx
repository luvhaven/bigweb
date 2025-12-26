'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

import { MouseReveal, RevealPatterns } from '@/components/ui/MouseReveal'

interface HeroPremiumProps {
    title: string
    highlight: string
    description: string
    ctaText?: string
    ctaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    themeColor?: string
    backgroundImage?: any // Allow StaticImageData or string
    badgeText?: string
    children?: React.ReactNode
    pattern?: keyof typeof RevealPatterns
}

export default function HeroPremium({
    title,
    highlight,
    description,
    ctaText = "Get Instant Estimate",
    ctaLink = "/estimator",
    secondaryCtaText = "Schedule Consultation",
    secondaryCtaLink = "/contact",
    themeColor = "blue",
    backgroundImage,
    badgeText = "Premium Service",
    children,
    pattern = "Grid"
}: HeroPremiumProps) {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])
    const opacity = useTransform(scrollY, [0, 300], [1, 0])

    const SelectedPattern = RevealPatterns[pattern] || RevealPatterns.Grid

    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background w-full py-24 md:py-32">
            <MouseReveal
                revealContent={<SelectedPattern />}
                revealSize={600}
                className="absolute inset-0 w-full"
            >
                {/* Background Image - Wrapped in reveal base to be always visible, or put outside? 
                   If we want the FLASHLIGHT to reveal the pattern, the pattern goes in revealContent.
                   The base content (image) goes in children. */}
                <div className="absolute inset-0 w-full h-full">

                    {/* Background Image */}
                    {backgroundImage && (
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={backgroundImage}
                                alt="Hero Background"
                                fill
                                className="object-cover opacity-10"
                                priority
                                quality={90}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
                            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
                        </div>
                    )}

                    {/* Abstract Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            style={{ y: y1, opacity }}
                            className={`absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-${themeColor}-500/10 blur-[130px]`}
                        />
                        <motion.div
                            style={{ y: y2, opacity }}
                            className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-${themeColor}-500/10 blur-[100px]`}
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full">
                        <div className="max-w-5xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col items-center"
                            >
                                {/* Pill Label */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-${themeColor}-500/10 border border-${themeColor}-500/20 mb-6 backdrop-blur-md`}
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${themeColor}-500 opacity-75`}></span>
                                        <span className={`relative inline-flex rounded-full h-2 w-2 bg-${themeColor}-500`}></span>
                                    </span>
                                    <span className={`text-xs md:text-sm font-medium text-${themeColor}-400 tracking-wide uppercase`}>
                                        {badgeText}
                                    </span>
                                </motion.div>

                                {/* Main Title */}
                                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[1.1] md:leading-tight">
                                    {title}
                                    <br className="hidden md:block" />
                                    <span className={` block md:inline mt-2 md:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-${themeColor}-400 via-${themeColor}-500 to-${themeColor}-400 pb-2`}>
                                        {highlight}
                                    </span>
                                </h1>

                                {/* Description */}
                                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                                    {description}
                                </p>

                                {/* CTAs */}
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                                    <Link href={ctaLink} className="w-full sm:w-auto">
                                        <Button
                                            size="lg"
                                            className={`w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white shadow-lg shadow-${themeColor}-500/25 transition-all duration-300 transform hover:scale-105`}
                                        >
                                            {ctaText}
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link href={secondaryCtaLink} className="w-full sm:w-auto">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-2 bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300"
                                        >
                                            {secondaryCtaText}
                                        </Button>
                                    </Link>
                                </div>

                                {/* Additional Content (Stats, etc.) */}
                                {children && (
                                    <div className="mt-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                                        {children}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        style={{ opacity }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                    >
                        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground/70 font-medium">Scroll</span>
                        <div className={`w-[1px] h-8 md:h-12 bg-gradient-to-b from-${themeColor}-500/0 via-${themeColor}-500/50 to-${themeColor}-500/0`} />
                    </motion.div>
                </div>
            </MouseReveal>
        </section>
    )
}
