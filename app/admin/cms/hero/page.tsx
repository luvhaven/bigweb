'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAllHeroSections, saveHero, deleteHero } from '@/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Plus, Save, Trash2, Edit } from 'lucide-react'

interface HeroSection {
    id: string
    page_slug: string
    title: string
    subtitle?: string
    description?: string
    cta_primary_text?: string
    cta_primary_url?: string
    cta_secondary_text?: string
    cta_secondary_url?: string
    stats?: any[]
    is_active: boolean
}

export default function HeroManagementPage() {
    const router = useRouter()
    const [heroes, setHeroes] = useState<HeroSection[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<HeroSection>>({})

    useEffect(() => {
        loadHeroes()
    }, [])

    async function loadHeroes() {
        setLoading(true)
        const data = await getAllHeroSections()
        setHeroes(data)
        setLoading(false)
    }

    function startEdit(hero: HeroSection) {
        setEditing(hero.id)
        setFormData(hero)
    }

    function startNew() {
        setEditing('new')
        setFormData({
            page_slug: '',
            title: '',
            subtitle: '',
            description: '',
            cta_primary_text: 'Get Started',
            cta_primary_url: '/contact',
            stats: [],
            is_active: true
        })
    }

    async function handleSave() {
        const result = await saveHero(formData)
        if (result.success) {
            setEditing(null)
            setFormData({})
            loadHeroes()
            router.refresh()
        } else {
            alert(`Error: ${result.error}`)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this hero section?')) return
        const result = await deleteHero(id)
        if (result.success) {
            loadHeroes()
            router.refresh()
        }
    }

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Hero Sections</h1>
                <Button onClick={startNew}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Hero
                </Button>
            </div>

            {editing && (
                <Card className="p-6 mb-8 bg-slate-900 border-slate-800">
                    <h2 className="text-xl font-bold mb-4">
                        {editing === 'new' ? 'New Hero Section' : 'Edit Hero Section'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Page Slug</label>
                            <Input
                                value={formData.page_slug || ''}
                                onChange={(e) => setFormData({ ...formData, page_slug: e.target.value })}
                                placeholder="/ or /about"
                                className="bg-slate-800 border-slate-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Title</label>
                            <Input
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Elite Digital Experiences"
                                className="bg-slate-800 border-slate-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Subtitle</label>
                            <Input
                                value={formData.subtitle || ''}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                placeholder="We Build Revenue Engines, Not Websites"
                                className="bg-slate-800 border-slate-700"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Textarea
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Award-winning web development..."
                                className="bg-slate-800 border-slate-700"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Primary CTA Text</label>
                                <Input
                                    value={formData.cta_primary_text || ''}
                                    onChange={(e) => setFormData({ ...formData, cta_primary_text: e.target.value })}
                                    placeholder="Get Started"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Primary CTA URL</label>
                                <Input
                                    value={formData.cta_primary_url || ''}
                                    onChange={(e) => setFormData({ ...formData, cta_primary_url: e.target.value })}
                                    placeholder="/contact"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Secondary CTA Text</label>
                                <Input
                                    value={formData.cta_secondary_text || ''}
                                    onChange={(e) => setFormData({ ...formData, cta_secondary_text: e.target.value })}
                                    placeholder="View Work"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Secondary CTA URL</label>
                                <Input
                                    value={formData.cta_secondary_url || ''}
                                    onChange={(e) => setFormData({ ...formData, cta_secondary_url: e.target.value })}
                                    placeholder="/portfolio"
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                                <Save className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                            <Button onClick={() => setEditing(null)} variant="outline">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            <div className="grid gap-4">
                {heroes.map((hero) => (
                    <Card key={hero.id} className="p-6 bg-slate-900 border-slate-800">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-mono bg-slate-800 px-2 py-1 rounded">
                                        {hero.page_slug}
                                    </span>
                                    {!hero.is_active && (
                                        <span className="text-xs bg-red-900 text-red-200 px-2 py-1 rounded">
                                            Inactive
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{hero.title}</h3>
                                {hero.subtitle && (
                                    <p className="text-slate-400 mb-2">{hero.subtitle}</p>
                                )}
                                {hero.description && (
                                    <p className="text-sm text-slate-500">{hero.description}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => startEdit(hero)}
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(hero.id)}
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
