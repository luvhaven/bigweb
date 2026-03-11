'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Save, Trash2, Edit3, X, RefreshCw, CheckCircle2, Layers, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Service {
    id: string
    title: string
    slug: string
    short_description: string
    full_description: string
    tagline: string | null
    icon: string | null
    features: string[]
    sort_order: number
    is_active: boolean
    meta_title: string | null
    meta_description: string | null
}

const empty: Partial<Service> = { title: '', slug: '', short_description: '', full_description: '', tagline: '', icon: 'Globe', features: [], sort_order: 99, is_active: true, meta_title: '', meta_description: '' }
const inputCls = 'w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-all'

export default function ServicesAdminPage() {
    const supabase = createClient()
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<string | null>(null)
    const [form, setForm] = useState<Partial<Service>>(empty)
    const [featuresText, setFeaturesText] = useState('')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase.from('cms_services').select('*').order('sort_order', { ascending: true })
        setServices(data || [])
        setLoading(false)
    }, [supabase])

    useEffect(() => { load() }, [load])

    const startEdit = (s: Service) => {
        setEditing(s.id)
        setForm({ ...s })
        setFeaturesText((s.features || []).join('\n'))
        setError(''); setSaved(false)
    }
    const startNew = () => { setEditing('new'); setForm({ ...empty }); setFeaturesText(''); setError(''); setSaved(false) }
    const cancel = () => { setEditing(null); setForm(empty) }

    async function handleSave() {
        if (!form.title || !form.slug) { setError('Title and slug are required.'); return }
        setSaving(true); setError('')
        const features = featuresText.split('\n').map(l => l.trim()).filter(Boolean)
        const payload = { ...form, features, updated_at: new Date().toISOString() }
        const { id, ...fields } = payload
        let result
        if (editing !== 'new' && editing) {
            result = await supabase.from('cms_services').update(fields).eq('id', editing)
        } else {
            result = await supabase.from('cms_services').insert(fields)
        }
        setSaving(false)
        if (result.error) { setError(result.error.message); return }
        setSaved(true)
        await load()
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this service?')) return
        await supabase.from('cms_services').delete().eq('id', id)
        load()
    }

    async function toggleActive(id: string, current: boolean) {
        await supabase.from('cms_services').update({ is_active: !current }).eq('id', id)
        load()
    }

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" /></div>

    return (
        <div className="space-y-6 max-w-5xl text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Services</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage all services shown on the Services page and navigation.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={load} className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90"><Plus className="w-4 h-4" /> Add Service</button>
                </div>
            </div>

            <div className="space-y-2">
                {services.length === 0 && !editing && (
                    <div className="text-center py-16 bg-zinc-900/30 border border-white/[0.06] rounded-2xl">
                        <Layers className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500">No services yet.</p>
                    </div>
                )}
                {services.map((s, i) => (
                    <motion.div key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        className={`bg-zinc-900/50 border rounded-2xl p-5 flex items-center gap-4 transition-colors ${s.is_active ? 'border-white/[0.06] hover:border-white/10' : 'border-white/[0.03] opacity-50'}`}>
                        <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                            <span className="text-accent text-xs font-black">{i + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-white text-sm">{s.title}</span>
                                <code className="text-[10px] text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded">/{s.slug}</code>
                                {!s.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700">Hidden</span>}
                            </div>
                            <p className="text-zinc-500 text-xs mt-0.5 line-clamp-1">{s.short_description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Link href={`/services/${s.slug}`} target="_blank" className="p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06]"><ExternalLink className="w-4 h-4" /></Link>
                            <button onClick={() => toggleActive(s.id, s.is_active)} className={`text-xs px-2 py-1.5 rounded-lg border ${s.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>{s.is_active ? 'Live' : 'Hidden'}</button>
                            <button onClick={() => startEdit(s)} className="p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06]"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 bg-zinc-900 border border-white/[0.06]"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {editing && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-zinc-900/80 border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">{editing === 'new' ? '✦ New Service' : '✦ Edit Service'}</h2>
                            <button onClick={cancel} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-5">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Title *</label>
                                    <input value={form.title || ''} onChange={e => setForm(d => ({ ...d, title: e.target.value }))} placeholder="Revenue Website" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Slug *</label>
                                    <input value={form.slug || ''} onChange={e => setForm(d => ({ ...d, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} placeholder="revenue-website" className={inputCls} />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Tagline</label>
                                    <input value={form.tagline || ''} onChange={e => setForm(d => ({ ...d, tagline: e.target.value }))} placeholder="Where design meets ROI" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Icon (Lucide name)</label>
                                    <input value={form.icon || ''} onChange={e => setForm(d => ({ ...d, icon: e.target.value }))} placeholder="Globe" className={inputCls} />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Short Description (card/navigation)</label>
                                <textarea value={form.short_description || ''} onChange={e => setForm(d => ({ ...d, short_description: e.target.value }))} rows={2} className={inputCls + ' resize-none'} />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Full Description (service page)</label>
                                <textarea value={form.full_description || ''} onChange={e => setForm(d => ({ ...d, full_description: e.target.value }))} rows={4} className={inputCls + ' resize-none'} />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Features (one per line)</label>
                                <textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} placeholder={"Conversion-optimised UX\nPremium visual design\nSub-1s page speed"} rows={6} className={inputCls + ' resize-none font-mono text-xs'} />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Meta Title (SEO)</label>
                                    <input value={form.meta_title || ''} onChange={e => setForm(d => ({ ...d, meta_title: e.target.value }))} className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Sort Order</label>
                                    <input type="number" value={form.sort_order || 99} onChange={e => setForm(d => ({ ...d, sort_order: parseInt(e.target.value) || 99 }))} className={inputCls} />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Meta Description (SEO)</label>
                                <textarea value={form.meta_description || ''} onChange={e => setForm(d => ({ ...d, meta_description: e.target.value }))} rows={2} className={inputCls + ' resize-none'} />
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={() => setForm(d => ({ ...d, is_active: !d.is_active }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.is_active ? 'bg-accent' : 'bg-zinc-700'}`}>
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-6' : ''}`} />
                                </button>
                                <span className="text-sm text-zinc-400">{form.is_active ? 'Active — visible on site' : 'Hidden'}</span>
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                        <div className="flex gap-3 mt-6">
                            <button onClick={handleSave} disabled={saving || saved} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 disabled:opacity-60">
                                {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Service</>}
                            </button>
                            <button onClick={cancel} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm">Cancel</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
