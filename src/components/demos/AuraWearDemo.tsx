'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShoppingBag,
    Shield,
    CreditCard,
    Apple,
    CheckCircle2,
    Truck,
    Clock,
    ArrowRight,
    Lock,
    Zap,
    ChevronLeft
} from 'lucide-react'

const AuraWearDemo = () => {
    const [status, setStatus] = useState('review') // review, shipping, payment, success
    const [progress, setProgress] = useState(33)

    const handleNext = () => {
        if (status === 'review') {
            setStatus('shipping')
            setProgress(66)
        } else if (status === 'shipping') {
            setStatus('payment')
            setProgress(100)
        } else if (status === 'payment') {
            setStatus('success')
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 flex items-center justify-center min-h-[600px] perspective-2000">
            {/* Mobile Device Frame */}
            <motion.div
                initial={{ opacity: 0, rotateY: 15, scale: 0.9 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-[340px] h-[680px] bg-[#0c0c0c] rounded-[3.5rem] border-[8px] border-[#1a1a1a] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col group"
            >
                {/* Status Bar */}
                <div className="h-12 flex items-center justify-between px-8 pt-4">
                    <span className="text-white text-xs font-bold font-serif">AURA</span>
                    <div className="flex gap-1.5 h-3 items-end">
                        <div className="w-1 h-1.5 bg-white/40 rounded-full" />
                        <div className="w-1 h-3 bg-white rounded-full" />
                        <div className="w-3 h-3 bg-white/20 rounded-sm" />
                    </div>
                </div>

                {/* Main Checkout View */}
                <div className="flex-1 bg-white flex flex-col overflow-hidden relative font-sans">
                    <AnimatePresence mode="wait">
                        {status !== 'success' && (
                            <motion.div
                                key="header"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-6 py-6 border-b border-gray-100 shrink-0"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <ShoppingBag className="w-5 h-5 text-gray-400" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-gray-800">Swift_Checkout</h2>
                                </div>
                                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-black"
                                        animate={{ width: `${progress}%` }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 text-gray-800">
                        <AnimatePresence mode="wait">
                            {status === 'review' && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold font-serif">Order Summary</h3>
                                        <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="w-20 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&q=80" className="w-full h-full object-cover" alt="product" />
                                            </div>
                                            <div className="flex flex-col justify-between py-1">
                                                <div>
                                                    <p className="text-sm font-bold">Midnight Trench Coat</p>
                                                    <p className="text-xs text-gray-400">Size: M • Color: Black</p>
                                                </div>
                                                <p className="text-base font-black">$2,450.00</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <div className="flex justify-between text-xs font-bold text-gray-400">
                                            <span>SUBTOTAL</span>
                                            <span>$2,450.00</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold text-gray-400">
                                            <span>SHIPPING</span>
                                            <span className="text-green-600 uppercase tracking-widest">Complimentary</span>
                                        </div>
                                        <div className="h-px bg-gray-200 my-1" />
                                        <div className="flex justify-between text-base font-black">
                                            <span>TOTAL</span>
                                            <span>$2,450.00</span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-black/[0.02] border border-black/[0.05] rounded-xl flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-orange-500" />
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Reserved for <span className="text-orange-600">09:52</span> minutes</p>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'shipping' && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-xl font-bold font-serif">Delivery Address</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-white border-2 border-black rounded-2xl flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-black">Julian Reed</p>
                                                <p className="text-xs text-gray-400">124 Lexingon St, London</p>
                                            </div>
                                            <CheckCircle2 className="w-5 h-5 text-black" />
                                        </div>
                                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between grayscale opacity-60">
                                            <div>
                                                <p className="text-sm font-black text-gray-400">Add New Address</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Shipping Method</h3>
                                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl">
                                            <Truck className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="text-xs font-black uppercase text-green-700">Express Priority</p>
                                                <p className="text-[10px] text-green-600 font-bold">Arrives in 24-48 Hours</p>
                                            </div>
                                            <span className="ml-auto text-[10px] font-black text-green-700 uppercase">FREE</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 text-center"
                                >
                                    <h3 className="text-xl font-bold font-serif">Instant Payment</h3>
                                    <p className="text-xs text-gray-400">Secure one-click verification active</p>

                                    <div className="space-y-3 pt-4">
                                        <button className="w-full h-14 bg-black rounded-2xl flex items-center justify-center gap-2 group hover:scale-[1.02] transition-transform">
                                            <Apple className="w-6 h-6 text-white mb-1" />
                                            <span className="text-white font-bold text-lg">Pay</span>
                                        </button>
                                        <div className="flex items-center gap-6 py-4">
                                            <div className="h-px bg-gray-100 flex-1" />
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">OR</span>
                                            <div className="h-px bg-gray-100 flex-1" />
                                        </div>
                                        <button className="w-full h-14 border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                                            <CreditCard className="w-5 h-5 text-gray-400" />
                                            <span className="text-sm font-black uppercase tracking-widest">Card Details</span>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 pt-8">
                                        <Shield className="w-4 h-4 text-green-600" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">256-bit Encrypted Protocol</span>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-12"
                                >
                                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", delay: 0.3 }}
                                        >
                                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                                        </motion.div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black font-serif italic mb-2">Authenticated.</h3>
                                        <p className="text-sm text-gray-400 px-8">Your order #AW-9402 has been secured for priority fulfillment.</p>
                                    </div>
                                    <div className="w-full h-[1px] bg-gray-100 my-8" />
                                    <div className="flex items-center gap-4">
                                        <div className="text-left">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Tracking_ID</p>
                                            <p className="text-xs font-bold font-mono">XHJ-99-0A-11</p>
                                        </div>
                                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-black" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {status !== 'success' && (
                        <div className="px-6 py-8 border-t border-gray-100">
                            <button
                                onClick={handleNext}
                                className="w-full h-14 bg-black text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10"
                            >
                                {status === 'payment' ? 'Complete Secure Order' : 'Continue to Evidence'}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom Bar */}
                <div className="h-2 bg-[#1a1a1a] w-32 rounded-full mx-auto my-3" />
            </motion.div>

            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-white/[0.02] select-none -z-10 tracking-tighter">
                AURA
            </div>
        </div>
    )
}

export default AuraWearDemo
