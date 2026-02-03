'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { MouseEvent } from 'react'

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

function BentoCard({ item, themeColor, index }: { item: BentoItem, themeColor: string, index: number }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            className={`
                group relative overflow-hidden rounded-3xl border border-white/10 bg-card/50 p-8
                hover:border-white/20 transition-colors duration-500
                ${item.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'}
                ${item.colSpan === 3 ? 'md:col-span-3' : ''}
                ${item.rowSpan === 2 ? 'md:row-span-2' : ''}
            `}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            var(--${themeColor}-500-alpha-15),
                            transparent 80%
                        )
                    `
                }}
            />

            {/* Background Gradient/Image */}
            <div className={`
                absolute inset-0 bg-gradient-to-br from-${themeColor}-500/5 via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
            `} />

            {item.bgImage && (
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                    <img src={item.bgImage} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                </div>
            )}

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("/assets/noise.png")' }}
            />

            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className={`
                    w-12 h-12 rounded-2xl bg-${themeColor}-500/10 flex items-center justify-center
                    group-hover:bg-${themeColor}-500 group-hover:text-white transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3 shadow-[0_0_15px_-5px_transparent] 
                    group-hover:shadow-[0_0_20px_-5px_var(--${themeColor}-500)]
                `}>
                    <item.icon className={`w-6 h-6 text-${themeColor}-500 group-hover:text-white transition-colors`} />
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-black mb-3 tracking-tighter-extreme uppercase group-hover:translate-x-2 transition-transform duration-500">
                        {item.title}
                    </h3>
                    <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 leading-tight font-medium text-sm">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default function BentoGrid({
    title,
    subtitle,
    items,
    themeColor = "blue"
}: BentoGridProps) {
    return (
        <section className="py-32 px-6 bg-background relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-${themeColor}-500/5 rounded-full blur-[120px]`} />
                <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-${themeColor}-500/5 rounded-full blur-[120px]`} />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="mb-20 max-w-3xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tighter-extreme uppercase leading-none"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-zinc-500 font-medium tracking-tight"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {items.map((item, index) => (
                        <BentoCard key={index} item={item} themeColor={themeColor} index={index} />
                    ))}
                </div>
            </div>

            {/* CSS Variables for Spotlight Color */}
            <style jsx global>{`
                :root {
                    --blue-500-alpha-15: rgba(59, 130, 246, 0.15);
                    --green-500-alpha-15: rgba(34, 197, 94, 0.15);
                    --purple-500-alpha-15: rgba(168, 85, 247, 0.15);
                    --orange-500-alpha-15: rgba(249, 115, 22, 0.15);
                    --cyan-500-alpha-15: rgba(6, 182, 212, 0.15);
                    --emerald-500-alpha-15: rgba(16, 185, 129, 0.15);
                    --indigo-500-alpha-15: rgba(99, 102, 241, 0.15);
                    --violet-500-alpha-15: rgba(139, 92, 246, 0.15);
                }
            `}</style>
        </section>
    )
}

