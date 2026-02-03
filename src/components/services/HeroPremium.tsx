'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { MouseReveal, RevealPatterns } from '@/components/ui/MouseReveal'
import { useRef, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

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

// Fixed color mapping to prevent Tailwind purging
const colorVariants = {
    blue: {
        text: "text-blue-400",
        border: "border-blue-500/30",
        bg: "bg-blue-500/5",
        bgSolid: "bg-blue-600",
        bgHover: "hover:bg-blue-500",
        shadow: "shadow-blue-500/20",
        gradient: "from-blue-400 via-cyan-400 to-blue-600",
        orb: "bg-blue-500/10"
    },
    purple: {
        text: "text-purple-400",
        border: "border-purple-500/30",
        bg: "bg-purple-500/5",
        bgSolid: "bg-purple-600",
        bgHover: "hover:bg-purple-500",
        shadow: "shadow-purple-500/20",
        gradient: "from-purple-400 via-pink-400 to-purple-600",
        orb: "bg-purple-500/10"
    },
    orange: {
        text: "text-orange-400",
        border: "border-orange-500/30",
        bg: "bg-orange-500/5",
        bgSolid: "bg-orange-600",
        bgHover: "hover:bg-orange-500",
        shadow: "shadow-orange-500/20",
        gradient: "from-orange-400 via-amber-400 to-orange-600",
        orb: "bg-orange-500/10"
    },
    emerald: {
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/5",
        bgSolid: "bg-emerald-600",
        bgHover: "hover:bg-emerald-500",
        shadow: "shadow-emerald-500/20",
        gradient: "from-emerald-400 via-green-400 to-emerald-600",
        orb: "bg-emerald-500/10"
    },
    cyan: {
        text: "text-cyan-400",
        border: "border-cyan-500/30",
        bg: "bg-cyan-500/5",
        bgSolid: "bg-cyan-600",
        bgHover: "hover:bg-cyan-500",
        shadow: "shadow-cyan-500/20",
        gradient: "from-cyan-400 via-teal-400 to-cyan-600",
        orb: "bg-cyan-500/10"
    },
    indigo: {
        text: "text-indigo-400",
        border: "border-indigo-500/30",
        bg: "bg-indigo-500/5",
        bgSolid: "bg-indigo-600",
        bgHover: "hover:bg-indigo-500",
        shadow: "shadow-indigo-500/20",
        gradient: "from-indigo-400 via-blue-400 to-indigo-600",
        orb: "bg-indigo-500/10"
    },
    green: {
        text: "text-green-400",
        border: "border-green-500/30",
        bg: "bg-green-500/5",
        bgSolid: "bg-green-600",
        bgHover: "hover:bg-green-500",
        shadow: "shadow-green-500/20",
        gradient: "from-green-400 via-emerald-400 to-green-600",
        orb: "bg-green-500/10"
    },
    violet: {
        text: "text-violet-400",
        border: "border-violet-500/30",
        bg: "bg-violet-500/5",
        bgSolid: "bg-violet-600",
        bgHover: "hover:bg-violet-500",
        shadow: "shadow-violet-500/20",
        gradient: "from-violet-400 via-purple-400 to-violet-600",
        orb: "bg-violet-500/10"
    },
    yellow: {
        text: "text-yellow-400",
        border: "border-yellow-500/30",
        bg: "bg-yellow-500/5",
        bgSolid: "bg-yellow-600",
        bgHover: "hover:bg-yellow-500",
        shadow: "shadow-yellow-500/20",
        gradient: "from-yellow-400 via-orange-400 to-yellow-600",
        orb: "bg-yellow-500/10"
    }
}

// Floating Orbs Component
function FloatingOrbs({ themeColor }: { themeColor: keyof typeof colorVariants }) {
    const orbColor = colorVariants[themeColor].orb
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
                    className={cn("absolute rounded-full blur-3xl opacity-30", orbColor)}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.x,
                        top: orb.y,
                    }}
                    animate={{
                        x: [0, 80, -40, 0],
                        y: [0, -80, 40, 0],
                        scale: [1, 1.1, 0.9, 1],
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
        <Link href={href} className={className}>
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
    const cv = useMemo(() => colorVariants[themeColor] || colorVariants.blue, [themeColor])

    return (
        <section className="relative w-full min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-background">
            {/* 1. Background Layer */}
            <div className="absolute inset-0 z-0">
                {!backgroundImage && (
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                )}
                {backgroundImage && (
                    <Image
                        src={backgroundImage}
                        alt="Background"
                        fill
                        className="object-cover opacity-10"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
                <FloatingOrbs themeColor={themeColor} />
            </div>

            {/* 2. Simplified Glow Layer */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.05),transparent_70%)]" />

            {/* 3. Content Layer */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <div className="flex justify-center mb-10">
                        <Badge variant="outline" className={cn(
                            "px-5 py-2 text-xs uppercase tracking-widest backdrop-blur-md transition-all duration-500",
                            cv.border,
                            cv.text,
                            cv.bg
                        )}>
                            <Sparkles className="w-3 h-3 mr-2 fill-current animate-pulse" />
                            {badgeText}
                        </Badge>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter-extreme mb-12 leading-[0.85] uppercase text-white">
                        {title} <br className="hidden md:block" />
                        <span className={cn(
                            "bg-gradient-to-r bg-clip-text text-transparent inline-block",
                            cv.gradient
                        )}>
                            {highlight}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-3xl text-zinc-500 mb-16 max-w-3xl mx-auto leading-tight tracking-tighter-extreme font-medium">
                        {description}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <MagneticButton href={ctaLink}>
                            <Button
                                size="xl"
                                className={cn(
                                    "h-16 px-10 text-lg rounded-2xl text-white shadow-2xl transition-all group relative overflow-hidden",
                                    cv.bgSolid,
                                    cv.bgHover,
                                    cv.shadow
                                )}
                                onMouseEnter={() => setIsHoveringCTA(true)}
                                onMouseLeave={() => setIsHoveringCTA(false)}
                            >
                                <span className="relative z-10 flex items-center">
                                    {ctaText}
                                    <ArrowRight className={cn(
                                        "ml-3 w-5 h-5 transition-transform duration-300",
                                        isHoveringCTA ? "translate-x-1.5" : ""
                                    )} />
                                </span>
                            </Button>
                        </MagneticButton>

                        <Link href={secondaryCtaLink}>
                            <Button
                                variant="outline"
                                size="xl"
                                className="h-16 px-10 text-lg rounded-2xl border-white/10 hover:bg-white/5 transition-all"
                            >
                                {secondaryCtaText}
                            </Button>
                        </Link>
                    </div>

                    {/* Additional Children */}
                    {children && (
                        <div className="mt-16">
                            {children}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-20">
                <motion.div
                    className="w-px h-20 bg-gradient-to-b from-transparent via-orange-500 to-transparent"
                    animate={{
                        scaleY: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </div>
        </section>
    )
}
