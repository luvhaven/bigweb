'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus, Save, Trash2, Edit3, X, RefreshCw, CheckCircle2,
    Video, Film, Star, StarOff
} from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface VideoItem {
    id: string
    title: string
    description: string | null
    video_url: string | null
    thumbnail_url: string | null
    category: string | null
    duration: string | null
    featured: boolean
    sort_order: number
    is_active: boolean
}

const empty: Partial<VideoItem> = {
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: '',
    category: 'showcase',
    duration: '',
    featured: false,
    sort_order: 0,
    is_active: true,
}

const inputCls = 'w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-all'

export default function AdminMediaPage() {
    const supabase = createClient()
    const [items, setItems] = useState<VideoItem[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<string | null>(null)
    const [form, setForm] = useState<Partial<VideoItem>>(empty)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase
            .from('cms_video_showroom')
            .select('*')
            .order('sort_order', { ascending: true })
        setItems(data || [])
        setLoading(false)
    }, [supabase])

    useEffect(() => { load() }, [load])

    const startEdit = (v: VideoItem) => { setEditing(v.id); setForm({ ...v }); setError(''); setSaved(false) }
    const startNew = () => { setEditing('new'); setForm({ ...empty }); setError(''); setSaved(false) }
    const cancel = () => { setEditing(null); setForm(empty) }

    async function handleSave() {
        if (!form.title) { setError('Title is required.'); return }
        setSaving(true); setError('')
        const { id, ...fields } = form
        let result
        if (editing !== 'new' && editing) {
            result = await supabase.from('cms_video_showroom').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', editing)
        } else {
            result = await supabase.from('cms_video_showroom').insert(fields)
        }
        setSaving(false)
        if (result.error) { setError(result.error.message); return }
        setSaved(true)
        await load()
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this video?')) return
        await supabase.from('cms_video_showroom').delete().eq('id', id)
        load()
    }

    async function toggleFeatured(id: string, current: boolean) {
        await supabase.from('cms_video_showroom').update({ featured: !current }).eq('id', id)
        load()
    }

    async function toggleActive(id: string, current: boolean) {
        await supabase.from('cms_video_showroom').update({ is_active: !current }).eq('id', id)
        load()
    }

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" /></div>

    return (
        <div className="space-y-6 max-w-5xl text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Video Showroom</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage videos shown in the Video Showroom section on the homepage.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={load} className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90">
                        <Plus className="w-4 h-4" /> Add Video
                    </button>
                </div>
            </div>

            {/* Video grid */}
            <div className="grid gap-4">
                {items.length === 0 && !editing ? (
                    <div className="text-center py-16 bg-zinc-900/30 border border-white/[0.06] rounded-2xl">
                        <Film className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500">No videos yet. Add your first one.</p>
                    </div>
                ) : (
                    items.map((v) => (
                        <motion.div key={v.id} layout className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                            <div className="flex items-start gap-4 p-5">
                                {/* Thumbnail */}
                                <div className="w-24 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0 relative">
                                    {v.thumbnail_url ? (
                                        <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Video className="w-6 h-6 text-zinc-600" />
                                        </div>
                                    )}
                                    {v.featured && (
                                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                                            <Star className="w-2.5 h-2.5 text-black fill-black" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="font-semibold text-white text-sm">{v.title}</span>
                                        {v.category && <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono uppercase tracking-wider">{v.category}</span>}
                                        {v.featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-bold">Featured</span>}
                                        {!v.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700 font-bold">Hidden</span>}
                                        {v.duration && <span className="text-[10px] font-mono text-zinc-500">{v.duration}</span>}
                                    </div>
                                    {v.description && <p className="text-zinc-500 text-xs line-clamp-2">{v.description}</p>}
                                    {v.video_url ? (
                                        <p className="text-xs text-emerald-400/70 mt-1 font-mono truncate max-w-xs">✓ Video URL set</p>
                                    ) : (
                                        <p className="text-xs text-zinc-600 mt-1">No video URL – thumbnail only</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => toggleFeatured(v.id, v.featured)} title={v.featured ? 'Unfeature' : 'Set as Featured'} className="p-2 rounded-lg text-zinc-500 hover:text-accent bg-zinc-900 border border-white/[0.06] transition-colors">
                                        {v.featured ? <Star className="w-4 h-4 fill-accent text-accent" /> : <StarOff className="w-4 h-4" />}
                                    </button>
                                    <button onClick={() => toggleActive(v.id, v.is_active)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${v.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                                        {v.is_active ? 'Live' : 'Hidden'}
                                    </button>
                                    <button onClick={() => startEdit(v)} className="p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06]"><Edit3 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(v.id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 bg-zinc-900 border border-white/[0.06]"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
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
                            <h2 className="text-xl font-bold">{editing === 'new' ? '✦ Add Video' : '✦ Edit Video'}</h2>
                            <button onClick={cancel} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-6">
                            {/* Basic fields */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Title *</label>
                                    <input value={form.title || ''} onChange={e => setForm(d => ({ ...d, title: e.target.value }))} placeholder="BIGWEB in Action" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Category</label>
                                    <input value={form.category || ''} onChange={e => setForm(d => ({ ...d, category: e.target.value }))} placeholder="showcase, case-study, tutorial" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Video URL</label>
                                    <input value={form.video_url || ''} onChange={e => setForm(d => ({ ...d, video_url: e.target.value }))} placeholder="https://... (.mp4 or YouTube embed)" className={inputCls} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Duration</label>
                                    <input value={form.duration || ''} onChange={e => setForm(d => ({ ...d, duration: e.target.value }))} placeholder="2:30" className={inputCls} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Description</label>
                                    <textarea value={form.description || ''} onChange={e => setForm(d => ({ ...d, description: e.target.value }))} placeholder="Brief description of the video..." rows={2} className={inputCls + ' resize-none'} />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Sort Order</label>
                                    <input type="number" value={form.sort_order ?? 0} onChange={e => setForm(d => ({ ...d, sort_order: parseInt(e.target.value) || 0 }))} className={inputCls} />
                                </div>
                            </div>

                            {/* Thumbnail upload */}
                            <ImageUpload
                                label="Thumbnail / Poster Image"
                                value={form.thumbnail_url || ''}
                                onChange={(url) => setForm(d => ({ ...d, thumbnail_url: url }))}
                                folder="videos"
                                hint="This image is shown before the video plays. Recommended: 16:9 aspect ratio."
                            />

                            {/* Toggles */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setForm(d => ({ ...d, featured: !d.featured }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-accent' : 'bg-zinc-700'}`}>
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-6' : ''}`} />
                                    </button>
                                    <span className="text-sm text-zinc-400">Featured (shown large)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setForm(d => ({ ...d, is_active: !d.is_active }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.is_active ? 'bg-accent' : 'bg-zinc-700'}`}>
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-6' : ''}`} />
                                    </button>
                                    <span className="text-sm text-zinc-400">Live on site</span>
                                </div>
                            </div>

                            {error && <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}

                            <div className="flex gap-3 pt-2">
                                <button onClick={handleSave} disabled={saving || saved} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 disabled:opacity-60">
                                    {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Video</>}
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
