'use client'

import { motion } from 'framer-motion'
import { Stethoscope, Target, PenTool, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const steps = [
    {
        icon: Stethoscope,
        title: "1. Diagnose",
        description: "We perform a forensic audit of your current site. We identify exactly where users are dropping off, what messaging is confusing, and why you aren't converting.",
        color: "bg-blue-500",
        text: "text-blue-500"
    },
    {
        icon: Target,
        title: "2. Identify Bottlenecks",
        description: "We isolate the specific friction points—whether it's load speed, weak headlines, or a cluttered checkout—that are blocking revenue.",
        color: "bg-red-500",
        text: "text-red-500"
    },
    {
        icon: PenTool,
        title: "3. Precision Engineering",
        description: "We deploy engineered solutions. Intent-based copywriting, psychological design triggers, and performance optimizations are pushed to production.",
        color: "bg-accent",
        text: "text-accent"
    },
    {
        icon: TrendingUp,
        title: "4. Optimize & Scale",
        description: "Launch is day one. We monitor real user behavior, A/B test variations, and continuously refine the system to maximize ROI.",
        color: "bg-green-500",
        text: "text-green-500"
    }
]

export default function ConversionProcess() {
    return (
        <section id="process" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">The Conversion Lab Protocol</h2>
                    <p className="text-xl text-muted-foreground">
                        We don't guess. We follow a strict, scientific process to turn traffic into revenue.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500 via-accent to-green-500 opacity-30" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`w-24 h-24 rounded-2xl ${step.color}/10 flex items-center justify-center mb-8 relative border border-border group-hover:border-${step.color.split('-')[1]}-500/50 transition-colors duration-300`}>
                                    <div className={`absolute inset-0 ${step.color}/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                    <step.icon className={`w-10 h-10 ${step.text}`} />
                                    <div className="absolute -bottom-3 bg-background border border-border px-3 py-1 rounded-full text-xs font-bold font-mono">
                                        STEP 0{index + 1}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 h-14 px-8 text-lg" asChild>
                        <Link href="/offers/diagnostic">
                            Start Step 1: Diagnosis
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
