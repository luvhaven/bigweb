'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { MouseReveal, RevealPatterns } from '@/components/ui/MouseReveal'
import { useRef, useState } from 'react'

interface HeroPremiumProps {
    title: string
    highlight: string
    description: string
    badgeText?: string
    themeColor: 'blue' | 'purple' | 'green' | 'orange' | 'cyan' | 'emerald' | 'indigo' | 'violet' | 'yellow'
    backgroundImage?: StaticImageData | string
    pattern?: keyof typeof RevealPatterns
    ctaText?: string
    ctaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    children?: React.ReactNode
}

// Floating Orbs Component
function FloatingOrbs({ themeColor }: { themeColor: string }) {
    const orbs = [
        { size: 300, duration: 20, delay: 0, x: '10%', y: '20%' },
        { size: 400, duration: 25, delay: 5, x: '80%', y: '60%' },
        { size: 250, duration: 22, delay: 10, x: '50%', y: '80%' },
    ]

    return (
        <>
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full bg-${themeColor}-500/10 blur-3xl`}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                    }}
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, -100, 50, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: orb.duration,
                        repeat: Infinity,
                        delay: orb.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </>
    )
}

// Magnetic Button Component
function MagneticButton({ children, className, href }: { children: React.ReactNode, className?: string, href: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 150, damping: 15 })
    const springY = useSpring(y, { stiffness: 150, damping: 15 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = (e.clientX - centerX) * 0.3
        const distanceY = (e.clientY - centerY) * 0.3
        x.set(distanceX)
        y.set(distanceY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ x: springX, y: springY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="inline-block"
            >
                {children}
            </motion.div>
        </Link>
    )
}

export default function HeroPremium({
    title,
    highlight,
    description,
    badgeText = "Premium Service",
    themeColor = 'blue',
    backgroundImage,
    pattern = 'Grid',
    ctaText = "Get Free Estimate",
    ctaLink = "/estimator",
    secondaryCtaText = "How We Work",
    secondaryCtaLink = "#process",
    children
}: HeroPremiumProps) {
    const SelectedPattern = RevealPatterns[pattern] || RevealPatterns.Grid
    const [isHoveringCTA, setIsHoveringCTA] = useState(false)

    // Animated gradient for highlight text
    const gradientColors = {
        blue: 'from-blue-400 via-cyan-400 to-blue-600',
        purple: 'from-purple-400 via-pink-400 to-purple-600',
        green: 'from-green-400 via-emerald-400 to-green-600',
        orange: 'from-orange-400 via-amber-400 to-orange-600',
        cyan: 'from-cyan-400 via-teal-400 to-cyan-600',
        emerald: 'from-emerald-400 via-green-400 to-emerald-600',
        indigo: 'from-indigo-400 via-blue-400 to-indigo-600',
        violet: 'from-violet-400 via-purple-400 to-violet-600',
        yellow: 'from-yellow-400 via-orange-400 to-yellow-600',
    }

    return (
        <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center overflow-hidden bg-background pt-20 pb-12">

            {/* 1. Background Layer */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none select-none"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
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

                {!backgroundImage && (
                    <div className="absolute inset-0 bg-grid-white/[0.02]" />
                )}

                {/* Floating Orbs */}
                <FloatingOrbs themeColor={themeColor} />
            </motion.div>

            {/* 2. Enhanced MouseReveal Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <MouseReveal
                    revealContent={<SelectedPattern />}
                    revealSize={450}
                    className="w-full h-full opacity-80"
                >
                    <div className="w-full h-full" />
                </MouseReveal>
            </div>

            {/* 3. Content Layer */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge with Bounce */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                        }}
                        className="flex justify-center mb-8"
                    >
                        <Badge variant="outline" className={`px-4 py-1.5 text-sm uppercase tracking-widest border-${themeColor}-500/30 text-${themeColor}-400 bg-${themeColor}-500/5 backdrop-blur-md hover:scale-105 transition-transform cursor-default`}>
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <Sparkles className="w-3 h-3 mr-2 fill-current" />
                            </motion.div>
                            {badgeText}
                        </Badge>
                    </motion.div>

                    {/* Headline with Stagger */}
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {title}
                        </motion.span>
                        {' '}
                        <br className="hidden md:block" />
                        <motion.span
                            className={`relative inline-block font-black bg-gradient-to-r ${gradientColors[themeColor]} bg-clip-text text-transparent`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.span
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{ backgroundSize: '200% 200%' }}
                            >
                                {highlight}
                            </motion.span>

                            {/* Animated Underline */}
                            <svg className="absolute w-full h-3 -bottom-2 left-0 text-current opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.3 }}
                                    transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                                />
                            </svg>
                        </motion.span>
                    </motion.h1>

                    {/* Description with Word Reveal */}
                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        {description}
                    </motion.p>

                    {/* CTAs with Magnetic Effect */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <MagneticButton href={ctaLink} className="inline-block">
                            <Button
                                size="lg"
                                className={`h-14 px-8 text-lg rounded-full bg-${themeColor}-600 hover:bg-${themeColor}-500 text-white shadow-[0_0_30px_-10px_var(--${themeColor}-500)] transition-all transform hover:scale-105 relative overflow-hidden group`}
                                onMouseEnter={() => setIsHoveringCTA(true)}
                                onMouseLeave={() => setIsHoveringCTA(false)}
                            >
                                <span className="relative z-10 flex items-center">
                                    {ctaText}
                                    <motion.div
                                        animate={{ x: isHoveringCTA ? 5 : 0 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </motion.div>
                                </span>

                                {/* Glow Pulse */}
                                <motion.div
                                    className={`absolute inset-0 bg-${themeColor}-400`}
                                    animate={{
                                        opacity: [0, 0.3, 0],
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            </Button>
                        </MagneticButton>

                        <Link href={secondaryCtaLink}>
                            <Button
                                variant="ghost"
                                size="lg"
                                className="h-14 px-8 text-lg rounded-full hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:scale-105"
                            >
                                {secondaryCtaText}
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Additional Children */}
                    {children && (
                        <motion.div
                            className="mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                        >
                            {children}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            >
                <motion.div
                    className={`w-[1px] h-16 bg-gradient-to-b from-transparent via-${themeColor}-500/50 to-transparent`}
                    animate={{
                        scaleY: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </section>
    )
}
