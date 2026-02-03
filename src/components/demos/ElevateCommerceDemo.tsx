'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShoppingBag,
    Star,
    ChevronRight,
    ArrowRight,
    Play,
    Info,
    Check,
    CreditCard,
    Package,
    Gift,
    ShieldCheck
} from 'lucide-react'

const ElevateCommerceDemo = () => {
    const [view, setView] = useState('product') // product, checkout, success
    const [selectedSize, setSelectedSize] = useState('M')

    const product = {
        name: 'The Obsidian Chrono',
        category: 'Limited Edition_04',
        price: '$12,450',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        details: ['Hand-stitched leather', 'Surgical grade steel', 'Perpetual movement']
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans selection:bg-black selection:text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-2xl flex flex-col min-h-[640px]"
            >
                {/* 1. Narrative Navigation */}
                <header className="px-10 py-6 border-b border-gray-50 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <Star className="w-4 h-4 text-white fill-white" />
                        </div>
                        <span className="text-sm font-black tracking-[0.3em] uppercase text-black">Elevate_Boutique</span>
                    </div>

                    <div className="flex items-center gap-8">
                        {['Collections', 'Maison', 'Legacy'].map(item => (
                            <span key={item} className="text-[10px] font-black uppercase tracking-widest text-gray-300 cursor-pointer hover:text-black transition-colors">{item}</span>
                        ))}
                        <div className="h-8 w-[1px] bg-gray-100" />
                        <div className="relative cursor-pointer group">
                            <ShoppingBag className="w-5 h-5 text-black" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
                        </div>
                    </div>
                </header>

                {/* 2. Transitioning Content */}
                <div className="flex-1 flex overflow-hidden">
                    <AnimatePresence mode="wait">
                        {view === 'product' && (
                            <motion.div
                                key="product"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="flex-1 flex flex-col md:flex-row"
                            >
                                {/* Left: Product Visual */}
                                <div className="md:w-12 h-[500px] md:h-full bg-gray-50 flex-1 relative group overflow-hidden">
                                    <motion.img
                                        layoutId="product-image"
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Overlay Tags */}
                                    <div className="absolute top-10 left-10 space-y-3">
                                        <div className="bg-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-black shadow-lg">New Season</div>
                                        <div className="bg-black text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">Lab Verified</div>
                                    </div>
                                </div>

                                {/* Right: Product Details */}
                                <div className="md:w-[450px] p-12 md:p-20 flex flex-col justify-center bg-white shrink-0">
                                    <div className="mb-12">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-4 h-[1px] bg-orange-500" />
                                            <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest">{product.category}</span>
                                        </div>
                                        <h2 className="text-5xl font-black text-black tracking-tighter leading-none mb-6 font-serif italic italic">{product.name}</h2>
                                        <p className="text-3xl font-light text-gray-400 mb-8 font-serif">{product.price}</p>
                                    </div>

                                    <div className="space-y-8 mb-12">
                                        <div>
                                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">Select Essence</p>
                                            <div className="flex gap-4">
                                                {['S', 'M', 'L'].map(size => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`w-12 h-12 rounded-full border text-xs font-black transition-all ${selectedSize === size
                                                                ? 'bg-black text-white border-black scale-110'
                                                                : 'border-gray-100 text-gray-400 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            {product.details.map(detail => (
                                                <div key={detail} className="flex items-center gap-3 text-gray-500">
                                                    <Check className="w-3 h-3 text-orange-500" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setView('checkout')}
                                        className="w-full py-6 bg-black text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-full flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-95 group shadow-2xl shadow-black/10"
                                    >
                                        Proceed to Concierge
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {view === 'checkout' && (
                            <motion.div
                                key="checkout"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex-1 flex flex-col md:flex-row bg-[#FAFAFA]"
                            >
                                {/* Left: Concise Secure Form */}
                                <div className="flex-1 p-12 md:p-20 overflow-y-auto">
                                    <button onClick={() => setView('product')} className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest mb-12 hover:text-black transition-colors">
                                        <ChevronRight className="w-3 h-3 rotate-180" />
                                        Retour à l'article
                                    </button>

                                    <div className="max-w-md">
                                        <h3 className="text-3xl font-black text-black tracking-tighter uppercase mb-12 font-serif">Maison Checkout</h3>

                                        <div className="space-y-8">
                                            <div className="grid gap-6">
                                                <div className="space-y-2">
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Priority_Shipping</p>
                                                    <div className="p-5 bg-white border border-gray-100 rounded-2xl flex items-center justify-between shadow-sm">
                                                        <div className="flex items-center gap-4">
                                                            <Package className="w-5 h-5 text-orange-500" />
                                                            <span className="text-xs font-bold uppercase text-gray-800 tracking-widest">White Glove Delivery</span>
                                                        </div>
                                                        <span className="text-[10px] font-black text-orange-600 uppercase">Selected</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Secure_Payment</p>
                                                    <div className="p-5 bg-white border border-gray-100 rounded-2xl flex items-center gap-4 shadow-sm group cursor-pointer hover:border-black transition-all">
                                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                                        <span className="text-xs font-bold uppercase text-gray-300 tracking-widest">•••• •••• •••• 9402</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Gift className="w-4 h-4 text-orange-500" />
                                                    <span className="text-[10px] font-black uppercase text-gray-500">Add Signature Gift Wrap</span>
                                                </div>
                                                <div className="w-10 h-6 bg-gray-200 rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full" /></div>
                                            </div>

                                            <button
                                                onClick={() => setView('success')}
                                                className="w-full py-6 bg-black text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-full flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-95 shadow-2xl shadow-black/10"
                                            >
                                                Finalize Acquisition
                                                <ShieldCheck className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Small Summary Sidebar */}
                                <div className="md:w-96 bg-white border-l border-gray-50 flex flex-col p-12">
                                    <div className="flex-1">
                                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-8 shadow-xl">
                                            <motion.img layoutId="product-image" src={product.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="text-xl font-black font-serif italic text-black">{product.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Size: {selectedSize} • Qty: 01</p>
                                            </div>
                                            <p className="text-lg font-bold text-black">{product.price}</p>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-100 space-y-4">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-300">
                                            <span>Sub-Total</span>
                                            <span>{product.price}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-black uppercase tracking-tighter text-black">
                                            <span>Total</span>
                                            <span>{product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {view === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex-1 flex flex-col items-center justify-center p-20 text-center"
                            >
                                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-10">
                                    <Check className="w-10 h-10 text-orange-600" />
                                </div>
                                <h3 className="text-5xl font-black font-serif italic mb-6">Secured.</h3>
                                <p className="text-sm text-gray-400 max-w-sm font-medium uppercase tracking-widest leading-relaxed">Your acquisition is being prepared with surgical precision within our Maison’s logistics network.</p>

                                <div className="mt-12 flex gap-4">
                                    <div className="px-5 py-3 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400">Order_ID: ELV-004-94</div>
                                    <div className="px-5 py-3 bg-gray-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400">Status: Priority</div>
                                </div>

                                <button onClick={() => setView('product')} className="mt-16 text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 hover:text-black transition-colors">Return to Showcase</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}

export default ElevateCommerceDemo
