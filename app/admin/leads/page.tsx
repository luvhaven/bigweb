'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { motion } from 'framer-motion'
import { Mail, Check, Archive, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Lead {
    id: string
    email: string
    name: string | null
    type: string
    message: string | null
    status: string
    created_at: string
}

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'archived'>('all')

    useEffect(() => {
        fetchLeads()
    }, [])

    async function fetchLeads() {
        const { data } = await supabase
            .from('cms_leads')
            .select('*')
            .order('created_at', { ascending: false })

        setLeads(data || [])
        setLoading(false)
    }

    async function updateStatus(id: string, status: string) {
        await supabase.from('cms_leads').update({ status }).eq('id', id)
        fetchLeads()
    }

    const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter)

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Leads</h1>
                <p className="text-zinc-400 mt-1">View and manage contact form submissions</p>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(['all', 'new', 'contacted', 'archived'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === f
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {f} {f === 'all' ? `(${leads.length})` : `(${leads.filter(l => l.status === f).length})`}
                    </button>
                ))}
            </div>

            {/* Leads List */}
            <div className="space-y-4">
                {filteredLeads.length === 0 ? (
                    <div className="text-center py-12 bg-zinc-900/50 border border-white/10 rounded-2xl">
                        <Mail className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500">No leads found</p>
                    </div>
                ) : (
                    filteredLeads.map((lead, index) => (
                        <motion.div
                            key={lead.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-5"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0">
                                            <span className="text-white font-medium text-sm">
                                                {lead.email.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{lead.name || 'Anonymous'}</p>
                                            <p className="text-zinc-500 text-sm">{lead.email}</p>
                                        </div>
                                    </div>
                                    {lead.message && (
                                        <p className="text-zinc-400 text-sm mt-3 line-clamp-2">{lead.message}</p>
                                    )}
                                    <div className="flex items-center gap-3 mt-3">
                                        <span className="text-xs text-zinc-500">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 capitalize">
                                            {lead.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${lead.status === 'new' ? 'bg-emerald-500/20 text-emerald-400' :
                                            lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-zinc-700 text-zinc-400'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                                {lead.status !== 'contacted' && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => updateStatus(lead.id, 'contacted')}
                                        className="text-zinc-400 hover:text-emerald-400"
                                    >
                                        <Check className="w-4 h-4 mr-1" /> Mark Contacted
                                    </Button>
                                )}
                                {lead.status !== 'archived' && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => updateStatus(lead.id, 'archived')}
                                        className="text-zinc-400 hover:text-zinc-300"
                                    >
                                        <Archive className="w-4 h-4 mr-1" /> Archive
                                    </Button>
                                )}
                                <a href={`mailto:${lead.email}`}>
                                    <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white">
                                        <ExternalLink className="w-4 h-4 mr-1" /> Email
                                    </Button>
                                </a>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}
