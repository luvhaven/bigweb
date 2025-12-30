'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Slider } from '@/components/ui/slider'
import { Crown, Sparkles, TrendingUp, DollarSign, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function InteractiveROICalculator() {
    const [visitors, setVisitors] = useState([50000])
    const [conversionRate, setConversionRate] = useState([2.1])
    const [orderValue, setOrderValue] = useState([87])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Calculations
    const currentRevenue = visitors[0] * (conversionRate[0] / 100) * orderValue[0]

    // Optimization Multiplier (Conservative 2.8x)
    const OPTIMIZATION_FACTOR = 2.8

    const newConversionRate = Math.min(conversionRate[0] * OPTIMIZATION_FACTOR, 30) // Cap at 30% realistic max
    const newRevenue = visitors[0] * (newConversionRate / 100) * orderValue[0]
    const additionalMonthlyRevenue = newRevenue - currentRevenue
    const additionalAnnualRevenue = additionalMonthlyRevenue * 12

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val)
    }

    const formatNumber = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(val)
    }

    if (!mounted) return null

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                {/* Calculator Inputs */}
                <div className="p-8 rounded-3xl border border-white/10 bg-card/30 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                            Your Current Metrics
                        </h3>

                        <div className="space-y-10">
                            {/* Monthly Visitors */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Users className="w-4 h-4" /> Monthly Visitors
                                    </label>
                                    <span className="text-2xl font-bold text-foreground">{formatNumber(visitors[0])}</span>
                                </div>
                                <Slider
                                    value={visitors}
                                    onValueChange={setVisitors}
                                    max={500000}
                                    step={1000}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground/50">
                                    <span>0</span>
                                    <span>500k+</span>
                                </div>
                            </div>

                            {/* Conversion Rate */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> Conv. Rate
                                    </label>
                                    <span className="text-2xl font-bold text-orange-400">{conversionRate[0].toFixed(1)}%</span>
                                </div>
                                <Slider
                                    value={conversionRate}
                                    onValueChange={setConversionRate}
                                    max={10}
                                    step={0.1}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground/50">
                                    <span>0%</span>
                                    <span>10%</span>
                                </div>
                            </div>

                            {/* Average Order Value */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" /> Avg. Order Value
                                    </label>
                                    <span className="text-2xl font-bold text-green-400">${orderValue[0]}</span>
                                </div>
                                <Slider
                                    value={orderValue}
                                    onValueChange={setOrderValue}
                                    max={500}
                                    step={1}
                                    className="py-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground/50">
                                    <span>$0</span>
                                    <span>$500+</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-sm text-muted-foreground mb-1">Current Monthly Revenue (Est.)</div>
                            <div className="text-xl font-bold text-white">{formatCurrency(currentRevenue)}</div>
                        </div>
                    </div>
                </div>

                {/* Results Output */}
                <div className="relative">
                    {/* Glowing Background Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-[2rem] blur-2xl opacity-50 animate-pulse" />

                    <div className="p-8 rounded-3xl border-2 border-orange-500/30 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] mix-blend-overlay" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-orange-400">
                                <Crown className="w-6 h-6" />
                                Revenue Potential
                            </h3>

                            <div className="space-y-6">
                                <motion.div
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={newConversionRate} // Re-animate on change
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative">
                                        <div className="text-orange-200/70 text-sm font-medium mb-1">Optimized Conversion Rate</div>
                                        <div className="text-4xl md:text-5xl font-bold text-white tracking-tight flex items-baseline gap-2">
                                            {newConversionRate.toFixed(1)}%
                                            <span className="text-lg text-green-400 font-medium bg-green-400/10 px-2 py-1 rounded-full">+{((newConversionRate - conversionRate[0]) / conversionRate[0] * 100).toFixed(0)}%</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-purple-600/20 border border-orange-500/30 relative overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    key={additionalAnnualRevenue} // Re-animate on change
                                >
                                    <div className="relative">
                                        <div className="text-orange-200/70 text-sm font-medium mb-1">Additional Annual Revenue</div>
                                        <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400 tracking-tight">
                                            +{formatNumber(additionalAnnualRevenue)}
                                        </div>
                                        <div className="text-sm text-white/50 mt-2">
                                            That's <span className="text-white font-bold">{formatCurrency(additionalMonthlyRevenue)}</span> extra every month
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="flex items-start gap-3 text-sm text-muted-foreground bg-white/5 p-4 rounded-xl">
                                    <Sparkles className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                                    <p>
                                        Based on our conservative <strong className="text-white">2.8x enhancement factor</strong> typically seen in our first 90 days.
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <Link href="/contact" className="block">
                                        <Button size="lg" className="w-full text-lg h-14 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white shadow-xl shadow-orange-500/20 rounded-xl group">
                                            Unlock This Revenue
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
