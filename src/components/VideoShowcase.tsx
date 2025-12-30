'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import { videosAPI, VideoItem } from '@/lib/api/videos'

const defaultVideos: VideoItem[] = [
    {
        id: '1',
        title: "Brand Transformation",
        description: "How we helped a startup scale to $10M ARR",
        thumbnail_url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        duration: "3:45",
        category: "Case Study",
        featured: true,
        sort_order: 1
    },
    {
        id: '2',
        title: "Design Process",
        description: "Behind the scenes of our creative workflow",
        thumbnail_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
        duration: "2:30",
        category: "Process",
        featured: false,
        sort_order: 2
    },
    {
        id: '3',
        title: "Tech Stack Demo",
        description: "Exploring our cutting-edge development tools",
        thumbnail_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        duration: "4:20",
        category: "Technical",
        featured: false,
        sort_order: 3
    }
]

export default function VideoShowcase() {
    const [videos, setVideos] = useState<VideoItem[]>(defaultVideos)
    const [activeVideo, setActiveVideo] = useState<string | null>(null)
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)

    useEffect(() => {
        const loadVideos = async () => {
            try {
                const data = await videosAPI.getAll()
                if (data && data.length > 0) setVideos(data)
            } catch (e) {
                console.error("Failed to load videos", e)
            }
        }
        loadVideos()
    }, [])

    const featuredVideo = videos[0]
    const gridVideos = videos.slice(1, 4) // Show top 3 after featured

    return (
        <section className="py-24 px-6 bg-secondary/5 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        See Our Work in Action
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Watch how we transform ideas into exceptional digital experiences
                    </p>
                </motion.div>

                {/* Featured Video */}
                {featuredVideo && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-card border border-border group cursor-pointer">
                            <Image
                                src={featuredVideo.thumbnail_url}
                                alt={featuredVideo.title}
                                fill
                                className="object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8">
                                <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs font-semibold rounded-full mb-4 w-fit">
                                    {featuredVideo.category}
                                </span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {featuredVideo.title}
                                </h3>
                                <p className="text-white/80 text-lg mb-6 max-w-2xl">
                                    {featuredVideo.description}
                                </p>

                                {/* Play Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl"
                                >
                                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                                </motion.button>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm font-medium rounded-lg">
                                {featuredVideo.duration}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {gridVideos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredVideo(video.id)}
                            onMouseLeave={() => setHoveredVideo(null)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border">
                                <Image
                                    src={video.thumbnail_url}
                                    alt={video.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Play Button */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: hoveredVideo === video.id ? 1 : 0 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                                        <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-2 py-1 bg-accent/90 text-white text-xs font-semibold rounded-full mb-2">
                                        {video.category}
                                    </span>
                                    <h4 className="text-white font-bold mb-1">{video.title}</h4>
                                    <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                                        {video.description}
                                    </p>
                                </div>

                                {/* Duration */}
                                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded">
                                    {video.duration}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { label: "Video Projects", value: "150+" },
                        { label: "Hours Produced", value: "500+" },
                        { label: "Client Stories", value: "80+" },
                        { label: "Awards Won", value: "25+" }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-card border border-border rounded-2xl"
                        >
                            <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
