'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, Code2, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import ParallaxSection from '@/components/ui/ParallaxSection'

interface CaseStudyProps {
    title: string
    category: string
    client: string
    year: string
    description: string
    challenge: string
    solution: string
    results: {
        label: string
        value: string
        prefix?: string
        suffix?: string
    }[]
    technologies: string[]
    heroImage: string
    galleryImages: string[]
    testimonial?: {
        quote: string
        author: string
        role: string
        avatar: string
    }
    liveUrl?: string
}

export default function CaseStudyTemplate({ data }: { data: CaseStudyProps }) {
    const { scrollYProgress } = useScroll()
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5])

    return (
        <article className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative h-[80vh] overflow-hidden">
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0"
                >
                    <Image
                        src={data.heroImage}
                        alt={data.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </motion.div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 container mx-auto">
                    <Link href="/portfolio" className="mb-8 inline-block">
                        <Button variant="ghost" className="text-white hover:text-accent pl-0 hover:bg-transparent">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Portfolio
                        </Button>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-accent font-medium tracking-wider uppercase mb-4 block">
                            {data.category}
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl">
                            {data.title}
                        </h1>
                        <div className="flex flex-wrap gap-8 text-white/80 border-t border-white/20 pt-8 mt-8">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-accent" />
                                <span>Client: {data.client}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-accent" />
                                <span>Year: {data.year}</span>
                            </div>
                            {data.liveUrl && (
                                <a href={data.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors">
                                    <ExternalLink className="w-5 h-5 text-accent" />
                                    <span>Visit Live Site</span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Code2 className="w-5 h-5 text-accent" />
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {data.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-card rounded-2xl border border-border sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Key Results</h3>
                            <div className="space-y-8">
                                {data.results.map((result, idx) => (
                                    <div key={idx}>
                                        <div className="text-4xl font-bold text-foreground mb-1">
                                            <AnimatedCounter
                                                value={parseFloat(result.value.replace(/[^0-9.]/g, ''))}
                                                prefix={result.prefix}
                                                suffix={result.suffix}
                                            />
                                        </div>
                                        <div className="text-sm text-muted-foreground uppercase tracking-wider">
                                            {result.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-24">
                        <section>
                            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {data.challenge}
                            </p>
                        </section>

                        <ParallaxSection>
                            <div className="relative aspect-video rounded-2xl overflow-hidden my-12">
                                <Image
                                    src={data.galleryImages[0]}
                                    alt="Project Screenshot"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </ParallaxSection>

                        <section>
                            <h2 className="text-3xl font-bold mb-6">The Solution</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {data.solution}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.galleryImages.slice(1).map((img, idx) => (
                                <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`Gallery image ${idx + 1}`}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>

                        {data.testimonial && (
                            <section className="bg-accent/5 p-12 rounded-3xl border border-accent/10 relative overflow-hidden">
                                <div className="absolute top-0 left-0 text-9xl text-accent/10 font-serif leading-none transform -translate-x-4 -translate-y-8">
                                    "
                                </div>
                                <blockquote className="relative z-10">
                                    <p className="text-2xl font-medium italic mb-8 text-foreground">
                                        {data.testimonial.quote}
                                    </p>
                                    <footer className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                            <Image
                                                src={data.testimonial.avatar}
                                                alt={data.testimonial.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-bold">{data.testimonial.author}</div>
                                            <div className="text-sm text-muted-foreground">{data.testimonial.role}</div>
                                        </div>
                                    </footer>
                                </blockquote>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* Next Project CTA */}
            <section className="py-24 bg-black text-white text-center">
                <div className="container mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to start your project?</h2>
                    <Link href="/contact">
                        <Button size="lg" className="bg-accent hover:bg-accent-dark text-white rounded-full px-12 py-8 text-xl">
                            Let's Talk
                        </Button>
                    </Link>
                </div>
            </section>
        </article>
    )
}
