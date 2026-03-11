'use client'

import { motion } from 'framer-motion'
import { Activity, Clock, CheckCircle2, ChevronRight, Download, FileText } from 'lucide-react'

export default function PortalDashboard() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-display tracking-tight text-white mb-2"
                >
                    Project Overview
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400"
                >
                    Here is your real-time snapshot of current engineering operations.
                </motion.p>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    className="bg-[#050505] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-24 h-24" />
                    </div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-accent mb-4">Phase Progress</div>
                    <div className="text-4xl font-light tracking-tight text-white">Engineering</div>
                    <div className="mt-4 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                        <motion.div className="h-full bg-accent" initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1, delay: 0.5 }} />
                    </div>
                </motion.div>

                <motion.div
                    className="bg-[#050505] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock className="w-24 h-24" />
                    </div>
                    <div className="text-[10px] font-mono tracking-widest uppercase text-accent mb-4">Estimated Launch</div>
                    <div className="text-4xl font-light tracking-tight text-white">12 Days</div>
                    <div className="mt-4 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> On Schedule
                    </div>
                </motion.div>

                <motion.div
                    className="bg-[#050505] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />
                    <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 mb-4">Next Payment</div>
                    <div className="text-4xl font-light tracking-tight text-white">$12,500</div>
                    <div className="mt-4 text-xs text-zinc-500 font-medium">
                        Due: Nov 15th, 2026
                    </div>
                </motion.div>
            </div>

            {/* Recent Updates & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-black/40 border border-white/[0.05] rounded-3xl p-8"
                >
                    <h3 className="text-lg font-medium tracking-tight mb-8 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Recent Updates
                    </h3>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                        {[
                            { title: 'Backend APIs Initialized', desc: 'Secure database endpoints configured and thoroughly tested.', date: 'Today' },
                            { title: 'Frontend UI Mocks Approved', desc: 'Client signed off on all animated responsive wireframes.', date: 'Oct 28' },
                            { title: 'Strategy Brief Finalized', desc: 'Core brand messaging and conversion heuristics locked.', date: 'Oct 20' },
                        ].map((item, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white/20 bg-black group-hover:bg-accent group-hover:border-accent transition-colors shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <div className="w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-1.5rem)] bg-[#050505] border border-white/5 p-4 rounded-xl shadow-xl transition-transform duration-300 hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="font-semibold text-white text-sm">{item.title}</div>
                                        <time className="font-mono text-[10px] text-accent">{item.date}</time>
                                    </div>
                                    <div className="text-zinc-400 text-xs leading-relaxed">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Documents */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-black/40 border border-white/[0.05] rounded-3xl p-8"
                >
                    <h3 className="text-lg font-medium tracking-tight mb-8">Shared Documents</h3>

                    <div className="space-y-3">
                        {[
                            { name: 'Revenue_Roadmap_Final.pdf', size: '2.4 MB', type: 'PDF' },
                            { name: 'Wireframes_v2.fig', size: '15.1 MB', type: 'Figma' },
                            { name: 'Brand_Guidelines.pdf', size: '8.2 MB', type: 'PDF' },
                            { name: 'Invoice_101.pdf', size: '1.1 MB', type: 'Invoice' },
                        ].map((doc, i) => (
                            <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-5 rounded-xl border border-white/5 bg-[#050505] hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-zinc-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-white group-hover:text-accent transition-colors">{doc.name}</h4>
                                        <p className="text-xs text-zinc-500 mt-0.5">{doc.type} • {doc.size}</p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5">
                                    <Download className="w-3 h-3" /> Download
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-4 flex items-center justify-center gap-2 text-sm font-medium text-zinc-500 hover:text-white bg-transparent border border-dashed border-white/10 hover:border-white/20 rounded-xl transition-all">
                        View Complete Archive <ChevronRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
