'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Save, X, GripVertical } from 'lucide-react'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Hero {
    id: string
    slug: string
    title: string
    subtitle: string | null
    description: string | null
    highlight_text: string | null
    cta_primary_text: string | null
    cta_primary_link: string | null
    media_url: string | null
}

export default function HeroesPage() {
    const [heroes, setHeroes] = useState<Hero[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<Hero>>({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchHeroes()
    }, [])

    async function fetchHeroes() {
        const { data, error } = await supabase
            .from('cms_heroes')
            .select('*')
            .order('slug')

        if (data) setHeroes(data)
        setLoading(false)
    }

    async function handleSave() {
        if (!formData.slug || !formData.title) return

        setSaving(true)
        try {
            if (editingId) {
                // Update
                await supabase
                    .from('cms_heroes')
                    .update({
                        slug: formData.slug,
                        title: formData.title,
                        subtitle: formData.subtitle,
                        description: formData.description,
                        highlight_text: formData.highlight_text,
                        cta_primary_text: formData.cta_primary_text,
                        cta_primary_link: formData.cta_primary_link,
                        media_url: formData.media_url
                    })
                    .eq('id', editingId)
            } else {
                // Create
                await supabase.from('cms_heroes').insert([{
                    slug: formData.slug,
                    title: formData.title,
                    subtitle: formData.subtitle,
                    description: formData.description,
                    highlight_text: formData.highlight_text,
                    cta_primary_text: formData.cta_primary_text,
                    cta_primary_link: formData.cta_primary_link,
                    media_url: formData.media_url
                }])
            }

            await fetchHeroes()
            setEditingId(null)
            setFormData({})
        } catch (error) {
            console.error('Error saving hero:', error)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this hero?')) return

        await supabase.from('cms_heroes').delete().eq('id', id)
        await fetchHeroes()
    }

    function startEdit(hero: Hero) {
        setEditingId(hero.id)
        setFormData({ ...hero })
    }

    function startCreate() {
        setEditingId('new')
        setFormData({ slug: '', title: '' })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Heroes</h1>
                    <p className="text-zinc-400 mt-1">Manage hero sections across your pages</p>
                </div>
                <Button
                    onClick={startCreate}
                    className="bg-emerald-600 hover:bg-emerald-500"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Hero
                </Button>
            </div>

            {/* Edit/Create Form */}
            {editingId && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
                >
                    <h2 className="text-lg font-semibold text-white mb-4">
                        {editingId === 'new' ? 'Create Hero' : 'Edit Hero'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Slug (Page Path)</label>
                            <Input
                                value={formData.slug || ''}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="e.g., home, services/seo"
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Title</label>
                            <Input
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Hero Title"
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Subtitle</label>
                            <Input
                                value={formData.subtitle || ''}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                placeholder="Subtitle text"
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Highlight Text</label>
                            <Input
                                value={formData.highlight_text || ''}
                                onChange={(e) => setFormData({ ...formData, highlight_text: e.target.value })}
                                placeholder="Text to animate"
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-1">Description</label>
                            <Textarea
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Hero description..."
                                className="bg-zinc-800 border-white/10"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">CTA Text</label>
                            <Input
                                value={formData.cta_primary_text || ''}
                                onChange={(e) => setFormData({ ...formData, cta_primary_text: e.target.value })}
                                placeholder="Get Started"
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">CTA Link</label>
                            <Input
                                value={formData.cta_primary_link || ''}
                                onChange={(e) => setFormData({ ...formData, cta_primary_link: e.target.value })}
                                placeholder="/contact"
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-1">Media URL</label>
                            <Input
                                value={formData.media_url || ''}
                                onChange={(e) => setFormData({ ...formData, media_url: e.target.value })}
                                placeholder="https://..."
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-emerald-600 hover:bg-emerald-500"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? 'Saving...' : 'Save Hero'}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => { setEditingId(null); setFormData({}) }}
                            className="border-white/10"
                        >
                            <X className="w-4 h-4 mr-2" /> Cancel
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Heroes List */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left p-4 text-zinc-400 font-medium">Slug</th>
                            <th className="text-left p-4 text-zinc-400 font-medium">Title</th>
                            <th className="text-left p-4 text-zinc-400 font-medium">Subtitle</th>
                            <th className="text-right p-4 text-zinc-400 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {heroes.map((hero) => (
                            <tr key={hero.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="p-4">
                                    <code className="px-2 py-1 rounded bg-zinc-800 text-emerald-400 text-sm">
                                        {hero.slug}
                                    </code>
                                </td>
                                <td className="p-4 text-white">{hero.title}</td>
                                <td className="p-4 text-zinc-400">{hero.subtitle || '—'}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => startEdit(hero)}
                                            className="text-zinc-400 hover:text-white"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleDelete(hero.id)}
                                            className="text-zinc-400 hover:text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {heroes.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-zinc-500">No heroes yet. Create your first hero section.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
