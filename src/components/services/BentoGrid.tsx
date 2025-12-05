'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface BentoItem {
    title: string
    description: string
    icon: LucideIcon
    colSpan?: 1 | 2 | 3
    rowSpan?: 1 | 2
    bgImage?: string
}

interface BentoGridProps {
    title: string
    subtitle: string
    items: BentoItem[]
    themeColor?: string
}

export default function BentoGrid({
    title,
    subtitle,
    items,
    themeColor = "green"
}: BentoGridProps) {
    return (
        <section className="py-32 px-6 bg-background relative overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-20 max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {items.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`
                  group relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8
                  hover:border-${themeColor}-500/50 transition-colors duration-500
                  ${item.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'}
                  ${item.colSpan === 3 ? 'md:col-span-3' : ''}
                  ${item.rowSpan === 2 ? 'md:row-span-2' : ''}
                `}
                            >
                                {/* Background Gradient/Image */}
                                <div className={`
                  absolute inset-0 bg-gradient-to-br from-${themeColor}-500/5 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                `} />

                                {item.bgImage && (
                                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                                        <img src={item.bgImage} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                )}

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className={`
                    w-12 h-12 rounded-2xl bg-${themeColor}-500/10 flex items-center justify-center
                    group-hover:bg-${themeColor}-500 group-hover:text-white transition-all duration-300
                  `}>
                                        <Icon className={`w-6 h-6 text-${themeColor}-500 group-hover:text-white transition-colors`} />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-2 transition-transform duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
