'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Save, Trash2, Edit3, X, RefreshCw, CheckCircle2, Building2 } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Client {
    id: string
    name: string
    logo_url: string | null
    website_url: string | null
    industry: string | null
    sort_order: number
    is_active: boolean
}

const empty: Partial<Client> = { name: '', logo_url: '', website_url: '', industry: '', sort_order: 0, is_active: true }
const inputCls = 'w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-all'

export default function AdminClientsPage() {
    const supabase = createClient()
    const [items, setItems] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<string | null>(null)
    const [form, setForm] = useState<Partial<Client>>(empty)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase.from('cms_clients').select('*').order('sort_order', { ascending: true })
        setItems(data || [])
        setLoading(false)
    }, [supabase])

    useEffect(() => { load() }, [load])

    const startEdit = (c: Client) => { setEditing(c.id); setForm({ ...c }); setError(''); setSaved(false) }
    const startNew = () => { setEditing('new'); setForm({ ...empty }); setError(''); setSaved(false) }
    const cancel = () => { setEditing(null); setForm(empty) }

    async function handleSave() {
        if (!form.name) { setError('Client name is required.'); return }
        setSaving(true); setError('')
        const { id, ...fields } = form
        let result
        if (editing !== 'new' && editing) {
            result = await supabase.from('cms_clients').update(fields).eq('id', editing)
        } else {
            result = await supabase.from('cms_clients').insert(fields)
        }
        setSaving(false)
        if (result.error) { setError(result.error.message); return }
        setSaved(true)
        await load()
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
    }

    async function handleDelete(id: string) {
        if (!confirm('Remove this client logo?')) return
        await supabase.from('cms_clients').delete().eq('id', id)
        load()
    }

    async function toggleActive(id: string, current: boolean) {
        await supabase.from('cms_clients').update({ is_active: !current }).eq('id', id)
        load()
    }

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" /></div>

    return (
        <div className="space-y-6 max-w-4xl text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Clients & Trust</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage client logos shown in the marquee/trust strip.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={load} className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90">
                        <Plus className="w-4 h-4" /> Add Client
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.length === 0 && !editing && (
                    <div className="col-span-4 text-center py-16 bg-zinc-900/30 border border-white/[0.06] rounded-2xl">
                        <Building2 className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500">No clients yet. Add your first one.</p>
                    </div>
                )}
                {items.map((c) => (
                    <motion.div
                        key={c.id}
                        layout
                        className={`bg-zinc-900/50 border rounded-2xl p-4 flex flex-col items-center gap-3 transition-colors ${c.is_active ? 'border-white/[0.06] hover:border-white/10' : 'border-white/[0.03] opacity-50'}`}
                    >
                        <div className="w-full h-12 flex items-center justify-center">
                            {c.logo_url ? (
                                <img src={c.logo_url} alt={c.name} className="max-h-10 w-auto object-contain" style={{ filter: 'brightness(10) grayscale(1)', opacity: 0.5 }} />
                            ) : (
                                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs font-bold">{c.name.charAt(0)}</div>
                            )}
                        </div>
                        <p className="text-xs text-zinc-400 font-medium text-center truncate w-full">{c.name}</p>
                        <div className="flex items-center gap-1.5 w-full">
                            <button onClick={() => toggleActive(c.id, c.is_active)} className={`flex-1 text-[10px] py-1 rounded-lg border transition-colors ${c.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                                {c.is_active ? 'Live' : 'Hidden'}
                            </button>
                            <button onClick={() => startEdit(c)} className="p-1.5 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06]"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 bg-zinc-900 border border-white/[0.06]"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Edit / New Panel */}
            <AnimatePresence>
                {editing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-zinc-900/80 border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">{editing === 'new' ? '✦ Add Client' : '✦ Edit Client'}</h2>
                            <button onClick={cancel} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Client Name *</label>
                                    <input value={form.name || ''} onChange={e => setForm(d => ({ ...d, name: e.target.value }))} placeholder="Acme Corp" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Industry</label>
                                    <input value={form.industry || ''} onChange={e => setForm(d => ({ ...d, industry: e.target.value }))} placeholder="SaaS, E-commerce..." className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Website URL</label>
                                    <input value={form.website_url || ''} onChange={e => setForm(d => ({ ...d, website_url: e.target.value }))} placeholder="https://..." className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Sort Order</label>
                                    <input type="number" value={form.sort_order ?? 0} onChange={e => setForm(d => ({ ...d, sort_order: parseInt(e.target.value) || 0 }))} className={inputCls} />
                                </div>
                            </div>

                            <ImageUpload
                                label="Client Logo"
                                value={form.logo_url || ''}
                                onChange={(url) => setForm(d => ({ ...d, logo_url: url }))}
                                folder="clients"
                                hint="SVG or PNG preferred. White/transparent background works best on the dark site."
                            />

                            <div className="flex items-center gap-3">
                                <button onClick={() => setForm(d => ({ ...d, is_active: !d.is_active }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.is_active ? 'bg-accent' : 'bg-zinc-700'}`}>
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-6' : ''}`} />
                                </button>
                                <span className="text-sm text-zinc-400">Show in trust strip</span>
                            </div>

                            {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

                            <div className="flex gap-3 pt-2">
                                <button onClick={handleSave} disabled={saving || saved} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 disabled:opacity-60">
                                    {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Client</>}
                                </button>
                                <button onClick={cancel} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm">Cancel</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
