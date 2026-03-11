'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'
import KineticTypography from './effects/KineticTypography'
import LocalMouseReveal from './effects/LocalMouseReveal'

// ─── Text Scramble Engine ───
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk0123456789!@#$%&*'

function useTextScramble(text: string, delay = 0) {
    const [displayText, setDisplayText] = useState('')
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        let frame = 0
        const totalFrames = 30
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                frame++
                const progress = frame / totalFrames
                const revealed = Math.floor(progress * text.length)
                let result = ''
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === ' ') {
                        result += ' '
                    } else if (i < revealed) {
                        result += text[i]
                    } else {
                        result += CHARS[Math.floor(Math.random() * CHARS.length)]
                    }
                }
                setDisplayText(result)
                if (frame >= totalFrames) {
                    clearInterval(interval)
                    setDisplayText(text)
                    setIsComplete(true)
                }
            }, 35)
            return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timeout)
    }, [text, delay])

    return { displayText, isComplete }
}

// ─── Floating Metric Badge ───
function FloatingMetric({ label, value, delay, position, index }: {
    label: string
    value: string
    delay: number
    position: 'left' | 'right'
    index: number
}) {
    const baseTop = position === 'left' ? 30 : 45;
    const offset = Math.floor(index / 2) * 30;
    const topPosition = `${baseTop + offset}%`;

    return (
        <motion.div
            initial={{ opacity: 0, x: position === 'left' ? -60 : 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute ${position === 'left'
                ? 'left-6 lg:left-12'
                : 'right-6 lg:right-12'
                } hidden lg:block z-20`}
            style={{ top: topPosition }}
        >
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: delay * 2 }}
                className="relative"
            >
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 py-5 min-w-[160px]">
                    <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-600 mb-2">
                        {label}
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight font-display">
                        {value}
                    </div>
                    {/* Glow accent dot */}
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent/60 blur-[2px]" />
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
            </motion.div>
        </motion.div>
    )
}

// ─── Cinematic Preloader Counter ───
function PreloaderCounter({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const duration = 1800 // ms
        const steps = 60
        const increment = 100 / steps
        let current = 0
        const interval = setInterval(() => {
            current += increment
            if (current >= 100) {
                setCount(100)
                clearInterval(interval)
                setTimeout(onComplete, 300)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)
        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <motion.div
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#020202] flex items-center justify-center"
        >
            <div className="relative">
                {/* Progress arc */}
                <svg className="w-32 h-32" viewBox="0 0 128 128">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <motion.circle
                        cx="64" cy="64" r="56"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={`${count * 3.51} 351`}
                        transform="rotate(-90, 64, 64)"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#d4a853" />
                            <stop offset="100%" stopColor="white" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-mono font-light text-white tracking-tighter">
                        {count.toString().padStart(3, '0')}
                    </span>
                </div>
            </div>
            <div className="absolute bottom-16 text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-700">
                Loading Experience
            </div>
        </motion.div>
    )
}

// ─── Horizontal Scrolling Line ───
function ScrollingLine({ text, direction = 'left', speed = 30 }: {
    text: string
    direction?: 'left' | 'right'
    speed?: number
}) {
    return (
        <div className="overflow-hidden whitespace-nowrap py-3 opacity-[0.03]">
            <motion.div
                animate={{ x: direction === 'left' ? [0, -2000] : [-2000, 0] }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
            >
                {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="text-[12vw] font-black uppercase tracking-tighter text-white mx-8 select-none">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

// ─── Main Hero ───
interface CinematicHeroProps {
    title?: React.ReactNode
    subtitle?: string
    ctaText?: string
    ctaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    showSecondaryCta?: boolean
    videoSrc?: string
    showPreloader?: boolean
    showUrgencyBadge?: boolean
    metrics?: { label: string; value: string }[]
}

export default function CinematicHero({
    title,
    subtitle = "Strategy, design, and engineering for brands that refuse to blend in.",
    ctaText = "Start a Project",
    ctaLink = "/contact",
    secondaryCtaText = "See Our Work",
    secondaryCtaLink = "/case-studies",
    showSecondaryCta = true,
    videoSrc,
    showPreloader = false,
    showUrgencyBadge = false,
    metrics = [
        { label: "Projects Delivered", value: "200+" },
        { label: "Client Retention", value: "98%" },
    ]
}: CinematicHeroProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
    const [isLoaded, setIsLoaded] = useState(!showPreloader)
    const [videoError, setVideoError] = useState(false)

    // Memoize the loaded callback to prevent PreloaderCounter from resetting on every mouse move
    const handleLoaded = useCallback(() => {
        setIsLoaded(true)
    }, [])

    // Text scramble for subtitle
    const { displayText: scrambledSubtitle } = useTextScramble(subtitle, isLoaded ? 1800 : 3600)

    // ─── GSAP Cinematic Timeline ───
    useEffect(() => {
        if (!isLoaded || !contentRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'expo.out' },
                delay: 0.2
            })

            // Phase 1: Cinematic Iris Reveal of the viewport
            tl.fromTo(
                overlayRef.current,
                { clipPath: 'circle(0% at 50% 50%)' },
                {
                    clipPath: 'circle(150% at 50% 50%)',
                    duration: 2.4,
                    ease: 'expo.inOut',
                }
            )

            // Phase 2: Scale video from zoomed to normal
            if (videoRef.current) {
                tl.fromTo(
                    videoRef.current,
                    { scale: 1.3, filter: 'blur(20px) brightness(0.3)' },
                    {
                        scale: 1,
                        filter: 'blur(0px) brightness(1)',
                        duration: 2.4,
                        ease: 'power3.out',
                    },
                    '-=1.4'
                )
            }

            // Phase 3: Staggered text reveal with mask
            const lines = contentRef.current?.querySelectorAll('.hero-line')
            if (lines && lines.length > 0) {
                tl.fromTo(
                    lines,
                    {
                        opacity: 0,
                        y: 120,
                        rotateX: -45,
                        filter: 'blur(12px)',
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        filter: 'blur(0px)',
                        duration: 1.6,
                        stagger: 0.15,
                        ease: 'power4.out',
                    },
                    '-=1.6'
                )
            } else {
                // Fallback for string titles
                const titleEl = contentRef.current?.querySelector('.hero-title')
                if (titleEl) {
                    tl.fromTo(
                        titleEl,
                        { opacity: 0, y: 80, filter: 'blur(12px)' },
                        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4 },
                        '-=1.6'
                    )
                }
            }

            // Phase 4: Subtitle and CTA
            const subtitleEl = contentRef.current?.querySelector('.hero-subtitle')
            const ctaEl = contentRef.current?.querySelector('.hero-cta')
            const scrollIndicator = contentRef.current?.closest('section')?.querySelector('.scroll-indicator')

            if (subtitleEl) {
                tl.fromTo(
                    subtitleEl,
                    { opacity: 0, y: 30, filter: 'blur(6px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 },
                    '-=0.8'
                )
            }

            if (ctaEl) {
                tl.fromTo(
                    ctaEl,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    '-=0.6'
                )
            }

            if (scrollIndicator) {
                tl.fromTo(
                    scrollIndicator,
                    { opacity: 0 },
                    { opacity: 0.4, duration: 1 },
                    '-=0.3'
                )
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [isLoaded, title])

    // ─── Scroll Parallax ───
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scrollScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92])
    const scrollY = useTransform(scrollYProgress, [0, 1], [0, 200])
    const scrollBlur = useTransform(scrollYProgress, [0, 0.4], [0, 12])
    const scrollFilter = useMotionTemplate`blur(${scrollBlur}px)`
    const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

    // Multi-depth Ambient Parallax
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
    const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
    const grainY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])

    const springOpacity = useSpring(scrollOpacity, { stiffness: 60, damping: 30 })
    const springScale = useSpring(scrollScale, { stiffness: 60, damping: 30 })
    const springY = useSpring(scrollY, { stiffness: 60, damping: 30 })

    // ─── Cursor Tracking ───
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        })
    }, [])

    const gradientX = mousePosition.x * 100
    const gradientY = mousePosition.y * 100

    // Default title if none provided
    const defaultTitle = (
        <>
            <span className="hero-line block" style={{ perspective: '1000px' }}>
                We build websites
            </span>
            <span className="hero-line block" style={{ perspective: '1000px' }}>
                that <em className="text-accent italic font-medium">accelerate</em> growth.
            </span>
        </>
    )

    const resolvedTitle = title || defaultTitle

    return (
        <>
            {/* Preloader */}
            <AnimatePresence mode="wait">
                {!isLoaded && showPreloader && (
                    <PreloaderCounter onComplete={handleLoaded} />
                )}
            </AnimatePresence>

            <section
                ref={sectionRef}
                onMouseMove={handleMouseMove}
                className="relative h-[100dvh] pt-24 pb-6 flex items-center justify-center overflow-hidden bg-[#050505]"
            >
                {/* ─── Top Urgency/Scarcity Badge (Below Nav) ─── */}
                <div className="absolute top-[100px] left-0 right-0 flex justify-center z-[50] pointer-events-none">
                    {showUrgencyBadge && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md pointer-events-auto"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            <span className="text-[11px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
                                Currently Accepting: <span className="text-shimmer font-semibold">2 New Clients</span> This Quarter
                            </span>
                        </motion.div>
                    )}
                </div>

                {/* ─── Cinematic Background ─── */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        clipPath: (showPreloader && !isLoaded) ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)',
                        opacity: showPreloader && !isLoaded ? 0 : 1
                    }}
                >
                    <motion.div className="absolute inset-0" style={{ scale: videoScale, y: backgroundY }}>
                        {/* Primary cinematic background — always visible */}
                        <div className="absolute inset-0">
                            <Image
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2400&auto=format&fit=crop"
                                alt=""
                                fill
                                className="object-cover"
                                style={{ filter: 'brightness(0.18) saturate(0.4) contrast(1.1)' }}
                                priority
                                sizes="100vw"
                            />
                        </div>
                        {/* Secondary layer — abstract tech */}
                        <div className="absolute inset-0 mix-blend-luminosity opacity-20">
                            <Image
                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2400&auto=format&fit=crop"
                                alt=""
                                fill
                                className="object-cover"
                                style={{ filter: 'brightness(0.4) hue-rotate(20deg)' }}
                                sizes="100vw"
                            />
                        </div>

                        {/* Try video too — if it exists, it will overlay */}
                        {!videoError && (
                            <video
                                ref={videoRef}
                                autoPlay loop muted playsInline preload="auto"
                                onError={() => setVideoError(true)}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{ filter: 'brightness(0.22) saturate(0.6)' }}
                            >
                                <source src={videoSrc} type="video/mp4" />
                            </video>
                        )}
                    </motion.div>

                    {/* Golden accent light — lower left */}
                    <motion.div
                        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(212,168,83,0.08) 0%, transparent 70%)', y: overlayY }}
                    />

                    {/* Layered overlays for depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/70 via-transparent to-[#030303]" />
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-[#030303]/80" style={{ y: overlayY }} />

                    {/* Grain texture */}
                    <motion.div
                        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
                        style={{
                            y: grainY,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                {/* ─── Advanced Cursor-following Ambient Light & Noise Reveal ─── */}
                <div className="absolute inset-0 pointer-events-none z-[5] transition-opacity duration-1000">
                    {/* The precise glow layer (mix-blend-screen for highlight) */}
                    <motion.div
                        className="absolute w-[800px] h-[800px] rounded-full mix-blend-screen transition-all duration-300 ease-out"
                        style={{
                            background: `radial-gradient(circle, rgba(212, 168, 83, 0.08) 0%, transparent 60%)`,
                            left: `${gradientX}%`,
                            top: `${gradientY}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    />

                    {/* The intricate texture/noise layer revealed only by cursor mask */}
                    <motion.div
                        className="absolute inset-0 mix-blend-overlay opacity-50 transition-all duration-300 ease-out"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            WebkitMaskImage: `radial-gradient(400px circle at ${gradientX}% ${gradientY}%, black 10%, transparent 80%)`,
                            maskImage: `radial-gradient(400px circle at ${gradientX}% ${gradientY}%, black 10%, transparent 80%)`,
                        }}
                    />
                </div>

                {/* ─── Scrolling Background Text ─── */}
                <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-[1] overflow-hidden">
                    <ScrollingLine text="BIGWEB" direction="left" speed={40} />
                    <ScrollingLine text="DIGITAL" direction="right" speed={35} />
                </div>

                {/* ─── Main Content ─── */}
                <motion.div
                    ref={contentRef}
                    className="container mx-auto px-6 lg:px-16 relative z-10 w-full"
                    style={{
                        opacity: springOpacity,
                        scale: springScale,
                        y: springY,
                        filter: scrollFilter,
                    }}
                >
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Accent line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={isLoaded ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-2 origin-center"
                        />

                        {/* Title */}
                        <div
                            className="hero-title mb-6"
                            style={{ perspective: '1000px' }}
                        >
                            {typeof resolvedTitle === 'string' ? (
                                <KineticTypography
                                    text={resolvedTitle}
                                    as="h1"
                                    className="text-[clamp(2.8rem,8vw,7.5rem)] font-display leading-[0.92] tracking-tighter text-white"
                                    splitBy="words"
                                />
                            ) : (
                                <h1 className="text-[clamp(2.8rem,8vw,7.5rem)] font-display leading-[0.92] tracking-tighter text-white">
                                    {resolvedTitle}
                                </h1>
                            )}
                        </div>

                        {/* Scrambled Subtitle + Kinetic Entrance */}
                        {subtitle && (
                            <div className="hero-subtitle mb-6 max-w-lg mx-auto">
                                <KineticTypography
                                    text={subtitle}
                                    as="p"
                                    className="text-[clamp(0.95rem,1.8vw,1.15rem)] text-zinc-400 leading-relaxed font-light"
                                    delay={1.5}
                                    duration={1.2}
                                />
                            </div>
                        )}

                        {/* CTAs */}
                        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
                            <Link
                                href={ctaLink}
                                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pulse-ring btn-magnetic"
                            >
                                {/* Button glow background */}
                                <span className="absolute inset-0 bg-white rounded-full" />
                                <span className="absolute inset-0 bg-gradient-to-r from-accent to-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Magnetic shine effect */}
                                <span className="absolute -inset-full bg-white opacity-20 group-hover:animate-[shine_1.5s_ease-in-out_infinite] skew-x-12" />

                                <span className="relative z-10 flex items-center gap-3 px-10 py-4 text-[#0a0a0a] font-bold text-[15px] tracking-wide">
                                    {ctaText}
                                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                                </span>
                            </Link>

                            {showSecondaryCta && (
                                <Link
                                    href={secondaryCtaLink}
                                    className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-colors duration-500"
                                >
                                    <span className="relative text-sm font-medium tracking-wide">
                                        {secondaryCtaText}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
                                    </span>
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* ─── Hero Stat Strip ─── */}
                    <div className="hero-cta mt-10 flex items-center justify-center">
                        <div className="flex items-center gap-2 md:gap-6 divide-x divide-white/[0.06]">
                            {[
                                { value: '$2B+', label: 'Revenue Generated' },
                                { value: '+340%', label: 'Avg. Conversion Uplift' },
                                { value: '98%', label: 'Client Retention' },
                            ].map((s, i) => (
                                <div key={i} className={`flex flex-col items-center gap-0.5 ${i > 0 ? 'pl-6 md:pl-8' : ''}`}>
                                    <span className="font-display font-black text-xl md:text-2xl tracking-tight text-white">{s.value}</span>
                                    <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ─── Cinematic Vignette Edges ─── */}
                <div className="absolute inset-0 pointer-events-none z-[15]">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                    <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050505]/50 to-transparent" />
                    <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050505]/50 to-transparent" />
                </div>

                {/* ─── Scroll Indicator (Cinematic) ─── */}
                <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 opacity-0">
                    <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="w-4 h-4 text-zinc-600" />
                    </motion.div>
                </div>

                {/* ─── Corner Accents (Cinematic frame) ─── */}
                <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-white/[0.06] pointer-events-none z-20" />
                <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-white/[0.06] pointer-events-none z-20" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-white/[0.06] pointer-events-none z-20" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-white/[0.06] pointer-events-none z-20" />
            </section>
        </>
    )
}
