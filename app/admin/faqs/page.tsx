'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Save, Trash2, Edit3, X, RefreshCw, CheckCircle2, HelpCircle } from 'lucide-react'

interface FAQ {
    id: string
    question: string
    answer: string
    category: string
    sort_order: number
    is_active: boolean
}

const CATEGORIES = ['general', 'pricing', 'technical', 'support']
const empty: Partial<FAQ> = { question: '', answer: '', category: 'general', sort_order: 99, is_active: true }
const inputCls = 'w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-all'

const CAT_COLORS: Record<string, string> = {
    general: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    pricing: 'bg-accent/10 text-accent border-accent/20',
    technical: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    support: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

export default function FAQsPage() {
    const supabase = createClient()
    const [items, setItems] = useState<FAQ[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<string | null>(null)
    const [form, setForm] = useState<Partial<FAQ>>(empty)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')
    const [catFilter, setCatFilter] = useState('all')

    const load = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase.from('cms_faqs').select('*').order('sort_order', { ascending: true })
        setItems(data || [])
        setLoading(false)
    }, [supabase])

    useEffect(() => { load() }, [load])

    const visible = catFilter === 'all' ? items : items.filter(i => i.category === catFilter)

    const startEdit = (f: FAQ) => { setEditing(f.id); setForm({ ...f }); setError(''); setSaved(false) }
    const startNew = () => { setEditing('new'); setForm({ ...empty }); setError(''); setSaved(false) }
    const cancel = () => { setEditing(null); setForm(empty) }

    async function handleSave() {
        if (!form.question || !form.answer) { setError('Question and answer are required.'); return }
        setSaving(true); setError('')
        const { id, ...fields } = form
        let result
        if (editing !== 'new' && editing) {
            result = await supabase.from('cms_faqs').update(fields).eq('id', editing)
        } else {
            result = await supabase.from('cms_faqs').insert(fields)
        }
        setSaving(false)
        if (result.error) { setError(result.error.message); return }
        setSaved(true)
        await load()
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this FAQ?')) return
        await supabase.from('cms_faqs').delete().eq('id', id)
        load()
    }

    async function toggleActive(id: string, current: boolean) {
        await supabase.from('cms_faqs').update({ is_active: !current }).eq('id', id)
        load()
    }

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" /></div>

    return (
        <div className="space-y-6 max-w-4xl text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">FAQs</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage frequently asked questions shown across the site.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={load} className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90"><Plus className="w-4 h-4" /> Add FAQ</button>
                </div>
            </div>

            <div className="flex gap-2 flex-wrap">
                {['all', ...CATEGORIES].map(c => (
                    <button key={c} onClick={() => setCatFilter(c)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all border ${catFilter === c ? 'bg-accent/20 text-accent border-accent/30' : 'text-zinc-400 border-white/[0.06] hover:border-white/20 bg-zinc-900/50'}`}>
                        {c}
                    </button>
                ))}
            </div>

            <div className="space-y-2">
                {visible.length === 0 && !editing && (
                    <div className="text-center py-16 bg-zinc-900/30 border border-white/[0.06] rounded-2xl">
                        <HelpCircle className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500">No FAQs yet. Add your first one.</p>
                    </div>
                )}
                {visible.map((faq, i) => (
                    <motion.div key={faq.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        className={`bg-zinc-900/50 border rounded-2xl p-5 transition-colors ${faq.is_active ? 'border-white/[0.06] hover:border-white/10' : 'border-white/[0.03] opacity-50'}`}>
                        <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${CAT_COLORS[faq.category] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>{faq.category}</span>
                                    {!faq.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700">Hidden</span>}
                                </div>
                                <p className="font-semibold text-white text-sm">{faq.question}</p>
                                <p className="text-zinc-500 text-xs mt-1 line-clamp-2">{faq.answer}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button onClick={() => toggleActive(faq.id, faq.is_active)} className={`text-xs px-2 py-1 rounded-lg border transition-colors ${faq.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                                    {faq.is_active ? 'Live' : 'Hidden'}
                                </button>
                                <button onClick={() => startEdit(faq)} className="p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06]"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(faq.id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 bg-zinc-900 border border-white/[0.06]"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {editing && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-zinc-900/80 border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">{editing === 'new' ? '✦ New FAQ' : '✦ Edit FAQ'}</h2>
                            <button onClick={cancel} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Question *</label>
                                <input value={form.question || ''} onChange={e => setForm(d => ({ ...d, question: e.target.value }))} placeholder="How long does a project take?" className={inputCls} />
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Answer *</label>
                                <textarea value={form.answer || ''} onChange={e => setForm(d => ({ ...d, answer: e.target.value }))} placeholder="Clear, helpful answer..." rows={4} className={inputCls + ' resize-none'} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Category</label>
                                    <select value={form.category || 'general'} onChange={e => setForm(d => ({ ...d, category: e.target.value }))} className={inputCls}>
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Sort Order</label>
                                    <input type="number" value={form.sort_order || 99} onChange={e => setForm(d => ({ ...d, sort_order: parseInt(e.target.value) || 99 }))} className={inputCls} />
                                </div>
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
                                {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save FAQ</>}
                            </button>
                            <button onClick={cancel} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm">Cancel</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
