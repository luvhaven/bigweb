'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string;
}

const DEFAULT_PROJECTS: Project[] = [
    {
        id: 'velocity-engine',
        title: 'Velocity Engine',
        category: 'Fintech',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'nexus-flow',
        title: 'Nexus Flow',
        category: 'SaaS Platform',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
    },
    {
        id: 'elevate-commerce',
        title: 'Elevate Commerce',
        category: 'Luxury Retail',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop'
    },
    {
        id: 'vanguard-capital',
        title: 'Vanguard Capital',
        category: 'Institutional Finance',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
    }
]

interface SelectedWorkListProps {
    projects?: Project[];
    title?: React.ReactNode;
    showViewAll?: boolean;
    className?: string; // Allow custom styling override if needed
}

export default function SelectedWorkList({
    projects = DEFAULT_PROJECTS,
    title,
    showViewAll = true,
    className
}: SelectedWorkListProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [mounted, setMounted] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)

    // Motion values for high-performance mouse tracking
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring physics for the cursor follower
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    useEffect(() => {
        setMounted(true)
        const handleMouseMove = (e: MouseEvent) => {
            // Smart Positioning: Clamp to viewport edges
            const imgWidth = 400
            const imgHeight = 280
            const margin = 20

            // Base position (centered on cursor)
            let targetX = e.clientX - (imgWidth / 2)
            let targetY = e.clientY - (imgHeight / 2)

            // Clamp X
            if (targetX < margin) targetX = margin
            if (targetX + imgWidth > window.innerWidth - margin) targetX = window.innerWidth - imgWidth - margin

            // Clamp Y
            if (targetY < margin) targetY = margin
            if (targetY + imgHeight > window.innerHeight - margin) targetY = window.innerHeight - imgHeight - margin

            mouseX.set(targetX)
            mouseY.set(targetY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    const defaultTitle = (
        <>
            Engineering <br />
            <em className="italic text-zinc-500">excellence.</em>
        </>
    )

    return (
        <section className={`py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden ${className || ''}`}>
            <div className="container mx-auto px-6 lg:px-16" ref={listRef}>

                {/* Section Header */}
                <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">
                            Selected Work
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[0.95]">
                            {title || defaultTitle}
                        </h2>
                    </motion.div>

                    {showViewAll && (
                        <div className="hidden md:block">
                            <Link
                                href="/case-studies"
                                className="group inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors duration-300"
                            >
                                View All Projects
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Project List (Desktop) */}
                <div className="hidden md:block relative z-20">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className="group border-t border-white/[0.08] last:border-b transition-colors duration-500 hover:border-white/[0.2]"
                        >
                            <Link href={`/case-studies/${project.id}`} className="block py-16 relative">
                                <div className="flex items-baseline justify-between gap-10">
                                    {/* Title & Index */}
                                    <div className="flex items-baseline gap-16">
                                        <span className="text-sm font-mono text-zinc-600 group-hover:text-accent transition-colors duration-300">
                                            0{index + 1}
                                        </span>
                                        <h3 className="font-display text-6xl text-white tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Metadata */}
                                    <div className="flex items-center gap-16">
                                        <span className="text-sm text-zinc-500 group-hover:text-white transition-colors duration-300">
                                            {project.category}
                                        </span>
                                        <span className="text-sm font-mono text-zinc-600 group-hover:text-accent transition-colors duration-300">
                                            {project.year}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Project Cards (Mobile Only) */}
                <div className="md:hidden grid gap-8">
                    {projects.map((project, index) => (
                        <Link
                            key={project.id}
                            href={`/case-studies/${project.id}`} // Fixed space in href
                            className="group block"
                        >
                            <div className="aspect-video relative overflow-hidden rounded-2xl mb-6 bg-zinc-900 border border-white/5">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-display text-white tracking-tight">
                                    {project.title}
                                </h3>
                                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-accent transition-colors" />
                            </div>
                            <p className="text-sm text-zinc-500">
                                {project.category}
                            </p>
                        </Link>
                    ))}

                    {showViewAll && (
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <Link
                                href="/case-studies"
                                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent"
                            >
                                View All Projects
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>

            </div>

            {/* Floating Image Preview (Desktop Only) - Portal */}
            {mounted && createPortal(
                <AnimatePresence>
                    {activeIndex !== null && projects[activeIndex] && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                filter: "blur(0px)"
                            }}
                            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.2 } }}
                            style={{
                                x,
                                y,
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                zIndex: 9999, // Ensure it's above everything
                                pointerEvents: 'none'
                            }}
                            className="w-[400px] h-[280px] hidden md:block rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-sm bg-zinc-900/50"
                        >
                            <div className="w-full h-full relative">
                                <motion.img
                                    key={activeIndex}
                                    src={projects[activeIndex].image}
                                    alt={projects[activeIndex].title}
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <span className="text-[10px] font-mono font-medium text-accent uppercase tracking-widest bg-black/50 px-2 py-1 rounded border border-white/10 backdrop-blur-md">
                                        View Case Study
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

        </section>
    )
}
