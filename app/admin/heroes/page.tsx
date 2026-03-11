'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus, Save, Trash2, Edit3, Eye, EyeOff, Sparkles,
    Type, Link, BarChart3, CheckCircle2, X, RefreshCw
} from 'lucide-react'

interface HeroSection {
    id: string
    slug: string
    title: string
    highlight_text?: string
    subtitle?: string
    description?: string
    cta_primary_text?: string
    cta_primary_link?: string
    cta_secondary_text?: string
    cta_secondary_link?: string
    badge_text?: string
    is_active: boolean
    stats?: Array<{ value: string; label: string }>
    created_at?: string
    updated_at?: string
}

const EMPTY_HERO: Partial<HeroSection> = {
    slug: '',
    title: '',
    highlight_text: '',
    subtitle: '',
    description: '',
    badge_text: '',
    cta_primary_text: 'Start a Project',
    cta_primary_link: '/contact',
    cta_secondary_text: 'See Our Work',
    cta_secondary_link: '/case-studies',
    is_active: true,
    stats: [
        { value: '$2B+', label: 'Revenue Generated' },
        { value: '98%', label: 'Client Retention' },
        { value: '200+', label: 'Projects Shipped' },
    ],
}

const PAGE_LABELS: Record<string, string> = {
    homepage: 'Homepage',
    about: 'About Page',
    services: 'Services Page',
    contact: 'Contact Page',
    work: 'Work Page',
}

