'use client'

import { useState } from 'react'
import GenericAdminTable from '@/components/admin/GenericAdminTable'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Package, TrendingUp, DollarSign, Target } from 'lucide-react'

export default function AdminOffersPage() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,77,0,0.3)]">
                            <Zap className="w-7 h-7 text-white" />
                        </div>
                        Offer_Engine
                    </h1>
                    <p className="text-zinc-500 mt-2 font-medium max-w-xl">
                        Architect and deploy high-conversion growth packages. These offers drive the core revenue pipeline for BigWeb Digital.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-end px-8 py-4 bg-zinc-900/40 rounded-[2rem] border border-white/5 backdrop-blur-xl">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">Active_Pipeline</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-2xl font-black text-white italic">04_Active</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Quick Intelligence Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Highest_Conv', value: 'Diagnostic', icon: Target, color: 'text-orange-500' },
                    { label: 'Avg_Order_Value', value: '$2.4k', icon: DollarSign, color: 'text-emerald-500' },
                    { label: 'Monthly_Reach', value: '1.2k', icon: TrendingUp, color: 'text-blue-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-sm group hover:border-white/10 transition-all flex items-center gap-6"
                    >
                        <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-950 flex items-center justify-center border border-white/5 shadow-inner">
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-white uppercase italic tracking-tight">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Management Table Container */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-transparent rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden">
                    <GenericAdminTable
                        tableName="cms_growth_packages"
                        title="Growth Package Inventory"
                        columns={[
                            { key: 'title', label: 'Package Name', type: 'text' },
                            { key: 'price_display', label: 'Pricing Label', type: 'text' },
                            { key: 'is_featured', label: 'Featured', type: 'boolean' },
                            { key: 'is_active', label: 'Live', type: 'boolean' },
                            { key: 'sort_order', label: 'Priority', type: 'number' },
                            { key: 'cta_text', label: 'Button Caption', type: 'text' }
                        ]}
                        defaultSort="sort_order"
                    />
                </div>
            </div>

            {/* Strategic Footer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] border border-white/5 bg-zinc-900/20">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        Best_Practices
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Ensure all offers have high-contrast visual cues and psychologically targeted copy. Active offers should always be linked to a specific conversion funnel or diagnostic trigger.
                    </p>
                </div>
                <div className="p-8 rounded-[2rem] border border-white/5 bg-zinc-900/20">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-500" />
                        Asset_Sync
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Updates to package pricing or feature sets reflect across the global frontend environment in real-time. Verify CTA endpoints after modifying slugs.
                    </p>
                </div>
            </div>
        </div>
    )
}
