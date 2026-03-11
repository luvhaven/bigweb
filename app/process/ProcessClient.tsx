'use client'

import { motion } from 'framer-motion'

interface ProcessStep {
    id: string
    title: string
    description: string | null
    icon?: string
}

interface ProcessClientProps {
    steps: ProcessStep[]
}

export default function ProcessClient({ steps }: ProcessClientProps) {
    return (
        <section className="py-24 bg-[#0a0a0a] relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="group p-10 rounded-[2rem] border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500 relative overflow-hidden"
                        >
                            <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-[0.3em] block mb-8">
                                Phase {index + 1}
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-accent transition-colors duration-500">
                                {step.title}
                            </h3>
                            <p className="text-zinc-500 leading-relaxed font-medium group-hover:text-zinc-400 transition-colors">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
