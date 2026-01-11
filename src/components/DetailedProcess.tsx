'use client'

import { motion } from 'framer-motion'
import { Microscope, Target, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react'

const steps = [
    {
        title: "Forensic Audit & Diagnosis",
        subtitle: "The Science of Discovery",
        description: "We don't guess. We use heatmaps, session recordings, and custom analytics to identify exactly where your revenue is leaking. We look at load speeds, device-specific friction, and psychological messaging gaps.",
        icon: Microscope,
        metrics: ["Data Integrity Check", "User Behavior Heatmapping", "Funnel Drop-off Analysis"],
        color: "bg-blue-500",
        id: "01"
    },
    {
        title: "Strategic Bottleneck Isolation",
        subtitle: "The Anatomy of Friction",
        description: "Once we have the data, we isolate the technical and psychological bottlenecks. Is it a confusing CTA? A friction-heavy form? We prioritize fixes based on potential ROI and implementation speed.",
        icon: Target,
        metrics: ["Friction Scoring", "Conversion Roadmap", "Priority Matrix"],
        color: "bg-orange-500",
        id: "02"
    },
    {
        title: "Precision Rebuilding",
        subtitle: "Engineered Outcomes",
        description: "This is where the 'Art' of traditional design is replaced by the 'Science' of Conversion Engineering. We rewrite copy based on intent, redesign interfaces based on cognitive load, and optimize code for split-second performance.",
        icon: Cpu,
        metrics: ["Intent-Based Copy", "Cognitive Load Reduction", "Speed Optimization"],
        color: "bg-accent",
        id: "03"
    },
    {
        title: "Infinite Optimization",
        subtitle: "The Growth Compounder",
        description: "Launch is the starting line, not the finish. We continuously A/B test variations, monitor live results, and iterate based on real performance data to ensure your conversion rate keeps climbing.",
        icon: TrendingUp,
        metrics: ["A/B Testing Cycles", "Real-Time Monitoring", "Monthly Value reporting"],
        color: "bg-green-500",
        id: "04"
    }
]

export default function DetailedProcess() {
    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="space-y-32">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
                        >
                            {/* Visual Side */}
                            <div className="flex-1 relative w-full">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className={`aspect-square md:aspect-video rounded-3xl ${step.color}/5 border border-${step.color.split('-')[1]}-500/20 flex items-center justify-center relative overflow-hidden group shadow-2xl`}
                                >
                                    {/* Animated Background Pulse */}
                                    <div className={`absolute inset-0 ${step.color}/5 animate-pulse`} />

                                    <step.icon className={`w-32 h-32 ${step.color.replace('bg-', 'text-')} opacity-20 group-hover:scale-110 transition-transform duration-700`} />

                                    <div className="absolute top-8 left-8">
                                        <span className="text-8xl font-black opacity-10 font-mono tracking-tighter">{step.id}</span>
                                    </div>

                                    {/* Abstract UI Elements */}
                                    <div className="absolute bottom-8 right-8 space-y-2">
                                        {[1, 2, 3].map(i => (
                                            <motion.div
                                                key={i}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: 100 + (i * 20) }}
                                                transition={{ duration: 0.8, delay: 0.5 + (i * 0.1) }}
                                                className={`h-1.5 ${step.color} rounded-full opacity-30`}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 space-y-8">
                                <div className="space-y-4">
                                    <span className={`text-sm font-bold uppercase tracking-widest ${step.color.replace('bg-', 'text-')}`}>{step.subtitle}</span>
                                    <h2 className="text-4xl md:text-5xl font-bold">{step.title}</h2>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {step.metrics.map((metric, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50">
                                            <CheckCircle2 className={`w-5 h-5 ${step.color.replace('bg-', 'text-')}`} />
                                            <span className="text-sm font-medium">{metric}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
