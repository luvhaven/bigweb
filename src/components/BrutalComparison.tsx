'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'
import Link from 'next/link'

const rows = [
    { feature: 'Engineering Velocity', bigweb: 'yes', agencies: 'maybe', freelancers: 'no' },
    { feature: 'Strategy-First Architecture', bigweb: 'yes', agencies: 'rarely', freelancers: 'no' },
    { feature: 'Revenue-Focused Design', bigweb: 'yes', agencies: 'no', freelancers: 'no' },
    { feature: 'Sub-Second Performance', bigweb: 'yes', agencies: 'rarely', freelancers: 'no' },
    { feature: 'Data-Backed Decisions', bigweb: 'yes', agencies: 'sometimes', freelancers: 'no' },
    { feature: 'Conversion Optimization', bigweb: 'yes', agencies: 'extra', freelancers: 'no' },
    { feature: 'Fixed-Price Transparency', bigweb: 'yes', agencies: 'no', freelancers: 'sometimes' },
    { feature: 'Long-Term Growth Partner', bigweb: 'yes', agencies: 'no', freelancers: 'no' },
    { feature: 'Zero Bloated Retainers', bigweb: 'yes', agencies: 'no', freelancers: 'yes' },
    { feature: '30-Day Launch Guarantee', bigweb: 'yes', agencies: 'no', freelancers: 'no' },
]

