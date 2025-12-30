'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trophy, TrendingUp, BarChart2, Globe, MoreVertical, Star } from 'lucide-react'

// Mock search results
const initialResults = [
    { id: 1, title: 'Competitor A - Good Services', domain: 'competitor-a.com', position: 1, rating: 4.5 },
    { id: 2, title: 'Generic Provider Inc', domain: 'generic-provider.com', position: 2, rating: 4.2 },
    { id: 3, title: 'Another Option Ltd', domain: 'another-option.net', position: 3, rating: 4.0 },
    { id: 4, title: 'Your Brand Name', domain: 'yourbusiness.com', position: 12, isTarget: true, rating: 5.0 }, // Starts low
    { id: 5, title: 'Local Service Co', domain: 'local-service.co', position: 4, rating: 3.8 }
]

export default function SEORankClimber() {
    const [results, setResults] = useState(initialResults)
    const [isClimbing, setIsClimbing] = useState(false)
    const [currentRank, setCurrentRank] = useState(12)
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        // Only start animation when in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startClimb()
                observer.disconnect()
            }
        }, { threshold: 0.5 })

        const element = document.getElementById('rank-climber')
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    const startClimb = () => {
        setIsClimbing(true)

        // Simulate the climb over time
        let rank = 12
        const climbInterval = setInterval(() => {
            if (rank > 1) {
                rank--
                setCurrentRank(rank)
            } else {
                clearInterval(climbInterval)
                setIsClimbing(false)
                setShowConfetti(true)
            }
        }, 250) // Speed of climb
    }

    return (
        <div id="rank-climber" className="relative w-full max-w-md mx-auto aspect-[4/5] bg-background rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col group hover:shadow-emerald-500/20 transition-all duration-500">
            {/* Browser Header */}
            <div className="bg-slate-50 dark:bg-slate-900 border-b border-border p-3 flex items-center gap-3">
                <div className="flex gap-1.5 opacity-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white dark:bg-slate-800 rounded-full h-8 flex items-center px-4 text-xs text-muted-foreground shadow-sm border border-border/50">
                    <Globe className="w-3 h-3 mr-2 opacity-50" />
                    <span className="truncate">google.com/search?q=best+service+provider</span>
                </div>
                <MoreVertical className="w-4 h-4 opacity-30" />
            </div>

            {/* Search Results Area */}
            <div className="flex-1 p-4 bg-background relative overflow-hidden">
                {/* Grid Lines Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

                {/* Confetti */}
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none z-20">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute w-1.5 h-1.5 rounded-full ${['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-emerald-500'][i % 4]}`}
                                initial={{ x: '50%', y: '20%', scale: 0 }}
                                animate={{
                                    x: `${Math.random() * 100}%`,
                                    y: `${Math.random() * 100}%`,
                                    scale: [0, 1, 0],
                                    rotate: Math.random() * 360
                                }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                        ))}
                    </div>
                )}

                <div className="relative z-10 space-y-3 pt-2">
                    <AnimatePresence>
                        {initialResults.map((item) => {
                            const isTarget = item.isTarget

                            let yPos = 0

                            // Visual position logic
                            // Slot heights are ~90px
                            const slotHeight = 85

                            if (isTarget) {
                                // Rank 1 = 0px
                                // Rank 12 = deep below
                                // We clamp visual position
                                const visualRank = currentRank > 4 ? 4 : currentRank
                                // Custom interpolation to make the movement feel connected
                                yPos = (visualRank - 1) * slotHeight
                            } else {
                                // Competitor logic
                                let effectiveRank = item.position
                                if (currentRank <= item.position) {
                                    effectiveRank++
                                }
                                yPos = (effectiveRank - 1) * slotHeight
                            }

                            // Highlight Target
                            const bgClass = isTarget
                                ? 'bg-card border-l-4 border-l-emerald-500 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/20'
                                : 'bg-card/40 border-l-4 border-l-transparent opacity-60 grayscale-[0.5]'

                            return (
                                <motion.div
                                    key={item.id}
                                    className={`absolute left-2 right-2 p-3 rounded-lg border-y border-r flex flex-col gap-1 transition-all ${bgClass}`}
                                    animate={{ y: yPos, scale: isTarget ? 1.02 : 0.98, zIndex: isTarget ? 10 : 1 }}
                                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                                >
                                    <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                                            {isTarget ? currentRank : item.position}
                                        </div>
                                        <span className="truncate max-w-[150px]">{item.domain}</span>
                                        <MoreVertical className="w-3 h-3 ml-auto opacity-30" />
                                    </div>
                                    <div className={`text-sm font-medium leading-tight ${isTarget ? 'text-emerald-500' : 'text-foreground/80'}`}>
                                        {item.title}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={8} fill={i < Math.floor(item.rating) ? "currentColor" : "none"} strokeWidth={1} />
                                            ))}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground">({Math.floor(Math.random() * 100) + 20})</div>
                                    </div>

                                    {isTarget && currentRank === 1 && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 text-yellow-500 bg-white dark:bg-slate-900 rounded-full p-1 shadow-sm border border-yellow-200"
                                        >
                                            <Trophy className="w-4 h-4 fill-current" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                {/* Legend / Rank Badge */}
                <motion.div
                    className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-lg z-20 flex flex-col items-center min-w-[100px]"
                    animate={{ scale: isClimbing ? 1.05 : 1 }}
                >
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Google Rank</div>
                    <div className="text-3xl font-black text-emerald-500 flex items-center gap-1.5">
                        #{currentRank}
                        <TrendingUp className={`w-4 h-4 ${isClimbing ? 'text-emerald-500 animate-bounce' : 'text-muted-foreground'}`} />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
