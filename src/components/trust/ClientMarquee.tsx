'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const defaultClients = [
    { name: 'TechCorp', logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
    { name: 'Innovate', logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
    { name: 'FutureScale', logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
    { name: 'GlobalSystems', logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&q=80' },
]

export default function ClientMarquee() {
    const [clients, setClients] = useState<any[]>(defaultClients)

    useEffect(() => {
        const loadClients = async () => {
            try {
                // Dynamically import to avoid circular dependencies if any
                const { clientsAPI } = await import('@/lib/api/clients')
                const data = await clientsAPI.getActive()
                if (data && data.length > 0) setClients(data)
            } catch (e) {
                console.error("Failed to load clients", e)
            }
        }
        loadClients()
    }, [])

    // Ensure we have enough items for seamless loop
    const displayClients = clients.length < 5 ? [...clients, ...clients, ...clients] : [...clients, ...clients]

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
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 35,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {displayClients.map((client, i) => (
                        <div key={i} className="relative h-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100 cursor-pointer flex items-center justify-center min-w-[120px]">
                            {client.logo_url && client.logo_url.startsWith('http') ? (
                                <img src={client.logo_url} alt={client.name} className="h-full object-contain max-w-[150px]" />
                            ) : (
                                <div className="text-xl font-bold text-white/40 hover:text-white transition-colors">{client.name}</div>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
