'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'


export interface ProcessStep {
    title: string
    description: string
    icon: string
}

const defaultSteps: ProcessStep[] = [
    {
        title: "Discovery",
        description: "We dive deep into your business goals, audience, and competitors to build a solid foundation.",
        icon: "🔍"
    },
    {
        title: "Strategy",
        description: "We craft a data-driven roadmap and technical architecture for your digital success.",
        icon: "🎯"
    },
    {
        title: "Design",
        description: "We create stunning, user-centric interfaces that embody your brand and convert visitors.",
        icon: "🎨"
    },
    {
        title: "Development",
        description: "We build robust, scalable solutions using cutting-edge technology and best practices.",
        icon: "💻"
    },
    {
        title: "Launch",
        description: "We deploy your project with rigorous testing, performance optimization, and SEO setup.",
        icon: "🚀"
    },
    {
        title: "Growth",
        description: "We continuously monitor, analyze, and improve performance to ensure long-term success.",
        icon: "📈"
    }
]

interface ProcessTimelineProps {
    steps?: ProcessStep[]
}

export default function ProcessTimeline({ steps = defaultSteps }: ProcessTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <div ref={containerRef} className="relative py-20">
            {/* Central Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 hidden md:block rounded-full overflow-hidden">
                <motion.div
                    style={{ height: lineHeight }}
                    className="w-full bg-accent origin-top"
                />
            </div>

            {/* Steps */}
            <div className="space-y-12 md:space-y-24">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                    >
                        {/* Content Card */}
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className={`p-8 rounded-3xl bg-card border border-border shadow-lg hover:border-accent/50 hover:shadow-glow transition-all duration-300 group ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                                }`}>
                                <div className={`text-5xl mb-6 transform transition-transform duration-300 group-hover:scale-110 inline-block ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                                    }`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                        </div>

                        {/* Number Indicator */}
                        <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-accent shadow-glow shrink-0">
                            <span className="text-xl font-bold text-accent">{index + 1}</span>
                        </div>

                        {/* Spacer */}
                        <div className="flex-1 hidden md:block" />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
