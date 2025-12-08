'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const clients = [
    { name: 'TechCorp', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
    { name: 'Innovate', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
    { name: 'FutureScale', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
    { name: 'GlobalSystems', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
    { name: 'AlphaGroup', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
    { name: 'OmegaLabs', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
]

export default function ClientMarquee() {
    return (
        <div className="w-full py-12 overflow-hidden bg-background/50 backdrop-blur-sm border-y border-white/5">
            <div className="container mx-auto px-4 mb-8">
                <p className="text-center text-sm text-muted-foreground uppercase tracking-widest">Trusted by Industry Leaders</p>
            </div>
            <div className="relative flex">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

                <motion.div
                    className="flex gap-16 items-center whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                >
                    {[...clients, ...clients, ...clients].map((client, i) => (
                        <div key={i} className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer">
                            {/* Using placeholder images for demo - replace with real logos */}
                            <div className="w-full h-full flex items-center justify-center font-bold text-xl text-white/20 hover:text-orange-500/80 transition-colors">
                                {client.name}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
