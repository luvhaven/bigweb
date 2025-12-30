"use client"

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Loader2, AlertCircle, CheckCircle, Edit, Trash2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import HeroSlidesManager from '@/components/admin/HeroSlidesManager'
import { Toaster } from 'sonner'

interface HeroSection {
    id: string
    page_slug: string
    title: string
    highlight: string | null
    description: string | null
    cta_primary_text: string | null
    cta_primary_url: string | null
    cta_secondary_text: string | null
    cta_secondary_url: string | null
    theme_color: string
    pattern: string
    badge_text: string | null
}

export default function HeroSectionsPage() {
    const { profile } = useAuth()
    const [heroes, setHeroes] = useState<HeroSection[]>([])
    const [editingId, setEditingId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    useEffect(() => {
        loadHeroes()
    }, [])

    const loadHeroes = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('hero_sections')
                .select('*')
                .order('page_slug', { ascending: true })

            if (error) throw error
            setHeroes(data || [])
        } catch (error) {
            console.error('Error loading heroes:', error)
            setMessage({ type: 'error', text: 'Failed to load hero sections' })
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async (hero: HeroSection) => {
        try {
            setSaving(true)
            setMessage(null)

            const { error } = await supabase
                .from('hero_sections')
                .update({
                    title: hero.title,
                    highlight: hero.highlight,
                    description: hero.description,
                    cta_primary_text: hero.cta_primary_text,
                    cta_primary_url: hero.cta_primary_url,
                    cta_secondary_text: hero.cta_secondary_text,
                    cta_secondary_url: hero.cta_secondary_url,
                    theme_color: hero.theme_color,
                    pattern: hero.pattern,
                    badge_text: hero.badge_text,
                    updated_at: new Date().toISOString()
                })
                .eq('id', hero.id)

            if (error) throw error

            // Trigger revalidation
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: `/${hero.page_slug}` })
            })

            setMessage({ type: 'success', text: `Hero for "/${hero.page_slug}" saved successfully!` })
            setEditingId(null)
            loadHeroes()
        } catch (error) {
            console.error('Error saving hero:', error)
            setMessage({ type: 'error', text: 'Failed to save hero section' })
        } finally {
            setSaving(false)
        }
    }

    const updateHero = (id: string, field: keyof HeroSection, value: any) => {
        setHeroes(heroes.map(h =>
            h.id === id ? { ...h, [field]: value } : h
        ))
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Toaster position="top-right" theme="dark" />
            <AdminSidebar />

            <div className="flex-1 ml-64 p-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">Hero Sections</h1>
                    <p className="text-muted-foreground mt-2">
                        Edit hero content for all pages. Changes reflect on the frontend instantly.
                    </p>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${message.type === 'success'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : 'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <span>{message.text}</span>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {heroes.map(hero => {
                            const isEditing = editingId === hero.id

                            return (
                                <Card key={hero.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="capitalize">/{hero.page_slug}</CardTitle>
                                                <CardDescription>Hero section content</CardDescription>
                                            </div>
                                            <div className="flex gap-2">
                                                {isEditing ? (
                                                    <>
                                                        <Button
                                                            onClick={() => handleSave(hero)}
                                                            disabled={saving}
                                                            size="sm"
                                                        >
                                                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                                            Save
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                setEditingId(null)
                                                                loadHeroes()
                                                            }}
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button
                                                        onClick={() => setEditingId(hero.id)}
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        {!isEditing ? (
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Title</p>
                                                    <p className="font-medium">{hero.title}</p>
                                                </div>
                                                {hero.highlight && (
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Highlight</p>
                                                        <p className="font-medium text-primary">{hero.highlight}</p>
                                                    </div>
                                                )}
                                                {hero.description && (
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">Description</p>
                                                        <p>{hero.description}</p>
                                                    </div>
                                                )}
                                                <div className="flex gap-4">
                                                    {hero.cta_primary_text && (
                                                        <div>
                                                            <p className="text-sm text-muted-foreground">Primary CTA</p>
                                                            <p className="font-medium">{hero.cta_primary_text}</p>
                                                        </div>
                                                    )}
                                                    {hero.cta_secondary_text && (
                                                        <div>
                                                            <p className="text-sm text-muted-foreground">Secondary CTA</p>
                                                            <p className="font-medium">{hero.cta_secondary_text}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Title</Label>
                                                        <Input
                                                            value={hero.title}
                                                            onChange={(e) => updateHero(hero.id, 'title', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Highlight</Label>
                                                        <Input
                                                            value={hero.highlight || ''}
                                                            onChange={(e) => updateHero(hero.id, 'highlight', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Description</Label>
                                                    <Textarea
                                                        value={hero.description || ''}
                                                        onChange={(e) => updateHero(hero.id, 'description', e.target.value)}
                                                        rows={3}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Primary CTA Text</Label>
                                                        <Input
                                                            value={hero.cta_primary_text || ''}
                                                            onChange={(e) => updateHero(hero.id, 'cta_primary_text', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Primary CTA URL</Label>
                                                        <Input
                                                            value={hero.cta_primary_url || ''}
                                                            onChange={(e) => updateHero(hero.id, 'cta_primary_url', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Secondary CTA Text</Label>
                                                        <Input
                                                            value={hero.cta_secondary_text || ''}
                                                            onChange={(e) => updateHero(hero.id, 'cta_secondary_text', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Secondary CTA URL</Label>
                                                        <Input
                                                            value={hero.cta_secondary_url || ''}
                                                            onChange={(e) => updateHero(hero.id, 'cta_secondary_url', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Theme Color</Label>
                                                        <select
                                                            value={hero.theme_color}
                                                            onChange={(e) => updateHero(hero.id, 'theme_color', e.target.value)}
                                                            className="w-full px-3 py-2 rounded-md border bg-background"
                                                        >
                                                            <option value="emerald">Emerald</option>
                                                            <option value="blue">Blue</option>
                                                            <option value="purple">Purple</option>
                                                            <option value="cyan">Cyan</option>
                                                            <option value="green">Green</option>
                                                            <option value="orange">Orange</option>
                                                            <option value="indigo">Indigo</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Pattern</Label>
                                                        <select
                                                            value={hero.pattern}
                                                            onChange={(e) => updateHero(hero.id, 'pattern', e.target.value)}
                                                            className="w-full px-3 py-2 rounded-md border bg-background"
                                                        >
                                                            <option value="Grid">Grid</option>
                                                            <option value="Neural">Neural</option>
                                                            <option value="Flow">Flow</option>
                                                            <option value="Circuit">Circuit</option>
                                                            <option value="Mobile">Mobile</option>
                                                            <option value="Creative">Creative</option>
                                                            <option value="Data">Data</option>
                                                            <option value="Stripes">Stripes</option>
                                                            <option value="Hexagon">Hexagon</option>
                                                            <option value="Insights">Insights</option>
                                                            <option value="Waves">Waves</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Badge Text</Label>
                                                        <Input
                                                            value={hero.badge_text || ''}
                                                            onChange={(e) => updateHero(hero.id, 'badge_text', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        )}

                                        {!isEditing && hero.page_slug === 'home' && (
                                            <HeroSlidesManager heroSectionId={hero.id} />
                                        )}
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </div >
    )
}
