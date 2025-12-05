'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ProcessStep {
    number: string
    title: string
    description: string
    tags: string[]
}

interface ProcessTimelineProps {
    steps: ProcessStep[]
    themeColor?: string
}

export default function ProcessTimeline({ steps, themeColor = "green" }: ProcessTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    return (
        <section ref={containerRef} className="py-32 px-6 bg-secondary/5 relative">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">How We Work</h2>
                    <p className="text-xl text-muted-foreground">A refined process for exceptional results</p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2">
                        <motion.div
                            style={{ scaleY: scrollYProgress }}
                            className={`absolute top-0 left-0 right-0 origin-top bg-${themeColor}-500 w-full h-full`}
                        />
                    </div>

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 md:gap-24 items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse text-left md:text-left' : 'md:text-right'
                                    }`}
                            >
                                {/* Content */}
                                <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <div className={`
                    text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-${themeColor}-500/20 to-transparent mb-4
                    select-none
                  `}>
                                        {step.number}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                        {step.description}
                                    </p>
                                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-start' : 'md:justify-end'}`}>
                                        {step.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className={`px-3 py-1 rounded-full text-sm bg-${themeColor}-500/10 text-${themeColor}-500 border border-${themeColor}-500/20`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-border flex items-center justify-center z-10">
                                    <div className={`w-3 h-3 rounded-full bg-${themeColor}-500`} />
                                </div>

                                {/* Empty space for layout balance */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
