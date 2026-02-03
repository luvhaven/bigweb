'use client'

import { motion } from 'framer-motion'
import { Microscope, Target, Cpu, TrendingUp, CheckCircle2 } from 'lucide-react'

const steps = [
    {
        title: "Conversion Audit & Strategy",
        subtitle: "The Discovery Phase",
        description: "We don't guess. We perform a detailed audit of your tracking, user behavior, and site performance. We perform a deep analysis to find where your revenue is leaking.",
        icon: Microscope,
        metrics: ["Behavioral Data Review", "User Journey Mapping", "Funnel Drop-off Analysis"],
        color: "bg-cyan-500",
        id: "01"
    },
    {
        title: "User Psychology & Experience",
        subtitle: "The Strategy Phase",
        description: "We design a conversion strategy based on how users actually think and behave. We eliminate friction and create clear paths that drive visitors to take action.",
        icon: Target,
        metrics: ["Reduced User Friction", "Decision Path Mapping", "Experience Review"],
        color: "bg-purple-500",
        id: "02"
    },
    {
        title: "Expert Design & Development",
        subtitle: "The Build Phase",
        description: "We build your high-performance frontend using modern, reliable frameworks. Every line of code is optimized for instant load times and search engine visibility.",
        icon: Cpu,
        metrics: ["Modern Frameworks", "Speed Optimization", "Clean Code Standards"],
        color: "bg-blue-500",
        id: "03"
    },
    {
        title: "Continuous Growth & Scaling",
        subtitle: "The Optimization Phase",
        description: "Launch is only the beginning. We perform constant testing and data-driven updates to ensure your results grow and improve over time.",
        icon: TrendingUp,
        metrics: ["Ongoing Testing", "Growth Planning", "Performance Tracking"],
        color: "bg-orange-500",
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