export default function HeroesAdminPage() {
    const supabase = createClient()
    const [heroes, setHeroes] = useState<HeroSection[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [editing, setEditing] = useState<string | null>(null) // id or 'new'
    const [formData, setFormData] = useState<Partial<HeroSection>>(EMPTY_HERO)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase
            .from('cms_heroes')
            .select('*')
            .order('created_at', { ascending: false })
        setHeroes(data || [])
        setLoading(false)
    }, [supabase])

    useEffect(() => { load() }, [load])

    const startEdit = (hero: HeroSection) => {
        setEditing(hero.id)
        setFormData({ ...hero })
        setError('')
        setSaved(false)
    }

    const startNew = () => {
        setEditing('new')
        setFormData({ ...EMPTY_HERO })
        setError('')
        setSaved(false)
    }

    const cancel = () => {
        setEditing(null)
        setFormData(EMPTY_HERO)
        setError('')
    }

    const handleSave = async () => {
        if (!formData.slug || !formData.title) {
            setError('Slug and Title are required.')
            return
        }
        setSaving(true)
        setError('')

        const payload = {
            slug: formData.slug?.toLowerCase().trim(),
            title: formData.title,
            highlight_text: formData.highlight_text || null,
            subtitle: formData.subtitle || null,
            description: formData.description || null,
            badge_text: formData.badge_text || null,
            cta_primary_text: formData.cta_primary_text || null,
            cta_primary_link: formData.cta_primary_link || null,
            cta_secondary_text: formData.cta_secondary_text || null,
            cta_secondary_link: formData.cta_secondary_link || null,
            is_active: formData.is_active ?? true,
            stats: formData.stats || [],
            updated_at: new Date().toISOString(),
        }

        let result
        if (editing !== 'new' && editing) {
            result = await supabase.from('cms_heroes').update(payload).eq('id', editing)
        } else {
            result = await supabase.from('cms_heroes').insert({ ...payload, created_at: new Date().toISOString() })
        }

        setSaving(false)
        if (result.error) {
            setError(result.error.message)
        } else {
            setSaved(true)
            await load()
            setTimeout(() => {
                setSaved(false)
                setEditing(null)
            }, 1500)
        }
    }

    const toggleActive = async (id: string, current: boolean) => {
        await supabase.from('cms_heroes').update({ is_active: !current }).eq('id', id)
        load()
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this hero section? This cannot be undone.')) return
        await supabase.from('cms_heroes').delete().eq('id', id)
        load()
    }

    const updateStat = (index: number, field: 'value' | 'label', value: string) => {
        const stats = [...(formData.stats || [])]
        stats[index] = { ...stats[index], [field]: value }
        setFormData(d => ({ ...d, stats }))
    }

    const addStat = () => {
        setFormData(d => ({ ...d, stats: [...(d.stats || []), { value: '', label: '' }] }))
    }

    const removeStat = (i: number) => {
        setFormData(d => ({ ...d, stats: (d.stats || []).filter((_, idx) => idx !== i) }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-5xl text-white">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Hero Sections</h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        Manage hero copy, CTAs, and stat counters for each page.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={load} className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={startNew}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        <Plus className="w-4 h-4" /> Add Hero
                    </button>
                </div>
            </div>

            {/* Hero List */}
            <div className="grid gap-3">
                {heroes.length === 0 && !editing ? (
                    <div className="text-center py-16 bg-zinc-900/30 border border-white/[0.06] rounded-2xl">
                        <Sparkles className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500">No hero sections yet. Add your first one.</p>
                    </div>
                ) : (
                    heroes.map((hero) => (
                        <motion.div
                            key={hero.id}
                            layout
                            className="bg-zinc-900/50 border border-white/[0.06] rounded-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-5">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xs font-bold bg-zinc-800 px-2.5 py-1 rounded-lg text-zinc-300 uppercase tracking-wider">
                                            /{hero.slug}
                                        </span>
                                        <span className="text-zinc-500 text-xs">
                                            {PAGE_LABELS[hero.slug] || hero.slug}
                                        </span>
                                        <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${hero.is_active
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                                            }`}>
                                            {hero.is_active ? 'Active' : 'Hidden'}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-semibold text-lg leading-tight">{hero.title}</h3>
                                    {hero.subtitle && (
                                        <p className="text-zinc-500 text-sm mt-1 line-clamp-1">{hero.subtitle}</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 ml-4 shrink-0">
                                    <button
                                        onClick={() => toggleActive(hero.id, hero.is_active)}
                                        className="p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06] transition-colors"
                                        title={hero.is_active ? 'Deactivate' : 'Activate'}
                                    >
                                        {hero.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => startEdit(hero)}
                                        className="p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06] transition-colors"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(hero.id)}
                                        className="p-2 rounded-lg text-zinc-500 hover:text-red-400 bg-zinc-900 border border-white/[0.06] transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Edit/New Panel */}
            <AnimatePresence>
                {editing && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-zinc-900/80 border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">
                                {editing === 'new' ? '✦ New Hero Section' : '✦ Edit Hero Section'}
                            </h2>
                            <button onClick={cancel} className="p-2 rounded-lg text-zinc-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Slug + Active */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <Field label="Page Slug *" icon={<Link className="w-4 h-4" />}>
                                    <input
                                        value={formData.slug || ''}
                                        onChange={e => setFormData(d => ({ ...d, slug: e.target.value }))}
                                        placeholder="homepage"
                                        className={inputCls}
                                    />
                                    <p className="text-xs text-zinc-600 mt-1">e.g., "homepage", "about", "services"</p>
                                </Field>
                                <Field label="Badge / Label Text" icon={<Sparkles className="w-4 h-4" />}>
                                    <input
                                        value={formData.badge_text || ''}
                                        onChange={e => setFormData(d => ({ ...d, badge_text: e.target.value }))}
                                        placeholder="World's #1 Revenue Agency"
                                        className={inputCls}
                                    />
                                </Field>
                            </div>

                            {/* Title + Highlight */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <Field label="Headline *" icon={<Type className="w-4 h-4" />}>
                                    <input
                                        value={formData.title || ''}
                                        onChange={e => setFormData(d => ({ ...d, title: e.target.value }))}
                                        placeholder="Your website should be earning."
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Highlight / Accent Text" icon={<Type className="w-4 h-4" />}>
                                    <input
                                        value={formData.highlight_text || ''}
                                        onChange={e => setFormData(d => ({ ...d, highlight_text: e.target.value }))}
                                        placeholder="Is it?"
                                        className={inputCls}
                                    />
                                    <p className="text-xs text-zinc-600 mt-1">This text appears in accent gold color</p>
                                </Field>
                            </div>

                            {/* Subtitle + Description */}
                            <Field label="Subtitle / Supporting Line" icon={<Type className="w-4 h-4" />}>
                                <input
                                    value={formData.subtitle || ''}
                                    onChange={e => setFormData(d => ({ ...d, subtitle: e.target.value }))}
                                    placeholder="Strategy, design, and engineering — unified."
                                    className={inputCls}
                                />
                            </Field>
                            <Field label="Description (longer copy below subtitle)">
                                <textarea
                                    value={formData.description || ''}
                                    onChange={e => setFormData(d => ({ ...d, description: e.target.value }))}
                                    placeholder="We engineer elite digital experiences..."
                                    rows={3}
                                    className={inputCls + ' resize-none'}
                                />
                            </Field>

                            {/* CTAs */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <Field label="Primary CTA Text" icon={<Link className="w-4 h-4" />}>
                                    <input
                                        value={formData.cta_primary_text || ''}
                                        onChange={e => setFormData(d => ({ ...d, cta_primary_text: e.target.value }))}
                                        placeholder="Start a Project"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Primary CTA URL" icon={<Link className="w-4 h-4" />}>
                                    <input
                                        value={formData.cta_primary_link || ''}
                                        onChange={e => setFormData(d => ({ ...d, cta_primary_link: e.target.value }))}
                                        placeholder="/contact"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Secondary CTA Text" icon={<Link className="w-4 h-4" />}>
                                    <input
                                        value={formData.cta_secondary_text || ''}
                                        onChange={e => setFormData(d => ({ ...d, cta_secondary_text: e.target.value }))}
                                        placeholder="View Our Work"
                                        className={inputCls}
                                    />
                                </Field>
                                <Field label="Secondary CTA URL" icon={<Link className="w-4 h-4" />}>
                                    <input
                                        value={formData.cta_secondary_link || ''}
                                        onChange={e => setFormData(d => ({ ...d, cta_secondary_link: e.target.value }))}
                                        placeholder="/case-studies"
                                        className={inputCls}
                                    />
                                </Field>
                            </div>

                            {/* Stats */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <Field label="Hero Stats" icon={<BarChart3 className="w-4 h-4" />}>
                                        <span />
                                    </Field>
                                    <button
                                        onClick={addStat}
                                        className="text-xs text-accent hover:text-accent/80 font-semibold flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" /> Add Stat
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(formData.stats || []).map((stat, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input
                                                value={stat.value}
                                                onChange={e => updateStat(i, 'value', e.target.value)}
                                                placeholder="$2B+"
                                                className={inputCls + ' w-28'}
                                            />
                                            <input
                                                value={stat.label}
                                                onChange={e => updateStat(i, 'label', e.target.value)}
                                                placeholder="Revenue Generated"
                                                className={inputCls + ' flex-1'}
                                            />
                                            <button onClick={() => removeStat(i)} className="p-2 text-zinc-600 hover:text-red-400 transition-colors">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Active Toggle */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setFormData(d => ({ ...d, is_active: !d.is_active }))}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${formData.is_active ? 'bg-accent' : 'bg-zinc-700'}`}
                                >
                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${formData.is_active ? 'translate-x-6' : ''}`} />
                                </button>
                                <span className="text-sm text-zinc-300">
                                    {formData.is_active ? 'Active — visible on frontend' : 'Hidden — not shown on frontend'}
                                </span>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    onClick={handleSave}
                                    disabled={saving || saved}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 transition-all disabled:opacity-60"
                                >
                                    {saved ? (
                                        <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                                    ) : saving ? (
                                        <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</>
                                    ) : (
                                        <><Save className="w-4 h-4" /> Save Hero Section</>
                                    )}
                                </button>
                                <button onClick={cancel} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm font-medium transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// Field helper component
function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
    return (
        <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                {icon}
                {label}
            </label>
            {children}
        </div>
    )
}

const inputCls = 'w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 focus:bg-zinc-900 transition-all'
