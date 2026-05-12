'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Users, ArrowRight, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

export default function ROICalculator() {
    const [visitors, setVisitors] = useState(10000)
    const [conversionRate, setConversionRate] = useState(2)
    const [averageOrder, setAverageOrder] = useState(100)

    const currentRevenue = visitors * (conversionRate / 100) * averageOrder
    const improvedRevenue = visitors * ((conversionRate * 1.5) / 100) * averageOrder
    const additionalRevenue = improvedRevenue - currentRevenue

    return (
        <section className="py-32 relative overflow-hidden bg-black border-t border-white/5">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px] opacity-[0.03]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-6">
                                <Calculator className="w-3 h-3 text-accent" />
                                <span>Financial Projection</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter-clinical mb-6 leading-[1.1]">
                                Projected <br /><span className="text-zinc-600">Revenue Model</span>
                            </h2>
                            <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-md">
                                Analyze the revenue impact of an elite conversion framework. Standard lift is <span className="text-white font-bold">50%+</span> post-deployment.
                            </p>
                        </motion.div>

                        <div className="space-y-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden">
                            {/* Monthly Visitors */}
                            <div className="space-y-5">
                                <div className="flex justify-between items-end">
                                    <label className="flex items-center gap-3 font-bold text-sm text-zinc-300 uppercase tracking-wider">
                                        <Users className="w-4 h-4 text-accent" />
                                        Monthly Traffic
                                    </label>
                                    <span className="text-2xl font-mono font-bold text-white tracking-tight">{visitors.toLocaleString()}</span>
                                </div>
                                <Slider
                                    value={[visitors]}
                                    min={1000}
                                    max={100000}
                                    step={1000}
                                    onValueChange={(val) => setVisitors(val[0])}
                                    className="py-2"
                                />
                            </div>

                            {/* Conversion Rate */}
                            <div className="space-y-5">
                                <div className="flex justify-between items-end">
                                    <label className="flex items-center gap-3 font-bold text-sm text-zinc-300 uppercase tracking-wider">
                                        <TrendingUp className="w-4 h-4 text-accent" />
                                        Base Conversion
                                    </label>
                                    <span className="text-2xl font-mono font-bold text-white tracking-tight">{conversionRate}%</span>
                                </div>
                                <Slider
                                    value={[conversionRate]}
                                    min={0.1}
                                    max={10}
                                    step={0.1}
                                    onValueChange={(val) => setConversionRate(val[0])}
                                    className="py-2"
                                />
                            </div>

                            {/* Average Order Value */}
                            <div className="space-y-5">
                                <div className="flex justify-between items-end">
                                    <label className="flex items-center gap-3 font-bold text-sm text-zinc-300 uppercase tracking-wider">
                                        <DollarSign className="w-4 h-4 text-accent" />
                                        Order Value
                                    </label>
                                    <span className="text-2xl font-mono font-bold text-white tracking-tight">${averageOrder}</span>
                                </div>
                                <Slider
                                    value={[averageOrder]}
                                    min={10}
                                    max={1000}
                                    step={10}
                                    onValueChange={(val) => setAverageOrder(val[0])}
                                    className="py-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative pt-10 lg:pt-0">
                        <motion.div
                            className="relative bg-black border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-10 shadow-2xl overflow-hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Glass Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                            <div className="relative text-center space-y-4">
                                <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Projected Annual Uplift</p>
                                <div className="text-5xl md:text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 tracking-tighter">
                                    +${(additionalRevenue * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl text-center backdrop-blur-sm">
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Current Monthly</p>
                                    <p className="text-xl md:text-2xl font-mono font-bold text-zinc-400">${currentRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                                <div className="bg-accent/10 border border-accent/20 p-6 rounded-2xl text-center backdrop-blur-sm relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <p className="text-[10px] uppercase tracking-widest text-accent-light mb-2 relative z-10">Optimized Monthly</p>
                                    <p className="text-xl md:text-2xl font-mono font-bold text-white relative z-10">${improvedRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                                </div>
                            </div>

                            <div className="pt-6 relative z-10">
                                <Button size="xl" variant="default" className="w-full h-16 text-sm font-bold bg-white text-black hover:bg-zinc-200 tracking-widest uppercase rounded-xl transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
                                    Capture This Revenue
                                    <ArrowRight className="w-4 h-4 ml-4" />
                                </Button>
                                <p className="text-[10px] text-center text-zinc-600 mt-6 font-medium max-w-xs mx-auto">
                                    *Model assumes a conservative 1.5x conversion multiplier based on our historical performance portfolio.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
