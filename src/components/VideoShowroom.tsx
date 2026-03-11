'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { Play, Pause, X, Volume2, VolumeX, Maximize2, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import SectionAtmosphere from '@/components/effects/SectionAtmosphere'

interface VideoItem {
    id?: string
    title: string
    description?: string | null
    video_url: string
    thumbnail_url?: string | null
    category?: string | null
    duration?: string | null
    featured?: boolean
}

interface VideoShowroomProps {
    initialVideos?: VideoItem[] | null
}

const fallbackVideo: VideoItem = {
    title: 'BIGWEB in Action',
    description: 'See how we engineer elite digital revenue machines — from discovery to launch in under 30 days.',
    video_url: '',
    thumbnail_url: 'https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?q=80&w=2000&auto=format&fit=crop',
    category: 'showcase',
    duration: '2:30',
    featured: true,
}

function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    const handlePlayPause = () => {
        if (!videoRef.current) return
        if (isPlaying) { videoRef.current.pause(); setIsPlaying(false) }
        else { videoRef.current.play(); setIsPlaying(true) }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/[0.08] shadow-[0_0_100px_rgba(212,168,83,0.15)]"
                onClick={(e) => e.stopPropagation()}
            >
                {video.video_url ? (
                    <video
                        ref={videoRef}
                        src={video.video_url}
                        poster={video.thumbnail_url || undefined}
                        className="w-full h-full object-cover"
                        playsInline
                        muted={isMuted}
                        onEnded={() => setIsPlaying(false)}
                    />
                ) : (
                    <img
                        src={video.thumbnail_url || ''}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                )}

                {/* Overlay controls */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/70 via-transparent to-black/30">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-1">{video.category || 'Showcase'}</p>
                            <h3 className="text-white font-display text-xl md:text-2xl tracking-tight">{video.title}</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {video.video_url && (
                            <button
                                onClick={handlePlayPause}
                                className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
                            >
                                {isPlaying
                                    ? <Pause className="w-5 h-5 text-black" />
                                    : <Play className="w-5 h-5 text-black ml-0.5" />
                                }
                            </button>
                        )}
                        <div className="flex-1">
                            <p className="text-white/70 text-sm max-w-lg">{video.description}</p>
                        </div>
                        {video.video_url && (
                            <button
                                onClick={() => setIsMuted(m => !m)}
                                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            >
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                        )}
                    </div>
                </div>

                {video.duration && (
                    <div className="absolute top-4 right-16 px-2 py-0.5 bg-black/60 rounded text-[11px] font-mono text-zinc-300">
                        {video.duration}
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

export default function VideoShowroom({ initialVideos }: VideoShowroomProps) {
    const [videos, setVideos] = useState<VideoItem[]>(
        initialVideos && initialVideos.length > 0 ? initialVideos : [fallbackVideo]
    )
    const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

    const featured = videos.find(v => v.featured) || videos[0]
    const rest = videos.filter(v => v !== featured).slice(0, 3)

    return (
        <>
            <AnimatePresence>
                {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
            </AnimatePresence>

            <section
                ref={sectionRef}
                className="relative py-28 md:py-40 bg-[#050505] overflow-hidden border-t border-white/[0.04]"
            >
                <SectionAtmosphere preset="warm" parallax />

                {/* Subtle grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.018] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                        backgroundSize: '72px 72px',
                    }}
                />

                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <span className="w-8 h-px bg-accent" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">
                                    See Us Work
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]"
                            >
                                Execution that{' '}
                                <em className="italic text-zinc-400">speaks for itself.</em>
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                            >
                                Work with us
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Featured Video */}
                    {featured && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-[16/8] md:aspect-[16/7] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group mb-6"
                            onClick={() => setActiveVideo(featured)}
                        >
                            {/* Thumbnail */}
                            <motion.div
                                className="absolute inset-0"
                                style={{ y: bgY }}
                            >
                                <img
                                    src={featured.thumbnail_url || 'https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?q=80&w=2000'}
                                    alt={featured.title}
                                    className="w-full h-full object-cover scale-110"
                                    style={{ filter: 'brightness(0.55) saturate(0.7)' }}
                                />
                            </motion.div>

                            {/* Color overlay on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            />

                            {/* Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
                                <div className="flex items-end justify-between gap-8">
                                    <div className="max-w-xl">
                                        {featured.category && (
                                            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
                                                {featured.category}
                                            </span>
                                        )}
                                        <h3 className="font-display text-3xl md:text-5xl tracking-tight text-white leading-tight mb-3">
                                            {featured.title}
                                        </h3>
                                        {featured.description && (
                                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md">
                                                {featured.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Giant play button */}
                                    <motion.div
                                        className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.25)]"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        <Play className="w-6 h-6 md:w-7 md:h-7 text-black ml-1" />
                                    </motion.div>
                                </div>
                            </div>

                            {featured.duration && (
                                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-300 backdrop-blur-sm">
                                    {featured.duration}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Secondary videos grid */}
                    {rest.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {rest.map((video, i) => (
                                <motion.div
                                    key={video.id || i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                                    onClick={() => setActiveVideo(video)}
                                >
                                    <img
                                        src={video.thumbnail_url || 'https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?q=80&w=800'}
                                        alt={video.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        style={{ filter: 'brightness(0.5) saturate(0.6)' }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                                        <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-accent mb-1.5">{video.category}</p>
                                        <h4 className="text-white text-sm font-semibold leading-tight">{video.title}</h4>
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:bg-white/90">
                                        <Play className="w-4 h-4 text-black ml-0.5" />
                                    </div>
                                    {video.duration && (
                                        <div className="absolute bottom-5 right-5 text-[10px] font-mono text-zinc-400">{video.duration}</div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
