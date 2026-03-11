'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MessageCircle, Palette, Code2, Rocket, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import KineticTypography from './effects/KineticTypography'
import SectionAtmosphere from './effects/SectionAtmosphere'

const steps = [
    {
        number: '01',
        title: 'Market Intelligence & Strategy',
        description: 'Deep-dive into your market, customers, and competitors. We define measurable KPIs and architect a strategy that turns digital presence into an unfair advantage.',
        duration: '1–2 weeks',
        deliverables: ['Market analysis', 'Competitive audit', 'KPI framework', 'Project roadmap'],
        icon: MessageCircle,
        color: '#d4a853',
        detail: 'We start by analyzing 50+ data points about your audience, competitors, and conversion bottlenecks. You receive a documented Growth Blueprint — a strategic document you own forever — before a single line of code is written.',
        timeToROI: 'Insight delivered Day 3',
    },
    {
        number: '02',
        title: 'Design & Prototyping',
        description: 'High-fidelity prototypes that balance visual impact with conversion psychology. Every layout decision is backed by data, every interaction designed to guide users to action.',
        duration: '2–3 weeks',
        deliverables: ['Wireframes', 'Visual design', 'Interactive prototype', 'Design system'],
        icon: Palette,
        color: '#6366f1',
        detail: 'Three distinct concept directions. One round of unlimited revisions. You review a live Figma prototype before development begins — so there are zero surprises at launch. We apply F-pattern reading psychology, color contrast optimization, and above-the-fold hierarchy principles at every screen.',
        timeToROI: 'Prototype approved Week 2',
    },
    {
        number: '03',
        title: 'Engineering & Build',
        description: 'Clean, performant code on modern frameworks. Sub-second load times, pixel-perfect implementation, and infrastructure engineered for scale from day one.',
        duration: '3–6 weeks',
        deliverables: ['Frontend build', 'CMS integration', 'API development', 'Performance tuning'],
        icon: Code2,
        color: '#10b981',
        detail: 'Built with Next.js 15, TypeScript, and edge-ready architecture. Automated performance budgets enforce sub-1s LCP. You receive a staging preview by Day 7 of build and we run weekly progress calls. Core Web Vitals are guaranteed to hit "Good" across all metrics or we fix it at no charge.',
        timeToROI: 'Staging live within Week 1 of build',
    },
    {
        number: '04',
        title: 'Launch & Accelerate',
        description: "Rigorous QA, seamless deployment, and 30-day post-launch optimization sprint. We don't just ship — we ensure your investment starts compounding immediately.",
        duration: '1–2 weeks',
        deliverables: ['QA testing', 'Deployment', 'Analytics setup', '30-day optimization'],
        icon: Rocket,
        color: '#ec4899',
        detail: '127-point QA checklist across 8 browser/device combinations. Analytics dashboards built in GA4 and our custom performance layer. For 30 days post-launch, we run A/B tests, refine copy, and optimize conversion paths based on real user data. Your team is fully trained on the CMS before handoff.',
        timeToROI: 'ROI measurable within 30 days',
    },
]

