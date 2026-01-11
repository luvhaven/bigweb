'use client'

import { motion } from 'framer-motion'
import { ShieldAlert, Fingerprint, SearchX, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const problems = [
    {
        icon: SearchX,
        title: "Traffic But No Sales",
        description: "You're driving ad spend and organic traffic, but users bounce in seconds. Your bucket is leaking."
    },
    {
        icon: Fingerprint,
        title: "Pretty But Passive",
        description: "Your site won design awards but isn't winning customers. Aesthetics without intent is just decoration."
    },
    {
        icon: ShieldAlert,
        title: "Confusing Messaging",
        description: "Visitors don't understand what you do within 3 seconds. Confusion is the biggest conversion killer."
    },
    {
        icon: Clock,
        title: "Slow & Bloated",
        description: "Every millisecond of load time costs you 1% in revenue. Your heavy theme is costing you money."
    }
]

export default function ProblemSolution() {
    return (
        <section className="py-24 bg-secondary/5 relative">
            <div className="container mx-auto px-6">
                {/* Problem Section */}
                <div className="mb-24">
                    <div className="max-w-3xl mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">The High-Growth Founder Problem</h2>
                        <p className="text-xl text-muted-foreground">
                            You've built a great product. You have a budget. But your website is failing to capture the value you've created.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {problems.map((prob, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-background p-6 rounded-xl border border-border/50 hover:border-red-500/20 transition-colors group"
                            >
                                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <prob.icon className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{prob.title}</h3>
                                <p className="text-sm text-muted-foreground">{prob.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-border mb-24" />

                {/* Solution Section */}
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">

                            The Solution
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Enter The <br />
                            <span className="text-accent">Conversion Lab</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            We treat your website like a laboratory, not an art gallery. Every element—from color contrast to headline hierarchy—is tested, measured, and engineered to drive a specific action.
                        </p>

                        <div className="space-y-4 mb-8">
                            {['Scientific Analysis', 'Bottleneck Identification', 'Intent-Based Rebuilding', 'Performance Tracking'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <ArrowRight className="w-3 h-3 text-green-500" />
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 py-6 px-8 text-lg" asChild>
                            <Link href="/offers/diagnostic">
                                Enter The Lab
                            </Link>
                        </Button>
                    </div>

                    <div className="relative">
                        {/* Abstract visualization of "The Lab" */}
                        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full opacity-20" />
                        <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                                <div className="font-mono text-xs text-muted-foreground">LAB_MONITOR_V2.0</div>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Conversion Rate</span>
                                        <span className="text-green-500">+142%</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "20%" }}
                                            whileInView={{ width: "68%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Bounce Rate</span>
                                        <span className="text-green-500">-45%</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "80%" }}
                                            whileInView={{ width: "35%" }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                            className="h-full bg-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Revenue/Visitor</span>
                                        <span className="text-green-500">+$2.40</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "15%" }}
                                            whileInView={{ width: "75%" }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                                            className="h-full bg-accent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
