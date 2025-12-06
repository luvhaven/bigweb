'use client'

import { useState, useRef, MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface Service {
    title: string
    slug: string
    tagline: string
    description: string
    features: string[]
    results: string
    image: string
}

interface ServiceCard3DProps {
    service: Service
    index: number
}

export default function ServiceCard3D({ service, index }: ServiceCard3DProps) {
    const [isHovered, setIsHovered] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setIsHovered(false)
    }

    return (
        <Link href={`/services/${service.slug}`} className="block h-full cursor-none">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="group relative h-full perspective-1000"
            >
                <motion.div
                    className="relative bg-card border border-border hover:border-accent transition-colors duration-300 card-hover-premium texture-noise h-full flex flex-col overflow-hidden rounded-xl"
                    style={{
                        transform: "translateZ(0)",
                    }}
                    animate={{
                        y: isHovered ? -8 : 0,
                        boxShadow: isHovered
                            ? "0 20px 40px -5px rgba(0, 0, 0, 0.2), 0 10px 20px -5px rgba(255, 107, 53, 0.15)"
                            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* Shine Effect */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 mix-blend-overlay"
                        style={{
                            background: `radial-gradient(circle at ${50 + x.get() * 100}% ${50 + y.get() * 100}%, rgba(255,255,255,0.2), transparent 50%)`
                        }}
                    />

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden shrink-0">
                        <motion.img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                            }}
                            transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 translate-z-20">
                            <p className="text-accent text-sm font-medium mb-1 tracking-wider">{service.tagline}</p>
                            <h3 className="text-xl font-bold text-white leading-tight">{service.title}</h3>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 transform-style-3d">
                        <p className="text-muted-foreground mb-6 line-clamp-3 text-sm leading-relaxed group-hover:text-foreground transition-colors transform-z-10">
                            {service.description}
                        </p>

                        {/* Features (Visible on Hover in original, but let's make it always visible or expand) */}
                        {/* Let's keep the expand behavior but inside the 3D card it might be tricky with fixed height. 
                Let's make showing features an expansion. */}

                        <motion.div
                            initial={false}
                            animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                            className="overflow-hidden space-y-3 mb-4"
                        >
                            {service.features.slice(0, 3).map((feature, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </motion.div>

                        <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between group-hover:border-accent/30 transition-colors">
                            <span className="font-bold text-lg gradient-text">{service.results}</span>
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    )
}