function StepCard({ step, index, isInView }: { step: typeof steps[0]; index: number; isInView: boolean }) {
    const [expanded, setExpanded] = useState(false)
    const Icon = step.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.7,
                delay: 0.2 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative"
        >
            <div className="flex gap-6 lg:gap-10">
                {/* Timeline node */}
                <div className="hidden lg:flex flex-col items-center flex-shrink-0">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                        className="w-[26px] h-[26px] rounded-full border-2 border-white/[0.08] bg-[#0a0a0a] flex items-center justify-center group-hover:border-accent/50 transition-colors duration-500 relative z-10"
                    >
                        <div className="w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-accent transition-colors duration-500 group-hover:shadow-[0_0_12px_rgba(212,168,83,0.6)]" />
                        <div className="absolute inset-0 rounded-full border border-accent opacity-0 group-hover:animate-ping mix-blend-screen" />
                    </motion.div>
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 overflow-hidden">
                    {/* Main content — always visible */}
                    <div className="p-8 md:p-10">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">

                            {/* Left: Number + Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-5">
                                    <span className="text-3xl md:text-4xl font-bold text-zinc-800 group-hover:text-accent/40 transition-colors duration-500 font-display">
                                        {step.number}
                                    </span>
                                    <div className="ml-auto lg:hidden">
                                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-700 px-3 py-1.5 rounded-full border border-white/[0.04]">
                                            {step.duration}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
                                    {step.description}
                                </p>
                            </div>

                            {/* Right: Duration + Deliverables */}
                            <div className="lg:w-56 flex-shrink-0 lg:border-l lg:border-white/[0.04] lg:pl-8">
                                <div className="hidden lg:block mb-4">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-700">
                                        Timeline
                                    </span>
                                    <div className="text-sm font-semibold text-zinc-300 mt-1">
                                        {step.duration}
                                    </div>
                                </div>

                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-700 block mb-3">
                                    Deliverables
                                </span>
                                <ul className="space-y-2">
                                    {step.deliverables.map((d, di) => (
                                        <li key={di} className="flex items-center gap-2 text-xs text-zinc-500">
                                            <div className="w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Expand button */}
                        <button
                            onClick={() => setExpanded(v => !v)}
                            className="mt-6 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-600 hover:text-zinc-300 transition-colors duration-300 group/btn"
                        >
                            <span>{expanded ? 'Hide details' : 'What happens at this stage?'}</span>
                            <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>

                    {/* Expandable drawer */}
                    <AnimatePresence initial={false}>
                        {expanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                            >
                                <div
                                    className="px-8 md:px-10 pb-8 md:pb-10 pt-0 border-t border-white/[0.04]"
                                    style={{ borderTopColor: `${step.color}15` }}
                                >
                                    <div
                                        className="mt-6 pt-0 pl-4 border-l-2"
                                        style={{ borderColor: step.color }}
                                    >
                                        <p className="text-sm text-zinc-400 leading-relaxed mb-4">{step.detail}</p>
                                        <div
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.15em]"
                                            style={{ background: `${step.color}10`, color: step.color }}
                                        >
                                            ⚡ {step.timeToROI}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}

export default function CleanProcess({ initialPhases }: { initialPhases?: any[] | null }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    // If DB has process phases, map them to display steps format
    const displaySteps = (initialPhases && initialPhases.length >= 4)
        ? initialPhases.map((p, i) => ({
            ...steps[i % steps.length], // carry icon, color
            number: p.step_number || steps[i % steps.length].number,
            title: p.title || steps[i % steps.length].title,
            description: p.description || steps[i % steps.length].description,
            duration: p.timeline || steps[i % steps.length].duration,
            deliverables: Array.isArray(p.details)
                ? p.details.map((d: any) => (typeof d === 'string' ? d : d.label || d.text || d))
                : steps[i % steps.length].deliverables,
            detail: p.deliverable || steps[i % steps.length].detail,
            timeToROI: steps[i % steps.length].timeToROI,
        }))
        : steps

    return (
        <section ref={ref} className="py-28 md:py-40 bg-[#050505] relative overflow-hidden">
            {/* Atmosphere — neutral, keeps process section clean */}
            <SectionAtmosphere preset="neutral" />

            <div className="container mx-auto px-6 lg:px-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mb-20"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent mb-6 block">
                        How We Work
                    </span>
                    <KineticTypography
                        segments={[
                            { text: 'A process built for ' },
                            { text: 'clarity and speed.', className: 'italic text-zinc-400' }
                        ]}
                        as="h2"
                        className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] mb-6"
                    />
                    <p className="text-lg text-zinc-500 leading-relaxed max-w-xl">
                        Four focused phases. No bloated timelines. Click any stage to see exactly what happens — and when you&apos;ll see results.
                    </p>
                </motion.div>

                {/* Timeline Steps */}
                <div className="relative">
                    {/* Vertical connecting line (desktop) */}
                    <div className="hidden lg:block absolute left-[47px] top-0 bottom-0 w-px">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full bg-gradient-to-b from-accent/30 via-white/[0.06] to-transparent origin-top"
                        />
                    </div>

                    <div className="space-y-4 lg:space-y-6">
                        {displaySteps.map((step, i) => (
                            <StepCard key={i} step={step} index={i} isInView={isInView} />
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                    <div>
                        <p className="text-xs text-zinc-600 mb-1">Typical project timeline</p>
                        <p className="text-sm font-semibold text-zinc-300">7–12 weeks concept to live</p>
                    </div>
                    <div className="w-px h-10 bg-white/[0.06] hidden sm:block" />
                    <div>
                        <p className="text-xs text-zinc-600 mb-1">Sprint projects available</p>
                        <p className="text-sm font-semibold text-zinc-300">Landing pages in 2 weeks</p>
                    </div>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        Start a Project
                        <span className="font-mono transition-transform duration-500 group-hover:translate-x-1 inline-block">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
