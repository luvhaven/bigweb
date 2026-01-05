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
import JsonListEditor from '@/components/admin/JsonListEditor'

export default function EditServicePageClient({ id }: { id: string }) {
    const router = useRouter()
    // const { toast } = useToast() // If you have a toast component
    const isNew = id === 'new'
    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        highlight: '',
        description: '',
        long_description: '',
        theme_color: 'emerald',
        pattern: 'Grid',
        badge_text: '',
        icon: '',
        featured: false,
        published: true,
        features: [] as any[], // Simplified for now
        process_steps: [] as any[],
        starting_price: 0,
        timeline_weeks: 2
    })

    useEffect(() => {
        if (!isNew) {
            loadService()
        }
    }, [id])

    const loadService = async () => {
        try {
            const { data, error } = await supabase
                .from('service_pages')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            if (data) {
                setFormData(data)
            }
        } catch (error) {
            console.error('Error loading service:', error)
            router.push('/admin/services')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)

            const payload = {
                ...formData,
                updated_at: new Date().toISOString()
            }

            let error
            if (isNew) {
                const { error: insertError } = await supabase
                    .from('service_pages')
                    .insert([payload])
                error = insertError
            } else {
                const { error: updateError } = await supabase
                    .from('service_pages')
                    .update(payload)
                    .eq('id', id)
                error = updateError
            }

            if (error) throw error

            // Revalidate
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: `/${formData.slug}` })
            })
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: '/services' })
            })

            router.push('/admin/services')
        } catch (error) {
            console.error('Error saving service:', error)
            alert('Failed to save service')
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
                            <h1 className="text-3xl font-bold">{isNew ? 'Create Service' : 'Edit Service'}</h1>
                            <p className="text-muted-foreground">
                                {isNew ? 'Add a new service offering' : `Editing ${formData.title}`}
                            </p>
                        </div>
                    </div>

                    <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Core Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Service Title</Label>
                                        <Input
                                            value={formData.title}
                                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. AI Chatbot Development"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>URL Slug</Label>
                                        <Input
                                            value={formData.slug}
                                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                            placeholder="e.g. ai-chatbots"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Highlight Text</Label>
                                    <Input
                                        value={formData.highlight}
                                        onChange={e => setFormData({ ...formData, highlight: e.target.value })}
                                        placeholder="e.g. 24/7 Customer Support"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Short Description (Card View)</Label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Long Description (Full Page)</Label>
                                    <Textarea
                                        value={formData.long_description}
                                        onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                                        rows={6}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Features & Benefits</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <JsonListEditor
                                    title="Features (Bento Grid)"
                                    items={formData.features || []}
                                    onChange={(newItems) => setFormData({ ...formData, features: newItems })}
                                    fields={[
                                        { key: 'title', label: 'Title', type: 'text' },
                                        { key: 'description', label: 'Description', type: 'textarea' },
                                        { key: 'icon', label: 'Icon Name (Lucide)', type: 'text' },
                                        { key: 'colSpan', label: 'Col Span (1-3)', type: 'text' },
                                    ]}
                                />

                                <div className="border-t pt-8">
                                    <JsonListEditor
                                        title="Process Steps"
                                        items={formData.process_steps || []}
                                        onChange={(newItems) => setFormData({ ...formData, process_steps: newItems })}
                                        fields={[
                                            { key: 'title', label: 'Step Title', type: 'text' },
                                            { key: 'description', label: 'Description', type: 'textarea' },
                                            { key: 'icon', label: 'Icon (Emoji)', type: 'text' },
                                        ]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-2 border rounded-md">
                                    <Label>Published</Label>
                                    <input
                                        type="checkbox"
                                        checked={formData.published}
                                        onChange={e => setFormData({ ...formData, published: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-2 border rounded-md">
                                    <Label>Featured on Home</Label>
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Theme Color</Label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={formData.theme_color}
                                        onChange={e => setFormData({ ...formData, theme_color: e.target.value })}
                                    >
                                        <option value="emerald">Emerald</option>
                                        <option value="blue">Blue</option>
                                        <option value="purple">Purple</option>
                                        <option value="orange">Orange</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Pattern Style</Label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={formData.pattern}
                                        onChange={e => setFormData({ ...formData, pattern: e.target.value })}
                                    >
                                        <option value="Grid">Grid</option>
                                        <option value="Neural">Neural</option>
                                        <option value="Flow">Flow</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Badge Text</Label>
                                    <Input
                                        value={formData.badge_text || ''}
                                        onChange={e => setFormData({ ...formData, badge_text: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Starting Price ($)</Label>
                                    <Input
                                        type="number"
                                        value={formData.starting_price}
                                        onChange={e => setFormData({ ...formData, starting_price: parseFloat(e.target.value) })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Timeline (Weeks)</Label>
                                    <Input
                                        type="number"
                                        value={formData.timeline_weeks}
                                        onChange={e => setFormData({ ...formData, timeline_weeks: parseInt(e.target.value) })}
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
