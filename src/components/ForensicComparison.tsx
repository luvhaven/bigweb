'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle2, ArrowRight, MousePointer2, Zap, Brain, Layout } from 'lucide-react'
import { cn } from '@/lib/utils'

const COMPARISONS = [
    {
        id: 'hero',
        title: 'The Hero Section',
        before: {
            label: 'Design-Only Approach',
            description: 'Vague messaging, massive unoptimized images, and hidden calls-to-action.',
            elements: [
                { type: 'image', label: 'Unoptimized Visuals', problem: 'Slows down load by 2s' },
                { type: 'title', label: 'Generic Headlines', problem: 'No clear value' },
                { type: 'button', label: 'Weak CTAs', problem: 'No urgency' }
            ]
        },
        after: {
            label: 'Performance Approach',
            description: 'Clear value proposition, optimized assets, and intent-driven action.',
            elements: [
                { type: 'image', label: 'Optimized Imagery', solution: 'Fast-load WebP format' },
                { type: 'title', label: 'Direct Value-Add', solution: 'Clear benefits mentioned' },
                { type: 'button', label: 'High-Intent CTA', solution: 'Focused on next steps' }
            ]
        },
        metric: '+142% Click-Through Rate'
    },
    {
        id: 'checkout',
        title: 'The Checkout Flow',
        before: {
            label: 'Generic Template',
            description: 'Required account creation, 15+ form fields, hidden shipping costs.',
            elements: [
                { type: 'form', label: 'Create Password', problem: 'High friction barrier' },
                { type: 'cost', label: 'Shipping: Calculated at end', problem: 'Trust-killer' }
            ]
        },
        after: {
            label: 'Conversion Engine',
            description: 'Guest checkout enabled, single-page flow, upfront trust markers.',
            elements: [
                { type: 'form', label: 'Express Checkout', solution: 'One-click pay enabled' },
                { type: 'cost', label: 'Free Shipping (Always)', solution: 'Removes price shock' }
            ]
        },
        metric: '-60% Cart Abandonment'
    }
]

export default function ForensicComparison() {
    const [activeTab, setActiveTab] = useState(0)
    const [view, setView] = useState<'before' | 'after'>('after')

    const current = COMPARISONS[activeTab]

    return (
        <section className="py-40 bg-black overflow-hidden border-b border-zinc-900 border-t">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 mb-10">
                            <Brain className="w-4 h-4 text-orange-600" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">
                                Forensic_Analysis_Lab
                            </span>
                        </div>
                        <p className="text-5xl md:text-[5rem] font-black tracking-tighter uppercase italic leading-[0.8] text-white">
                            Before & After: <br />
                            <span className="text-zinc-800">The Delta.</span>
                        </p>
                    </div>

                    <div className="flex bg-zinc-950 border border-zinc-900 p-1">
                        <button
                            onClick={() => setView('before')}
                            className={cn(
                                "px-8 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
                                view === 'before' ? "bg-red-950/20 text-red-600 border border-red-900/30" : "text-zinc-600 hover:text-white"
                            )}
                        >
                            Vector_Failure
                        </button>
                        <button
                            onClick={() => setView('after')}
                            className={cn(
                                "px-8 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all",
                                view === 'after' ? "bg-emerald-950/20 text-emerald-500 border border-emerald-900/30" : "text-zinc-600 hover:text-white"
                            )}
                        >
                            Vector_Optimized
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    {/* Navigation */}
                    <div className="lg:col-span-4 space-y-4">
                        {COMPARISONS.map((comp, idx) => (
                            <button
                                key={comp.id}
                                onClick={() => setActiveTab(idx)}
                                className={cn(
                                    "w-full text-left p-8 border-l-4 transition-all duration-300 group bg-zinc-950",
                                    activeTab === idx
                                        ? "bg-zinc-900 border-orange-600"
                                        : "bg-black border-zinc-900 hover:bg-zinc-900"
                                )}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={cn(
                                        "font-bold text-lg uppercase tracking-wider",
                                        activeTab === idx ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                                    )}>
                                        {comp.title}
                                    </span>
                                    <ArrowRight className={cn(
                                        "w-5 h-5 transition-transform",
                                        activeTab === idx ? "text-orange-600 translate-x-0" : "text-zinc-700 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                    )} />
                                </div>
                                <div className="text-[10px] text-orange-600 font-mono font-bold tracking-widest uppercase">
                                    {comp.metric}
                                </div>
                            </button>
                        ))}

                        <div className="p-8 bg-zinc-950 border border-zinc-900 mt-8">
                            <h4 className="font-mono font-bold text-[10px] text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap className="w-3 h-3 text-orange-600" />
                                Engineering_Logic_v1
                            </h4>
                            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                                // We design for quantifiable capital extraction. <br />
                                // Every element is subjected to rigorous A/B stress testing.
                            </p>
                        </div>
                    </div>

                    {/* Interactive Showcase */}
                    <div className="lg:col-span-8">
                        <div className="relative aspect-[16/10] bg-black border border-zinc-900 overflow-hidden shadow-2xl group">
                            {/* Browser UI Mockup */}
                            <div className="absolute top-0 left-0 right-0 h-12 bg-zinc-950 border-b border-zinc-900 flex items-center px-6 gap-4 z-20">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-zinc-800" />
                                    <div className="w-2 h-2 bg-zinc-800" />
                                    <div className="w-2 h-2 bg-zinc-800" />
                                </div>
                                <div className="flex-1 bg-black border border-zinc-900 h-6 mx-4 flex items-center px-4">
                                    <span className="text-[8px] font-mono text-zinc-700">LOCALHOST:3000 // SYSTEM_VIEW</span>
                                </div>
                            </div>

                            <div className="absolute inset-0 pt-12 bg-zinc-950/50">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.03] pointer-events-none" />
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={view + activeTab}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full p-12"
                                    >
                                        <div className="mb-10">
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-4 py-1.5 border mb-6",
                                                view === 'before' ? "bg-red-950/10 text-red-600 border-red-900/30" : "bg-emerald-950/10 text-emerald-500 border-emerald-900/30"
                                            )}>
                                                {view === 'before' ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                                <span className="text-[9px] font-mono font-bold uppercase tracking-widest">{current[view].label}</span>
                                            </div>
                                            <p className="text-xl font-medium text-zinc-300 max-w-xl font-mono leading-relaxed">
                                                "{current[view].description}"
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            {current[view].elements.map((el, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: view === 'before' ? -20 : 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className={cn(
                                                        "p-6 border flex items-center justify-between group bg-black hover:bg-zinc-900/50 transition-all",
                                                        view === 'before' ? "border-red-900/20" : "border-emerald-900/20"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-6">
                                                        <div className={cn(
                                                            "w-12 h-12 flex items-center justify-center border",
                                                            view === 'before' ? "bg-red-950/10 text-red-600 border-red-900/30" : "bg-emerald-950/10 text-emerald-500 border-emerald-900/30"
                                                        )}>
                                                            <Layout className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-xs text-white uppercase tracking-widest mb-1">{el.label}</div>
                                                            <div className="text-[10px] font-mono text-zinc-500 uppercase">
                                                                {view === 'before' ? `// FAIL_STATE: ${el.problem}` : `// OPTIMIZED: ${el.solution}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cn(
                                                        "px-3 py-1 text-[8px] font-mono font-bold uppercase tracking-widest border",
                                                        view === 'before' ? "text-red-600 border-red-900/30 bg-red-950/10" : "text-emerald-500 border-emerald-900/30 bg-emerald-950/10"
                                                    )}>
                                                        {view === 'before' ? 'DETECTED' : 'RESOLVED'}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
