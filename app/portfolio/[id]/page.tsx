'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, Layers, User, CheckCircle2, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PROJECTS } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import BrandLogo from '@/components/branding/BrandLogo'
import BrowserWindow from '@/components/ui/BrowserWindow'
import TechCorpDemo from '@/components/demos/TechCorpDemo'
import { adminSupabase as supabase } from '@/utils/adminSupabase' // Re-using the admin client for simplicity in this demo, ideally use a public query client
import dynamic from 'next/dynamic'

const CryptoVaultDemo = dynamic(() => import('@/components/demos/CryptoVaultDemo'), { ssr: false })
const UrbanEatsDemo = dynamic(() => import('@/components/demos/UrbanEatsDemo'), { ssr: false })
const EcoSmartHomeDemo = dynamic(() => import('@/components/demos/EcoSmartHomeDemo'), { ssr: false })
const NeonRealtyDemo = dynamic(() => import('@/components/demos/NeonRealtyDemo'), { ssr: false })
const HealthTrackDemo = dynamic(() => import('@/components/demos/HealthTrackDemo'), { ssr: false })
const AIContentStudioDemo = dynamic(() => import('@/components/demos/AIContentStudioDemo'), { ssr: false })
const FinPayDemo = dynamic(() => import('@/components/demos/FinPayDemo'), { ssr: false })
const LuxuryFashionDemo = dynamic(() => import('@/components/demos/LuxuryFashionDemo'), { ssr: false })

