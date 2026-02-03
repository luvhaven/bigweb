'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    FolderKanban,
    ArrowUpRight,
    Zap,
    Target,
    Activity,
    ShieldCheck,
    Cpu,
    Search,
    Globe,
    Lock
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface DashboardStats {
    totalCapabilities: number
    totalEngagements: number
    totalPhases: number
    totalFlags: number
    totalMETAs: number
}

const statsConfig = [
    { key: 'totalCapabilities', label: 'Service_Capabilities', icon: Cpu, color: 'from-blue-500 to-indigo-600', href: '/admin/capabilities-new' },
    { key: 'totalEngagements', label: 'Commercial_Offers', icon: Zap, color: 'from-orange-500 to-red-600', href: '/admin/engagements-new' },
    { key: 'totalPhases', label: 'Methodology_Steps', icon: Search, color: 'from-purple-600 to-pink-600', href: '/admin/process-new' },
    { key: 'totalMETAs', label: 'SEO_Registries', icon: Globe, color: 'from-emerald-500 to-teal-600', href: '/admin/seo-new' },
]

export default function AdminDashboard() {
    const supabase = createClient()
    const [stats, setStats] = useState<DashboardStats>({
        totalCapabilities: 0,
        totalEngagements: 0,
        totalPhases: 0,
        totalFlags: 0,
        totalMETAs: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    async function fetchDashboardData() {
        try {
            const [capRes, engRes, phaseRes, flagRes, metaRes] = await Promise.all([
                supabase.from('capabilities').select('id', { count: 'exact', head: true }),
                supabase.from('engagements').select('id', { count: 'exact', head: true }),
                supabase.from('process_phases').select('id', { count: 'exact', head: true }),
                supabase.from('feature_flags').select('id', { count: 'exact', head: true }),
                supabase.from('page_metadata').select('id', { count: 'exact', head: true }),
            ])

            setStats({
                totalCapabilities: capRes.count || 0,
                totalEngagements: engRes.count || 0,
                totalPhases: phaseRes.count || 0,
                totalFlags: flagRes.count || 0,
                totalMETAs: metaRes.count || 0
            })
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 shadow-[0_0_20px_rgba(255,77,0,0.3)]" />
            </div>
        )
    }

    return (
        <div className="space-y-12 pb-20 selection:bg-orange-500/30">
            {/* Command Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest leading-none">Command_Shield_Active</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.8]">
                        Central_<span className="text-zinc-600">Nexus</span>
                    </h1>
                    <p className="text-zinc-500 mt-4 font-medium max-w-xl">
                        Welcome back, Admin. All site management modules are synchronized. Deep-level data integration active.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="px-8 py-6 bg-zinc-900/40 rounded-[2.5rem] border border-white/5 backdrop-blur-xl flex flex-col items-center">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Logic_Flags</span>
                        <span className="text-2xl font-black text-white italic leading-none">{stats.totalFlags}_Active</span>
                    </div>
                </div>
            </motion.div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statsConfig.map((stat, index) => (
                    <motion.div
                        key={stat.key}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                        <Link href={stat.href}>
                            <div className="relative group overflow-hidden bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8 hover:border-white/20 transition-all cursor-pointer h-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-start justify-between relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-xl shadow-black/40`}>
                                        <stat.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <ArrowUpRight className="w-6 h-6 text-zinc-700 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        <span className="text-[10px] font-black text-zinc-600 uppercase mt-1 tracking-tighter">Enter_Log</span>
                                    </div>
                                </div>

                                <div className="mt-10 relative z-10">
                                    <h3 className="text-5xl font-black text-white tracking-tighter italic">
                                        {stats[stat.key as keyof DashboardStats].toString().padStart(2, '0')}
                                    </h3>
                                    <p className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.3em] mt-2 pl-1 underline decoration-orange-500 underline-offset-8">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Management Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Module Quick Access */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-12 bg-zinc-900/40 border border-white/5 rounded-[3rem] p-10 overflow-hidden relative"
                >
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase italic flex items-center gap-3">
                                <Activity className="w-6 h-6 text-orange-500" />
                                Operational_Matrix
                            </h2>
                            <p className="text-zinc-500 text-sm font-medium">Connect to specific system managers</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
                        {[
                            { label: 'Capabilities', desc: 'Manage service offerings', href: '/admin/capabilities-new', icon: Cpu, color: 'text-blue-500' },
                            { label: 'Engagements', desc: 'Pricing and packages', href: '/admin/engagements-new', icon: Zap, color: 'text-orange-500' },
                            { label: 'Process', desc: 'Methodology phases', href: '/admin/process-new', icon: Search, color: 'text-purple-500' },
                            { label: 'Metadata', desc: 'SEO and social tags', href: '/admin/seo-new', icon: Globe, color: 'text-emerald-500' },
                            { label: 'System_Flags', desc: 'Feature toggles', href: '/admin/flags-new', icon: Lock, color: 'text-red-500' },
                        ].map((module, i) => (
                            <Link key={i} href={module.href}>
                                <div className="p-8 rounded-[2rem] bg-zinc-950 border border-white/5 hover:border-orange-500/30 hover:bg-zinc-950/80 transition-all group h-full flex flex-col items-center text-center">
                                    <div className={`w-16 h-16 rounded-3xl bg-zinc-900 flex items-center justify-center border border-white/5 mb-6 group-hover:scale-110 transition-transform ${module.color}`}>
                                        <module.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-white font-black text-sm uppercase tracking-widest mb-2">{module.label}</h3>
                                    <p className="text-zinc-600 text-[10px] uppercase font-bold leading-relaxed">{module.desc}</p>
                                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-5 h-5 text-orange-500" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] -z-0" />
                </motion.div>
            </div>

            {/* System Status Banner */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-10 rounded-[3rem] bg-gradient-to-r from-zinc-950 to-zinc-900 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
            >
                <div>
                    <div className="flex items-center gap-4 justify-center md:justify-start mb-4">
                        <ShieldCheck className="w-8 h-8 text-emerald-500" />
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Production_Grade_Admin</h2>
                    </div>
                    <p className="text-zinc-500 font-medium max-w-xl">
                        This environment is protected by Supabase RLS policies. All CRUD operations are authenticated.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="/" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-none hover:bg-orange-600 hover:text-white transition-all">
                        View_Live_Site
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
