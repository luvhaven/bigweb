'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    FolderKanban,
    MessageSquare,
    FileText,
    TrendingUp,
    Eye,
    ArrowUpRight,
    Calendar
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface DashboardStats {
    totalProjects: number
    totalServices: number
    totalTestimonials: number
    totalLeads: number
    newLeadsToday: number
}

const statsConfig = [
    { key: 'totalProjects', label: 'Projects', icon: FolderKanban, color: 'from-blue-500 to-cyan-500', href: '/admin/projects' },
    { key: 'totalServices', label: 'Services', icon: TrendingUp, color: 'from-emerald-500 to-teal-500', href: '/admin/services' },
    { key: 'totalTestimonials', label: 'Testimonials', icon: MessageSquare, color: 'from-purple-500 to-pink-500', href: '/admin/testimonials' },
    { key: 'totalLeads', label: 'Total Leads', icon: FileText, color: 'from-orange-500 to-red-500', href: '/admin/leads' },
]

export default function AdminDashboard() {
    const supabase = createClient()
    const [stats, setStats] = useState<DashboardStats>({
        totalProjects: 0,
        totalServices: 0,
        totalTestimonials: 0,
        totalLeads: 0,
        newLeadsToday: 0
    })
    const [recentLeads, setRecentLeads] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    async function fetchDashboardData() {
        try {
            // Fetch counts
            const [projectsRes, servicesRes, clientsRes, videosRes, leadsRes] = await Promise.all([
                supabase.from('cms_projects').select('id', { count: 'exact', head: true }),
                supabase.from('cms_services').select('id', { count: 'exact', head: true }),
                supabase.from('cms_clients').select('id', { count: 'exact', head: true }),
                supabase.from('cms_video_showroom').select('id', { count: 'exact', head: true }),
                supabase.from('cms_leads').select('id', { count: 'exact', head: true }),
            ])

            // Fetch recent leads
            const { data: leads } = await supabase
                .from('cms_leads')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)

            setStats({
                totalProjects: projectsRes.count || 0,
                totalServices: servicesRes.count || 0,
                totalTestimonials: clientsRes.count || 0, // Using clients count as a conceptual 'Trust' metric for now
                totalLeads: leadsRes.count || 0,
                newLeadsToday: 0
            })

            setRecentLeads(leads || [])
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-zinc-400 mt-1">Welcome back! Here's an overview of your CMS.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsConfig.map((stat, index) => (
                    <motion.div
                        key={stat.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={stat.href}>
                            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group cursor-pointer">
                                <div className="flex items-start justify-between">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className="mt-4">
                                    <p className="text-4xl font-bold text-white">
                                        {stats[stat.key as keyof DashboardStats]}
                                    </p>
                                    <p className="text-zinc-400 text-sm mt-1">{stat.label}</p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
                        <Link href="/admin/leads" className="text-sm text-emerald-400 hover:text-emerald-300">
                            View All →
                        </Link>
                    </div>

                    {recentLeads.length === 0 ? (
                        <div className="text-center py-8">
                            <FileText className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                            <p className="text-zinc-500">No leads yet</p>
                            <p className="text-zinc-600 text-sm">Leads from forms will appear here</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentLeads.map((lead) => (
                                <div key={lead.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0">
                                        <span className="text-white font-medium text-sm">
                                            {lead.email?.charAt(0).toUpperCase() || '?'}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{lead.name || lead.email}</p>
                                        <p className="text-zinc-500 text-sm truncate">{lead.type}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.status === 'new' ? 'bg-emerald-500/20 text-emerald-400' :
                                        lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-zinc-700 text-zinc-400'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
                >
                    <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/heroes">
                            <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
                                <Eye className="w-8 h-8 text-blue-400 mb-3" />
                                <p className="text-white font-medium">Edit Heroes</p>
                                <p className="text-zinc-500 text-sm">Update page headers</p>
                            </div>
                        </Link>

                        <Link href="/admin/services">
                            <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
                                <TrendingUp className="w-8 h-8 text-emerald-400 mb-3" />
                                <p className="text-white font-medium">Manage Services</p>
                                <p className="text-zinc-500 text-sm">Add or edit offerings</p>
                            </div>
                        </Link>

                        <Link href="/admin/projects">
                            <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
                                <FolderKanban className="w-8 h-8 text-purple-400 mb-3" />
                                <p className="text-white font-medium">Add Project</p>
                                <p className="text-zinc-500 text-sm">Showcase your work</p>
                            </div>
                        </Link>

                        <Link href="/admin/testimonials">
                            <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5 hover:border-white/20 transition-all group cursor-pointer">
                                <MessageSquare className="w-8 h-8 text-pink-400 mb-3" />
                                <p className="text-white font-medium">Testimonials</p>
                                <p className="text-zinc-500 text-sm">Client feedback</p>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