function CellIcon({ value, invert = false }: { value: string; invert?: boolean }) {
    if (value === 'yes') return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Check className="w-4 h-4 text-emerald-600" />
        </span>
    )
    if (value === 'no') return (
        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${invert ? 'bg-red-50 border border-red-100' : 'bg-red-500/5 border border-red-500/10'}`}>
            <X className="w-4 h-4 text-red-400" />
        </span>
    )
    return (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 border border-amber-200">
            <Minus className="w-4 h-4 text-amber-500" />
        </span>
    )
}

// Canvas-animated geometric shapes — bars, squares, L-brackets, diamonds in gold/amber
function GeometricCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        let raf: number
        const dpr = window.devicePixelRatio || 1

        const resize = () => {
            canvas.width = canvas.offsetWidth * dpr
            canvas.height = canvas.offsetHeight * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        resize()
        window.addEventListener('resize', resize)

        type ShapeType = 'bar' | 'square' | 'bracket' | 'diamond'
        type Shape = {
            x: number; y: number; w: number; h: number
            type: ShapeType
            rotation: number; rotV: number
            vx: number; vy: number
            alpha: number; alphaV: number
            color: string
        }

        const COLORS = [
            'rgba(212,168,83,',
            'rgba(180,130,50,',
            'rgba(234,197,123,',
            'rgba(180,140,80,',
            'rgba(200,175,130,',
        ]

        const W = () => canvas.width / dpr
        const H = () => canvas.height / dpr

        const mkShape = (): Shape => {
            const types: ShapeType[] = ['bar', 'square', 'bracket', 'diamond']
            const type = types[Math.floor(Math.random() * 4)]
            const base = 14 + Math.random() * 36
            return {
                x: Math.random() * W(),
                y: Math.random() * H(),
                w: type === 'bar' ? base * 2.8 : base,
                h: type === 'bar' ? base * 0.28 : base,
                type,
                rotation: Math.random() * Math.PI * 2,
                rotV: (Math.random() - 0.5) * 0.003,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                alpha: 0.05 + Math.random() * 0.1,
                alphaV: (Math.random() - 0.5) * 0.0006,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            }
        }

        const shapes: Shape[] = Array.from({ length: 52 }, mkShape)

        const drawShape = (s: Shape) => {
            ctx.save()
            ctx.translate(s.x, s.y)
            ctx.rotate(s.rotation)
            const a = Math.max(0.02, Math.min(0.18, s.alpha))
            const fill = `${s.color}${a})`
            const stroke = `${s.color}${Math.min(0.3, a * 2)})`
            ctx.strokeStyle = stroke
            ctx.lineWidth = 1

            if (s.type === 'bar' || s.type === 'square') {
                ctx.fillStyle = fill
                ctx.fillRect(-s.w / 2, -s.h / 2, s.w, s.h)
                ctx.strokeRect(-s.w / 2, -s.h / 2, s.w, s.h)
            } else if (s.type === 'bracket') {
                ctx.strokeStyle = stroke
                ctx.beginPath()
                ctx.moveTo(-s.w / 2, s.h / 2)
                ctx.lineTo(-s.w / 2, -s.h / 2)
                ctx.lineTo(s.w / 2, -s.h / 2)
                ctx.stroke()
            } else {
                // diamond
                const d = s.w * 0.55
                ctx.fillStyle = fill
                ctx.beginPath()
                ctx.moveTo(0, -d)
                ctx.lineTo(d * 0.6, 0)
                ctx.lineTo(0, d)
                ctx.lineTo(-d * 0.6, 0)
                ctx.closePath()
                ctx.fill()
                ctx.stroke()
            }
            ctx.restore()
        }

        const tick = () => {
            const w = W(), h = H()
            ctx.clearRect(0, 0, w, h)
            shapes.forEach(s => {
                s.x += s.vx; s.y += s.vy
                s.rotation += s.rotV
                s.alpha += s.alphaV
                if (s.alpha < 0.02 || s.alpha > 0.18) s.alphaV *= -1
                if (s.x < -s.w) s.x = w + s.w
                if (s.x > w + s.w) s.x = -s.w
                if (s.y < -s.h) s.y = h + s.h
                if (s.y > h + s.h) s.y = -s.h
                drawShape(s)
            })
            raf = requestAnimationFrame(tick)
        }
        tick()

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export default function BrutalComparison() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const [hoveredRow, setHoveredRow] = useState<number | null>(null)

    return (
        <section ref={ref} className="py-32 md:py-48 bg-white relative overflow-hidden">
            {/* Animated geometric background */}
            <GeometricCanvas />
            {/* Edge fades */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none z-[1]" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-[1]" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-6xl">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-700">
                                The Uncomfortable Truth
                            </span>
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-zinc-900 leading-[1.05] mb-6">
                            Why the world&apos;s best brands{' '}
                            <em className="not-italic text-zinc-400">choose BIGWEB.</em>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-zinc-500 leading-relaxed max-w-sm lg:text-right"
                    >
                        Most agencies sell you hours. We sell you outcomes. Here is how we stack up against the alternatives.
                    </motion.p>
                </div>

                {/* Comparison table */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-3xl border border-zinc-200 bg-white/90 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                    {/* BIGWEB column amber highlight */}
                    <div className="absolute top-0 bottom-0 left-[25%] right-[50%] md:left-[33.33%] md:right-[33.33%] pointer-events-none z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 to-transparent border-x border-amber-200/60" />
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-amber-400/20 blur-[30px] rounded-full" />
                    </div>

                    {/* Desktop column headers */}
                    <div className="hidden md:grid grid-cols-4 border-b border-zinc-100 relative z-10 bg-white/80 backdrop-blur-sm">
                        <div className="px-8 py-6 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 flex items-center">Criteria</div>
                        {[
                            { label: 'BIGWEB', subtitle: 'The Standard', gold: true },
                            { label: 'Traditional Agency', subtitle: 'Industry Standard', gold: false },
                            { label: 'Freelancer', subtitle: 'Solo Resource', gold: false },
                        ].map(col => (
                            <div key={col.label} className="px-8 py-6 text-center flex flex-col items-center justify-center">
                                <span className={`text-sm font-bold tracking-[0.12em] mb-1 ${col.gold ? 'text-amber-600' : 'text-zinc-400'}`}>
                                    {col.label}
                                </span>
                                <span className="text-[10px] font-mono tracking-wider text-zinc-400/60 uppercase">{col.subtitle}</span>
                            </div>
                        ))}
                    </div>

                    {/* Mobile headers */}
                    <div className="grid md:hidden grid-cols-4 border-b border-zinc-100 relative z-10 bg-white/80">
                        <div className="px-3 py-4 text-[9px] font-mono uppercase tracking-widest text-zinc-400 text-center">Criteria</div>
                        <div className="px-2 py-4 text-center font-bold text-[10px] text-amber-600 tracking-wide">BIGWEB</div>
                        <div className="px-2 py-4 text-center font-bold text-[10px] text-zinc-400 tracking-wide">Agency</div>
                        <div className="px-2 py-4 text-center font-bold text-[10px] text-zinc-400 tracking-wide">Free<br />lancer</div>
                    </div>

                    {/* Rows */}
                    <div className="relative z-10 divide-y divide-zinc-50/80">
                        {rows.map((row, i) => (
                            <motion.div
                                key={row.feature}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.04 }}
                                onMouseEnter={() => setHoveredRow(i)}
                                onMouseLeave={() => setHoveredRow(null)}
                                className={`grid grid-cols-4 relative transition-colors duration-200 ${hoveredRow === i ? 'bg-amber-50/50' : ''}`}
                            >
                                <motion.div
                                    className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-amber-500"
                                    animate={{ scaleY: hoveredRow === i ? 1 : 0, opacity: hoveredRow === i ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ originY: 'center' }}
                                />
                                <div className={`px-4 md:px-8 py-5 text-xs md:text-sm font-medium flex items-center transition-all duration-200 ${hoveredRow === i ? 'text-zinc-900 pl-5 md:pl-10' : 'text-zinc-600'}`}>
                                    {row.feature}
                                </div>
                                <div className="px-2 md:px-8 py-5 flex items-center justify-center">
                                    <CellIcon value={row.bigweb} invert />
                                </div>
                                <div className="px-2 md:px-8 py-5 flex items-center justify-center opacity-70">
                                    <CellIcon value={row.agencies} invert />
                                </div>
                                <div className="px-2 md:px-8 py-5 flex items-center justify-center opacity-70">
                                    <CellIcon value={row.freelancers} invert />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 text-white text-sm font-semibold tracking-wide shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-zinc-800 transition-colors duration-300"
                    >
                        Start a Project
                        <span className="font-mono transition-transform duration-500 group-hover:translate-x-1 inline-block">→</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-[12px] text-zinc-500 font-medium">Zero commitment discovery call.</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
