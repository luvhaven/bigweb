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
            label: 'The "Artist" Approach',
            description: 'Vague messaging, massive unoptimized image, hidden CTA below the fold.',
            elements: [
                { type: 'image', label: 'Abstract 4K Background', problem: 'Slows down load by 2s' },
                { type: 'title', label: 'We Build Dreams', problem: 'Vague, non-specific' },
                { type: 'button', label: 'Learn More', problem: 'No urgency, weak intent' }
            ]
        },
        after: {
            label: 'The "Engineer" Approach',
            description: 'Surgical headline, performance-optimized visual, clear intent-based CTA.',
            elements: [
                { type: 'image', label: 'Contextual Product Visual', solution: '100kb WebP, clears intent' },
                { type: 'title', label: 'Scale Your SaaS by 25%', solution: 'Clear value proposition' },
                { type: 'button', label: 'Start 14-Day Free Trial', solution: 'Direct, low-friction action' }
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
        <section className="py-24 bg-secondary/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-accent font-bold mb-4">
                            Forensic Re-Engineering
                        </h2>
                        <p className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                            Before & After: <br />
                            <span className="text-accent">The Lab results.</span>
                        </p>
                    </div>

                    <div className="flex bg-card border border-border rounded-full p-1 shadow-inner">
                        <button
                            onClick={() => setView('before')}
                            className={cn(
                                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                                view === 'before' ? "bg-red-500/10 text-red-500" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            The Problem
                        </button>
                        <button
                            onClick={() => setView('after')}
                            className={cn(
                                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                                view === 'after' ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            The Solution
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Navigation */}
                    <div className="lg:col-span-4 space-y-4">
                        {COMPARISONS.map((comp, idx) => (
                            <button
                                key={comp.id}
                                onClick={() => setActiveTab(idx)}
                                className={cn(
                                    "w-full text-left p-6 rounded-2xl border transition-all duration-300 group",
                                    activeTab === idx
                                        ? "bg-background border-accent shadow-glow"
                                        : "bg-transparent border-border/50 hover:border-accent/30"
                                )}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={cn(
                                        "font-bold text-lg",
                                        activeTab === idx ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                        {comp.title}
                                    </span>
                                    <ArrowRight className={cn(
                                        "w-5 h-5 transition-transform",
                                        activeTab === idx ? "text-accent translate-x-0" : "text-muted-foreground -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                    )} />
                                </div>
                                <div className="text-sm text-accent font-black tracking-widest uppercase">
                                    {comp.metric}
                                </div>
                            </button>
                        ))}

                        <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 mt-8">
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-accent" />
                                Engineering Logic
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Most agencies design to "look pretty". We design to "solve friction".
                                In the Lab, beauty is an accidental byproduct of efficiency.
                            </p>
                        </div>
                    </div>

                    {/* Interactive Showcase */}
                    <div className="lg:col-span-8">
                        <div className="relative aspect-[16/10] bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
                            {/* Browser UI Mockup */}
                            <div className="absolute top-0 left-0 right-0 h-10 bg-muted/30 border-b border-border flex items-center px-4 gap-2 z-20">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                </div>
                                <div className="flex-1 bg-background/50 h-5 rounded-md mx-4" />
                            </div>

                            <div className="absolute inset-0 pt-10">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={view + activeTab}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full p-8"
                                    >
                                        <div className="mb-6">
                                            <div className={cn(
                                                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4",
                                                view === 'before' ? "bg-red-500/10 text-red-500" : "bg-accent/10 text-accent"
                                            )}>
                                                {view === 'before' ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                                {current[view].label}
                                            </div>
                                            <p className="text-lg font-medium text-foreground max-w-xl">
                                                {current[view].description}
                                            </p>
                                        </div>

                                        <div className="grid gap-4 mt-8">
                                            {current[view].elements.map((el, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, x: view === 'before' ? -20 : 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className={cn(
                                                        "p-5 rounded-xl border flex items-center justify-between group",
                                                        view === 'before' ? "bg-red-500/5 border-red-500/20" : "bg-emerald-500/5 border-emerald-500/20"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-lg flex items-center justify-center",
                                                            view === 'before' ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                                                        )}>
                                                            <Layout className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm uppercase tracking-tight">{el.label}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {view === 'before' ? `Problem: ${el.problem}` : `Engineered: ${el.solution}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cn(
                                                        "px-2 py-1 rounded text-[8px] font-black uppercase",
                                                        view === 'before' ? "text-red-400 border border-red-400/30" : "text-emerald-400 border border-emerald-400/30"
                                                    )}>
                                                        {view === 'before' ? 'Detected' : 'Solved'}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
