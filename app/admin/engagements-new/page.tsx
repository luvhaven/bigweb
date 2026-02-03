'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Engagement } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Plus, Save, Trash2, Eye, EyeOff, DollarSign } from 'lucide-react'
import { toast } from 'sonner'

export default function EngagementsAdmin() {
    const [engagements, setEngagements] = useState<Engagement[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<Engagement>>({})
    const [featuresInput, setFeaturesInput] = useState('')

    useEffect(() => {
        fetchEngagements()
    }, [])

    const fetchEngagements = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('engagements')
            .select('*')
            .order('order_index', { ascending: true })

        if (error) {
            toast.error('Failed to fetch engagements')
            console.error(error)
        } else {
            setEngagements(data as Engagement[])
        }
        setLoading(false)
    }

    const handleSave = async () => {
        if (!formData.name || !formData.slug) {
            toast.error('Name and slug are required')
            return
        }

        // Convert features input to array
        const features = featuresInput
            .split('\n')
            .map(f => f.trim())
            .filter(f => f.length > 0)

        const dataToSave = {
            ...formData,
            features
        }

        const supabase = createClient()

        if (editingId) {
            // Update existing
            const { error } = await supabase
                .from('engagements')
                .update(dataToSave)
                .eq('id', editingId)

            if (error) {
                toast.error('Failed to update engagement')
                console.error(error)
            } else {
                toast.success('Engagement updated successfully')
                resetForm()
                fetchEngagements()
            }
        } else {
            // Create new
            const { error } = await supabase
                .from('engagements')
                .insert({ ...dataToSave, order_index: engagements.length + 1 })

            if (error) {
                toast.error('Failed to create engagement')
                console.error(error)
            } else {
                toast.success('Engagement created successfully')
                resetForm()
                fetchEngagements()
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this engagement?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('engagements')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error('Failed to delete engagement')
            console.error(error)
        } else {
            toast.success('Engagement deleted successfully')
            fetchEngagements()
        }
    }

    const toggleStatus = async (engagement: Engagement) => {
        const supabase = createClient()
        const newStatus = engagement.status === 'published' ? 'draft' : 'published'

        const { error } = await supabase
            .from('engagements')
            .update({ status: newStatus })
            .eq('id', engagement.id)

        if (error) {
            toast.error('Failed to toggle status')
        } else {
            toast.success(`Engagement ${newStatus}`)
            fetchEngagements()
        }
    }

    const resetForm = () => {
        setEditingId(null)
        setFormData({})
        setFeaturesInput('')
    }

    const startEdit = (engagement: Engagement) => {
        setEditingId(engagement.id)
        setFormData(engagement)
        setFeaturesInput(engagement.features?.join('\n') || '')
    }

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Engagements Manager</h1>
                    <p className="text-zinc-500 mt-2">Manage your service packages and pricing</p>
                </div>
                <Button
                    onClick={() => {
                        resetForm()
                        setFormData({
                            status: 'draft',
                            highlighted: false,
                            features: []
                        })
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Engagement
                </Button>
            </div>

            {/* Edit Form */}
            {(editingId || Object.keys(formData).length > 0) && (
                <Card className="p-6 mb-8 bg-zinc-950 border-zinc-800">
                    <h2 className="text-xl font-bold mb-4">
                        {editingId ? 'Edit Engagement' : 'New Engagement'}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            placeholder="Slug (e.g., revenue-roadmap)"
                            value={formData.slug || ''}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                        <Input
                            placeholder="Name (e.g., Revenue Roadmap)"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            className="col-span-2"
                            placeholder="Tagline (e.g., Phase 01: Clinical Diagnostic)"
                            value={formData.tagline || ''}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        />
                        <Textarea
                            className="col-span-2"
                            placeholder="Description"
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                        <Input
                            placeholder="Price (e.g., $500)"
                            value={formData.price || ''}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                        <Input
                            placeholder="Price Subtext (e.g., One-Time)"
                            value={formData.price_subtext || ''}
                            onChange={(e) => setFormData({ ...formData, price_subtext: e.target.value })}
                        />
                        <Input
                            placeholder="Icon (e.g., Search)"
                            value={formData.icon || ''}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        />
                        <Input
                            placeholder="Route (e.g., /offers/revenue-roadmap)"
                            value={formData.route || ''}
                            onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                        />
                        <Input
                            placeholder="Badge Text (optional)"
                            value={formData.badge_text || ''}
                            onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                        />
                        <Input
                            placeholder="Color Scheme (e.g., orange)"
                            value={formData.color_scheme || ''}
                            onChange={(e) => setFormData({ ...formData, color_scheme: e.target.value })}
                        />
                        <div className="col-span-2">
                            <label className="text-sm font-medium mb-2 block">Highlighted Package</label>
                            <Switch
                                checked={formData.highlighted || false}
                                onCheckedChange={(checked) => setFormData({ ...formData, highlighted: checked })}
                            />
                        </div>
                        <Textarea
                            className="col-span-2"
                            placeholder="Features (one per line)"
                            value={featuresInput}
                            onChange={(e) => setFeaturesInput(e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button onClick={handleSave}>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                        <Button variant="outline" onClick={resetForm}>
                            Cancel
                        </Button>
                    </div>
                </Card>
            )}

            {/* Engagements List */}
            <div className="grid gap-4">
                {engagements.map((engagement) => (
                    <Card
                        key={engagement.id}
                        className={`p-6 border transition-all ${engagement.highlighted
                                ? 'bg-orange-600/10 border-orange-600/30'
                                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-black">{engagement.name}</h3>
                                    {engagement.highlighted && (
                                        <span className="text-xs px-2 py-0.5 rounded bg-orange-500 text-white">
                                            HIGHLIGHTED
                                        </span>
                                    )}
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded ${engagement.status === 'published'
                                                ? 'bg-green-500/20 text-green-500'
                                                : 'bg-yellow-500/20 text-yellow-500'
                                            }`}
                                    >
                                        {engagement.status}
                                    </span>
                                </div>
                                <p className="text-zinc-500 text-sm mb-1">{engagement.tagline}</p>
                                <p className="text-zinc-400 text-sm mb-3">{engagement.description}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-orange-500 font-black flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" />
                                        {engagement.price}
                                    </span>
                                    <span className="text-zinc-600">{engagement.price_subtext}</span>
                                    <span className="text-zinc-600">Icon: {engagement.icon}</span>
                                </div>
                                {engagement.features && engagement.features.length > 0 && (
                                    <div className="mt-3 text-xs text-zinc-600">
                                        {engagement.features.length} features included
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => toggleStatus(engagement)}>
                                    {engagement.status === 'published' ? (
                                        <Eye className="w-4 h-4" />
                                    ) : (
                                        <EyeOff className="w-4 h-4" />
                                    )}
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => startEdit(engagement)}>
                                    Edit
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(engagement.id)}>
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
