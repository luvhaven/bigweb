'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus, Save, Trash2, Edit3, Eye, EyeOff, X, RefreshCw,
    ChevronDown, ChevronUp, Type, Link2, CheckCircle2, Star
} from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Testimonial {
    id: string
    client_name: string
    client_role: string
    client_company: string
    quote: string
    avatar_url: string | null
    rating: number
    is_featured: boolean
}

const empty: Partial<Testimonial> = { client_name: '', client_role: '', client_company: '', quote: '', avatar_url: '', rating: 5, is_featured: false }
const inputCls = 'w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-all'

export default function TestimonialsPage() {
    const supabase = createClient()
    const [items, setItems] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<string | null>(null)
    const [form, setForm] = useState<Partial<Testimonial>>(empty)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase.from('cms_testimonials').select('*').order('created_at', { ascending: false })
        setItems(data || [])
        setLoading(false)
    }, [supabase])

    useEffect(() => { load() }, [load])

    const startEdit = (t: Testimonial) => { setEditing(t.id); setForm({ ...t }); setError(''); setSaved(false) }
    const startNew = () => { setEditing('new'); setForm({ ...empty }); setError(''); setSaved(false) }
    const cancel = () => { setEditing(null); setForm(empty) }

    async function handleSave() {
        if (!form.client_name || !form.quote) { setError('Name and quote are required.'); return }
        setSaving(true); setError('')
        const { id, ...fields } = form
        let result
        if (editing !== 'new' && editing) {
            result = await supabase.from('cms_testimonials').update(fields).eq('id', editing)
        } else {
            result = await supabase.from('cms_testimonials').insert(fields)
        }
        setSaving(false)
        if (result.error) { setError(result.error.message); return }
        setSaved(true)
        await load()
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this testimonial?')) return
        await supabase.from('cms_testimonials').delete().eq('id', id)
        load()
    }

    async function toggleFeatured(id: string, current: boolean) {
        await supabase.from('cms_testimonials').update({ is_featured: !current }).eq('id', id)
        load()
    }

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" /></div>

    return (
        <div className="space-y-6 max-w-4xl text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Testimonials</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage client testimonials shown across the site.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={load} className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90"><Plus className="w-4 h-4" /> Add Testimonial</button>
                </div>
            </div>

            <div className="space-y-3">
                {items.length === 0 && !editing && (
                    <div className="text-center py-16 bg-zinc-900/30 border border-white/[0.06] rounded-2xl">
                        <Star className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500">No testimonials yet. Add your first one.</p>
                    </div>
                )}
                {items.map((t) => (
                    <motion.div key={t.id} layout className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl p-5 flex items-start gap-4 hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent font-bold">
                            {t.client_name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-white text-sm">{t.client_name}</span>
                                <span className="text-zinc-500 text-xs">{t.client_role} @ {t.client_company}</span>
                                {t.is_featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-bold">Featured</span>}
                            </div>
                            <p className="text-zinc-400 text-sm mt-1 line-clamp-2">"{t.quote}"</p>
                            <div className="flex items-center gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'text-accent fill-accent' : 'text-zinc-700'}`} />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => toggleFeatured(t.id, t.is_featured)} className="p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06]" title={t.is_featured ? 'Unfeature' : 'Feature'}>
                                {t.is_featured ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button onClick={() => startEdit(t)} className="p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06]"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 bg-zinc-900 border border-white/[0.06]"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {editing && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        className="bg-zinc-900/80 border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">{editing === 'new' ? '✦ New Testimonial' : '✦ Edit Testimonial'}</h2>
                            <button onClick={cancel} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { key: 'client_name', label: 'Client Name *', placeholder: 'James Patterson' },
                                { key: 'client_role', label: 'Role / Title', placeholder: 'CEO' },
                                { key: 'client_company', label: 'Company', placeholder: 'NexaTech Solutions' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">{f.label}</label>
                                    <input value={(form as any)[f.key] || ''} onChange={e => setForm(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} className={inputCls} />
                                </div>
                            ))}
                        </div>
                        <ImageUpload
                            label="Client Avatar"
                            value={form.avatar_url || ''}
                            onChange={(url) => setForm(d => ({ ...d, avatar_url: url }))}
                            folder="testimonials"
                            hint="Upload a headshot or paste a URL."
                        />
                        <div className="mt-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Quote *</label>
                            <textarea value={form.quote || ''} onChange={e => setForm(d => ({ ...d, quote: e.target.value }))} placeholder="Client testimonial quote..." rows={4} className={inputCls + ' resize-none'} />
                        </div>
                        <div className="flex items-center gap-6 mt-4">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <button key={n} onClick={() => setForm(d => ({ ...d, rating: n }))} className={`w-8 h-8 rounded-lg transition-colors ${(form.rating || 5) >= n ? 'bg-accent/20 text-accent' : 'bg-zinc-800 text-zinc-600'}`}>
                                            <Star className="w-4 h-4 mx-auto" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-4">
                                <button onClick={() => setForm(d => ({ ...d, is_featured: !d.is_featured }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.is_featured ? 'bg-accent' : 'bg-zinc-700'}`}>
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.is_featured ? 'translate-x-6' : ''}`} />
                                </button>
                                <span className="text-sm text-zinc-400">Featured</span>
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                        <div className="flex gap-3 mt-6">
                            <button onClick={handleSave} disabled={saving || saved} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 disabled:opacity-60">
                                {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Testimonial</>}
                            </button>
                            <button onClick={cancel} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm">Cancel</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
