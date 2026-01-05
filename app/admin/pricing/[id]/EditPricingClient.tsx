'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Save, ArrowLeft, Plus, X } from 'lucide-react'

export default function EditPricingPageClient({ id }: { id: string }) {
    const router = useRouter()
    const isNew = id === 'new'
    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        features: [''] as string[],
        is_popular: false,
        cta_text: 'Get Started',
        cta_url: '/contact',
        sort_order: 0
    })

    useEffect(() => {
        if (!isNew) {
            loadTier()
        }
    }, [id])

    const loadTier = async () => {
        try {
            const { data, error } = await supabase
                .from('pricing_tiers')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            if (data) {
                setFormData({
                    ...data,
                    features: Array.isArray(data.features) ? data.features : []
                })
            }
        } catch (error) {
            console.error('Error loading tier:', error)
            router.push('/admin/pricing')
        } finally {
            setLoading(false)
        }
    }

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features]
        newFeatures[index] = value
        setFormData({ ...formData, features: newFeatures })
    }

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ''] })
    }

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index)
        setFormData({ ...formData, features: newFeatures })
    }

    const handleSave = async () => {
        try {
            setSaving(true)

            // Filter out empty features
            const cleanFeatures = formData.features.filter(f => f.trim() !== '')

            const payload = {
                ...formData,
                features: cleanFeatures,
                // Remove updated_at from payload if it's auto-generated, or include it
                // The DB defaults handle creation, but we might want to update it explicitly
            }

            let error
            if (isNew) {
                const { error: insertError } = await supabase
                    .from('pricing_tiers')
                    .insert([payload])
                error = insertError
            } else {
                const { error: updateError } = await supabase
                    .from('pricing_tiers')
                    .update(payload)
                    .eq('id', id)
                error = updateError
            }

            if (error) throw error

            // Revalidate
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: '/' }) // Revalidate home/pricing section
            })

            router.push('/admin/pricing')
        } catch (error) {
            console.error('Error saving tier:', error)
            alert('Failed to save pricing tier')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => router.back()}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold">{isNew ? 'New Pricing Tier' : 'Edit Tier'}</h1>
                            <p className="text-muted-foreground">
                                {isNew ? 'Create a new pricing package' : `Editing ${formData.name}`}
                            </p>
                        </div>
                    </div>

                    <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Plan Name</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Pro, Enterprise"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Display Price</Label>
                                        <Input
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="e.g. $499/mo or Contact Us"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Short description of who this plan is for"
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Features List</CardTitle>
                                    <Button variant="outline" size="sm" onClick={addFeature}>
                                        <Plus className="w-4 h-4 mr-2" /> Add Feature
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={feature}
                                            onChange={e => handleFeatureChange(index, e.target.value)}
                                            placeholder={`Feature ${index + 1}`}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFeature(index)}
                                            className="text-muted-foreground hover:text-red-500"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                {formData.features.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-4">
                                        No features added yet. Click "Add Feature" to start.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Configuration</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-2 border rounded-md">
                                    <Label>Mark as "Popular"</Label>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_popular}
                                        onChange={e => setFormData({ ...formData, is_popular: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>CTA Text</Label>
                                    <Input
                                        value={formData.cta_text}
                                        onChange={e => setFormData({ ...formData, cta_text: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>CTA URL</Label>
                                    <Input
                                        value={formData.cta_url || ''}
                                        onChange={e => setFormData({ ...formData, cta_url: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Sort Order</Label>
                                    <Input
                                        type="number"
                                        value={formData.sort_order}
                                        onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                                    />
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
