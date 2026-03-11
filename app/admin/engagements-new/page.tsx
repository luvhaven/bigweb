'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Save, Trash2, Edit3, X, RefreshCw, CheckCircle2, Star } from 'lucide-react'

interface Engagement {
    id: string
    name: string
    slug: string
    tagline: string | null
    description: string
    price: string
    price_subtext: string | null
    features: string[]
    highlighted: boolean
    badge_text: string | null
    order_index: number
    status: string
}

const empty: Partial<Engagement> = { name: '', slug: '', tagline: '', description: '', price: '', price_subtext: '', features: [], highlighted: false, badge_text: '', order_index: 99, status: 'published' }
const inputCls = 'w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-all'

export default function PricingAdminPage() {
    const supabase = createClient()
    const [items, setItems] = useState<Engagement[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<string | null>(null)
    const [form, setForm] = useState<Partial<Engagement>>(empty)
    const [featuresText, setFeaturesText] = useState('')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase.from('engagements').select('*').order('order_index', { ascending: true })
        setItems(data || [])
        setLoading(false)
    }, [supabase])

    useEffect(() => { load() }, [load])

    const startEdit = (e: Engagement) => {
        setEditing(e.id); setForm({ ...e })
        setFeaturesText((e.features || []).join('\n'))
        setError(''); setSaved(false)
    }
    const startNew = () => { setEditing('new'); setForm({ ...empty }); setFeaturesText(''); setError(''); setSaved(false) }
    const cancel = () => { setEditing(null); setForm(empty) }

    async function handleSave() {
        if (!form.name || !form.price) { setError('Name and price are required.'); return }
        setSaving(true); setError('')
        const features = featuresText.split('\n').map(l => l.trim()).filter(Boolean)
        const payload = { ...form, features, updated_at: new Date().toISOString() }
        const { id, ...fields } = payload
        let result
        if (editing !== 'new' && editing) {
            result = await supabase.from('engagements').update(fields).eq('id', editing)
        } else {
            result = await supabase.from('engagements').insert(fields)
        }
        setSaving(false)
        if (result.error) { setError(result.error.message); return }
        setSaved(true)
        await load()
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this engagement?')) return
        await supabase.from('engagements').delete().eq('id', id)
        load()
    }

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" /></div>

    return (
        <div className="space-y-6 max-w-4xl text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Pricing / Engagements</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage pricing packages shown on the Pricing page.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={load} className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90"><Plus className="w-4 h-4" /> Add Package</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {items.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className={`bg-zinc-900/50 border rounded-2xl p-6 ${item.highlighted ? 'border-accent/30' : 'border-white/[0.06]'}`}>
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-white">{item.name}</span>
                                    {item.highlighted && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/20 font-black">{item.badge_text || 'Featured'}</span>}
                                </div>
                                <p className="text-zinc-500 text-xs">{item.tagline}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-black text-white">{item.price}</span>
                                <span className="text-zinc-500 text-xs ml-1">{item.price_subtext}</span>
                            </div>
                        </div>
                        <p className="text-zinc-500 text-xs line-clamp-2 mb-4">{item.description}</p>
                        <div className="flex gap-2">
                            <button onClick={() => startEdit(item)} className="flex-1 py-2 rounded-xl bg-zinc-800 border border-white/[0.06] text-zinc-300 text-xs font-medium flex items-center justify-center gap-2 hover:text-white"><Edit3 className="w-3.5 h-3.5" /> Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 rounded-xl bg-zinc-800 border border-white/[0.06] text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {editing && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-zinc-900/80 border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">{editing === 'new' ? '✦ New Package' : '✦ Edit Package'}</h2>
                            <button onClick={cancel} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Package Name *</label>
                                    <input value={form.name || ''} onChange={e => setForm(d => ({ ...d, name: e.target.value }))} placeholder="Revenue System" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Slug</label>
                                    <input value={form.slug || ''} onChange={e => setForm(d => ({ ...d, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} placeholder="revenue-system" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Price *</label>
                                    <input value={form.price || ''} onChange={e => setForm(d => ({ ...d, price: e.target.value }))} placeholder="£15,000" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Price Subtext</label>
                                    <input value={form.price_subtext || ''} onChange={e => setForm(d => ({ ...d, price_subtext: e.target.value }))} placeholder="project / /month / one-time" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Tagline</label>
                                    <input value={form.tagline || ''} onChange={e => setForm(d => ({ ...d, tagline: e.target.value }))} placeholder="The complete rebuild" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Badge Text (if highlighted)</label>
                                    <input value={form.badge_text || ''} onChange={e => setForm(d => ({ ...d, badge_text: e.target.value }))} placeholder="Most Popular" className={inputCls} />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Description</label>
                                <textarea value={form.description || ''} onChange={e => setForm(d => ({ ...d, description: e.target.value }))} rows={3} className={inputCls + ' resize-none'} />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Features (one per line)</label>
                                <textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} placeholder={"Full site redesign\nConversion architecture\nElite engineering"} rows={6} className={inputCls + ' resize-none font-mono text-xs'} />
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setForm(d => ({ ...d, highlighted: !d.highlighted }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.highlighted ? 'bg-accent' : 'bg-zinc-700'}`}>
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.highlighted ? 'translate-x-6' : ''}`} />
                                    </button>
                                    <span className="text-sm text-zinc-400">Highlighted / Featured</span>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1 block">Sort Order</label>
                                    <input type="number" value={form.order_index || 99} onChange={e => setForm(d => ({ ...d, order_index: parseInt(e.target.value) || 99 }))} className={inputCls + ' w-24'} />
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                        <div className="flex gap-3 mt-6">
                            <button onClick={handleSave} disabled={saving || saved} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 disabled:opacity-60">
                                {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Package</>}
                            </button>
                            <button onClick={cancel} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm">Cancel</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
