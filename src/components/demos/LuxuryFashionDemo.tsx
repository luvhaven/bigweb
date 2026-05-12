'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShoppingBag,
    Search,
    Menu,
    ChevronRight,
    Star,
    ArrowRight,
    Play
} from 'lucide-react'

const PRODUCTS = [
    {
        id: 1,
        name: 'The Classic Trench',
        price: '$2,450',
        category: 'Coats',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80',
        tag: 'New Season'
    },
    {
        id: 2,
        name: 'Silk Evening Gown',
        price: '$3,800',
        category: 'Dresses',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=80',
        tag: 'Best Seller'
    },
    {
        id: 3,
        name: 'Leather Handbag',
        price: '$1,850',
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80',
        tag: 'Limited'
    }
]

export default function LuxuryFashionDemo() {
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <div className="flex flex-col h-full bg-[#FDFBF7] font-serif overflow-hidden text-[#1A1A1A] selection:bg-[#D4AF37]/30">
            {/* Header */}
            <header className="h-20 flex items-center justify-between px-12 shrink-0 z-20 relative">
                <div className="flex items-center gap-8">
                    <Menu className="w-6 h-6 cursor-pointer hover:text-[#D4AF37] transition-colors" />
                    <Search className="w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-colors" />
                </div>

                <h1 className="text-2xl font-bold tracking-widest uppercase">Maison De Luxe</h1>

                <div className="flex items-center gap-8">
                    <span className="text-sm font-medium cursor-pointer hover:text-[#D4AF37] transition-colors">Account</span>
                    <div className="relative cursor-pointer group">
                        <ShoppingBag className="w-5 h-5 group-hover:text-[#D4AF37] transition-colors" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden relative">
                {/* Hero Slider */}
                <div className="w-2/3 h-full relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src={PRODUCTS[activeSlide].image}
                                alt={PRODUCTS[activeSlide].name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Slider Controls */}
                    <div className="absolute bottom-12 left-12 flex gap-4 z-20">
                        {PRODUCTS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveSlide(i)}
                                className={`w-12 h-1 transition-all duration-500 ${activeSlide === i ? 'bg-white' : 'bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details Side */}
                <div className="w-1/3 h-full bg-white flex flex-col justify-center px-16 relative z-10">
                    <motion.div
                        key={activeSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4 block">
                            {PRODUCTS[activeSlide].tag}
                        </span>
                        <h2 className="text-5xl font-medium mb-4 leading-tight">
                            {PRODUCTS[activeSlide].name}
                        </h2>
                        <p className="text-xl text-gray-500 mb-8 font-sans">
                            {PRODUCTS[activeSlide].category}
                        </p>
                        <p className="text-3xl font-medium mb-12">
                            {PRODUCTS[activeSlide].price}
                        </p>

                        <div className="flex flex-col gap-4">
                            <button className="w-full py-4 bg-[#1A1A1A] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#D4AF37] transition-colors duration-500">
                                Add to Bag
                            </button>
                            <button className="w-full py-4 border border-[#1A1A1A] text-[#1A1A1A] text-sm font-bold tracking-widest uppercase hover:bg-[#F5F5F5] transition-colors">
                                View Details
                            </button>
                        </div>
                    </motion.div>

                    {/* AR Try-On Teaser */}
                    <div className="absolute bottom-12 left-16 right-16">
                        <div className="p-4 bg-[#F9F9F9] rounded-lg flex items-center gap-4 cursor-pointer hover:bg-[#F0F0F0] transition-colors group">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-[#1A1A1A]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase tracking-wide">Virtual Try-On</p>
                                <p className="text-xs text-gray-500 font-sans">See how it looks on you</p>
                            </div>
                            <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
