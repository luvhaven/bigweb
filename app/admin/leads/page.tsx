'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Mail, Check, Archive, ExternalLink, Search, Download,
    RefreshCw, Inbox, User, MessageSquare, Tag, Clock, ChevronDown
} from 'lucide-react'

interface Lead {
    id: string
    email: string
    name: string | null
    type: string
    message: string | null
    plan: string | null
    status: string
    created_at: string
    metadata?: {
        company?: string
        source?: string
        website_url?: string
        pain_point?: string
    }
}

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
    new: { label: 'New', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400' },
    contacted: { label: 'Contacted', color: 'bg-blue-500/15 text-blue-400 border-blue-500/20', dot: 'bg-blue-400' },
    qualified: { label: 'Qualified', color: 'bg-purple-500/15 text-purple-400 border-purple-500/20', dot: 'bg-purple-400' },
    archived: { label: 'Archived', color: 'bg-zinc-800 text-zinc-500 border-zinc-700', dot: 'bg-zinc-500' },
}

const TYPE_COLORS: Record<string, string> = {
    diagnostic: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'fix-sprint': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'revenue-system': 'bg-accent/10 text-accent border-accent/20',
    retainer: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    blueprint_download: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    newsletter_footer: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    ai_chat: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    general_contact: 'bg-zinc-700/50 text-zinc-400 border-zinc-600',
}

