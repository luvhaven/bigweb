'use client'

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, Trash2, Save, MoveUp, MoveDown, Edit2, X } from 'lucide-react'
import { toast } from 'sonner'

interface HeroSlide {
    id: string
    hero_section_id: string
    title: string
    subtitle: string | null
    description: string | null
    image_url: string | null
    cta_text: string | null
    cta_link: string | null
    stat_value: string | null
    stat_label: string | null
    sort_order: number
    active: boolean
}

export default function HeroSlidesManager({ heroSectionId }: { heroSectionId: string }) {
    const [slides, setSlides] = useState<HeroSlide[]>([])
    const [loading, setLoading] = useState(true)
    const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadSlides()
    }, [heroSectionId])

    const loadSlides = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('hero_slides')
                .select('*')
                .eq('hero_section_id', heroSectionId)
                .order('sort_order', { ascending: true })

            if (error) throw error
            setSlides(data || [])
        } catch (error) {
            console.error('Error loading slides:', error)
            toast.error('Failed to load slides')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!editingSlide) return

        try {
            setSaving(true)

            const slideData = {
                ...editingSlide,
                hero_section_id: heroSectionId,
                sort_order: editingSlide.sort_order || slides.length
            }

            if (editingSlide.id) {
                // Update
                const { error } = await supabase
                    .from('hero_slides')
                    .update(slideData)
                    .eq('id', editingSlide.id)
                if (error) throw error
            } else {
                // Insert
                const { error } = await supabase
                    .from('hero_slides')
                    .insert([slideData])
                if (error) throw error
            }

            toast.success('Slide saved successfully')
            setEditingSlide(null)
            loadSlides()

            // Trigger Revalidation
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: '/' })
            })

        } catch (error) {
            console.error('Error saving slide:', error)
            toast.error('Failed to save slide')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this slide?')) return

        try {
            const { error } = await supabase
                .from('hero_slides')
                .delete()
                .eq('id', id)

            if (error) throw error
            toast.success('Slide deleted')
            loadSlides()
        } catch (error) {
            console.error('Error deleting slide:', error)
            toast.error('Failed to delete slide')
        }
    }

    const reorderSlide = async (index: number, direction: 'up' | 'down') => {
        if (
            (direction === 'up' && index === 0) ||
            (direction === 'down' && index === slides.length - 1)
        ) return

        const newSlides = [...slides]
        const targetIndex = direction === 'up' ? index - 1 : index + 1

        // Swap sort orders
        const tempOrder = newSlides[index].sort_order
        newSlides[index].sort_order = newSlides[targetIndex].sort_order
        newSlides[targetIndex].sort_order = tempOrder

        // Optimistic UI update
        // We know sort_order roughly maps to index here if they are sequential, 
        // but robustly we should probably swap the array items and update DB.

        try {
            // Update both items in DB
            await Promise.all([
                supabase.from('hero_slides').update({ sort_order: newSlides[index].sort_order }).eq('id', newSlides[index].id),
                supabase.from('hero_slides').update({ sort_order: newSlides[targetIndex].sort_order }).eq('id', newSlides[targetIndex].id)
            ])

            loadSlides()
        } catch (err) {
            toast.error('Failed to reorder')
        }
    }

    return (
        <div className="space-y-6 mt-8 border-t pt-8">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Hero Slides</h3>
                <Button onClick={() => setEditingSlide({})} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Slide
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-4">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid gap-4">
                    {slides.length === 0 && !editingSlide && (
                        <p className="text-muted-foreground text-center py-8">No slides found. Create one to get started.</p>
                    )}

                    {slides.map((slide, index) => (
                        <Card key={slide.id} className="relative overflow-hidden group">
                            <CardContent className="p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="md:w-32 h-20 bg-muted rounded-md overflow-hidden relative shrink-0">
                                        {slide.image_url ? (
                                            <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{slide.title}</h4>
                                        <p className="text-sm text-muted-foreground truncate max-w-md">{slide.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col gap-1 mr-2">
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => reorderSlide(index, 'up')} disabled={index === 0}>
                                            <MoveUp className="w-3 h-3" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => reorderSlide(index, 'down')} disabled={index === slides.length - 1}>
                                            <MoveDown className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <Button variant="outline" size="icon" onClick={() => setEditingSlide(slide)}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(slide.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {editingSlide && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-10 border-b">
                            <CardTitle>{editingSlide.id ? 'Edit Slide' : 'New Slide'}</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setEditingSlide(null)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input
                                            value={editingSlide.title || ''}
                                            onChange={e => setEditingSlide(prev => ({ ...prev, title: e.target.value }))}
                                            placeholder="Main Headline"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Subtitle</Label>
                                        <Input
                                            value={editingSlide.subtitle || ''}
                                            onChange={e => setEditingSlide(prev => ({ ...prev, subtitle: e.target.value }))}
                                            placeholder="Small badge text"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={editingSlide.description || ''}
                                        onChange={e => setEditingSlide(prev => ({ ...prev, description: e.target.value }))}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Image URL (Use Admin Media Lib to upload)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={editingSlide.image_url || ''}
                                            onChange={e => setEditingSlide(prev => ({ ...prev, image_url: e.target.value }))}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>CTA Text</Label>
                                        <Input
                                            value={editingSlide.cta_text || ''}
                                            onChange={e => setEditingSlide(prev => ({ ...prev, cta_text: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>CTA Link</Label>
                                        <Input
                                            value={editingSlide.cta_link || ''}
                                            onChange={e => setEditingSlide(prev => ({ ...prev, cta_link: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Stat Value</Label>
                                        <Input
                                            value={editingSlide.stat_value || ''}
                                            onChange={e => setEditingSlide(prev => ({ ...prev, stat_value: e.target.value }))}
                                            placeholder="e.g. 98%"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Stat Label</Label>
                                        <Input
                                            value={editingSlide.stat_label || ''}
                                            onChange={e => setEditingSlide(prev => ({ ...prev, stat_label: e.target.value }))}
                                            placeholder="e.g. Satisfaction"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setEditingSlide(null)}>Cancel</Button>
                                <Button onClick={handleSave} disabled={saving}>
                                    {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    Save Slide
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
