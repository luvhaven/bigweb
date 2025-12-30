'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Wifi, Battery, Signal, Bell, MessageCircle, Heart, Share } from 'lucide-react'

export default function MobileAppsParallax() {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Smooth out the mouse movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 })
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 })

    // Calculate rotations based on mouse position relative to center
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return

        const width = rect.width
        const height = rect.height

        // Normalize mouse position from -0.5 to 0.5
        const fromCenterX = (e.clientX - rect.left) / width - 0.5
        const fromCenterY = (e.clientY - rect.top) / height - 0.5

        x.set(fromCenterX)
        y.set(fromCenterY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    // Floating Notifications
    const Notification = ({ icon: Icon, text, delay, color, align }: any) => (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, type: 'spring' }}
            className={`absolute z-30 flex items-center gap-3 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-slate-700 w-48 ${align}`}
            style={{
                translateZ: 80, // Lifts it off the plane in 3D
            }}
        >
            <div className={`p-2 rounded-full ${color} text-white`}>
                <Icon size={14} />
            </div>
            <div className="text-xs font-medium">
                <div className="opacity-90">{text}</div>
                <div className="opacity-50 text-[10px]">Just now</div>
            </div>
        </motion.div>
    )

    // Mock App Screen Content
    const MockAppScreen = ({ type }: { type: 'dashboard' | 'profile' }) => (
        <div className="w-full h-full bg-slate-50 dark:bg-slate-950 flex flex-col relative overflow-hidden">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-5 py-3 text-foreground/80 text-[10px] font-medium z-10">
                <span>9:41</span>
                <div className="flex gap-1.5">
                    <Signal size={12} />
                    <Wifi size={12} />
                    <Battery size={12} />
                </div>
            </div>

            {/* Content */}
            {type === 'dashboard' ? (
                <div className="p-4 space-y-4 relative z-10">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
                            <div>
                                <div className="text-xs font-bold text-foreground">BigWeb One</div>
                                <div className="text-[10px] text-muted-foreground">Premium Plan</div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                            <Bell size={14} className="text-muted-foreground" />
                        </div>
                    </div>

                    <div className="h-32 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-5 text-white shadow-lg shadow-purple-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10" />
                        <div className="relative z-10">
                            <div className="text-xs opacity-70 mb-1">Total Revenue</div>
                            <div className="text-3xl font-bold tracking-tight">$84,250</div>
                            <div className="mt-4 flex gap-2">
                                <div className="px-2 py-1 rounded-lg bg-white/20 text-[10px] font-medium backdrop-blur-sm">+12% vs last month</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="h-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-2">
                                <Share size={16} />
                            </div>
                            <div className="text-xs font-semibold">Analytics</div>
                        </div>
                        <div className="h-24 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center mb-2">
                                <Heart size={16} />
                            </div>
                            <div className="text-xs font-semibold">Customers</div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center px-4 gap-3 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 font-bold text-xs">J</div>
                            <div className="flex-1">
                                <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-1" />
                                <div className="h-1.5 w-12 bg-slate-100 dark:bg-slate-800 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-0 h-full bg-slate-100 dark:bg-slate-900">
                    <div className="h-44 bg-gradient-to-br from-pink-500 to-rose-500 relative">
                        <div className="absolute -bottom-10 left-6 w-20 h-20 rounded-2xl bg-white dark:bg-slate-950 p-1 shadow-xl">
                            <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
                        </div>
                    </div>
                    <div className="pt-12 px-6 space-y-4">
                        <div className="h-5 w-32 bg-slate-300 dark:bg-slate-800 rounded-md" />
                        <div className="h-3 w-48 bg-slate-200 dark:bg-slate-800 rounded-md" />
                        <div className="grid grid-cols-3 gap-2 mt-6">
                            <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/20 transition-colors" />
                            <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/20 transition-colors" />
                            <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/20 transition-colors" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

    return (
        <div
            className="relative w-full aspect-square flex items-center justify-center perspective-[1200px] py-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ref}
        >
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Back Phone */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    z: -50,
                    x: useTransform(mouseX, [-0.5, 0.5], [60, -60]),
                }}
                className="absolute w-[200px] h-[400px] bg-slate-900 rounded-[38px] border-[6px] border-slate-800 shadow-2xl overflow-hidden translate-x-16 translate-y-6 opacity-60 scale-90"
            >
                <MockAppScreen type="profile" />
            </motion.div>

            {/* Front Phone */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    z: 50,
                }}
                className="relative w-[210px] h-[420px] bg-black rounded-[42px] border-[8px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transform-style-3d group z-10"
            >
                {/* Glossy Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none z-30 opacity-50 rounded-[32px]" />

                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />

                <MockAppScreen type="dashboard" />

                {/* Floating Popups attached to phone move with it */}
                <Notification
                    icon={MessageCircle}
                    text="New message from Sarah"
                    delay={1}
                    color="bg-blue-500"
                    align="-right-24 top-24"
                />
                <Notification
                    icon={Heart}
                    text="New subscriber!"
                    delay={1.5}
                    color="bg-rose-500"
                    align="-left-20 bottom-32"
                />
            </motion.div>
        </div>
    )
}