export default function LeadsPage() {
    const supabase = createClient()
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [filter, setFilter] = useState<string>('all')
    const [search, setSearch] = useState('')
    const [expanded, setExpanded] = useState<string | null>(null)

    const fetchLeads = useCallback(async () => {
        const { data } = await supabase
            .from('cms_leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(200)
        setLeads(data || [])
        setLoading(false)
        setRefreshing(false)
    }, [supabase])

    useEffect(() => { fetchLeads() }, [fetchLeads])

    const refresh = async () => {
        setRefreshing(true)
        await fetchLeads()
    }

    async function updateStatus(id: string, status: string) {
        await supabase.from('cms_leads').update({ status }).eq('id', id)
        fetchLeads()
    }

    const exportCsv = () => {
        const rows = [
            ['Name', 'Email', 'Type', 'Plan', 'Status', 'Message', 'Date'],
            ...filtered.map(l => [
                l.name || '', l.email, l.type, l.plan || '', l.status,
                (l.message || '').replace(/"/g, '""'), new Date(l.created_at).toLocaleDateString()
            ])
        ]
        const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `bigweb-leads-${Date.now()}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    const filtered = leads.filter(l => {
        const matchesFilter = filter === 'all' || l.status === filter || l.type === filter
        const matchesSearch = !search || [l.name, l.email, l.message, l.type].some(
            v => v?.toLowerCase().includes(search.toLowerCase())
        )
        return matchesFilter && matchesSearch
    })

    const counts: Record<string, number> = {
        all: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        archived: leads.filter(l => l.status === 'archived').length,
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
            </div>
        )
    }

    return (
        <div className="space-y-6 text-white max-w-6xl">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Leads & CRM</h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        All inbound enquiries — contact forms, chat leads, blueprint downloads, newsletter signups.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={refresh}
                        disabled={refreshing}
                        className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={exportCsv}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                    <div
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${filter === key
                                ? 'bg-white/5 border-white/20'
                                : 'bg-zinc-900/50 border-white/[0.06] hover:border-white/10'
                            }`}
                    >
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium mb-2 ${cfg.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                        </div>
                        <div className="text-2xl font-bold text-white">{counts[key] ?? 0}</div>
                    </div>
                ))}
            </div>

            {/* Search + Filter Row */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search by name, email, message..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-colors"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['all', 'new', 'contacted', 'qualified', 'archived'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all border ${filter === f
                                    ? 'bg-accent/20 text-accent border-accent/30'
                                    : 'text-zinc-400 hover:text-white border-white/[0.06] hover:border-white/20 bg-zinc-900/50'
                                }`}
                        >
                            {f} ({counts[f] ?? filtered.length})
                        </button>
                    ))}
                </div>
            </div>

            {/* Leads List */}
            <div className="space-y-2">
                {filtered.length === 0 ? (
                    <div className="text-center py-16 bg-zinc-900/30 border border-white/[0.06] rounded-2xl">
                        <Inbox className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500 font-medium">No leads found</p>
                        <p className="text-zinc-700 text-sm mt-1">Try adjusting your search or filter</p>
                    </div>
                ) : (
                    filtered.map((lead, index) => {
                        const statusCfg = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new
                        const typeCls = TYPE_COLORS[lead.type] || 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        const isExpanded = expanded === lead.id
                        const typeLabel = lead.type?.replace(/_/g, ' ').replace(/-/g, ' ')
                        const initial = (lead.name || lead.email).charAt(0).toUpperCase()

                        return (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index * 0.03, 0.3) }}
                                className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
                            >
                                {/* Main Row */}
                                <div
                                    className="flex items-center gap-4 p-4 cursor-pointer"
                                    onClick={() => setExpanded(isExpanded ? null : lead.id)}
                                >
                                    {/* Avatar */}
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/60 to-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-white font-bold text-sm">{initial}</span>
                                    </div>

                                    {/* Name + Email */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-white font-medium text-sm">{lead.name || 'Anonymous'}</span>
                                            <span className="text-zinc-500 text-xs">{lead.email}</span>
                                        </div>
                                        {lead.message && (
                                            <p className="text-zinc-600 text-xs mt-0.5 truncate">{lead.message}</p>
                                        )}
                                    </div>

                                    {/* Tags */}
                                    <div className="hidden md:flex items-center gap-2 shrink-0">
                                        {lead.type && (
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${typeCls}`}>
                                                {typeLabel}
                                            </span>
                                        )}
                                        {lead.plan && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-zinc-800/50 text-zinc-400 border-zinc-700">
                                                {lead.plan}
                                            </span>
                                        )}
                                    </div>

                                    {/* Status + Date */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${statusCfg.color}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                                            {statusCfg.label}
                                        </span>
                                        <span className="text-zinc-600 text-xs hidden lg:block">
                                            {new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-zinc-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>

                                {/* Expanded Detail Panel */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden border-t border-white/[0.05]"
                                        >
                                            <div className="p-4 bg-black/20 space-y-4">
                                                {/* Full message */}
                                                {lead.message && (
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1.5 flex items-center gap-1">
                                                            <MessageSquare className="w-3 h-3" /> Message
                                                        </p>
                                                        <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/50 rounded-xl p-4 border border-white/[0.04]">
                                                            {lead.message}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Meta grid */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                    {lead.metadata?.company && (
                                                        <div>
                                                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-1">Company</p>
                                                            <p className="text-sm text-zinc-300">{lead.metadata.company}</p>
                                                        </div>
                                                    )}
                                                    {lead.metadata?.source && (
                                                        <div>
                                                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-1">Source</p>
                                                            <p className="text-sm text-zinc-300">{lead.metadata.source.replace(/_/g, ' ')}</p>
                                                        </div>
                                                    )}
                                                    {lead.metadata?.website_url && (
                                                        <div>
                                                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-1">Website</p>
                                                            <a href={lead.metadata.website_url} target="_blank" rel="noopener noreferrer"
                                                                className="text-sm text-accent hover:underline flex items-center gap-1">
                                                                {lead.metadata.website_url.replace(/^https?:\/\//, '')}
                                                                <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-1">Received</p>
                                                        <p className="text-sm text-zinc-300">
                                                            {new Date(lead.created_at).toLocaleDateString('en-GB', {
                                                                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
                                                    {lead.status !== 'contacted' && (
                                                        <button
                                                            onClick={() => updateStatus(lead.id, 'contacted')}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors"
                                                        >
                                                            <Check className="w-3.5 h-3.5" /> Mark Contacted
                                                        </button>
                                                    )}
                                                    {lead.status !== 'qualified' && (
                                                        <button
                                                            onClick={() => updateStatus(lead.id, 'qualified')}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-colors"
                                                        >
                                                            <Tag className="w-3.5 h-3.5" /> Qualify
                                                        </button>
                                                    )}
                                                    {lead.status !== 'archived' && (
                                                        <button
                                                            onClick={() => updateStatus(lead.id, 'archived')}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-zinc-300 transition-colors"
                                                        >
                                                            <Archive className="w-3.5 h-3.5" /> Archive
                                                        </button>
                                                    )}
                                                    <a
                                                        href={`mailto:${lead.email}?subject=Re: Your enquiry to BIGWEB Digital`}
                                                        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-medium hover:bg-accent/20 transition-colors"
                                                    >
                                                        <Mail className="w-3.5 h-3.5" /> Reply by Email
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
