'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    LayoutDashboard, ArrowUpRight, Users, MessageSquare,
    Layers, Star, Globe, Settings, Image, HelpCircle,
    DollarSign, Activity, CheckCircle2, ExternalLink,
    FileText, Target
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface DashboardCounts {
    services: number
    projects: number
    testimonials: number
    team: number
    leads: number
    faqs: number
    heroes: number
    engagements: number
}

const quickLinks = [
    { label: 'Hero Sections', desc: 'Edit page headlines & CTAs', href: '/admin/heroes', icon: Image, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Services', desc: 'Manage service pages', href: '/admin/capabilities-new', icon: Layers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Portfolio', desc: 'Project case studies', href: '/admin/portfolio', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Testimonials', desc: 'Client reviews & quotes', href: '/admin/testimonials', icon: Star, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Team', desc: 'Team profiles', href: '/admin/team', icon: Users, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Pricing', desc: 'Packages & engagements', href: '/admin/engagements-new', icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'FAQs', desc: 'Frequently asked questions', href: '/admin/faqs', icon: HelpCircle, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Blog Posts', desc: 'Articles & content', href: '/admin/blog', icon: FileText, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Leads & CRM', desc: 'Contacts & enquiries', href: '/admin/leads', icon: MessageSquare, color: 'text-red-400', bg: 'bg-red-500/10' },
    { label: 'Site Settings', desc: 'Logo, favicon, social links', href: '/admin/settings', icon: Settings, color: 'text-zinc-400', bg: 'bg-zinc-500/10' },
]

export default function AdminDashboard() {
    const supabase = createClient()
    const [counts, setCounts] = useState<DashboardCounts>({ services: 0, projects: 0, testimonials: 0, team: 0, leads: 0, faqs: 0, heroes: 0, engagements: 0 })
    const [loading, setLoading] = useState(true)
    const [recentLeads, setRecentLeads] = useState<any[]>([])

    useEffect(() => {
        async function load() {
            const [srv, proj, test, team, leads, faqs, heroes, eng, recentLeadsRes] = await Promise.all([
                supabase.from('cms_services').select('id', { count: 'exact', head: true }),
                supabase.from('cms_projects').select('id', { count: 'exact', head: true }),
                supabase.from('cms_testimonials').select('id', { count: 'exact', head: true }),
                supabase.from('cms_team_members').select('id', { count: 'exact', head: true }),
                supabase.from('cms_leads').select('id', { count: 'exact', head: true }),
                supabase.from('cms_faqs').select('id', { count: 'exact', head: true }),
                supabase.from('cms_heroes').select('id', { count: 'exact', head: true }),
                supabase.from('engagements').select('id', { count: 'exact', head: true }),
                supabase.from('cms_leads').select('*').order('created_at', { ascending: false }).limit(5),
            ])
            setCounts({
                services: srv.count || 0,
                projects: proj.count || 0,
                testimonials: test.count || 0,
                team: team.count || 0,
                leads: leads.count || 0,
                faqs: faqs.count || 0,
                heroes: heroes.count || 0,
                engagements: eng.count || 0,
            })
            setRecentLeads(recentLeadsRes.data || [])
            setLoading(false)
        }
        load()
    }, [supabase])

    const statCards = [
        { label: 'Services', value: counts.services, href: '/admin/capabilities-new', icon: Layers, color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/20', text: 'text-blue-400' },
        { label: 'Projects', value: counts.projects, href: '/admin/portfolio', icon: Target, color: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/20', text: 'text-emerald-400' },
        { label: 'Testimonials', value: counts.testimonials, href: '/admin/testimonials', icon: Star, color: 'from-accent/20 to-accent/5', border: 'border-accent/20', text: 'text-accent' },
        { label: 'Leads', value: counts.leads, href: '/admin/leads', icon: MessageSquare, color: 'from-red-500/20 to-red-600/5', border: 'border-red-500/20', text: 'text-red-400' },
    ]

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent" />
        </div>
    )

    return (
        <div className="space-y-8 pb-16 text-white">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">All systems live</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
                    <p className="text-zinc-500 mt-1">Manage all your website content from here.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm transition-colors">
                        <ExternalLink className="w-4 h-4" /> View Live Site
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                        <Link href={stat.href}>
                            <div className={`group p-6 rounded-2xl border bg-gradient-to-br ${stat.color} ${stat.border} hover:scale-[1.02] transition-transform cursor-pointer`}>
                                <div className="flex items-center justify-between mb-4">
                                    <stat.icon className={`w-5 h-5 ${stat.text}`} />
                                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                                </div>
                                <div className={`text-3xl font-bold ${stat.text}`}>{stat.value}</div>
                                <div className="text-xs text-zinc-500 mt-1 font-medium">{stat.label}</div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Links + Recent Leads */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Quick Links */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
                    <div className="bg-zinc-900/50 border border-white/[0.06] rounded-3xl p-6">
                        <h2 className="text-lg font-bold text-white mb-5">Quick Access</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {quickLinks.map((link, i) => (
                                <Link key={i} href={link.href}>
                                    <div className="group flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/80 border border-white/[0.04] hover:border-white/10 transition-all hover:bg-zinc-800/50 cursor-pointer">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${link.bg}`}>
                                            <link.icon className={`w-4 h-4 ${link.color}`} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-white text-xs font-semibold truncate">{link.label}</div>
                                            <div className="text-zinc-600 text-[10px] truncate">{link.desc}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Recent Leads */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <div className="bg-zinc-900/50 border border-white/[0.06] rounded-3xl p-6 h-full">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-white">Recent Leads</h2>
                            <Link href="/admin/leads" className="text-xs text-accent hover:opacity-80">View all →</Link>
                        </div>
                        <div className="space-y-3">
                            {recentLeads.length === 0 && (
                                <p className="text-zinc-600 text-sm text-center py-8">No leads yet</p>
                            )}
                            {recentLeads.map((lead, i) => (
                                <div key={lead.id || i} className="flex items-center gap-3 p-3 bg-zinc-900/60 rounded-xl border border-white/[0.04]">
                                    <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                                        <span className="text-accent text-xs font-bold">{(lead.name || lead.email || '?').charAt(0).toUpperCase()}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-white text-xs font-semibold truncate">{lead.name || lead.email || 'Anonymous'}</div>
                                        <div className="text-zinc-600 text-[10px] truncate">{lead.email || lead.type || 'Contact'}</div>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${lead.status === 'qualified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            lead.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-accent/10 text-accent border-accent/20'
                                        }`}>{lead.status || 'New'}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* System Status */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex items-center gap-4 p-5 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                    <span className="text-emerald-400 text-sm font-semibold">All systems operational</span>
                    <span className="text-zinc-600 text-xs ml-3">Supabase connected · RLS active · All API routes healthy</span>
                </div>
            </motion.div>
        </div>
    )
}