export default function ProjectPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string // This is likely the slug from the URL
    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const [showDemo, setShowDemo] = useState(false)
    const [showTechnicalOverlay, setShowTechnicalOverlay] = useState(false)

    // Fallback to mock if fetch fails or while loading (optional, but cleaner to just load)
    // We will start by trying to fetch from DB.

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    useEffect(() => {
        async function fetchProject() {
            try {
                // Try fetching from Supabase first
                const { data, error } = await supabase
                    .from('cms_projects')
                    .select('*')
                    .or(`slug.eq.${id},id.eq.${id}`) // Try matching slug OR id
                    .single()

                if (data) {
                    setProject(data)
                } else {
                    // Fallback to MOCK data if not found in DB (for legacy support during migration)
                    const mock = PROJECTS.find(p => p.id === id)
                    setProject(mock || null)
                }
            } catch (e) {
                console.error("Fetch error", e)
                const mock = PROJECTS.find(p => p.id === id)
                setProject(mock || null)
            } finally {
                setLoading(false)
            }
        }
        fetchProject()
    }, [id])

    // Lock body scroll when demo is open
    useEffect(() => {
        if (showDemo) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [showDemo])

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading Neural Data...</div>
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <p className="text-muted-foreground mb-8">The project you are looking for does not exist.</p>
                <Button onClick={() => router.push('/#portfolio')}>Back to Portfolio</Button>
            </div>
        )
    }

    // Parse technical details if string, or use as object
    const techDetails = typeof project.technical_details === 'string'
        ? JSON.parse(project.technical_details || '{}')
        : project.technical_details || {}

    return (
        <div ref={containerRef} className="min-h-screen bg-background selection:bg-accent/30 relative">

            {/* Neural Deconstructed Overlay Toggle */}
            {project.deconstructed_view && (
                <div className="fixed top-24 right-6 z-40">
                    <button
                        onClick={() => setShowTechnicalOverlay(!showTechnicalOverlay)}
                        className={`backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${showTechnicalOverlay ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-black/50 text-white/50 hover:text-white'}`}
                    >
                        {showTechnicalOverlay ? 'Deconstructed: ON' : 'Deconstructed View'}
                    </button>
                </div>
            )}

            {/* Demo Modal */}
            <AnimatePresence>
                {showDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
                    >
                        <div className="w-full h-full max-w-[1600px] relative">
                            <button
                                onClick={() => setShowDemo(false)}
                                className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2 transition-colors"
                            >
                                Close Preview <span className="text-2xl">×</span>
                            </button>

                            {/* Render specific demo based on ID */}
                            <BrowserWindow
                                title={`${project.title} - Live Preview`}
                                url={`https://${project.slug || project.id}.platform/dashboard`}
                                onClose={() => setShowDemo(false)}
                            >
                                {id === 'techcorp-platform' ? (
                                    <TechCorpDemo />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-slate-50 text-slate-400">
                                        <div className="text-center">
                                            <Layers className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg font-medium">Interactive preview coming soon</p>
                                        </div>
                                    </div>
                                )}
                            </BrowserWindow>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <div className={`relative h-screen w-full overflow-hidden transition-all duration-700 ${showTechnicalOverlay ? 'opacity-20 blur-sm scale-95' : ''}`}>
                <motion.div
                    style={{ y, opacity }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
                    {project.hero_image_url || project.image_url ? (
                        <Image
                            src={project.hero_image_url || project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-900" />
                    )}
                </motion.div>

                <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/#portfolio"
                            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Portfolio
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent border border-accent/20 backdrop-blur-md mb-6 font-medium">
                            {project.category}
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                            {project.description}
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8"
                        >
                            <Button
                                size="lg"
                                onClick={() => setShowDemo(true)}
                                className="rounded-full px-8 h-14 text-lg bg-accent hover:bg-accent/90 text-white shadow-[0_0_30px_-5px_rgba(var(--accent),0.5)] hover:shadow-[0_0_50px_-10px_rgba(var(--accent),0.7)] transition-all duration-300 group"
                            >
                                <Play className="w-5 h-5 mr-2 fill-current" />
                                View Project Demo
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Neural Overlay Content */}
            {showTechnicalOverlay && (
                <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
                    <div className="container mx-auto px-6 h-screen flex items-center justify-end">
                        <div className="w-[500px] border border-blue-500/30 bg-black/80 backdrop-blur-xl p-8 rounded-2xl pointer-events-auto">
                            <h3 className="text-blue-400 font-mono text-sm mb-4 uppercase tracking-widest border-b border-blue-500/20 pb-2">Technical Deconstruction</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-zinc-500 text-xs font-mono uppercase mb-1">Architecture</div>
                                    <div className="text-white text-sm">
                                        {techDetails.architecture_url ? (
                                            <a href={techDetails.architecture_url} target="_blank" className="text-blue-400 hover:underline flex items-center gap-2">View System Diagram <ExternalLink className="w-3 h-3" /></a>
                                        ) : 'Microservices Event-Driven Mesh'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-zinc-500 text-xs font-mono uppercase mb-1">Performance</div>
                                    <div className="text-white font-mono text-lg">{techDetails.api_latency || '12ms'} <span className="text-zinc-600 text-xs">avg latency</span></div>
                                </div>
                                <div>
                                    <div className="text-zinc-500 text-xs font-mono uppercase mb-1">Core Protocol</div>
                                    <p className="text-zinc-300 text-sm font-mono leading-relaxed">
                                        {techDetails.core_features || 'Custom WebSocket implementation with Redis Pub/Sub layer for real-time state synchronization across distributed nodes.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Sidebar Info */}
                    <div className="lg:col-span-4 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-secondary/30 border border-white/5 backdrop-blur-sm"
                        >
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-accent" />
                                Project Details
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Client</p>
                                    <p className="font-medium text-lg">{project.client_name || project.client}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Date</p>
                                    <p className="font-medium text-lg">{project.completion_date || project.year}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Services</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.technologies?.map((tech: string) => (
                                            <span key={tech} className="px-3 py-1 rounded-md bg-background border border-white/10 text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <Button
                                    onClick={() => setShowDemo(true)}
                                    className="w-full gap-2 group bg-white/5 hover:bg-white/10 border border-white/10"
                                >
                                    Launch Interactive Preview
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-20">
                        {/* Overview */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6">Overview</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {project.description || project.longDescription}
                            </p>
                        </section>

                        {/* Challenge & Solution */}
                        <div className="grid md:grid-cols-2 gap-12">
                            <section>
                                <h3 className="text-2xl font-bold mb-4 text-red-400">The Challenge</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {project.challenge}
                                </p>
                            </section>
                            <section>
                                <h3 className="text-2xl font-bold mb-4 text-green-400">The Solution</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {project.solution}
                                </p>
                            </section>
                        </div>

                        {/* Results */}
                        <section className="py-12 px-8 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
                            <h3 className="text-2xl font-bold mb-8 text-center">Key Results</h3>
                            <div className="text-center text-muted-foreground whitespace-pre-line text-lg">
                                {/* If results is string (from DB) display it, else if array (mock) map it */}
                                {typeof project.results === 'string' ? project.results : project.results?.map((r: any, i: number) => <div key={i}>{r.value} - {r.label}</div>)}
                            </div>
                        </section>

                        {/* Strategic Approach */}
                        <section>
                            <h3 className="text-2xl font-bold mb-8">Strategic Approach</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { title: 'Discovery & Strategy', desc: 'We started with a deep dive into user needs and business goals to define a clear roadmap.' },
                                    { title: 'Design & Prototyping', desc: 'Iterative design sprints focused on creating an intuitive and accessible user interface.' },
                                    { title: 'Development & Scale', desc: 'Built on a robust, scalable architecture ensuring high performance and security.' }
                                ].map((step, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-colors">
                                        <div className="text-4xl font-bold text-white/10 mb-4">0{i + 1}</div>
                                        <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Tech Stack Deep Dive */}
                        <section className="py-12 border-y border-white/10">
                            <h3 className="text-2xl font-bold mb-6">Tech Stack & Architecture</h3>
                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                We selected a modern, future-proof technology stack designed for speed, scalability, and developer experience.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {project.technologies?.map((tech: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-accent" />
                                        <span className="font-medium">{tech}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Neural Technical Deep Dive Extension */}
                            {techDetails.core_features && (
                                <div className="mt-8 p-6 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                                    <h4 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><Layers className="w-4 h-4" /> Neural Architecture Highlights</h4>
                                    <div className="font-mono text-sm text-blue-200/80 whitespace-pre-wrap">
                                        {techDetails.core_features}
                                    </div>
                                </div>
                            )}

                        </section>

                        {/* Client Quote */}
                        <section className="relative p-10 rounded-3xl bg-gradient-to-br from-secondary/40 to-background border border-white/10 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Layers className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="mb-6 text-accent">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.923 14.929 15.081C15.537 14.239 16.313 13.536 17.257 12.972C18.201 12.408 19.229 11.991 20.341 11.721L20.341 7.002C18.105 7.306 16.037 8.082 14.137 9.33C12.237 10.578 10.873 12.156 10.045 14.064L10.045 21L14.017 21ZM5.005 21L5.005 18C5.005 16.896 5.309 15.923 5.917 15.081C6.525 14.239 7.301 13.536 8.245 12.972C9.189 12.408 10.217 11.991 11.329 11.721L11.329 7.002C9.093 7.306 7.025 8.082 5.125 9.33C3.225 10.578 1.861 12.156 1.033 14.064L1.033 21L5.005 21Z" />
                                    </svg>
                                </div>
                                <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-6">
                                    "The team at BIGWEB didn't just build a product; they transformed our entire business model. The results speak for themselves."
                                </blockquote>
                                <div>
                                    <p className="font-bold text-lg">{project.client_name || project.client}</p>
                                    <p className="text-muted-foreground">Executive Team</p>
                                </div>
                            </div>
                        </section>

                        {/* Gallery */}
                        <section>
                            <h3 className="text-2xl font-bold mb-8">Project Gallery</h3>
                            <div className="grid gap-8">
                                {project.gallery_images?.map((img: string, i: number) => (
                                    <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                        <Image
                                            src={img}
                                            alt={`${project.title} screenshot ${i + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Next Project CTA */}
            <div className="border-t border-white/10 bg-secondary/20">
                <div className="container mx-auto px-6 py-24 text-center">
                    <p className="text-muted-foreground mb-4">Ready to start your project?</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Build Something Amazing</h2>
                    <Button size="lg" className="rounded-full px-8 text-lg h-14">
                        Get in Touch
                    </Button>
                </div>
            </div>
        </div>
    )
}
