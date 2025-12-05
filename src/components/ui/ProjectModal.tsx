'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Calendar, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

interface ProjectModalProps {
    project: any
    isOpen: boolean
    onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!project) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-4 md:inset-10 z-[101] bg-background border border-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-7xl mx-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Image/Video Section */}
                        <div className="relative w-full md:w-3/5 h-64 md:h-full bg-muted group">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-card/50 backdrop-blur-xl">
                            <div className="h-full flex flex-col justify-center max-w-lg mx-auto space-y-8">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium tracking-wider uppercase mb-4 border border-accent/20">
                                        {project.category}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{project.title}</h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6 py-6 border-t border-border border-b">
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-accent" /> Year
                                        </h4>
                                        <p className="text-muted-foreground">{project.year}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                            <Users className="w-4 h-4 text-accent" /> Client
                                        </h4>
                                        <p className="text-muted-foreground">{project.title}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Link href={`/portfolio/${project.id}`} className="flex-1">
                                        <Button className="w-full bg-accent hover:bg-accent-dark text-white rounded-xl py-6 text-lg shadow-glow hover:scale-105 transition-all">
                                            View Case Study
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
