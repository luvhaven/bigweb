'use client'

import { useRef, useEffect, useState } from 'react'
import {
    motion, useInView, useScroll, useTransform,
    useSpring, useMotionValue,
} from 'framer-motion'
import Image from 'next/image'
import KineticTypography from './effects/KineticTypography'

/* ─── Metrics ─── */
const metrics = [
    {
        value: 2, suffix: 'B+', prefix: '$',
        label: 'Revenue Generated',
        description: 'Documented client revenue directly attributable to BIGWEB strategy and engineering in the last 36 months.',
        color: '#d4a853',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    },
    {
        value: 340, suffix: '%', prefix: '+',
        label: 'Avg. Conversion Uplift',
        description: 'Average lift in qualified conversion rate measured 90 days post-launch. Documented across every vertical we operate in.',
        color: '#6366f1',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    },
    {
        value: 98, suffix: '%', prefix: '',
        label: 'Client Retention Rate',
        description: "Our clients don\'t leave. They scale. Multi-year partnerships are the norm — because the ROI compounds with every iteration.",
        color: '#10b981',
        image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    },
]

/* ─── Animated spring counter ─── */
function SpringCounter({
    target, suffix, prefix, inView, color,
}: {
    target: number; suffix: string; prefix: string; inView: boolean; color: string
}) {
    const [display, setDisplay] = useState(0)
    const motionVal = useMotionValue(0)
    const spring = useSpring(motionVal, { stiffness: 50, damping: 12, mass: 1 })

    useEffect(() => {
        if (!inView) return
        const unsub = spring.on('change', v => setDisplay(Math.round(v)))
        motionVal.set(target)
        return unsub
    }, [inView, target, motionVal, spring])

    return (
        <span className="tabular-nums font-black" style={{ color }}>
            {prefix}{display.toLocaleString()}{suffix}
        </span>
    )
}

/* ─── Animated node network canvas ─── */
function NodeNetwork({ color }: { color: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        const nodes = Array.from({ length: 20 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
        }))

        let frame: number
        const hex = (color && color.startsWith('#') && color.length >= 7) ? color : '#ffffff'
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            nodes.forEach(n => {
                n.x += n.vx; n.y += n.vy
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1
            })
            nodes.forEach((a, i) => {
                nodes.slice(i + 1).forEach(b2 => {
                    const d = Math.hypot(a.x - b2.x, a.y - b2.y)
                    if (d < 100) {
                        ctx.beginPath()
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b2.x, b2.y)
                        ctx.strokeStyle = `rgba(${r},${g},${b},${0.08 * (1 - d / 100)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                })
            })
            nodes.forEach(n => {
                ctx.beginPath()
                ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${r},${g},${b},0.2)`
                ctx.fill()
            })
            frame = requestAnimationFrame(draw)
        }
        draw()
        return () => cancelAnimationFrame(frame)
    }, [color])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ─── Main Section ─── */
interface StatItem {
    value: string
    label: string
    description?: string
    rawValue?: number
    prefix?: string
    suffix?: string
}

export default function ImpactNumbers({ initialStats }: { initialStats?: StatItem[] | null }) {
    const ref = useRef<HTMLElement>(null)
    const isInView = useInView(ref as any, { once: true, margin: '-80px' })
    const [activeCard, setActiveCard] = useState<number | null>(null)

    // Merge live stats into the hardcoded metrics structure
    const displayMetrics = (initialStats && initialStats.length >= 4)
        ? initialStats.slice(0, 4).map((s, i) => ({
            ...metrics[i],
            value: s.rawValue ?? parseFloat(s.value) ?? metrics[i].value,
            suffix: s.suffix ?? metrics[i].suffix,
            prefix: s.prefix ?? metrics[i].prefix,
            label: s.label || metrics[i].label,
            description: s.description || metrics[i].description,
        }))
        : metrics

    const { scrollYProgress } = useScroll({
        target: ref as any,
        offset: ['start end', 'end start'],
    })
    const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

    return (
        <section ref={ref} className="py-28 md:py-40 bg-[#040404] relative overflow-hidden">
            {/* Parallax watermark */}
            <motion.div
                style={{ x: bgX }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
            >
                <span
                    className="text-[20vw] font-black tracking-tighter whitespace-nowrap"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.03)', color: 'transparent' }}
                >
                    RESULTS
                </span>
            </motion.div>

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <span className="w-8 h-px bg-accent" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Measured Impact</span>
                        </motion.div>
                        <KineticTypography
                            segments={[
                                { text: 'Numbers don\'t lie. ' },
                                { text: 'Ours don\'t even blush.', className: 'italic text-zinc-400' }
                            ]}
                            as="h2"
                            className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-tight"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-zinc-500 text-sm leading-relaxed max-w-xs lg:text-right"
                    >
                        Every metric is third-party verified and tracked 90 days post-launch. We stake our reputation on results, not promises.
                    </motion.p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {displayMetrics.map((metric, i) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                            onMouseEnter={() => setActiveCard(i)}
                            onMouseLeave={() => setActiveCard(null)}
                            className="card-glimmer group relative overflow-hidden rounded-2xl cursor-default"
                            style={{
                                border: `1px solid ${activeCard === i ? metric.color + '35' : 'rgba(255,255,255,0.05)'}`,
                                background: '#0d0d0d',
                                transition: 'border-color 0.5s',
                            }}
                        >
                            {/* Background image on hover */}
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{ opacity: activeCard === i ? 0.08 : 0, scale: activeCard === i ? 1.04 : 1 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    {metric.image ? (
                                    <Image
                                        src={metric.image}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        sizes="25vw"
                                        loading="lazy"
                                    />
                                    ) : null}
                                </motion.div>
                            </div>

                            {/* Node network overlay */}
                            <div className="absolute inset-0">
                                <NodeNetwork color={metric.color} />
                            </div>

                            {/* Top accent */}
                            <motion.div
                                className="absolute top-0 left-0 right-0 h-[2px]"
                                animate={{ opacity: activeCard === i ? 1 : 0.3 }}
                                transition={{ duration: 0.5 }}
                                style={{ background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)` }}
                            />

                            {/* Content */}
                            <div className="relative z-10 p-8 md:p-10">
                                {/* Spring Number */}
                                <div className="text-5xl md:text-6xl tracking-tighter mb-4 font-display">
                                    <SpringCounter
                                        target={metric.value}
                                        suffix={metric.suffix}
                                        prefix={metric.prefix}
                                        inView={isInView}
                                        color={metric.color}
                                    />
                                </div>

                                <h3 className="text-sm font-semibold text-zinc-300 mb-3">{metric.label}</h3>
                                <p className="text-[12px] text-zinc-600 leading-relaxed">{metric.description}</p>

                                {/* Bottom index */}
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-zinc-700">
                                        {String(i + 1).padStart(2, '0')} / {String(metrics.length).padStart(2, '0')}
                                    </span>
                                    <motion.span
                                        animate={{ opacity: activeCard === i ? 1 : 0.3, scale: activeCard === i ? 1 : 0.7 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ background: metric.color }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Visual proof strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mt-10 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/[0.04]"
                >
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-600">
                        All metrics independently verified · Updated Q1 2026
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-zinc-500">Live tracking across 200+ active client accounts</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
