'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Brain, LineChart, Code2 } from 'lucide-react'
import Image from 'next/image'

export default function AuthoritySection() {
    return (
        <section className="py-24 bg-card border-y border-border overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Engineers, Not Artists. <br />
                            <span className="text-accent">Outcome-Obsessed.</span>
                        </h2>

                        <div className="space-y-6 text-lg text-muted-foreground mb-8">
                            <p>
                                Most agencies are filled with "creatives" who care about winning design awards.
                                We are a team of Conversion Engineers who care about winning market share.
                            </p>
                            <p>
                                At BIGWEB Digital, we believe that a website is a machine. Its sole purpose is to process traffic and output revenue.
                                If it looks good but doesn't sell, it's broken.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: Brain, label: "Psychology-First" },
                                { icon: Code2, label: "Performance Obsessed" },
                                { icon: LineChart, label: "Data-Driven" },
                                { icon: BadgeCheck, label: "Proven Process" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 font-semibold">
                                    <item.icon className="w-5 h-5 text-accent" />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-border shadow-2xl">
                            {/* Replace with actual team/office/working shot */}
                            <Image
                                src="/images/conversion-lab.png"
                                alt="BigWeb Conversion Engineering Lab"
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                <div>
                                    <div className="text-white font-bold text-xl">The Conversion Lab</div>
                                    <div className="text-white/70 text-sm">Where traffic becomes revenue.</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-background border border-border p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="text-4xl font-bold text-accent">100+</div>
                                <div className="text-sm font-semibold leading-tight">
                                    Conversion <br /> Diagnostics
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                We've analyzed over 100 funnels this year to build our proprietary benchmark database.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
