'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Users, ArrowRight } from 'lucide-react'
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
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Calculate Your <span className="text-orange-500">Potential ROI</span>
                            </h2>
                            <p className="text-xl text-muted-foreground mb-8">
                                See how much revenue you're leaving on the table. Our elite optimization strategies typically increase conversion rates by 50% or more.
                            </p>
                        </motion.div>

                        <div className="space-y-8 bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-2xl">
                            {/* Monthly Visitors */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="flex items-center gap-2 font-medium">
                                        <Users className="w-5 h-5 text-orange-500" />
                                        Monthly Visitors
                                    </label>
                                    <span className="text-lg font-bold">{visitors.toLocaleString()}</span>
                                </div>
                                <Slider
                                    value={[visitors]}
                                    min={1000}
                                    max={100000}
                                    step={1000}
                                    onValueChange={(val) => setVisitors(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Conversion Rate */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="flex items-center gap-2 font-medium">
                                        <TrendingUp className="w-5 h-5 text-orange-500" />
                                        Current Conversion Rate
                                    </label>
                                    <span className="text-lg font-bold">{conversionRate}%</span>
                                </div>
                                <Slider
                                    value={[conversionRate]}
                                    min={0.1}
                                    max={10}
                                    step={0.1}
                                    onValueChange={(val) => setConversionRate(val[0])}
                                    className="py-4"
                                />
                            </div>

                            {/* Average Order Value */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="flex items-center gap-2 font-medium">
                                        <DollarSign className="w-5 h-5 text-orange-500" />
                                        Average Order Value
                                    </label>
                                    <span className="text-lg font-bold">${averageOrder}</span>
                                </div>
                                <Slider
                                    value={[averageOrder]}
                                    min={10}
                                    max={1000}
                                    step={10}
                                    onValueChange={(val) => setAverageOrder(val[0])}
                                    className="py-4"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-3xl blur-xl transform rotate-3 scale-105" />
                        <motion.div
                            className="relative bg-card border border-border rounded-3xl p-10 space-y-8 shadow-2xl"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="text-center space-y-2">
                                <p className="text-muted-foreground uppercase tracking-wider text-sm">Potential Annual Revenue Increase</p>
                                <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500 py-2">
                                    +${(additionalRevenue * 12).toLocaleString()}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-secondary/10 p-4 rounded-xl text-center">
                                    <p className="text-sm text-muted-foreground mb-1">Current Monthly</p>
                                    <p className="text-xl font-bold">${currentRevenue.toLocaleString()}</p>
                                </div>
                                <div className="bg-orange-500/10 p-4 rounded-xl text-center border border-orange-500/20">
                                    <p className="text-sm text-orange-500 mb-1">Projected Monthly</p>
                                    <p className="text-xl font-bold text-orange-500">${improvedRevenue.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button size="lg" className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-gray-200">
                                    Unlock This Revenue
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    Based on a conservative 50% improvement in conversion rate.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
