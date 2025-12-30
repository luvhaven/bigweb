'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Quote, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { testimonialsAPI, Testimonial } from '@/lib/api/testimonials'

export default function VideoTestimonials() {
    const [testimonials, setTestimonials] = useState<any[]>([]) // Using any to accommodate mapped structure
    const [activeId, setActiveId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadVideos()
    }, [])

    const loadVideos = async () => {
        try {
            // Fetch all active testimonials
            const data = await testimonialsAPI.getAll('active')

            if (data) {
                // Filter only those with video URLs
                const videoTestimonials = data
                    .filter(t => t.video_url && t.video_url.length > 0)
                    .map(t => ({
                        id: t.id,
                        name: t.client_name,
                        role: t.client_role || 'Client',
                        video: t.video_url, // Map DB field to component prop
                        thumbnail: t.thumbnail_url || t.client_image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', // Fallback
                        quote: t.content
                    }))
                    .slice(0, 3) // Limit to 3 for the grid layout

                setTestimonials(videoTestimonials.length > 0 ? videoTestimonials : defaultTestimonials)
            } else {
                setTestimonials(defaultTestimonials)
            }
        } catch (error) {
            console.error('Failed to load video testimonials:', error)
            setTestimonials(defaultTestimonials)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={activeId === testimonial.id}
                    onPlay={() => setActiveId(testimonial.id)}
                    onPause={() => setActiveId(null)}
                    index={index}
                />
            ))}
        </div>
    )
}

function TestimonialCard({ testimonial, isActive, onPlay, onPause, index }: any) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        if (isActive && videoRef.current) {
            videoRef.current.play().catch(() => { })
        } else if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isActive])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-[9/16] rounded-3xl overflow-hidden group bg-black shadow-2xl"
        >
            {/* Video */}
            <video
                ref={videoRef}
                src={testimonial.video}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                loop
                muted={isMuted}
                playsInline
            />

            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`} />

            {/* Content */}
            <div className={`absolute inset-0 p-6 flex flex-col justify-between transition-all duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="self-end">
                    <Quote className="w-8 h-8 text-accent opacity-50" />
                </div>
                <div>
                    <p className="text-lg font-medium text-white mb-4 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-accent">
                            <Image src={testimonial.thumbnail} alt={testimonial.name} fill className="object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm">{testimonial.name}</div>
                            <div className="text-xs text-white/70">{testimonial.role}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                {!isActive && (
                    <button
                        onClick={onPlay}
                        className="w-16 h-16 rounded-full bg-accent/90 text-white flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
                    >
                        <Play className="w-6 h-6 ml-1" />
                    </button>
                )}
            </div>

            {/* Active Controls */}
            {isActive && (
                <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
                    >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={onPause}
                        className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
                    >
                        <Pause className="w-5 h-5" />
                    </button>
                </div>
            )}
        </motion.div>
    )
}

const defaultTestimonials = [
    {
        id: '1',
        name: "Sarah Johnson",
        role: "CEO, TechFlow",
        video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        quote: "BigWeb transformed our digital presence completely. Our leads increased by 300% in just 3 months."
    },
    {
        id: '2',
        name: "Michael Chen",
        role: "Founder, StartUp Inc",
        video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        quote: "The team's attention to detail and technical expertise is unmatched. Highly recommended."
    },
    {
        id: '3',
        name: "Emily Davis",
        role: "Marketing Dir, GrowthCo",
        video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        quote: "They didn't just build a website, they built a growth engine for our business."
    }
]

