'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { clientsAPI } from '@/lib/api/clients'

const defaultClients = [
    { name: 'Google', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Microsoft', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo.svg' },
    { name: 'Nike', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'Amazon', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Airbnb', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
    { name: 'Meta', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Netflix', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Salesforce', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
    { name: 'Apple', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { name: 'Adobe', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg' },
]

export default function ClientMarquee() {
    const [clients, setClients] = useState<any[]>(defaultClients)

    useEffect(() => {
        const loadClients = async () => {
            try {
                const data = await clientsAPI.getActive()
                if (data && data.length > 0) {
                    setClients([...data, ...defaultClients])
                }
            } catch (e) {
                console.error("Failed to load clients", e)
            }
        }
        loadClients()
    }, [])

    const displayClients = [...clients, ...clients, ...clients]

    return (
        <div className="w-full py-20 overflow-hidden bg-black border-y border-zinc-900 relative">
            {/* Edge Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="container mx-auto px-6 mb-12 relative z-20">
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-zinc-900" />
                    <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em]">Integrated_Network_Nodes</span>
                    <div className="h-px flex-1 bg-zinc-900" />
                </div>
            </div>

            <div className="relative flex whitespace-nowrap overflow-hidden">
                <motion.div
                    className="flex gap-24 items-center"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {displayClients.map((client, i) => (
                        <div key={i} className="flex-shrink-0 grayscale opacity-20 hover:opacity-100 transition-all duration-500 cursor-crosshair group flex items-center justify-center">
                            <img
                                src={client.logo_url}
                                alt={client.name}
                                className="h-8 w-auto object-contain brightness-[10] contrast-[1.2] group-hover:scale-105 transition-transform"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
