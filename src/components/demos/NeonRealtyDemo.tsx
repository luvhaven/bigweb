'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin,
    Search,
    Heart,
    Share2,
    Bed,
    Bath,
    Maximize,
    ChevronLeft,
    ChevronRight,
    Play,
    Info,
    Phone,
    MessageCircle,
    Box
} from 'lucide-react'

const PROPERTIES = [
    {
        id: 1,
        title: 'Modern Glass Villa',
        location: 'Beverly Hills, CA',
        price: '$12,500,000',
        beds: 5,
        baths: 6,
        sqft: '6,500',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
        description: 'Experience the pinnacle of luxury living in this architectural masterpiece. Featuring floor-to-ceiling glass walls, an infinity pool, and panoramic city views.'
    },
    {
        id: 2,
        title: 'Seaside Penthouse',
        location: 'Miami Beach, FL',
        price: '$8,900,000',
        beds: 3,
        baths: 3.5,
        sqft: '3,200',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
        description: 'Direct oceanfront penthouse with wrap-around terrace. Smart home automation, private elevator, and resort-style amenities.'
    },
    {
        id: 3,
        title: 'Alpine Chalet',
        location: 'Aspen, CO',
        price: '$15,200,000',
        beds: 6,
        baths: 7,
        sqft: '8,000',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600&q=80',
        description: 'Ski-in/ski-out luxury chalet with exposed timber beams, stone fireplaces, and a private spa sanctuary.'
    }
]

export default function NeonRealtyDemo() {
    const [activeProperty, setActiveProperty] = useState(0)
    const [isTourActive, setIsTourActive] = useState(false)

    const nextProperty = () => {
        setActiveProperty((prev) => (prev + 1) % PROPERTIES.length)
    }

    const prevProperty = () => {
        setActiveProperty((prev) => (prev - 1 + PROPERTIES.length) % PROPERTIES.length)
    }

    const property = PROPERTIES[activeProperty]

    return (
        <div className="flex h-full bg-black font-sans overflow-hidden text-white selection:bg-pink-500/30 relative">
            {/* Background Image (Simulated 3D View) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={property.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
                </motion.div>
            </AnimatePresence>

            {/* Header */}
            <header className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-20">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(219,39,119,0.5)]">
                        <Box className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">NEON<span className="text-pink-500">REALTY</span></span>
                </div>

                <div className="flex items-center gap-6 bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10">
                    <button className="text-white font-medium hover:text-pink-400 transition-colors">Buy</button>
                    <button className="text-white/70 hover:text-white transition-colors">Rent</button>
                    <button className="text-white/70 hover:text-white transition-colors">Sell</button>
                    <div className="w-px h-4 bg-white/20" />
                    <button className="text-white/70 hover:text-white transition-colors">Agents</button>
                </div>

                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-[1px]">
                        <img src="https://i.pravatar.cc/150?u=neon" alt="User" className="w-full h-full rounded-full border-2 border-black" />
                    </div>
                </div>
            </header>

            {/* Main Content Overlay */}
            <main className="relative z-10 flex-1 flex flex-col justify-end pb-12 px-12 w-full h-full pointer-events-none">
                <div className="flex items-end justify-between pointer-events-auto">
                    {/* Property Details */}
                    <div className="max-w-2xl">
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(219,39,119,0.5)]">
                                    Virtual Tour Ready
                                </span>
                                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/10">
                                    New Listing
                                </span>
                            </div>
                            <h1 className="text-6xl font-bold mb-2 leading-tight">{property.title}</h1>
                            <div className="flex items-center gap-2 text-xl text-white/80 mb-6">
                                <MapPin className="w-5 h-5 text-pink-500" />
                                {property.location}
                            </div>

                            <div className="flex items-center gap-8 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <Bed className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{property.beds}</p>
                                        <p className="text-xs text-white/50 uppercase">Beds</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <Bath className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{property.baths}</p>
                                        <p className="text-xs text-white/50 uppercase">Baths</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <Maximize className="w-6 h-6 text-pink-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{property.sqft}</p>
                                        <p className="text-xs text-white/50 uppercase">Sq Ft</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-pink-50 transition-colors flex items-center gap-2">
                                    <Play className="w-5 h-5 fill-black" /> Start 3D Tour
                                </button>
                                <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors border border-white/10 flex items-center gap-2">
                                    <Info className="w-5 h-5" /> Details
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Price & Agent Card */}
                    <div className="flex flex-col gap-6 items-end">
                        <motion.div
                            key={`price-${property.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-right"
                        >
                            <p className="text-sm text-white/60 mb-1">Listing Price</p>
                            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                {property.price}
                            </p>
                        </motion.div>

                        <div className="w-80 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <img src="https://i.pravatar.cc/150?u=agent" className="w-14 h-14 rounded-full border-2 border-pink-500" />
                                <div>
                                    <p className="font-bold text-lg">Elena Popov</p>
                                    <p className="text-sm text-pink-400">Senior Agent</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-pink-600 rounded-xl font-bold hover:bg-pink-700 transition-colors flex items-center justify-center gap-2">
                                    <MessageCircle className="w-4 h-4" /> Message
                                </button>
                                <button className="flex-1 py-3 bg-white/10 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" /> Call
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 left-8 -translate-y-1/2 z-20">
                <button onClick={prevProperty} className="w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-pink-600 hover:border-pink-600 transition-all">
                    <ChevronLeft className="w-8 h-8" />
                </button>
            </div>
            <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20">
                <button onClick={nextProperty} className="w-14 h-14 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-pink-600 hover:border-pink-600 transition-all">
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                <div className="h-full bg-pink-600 w-1/3" />
            </div>
        </div>
    )
}
