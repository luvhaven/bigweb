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
import { Loader2, Save, ArrowLeft } from 'lucide-react'

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    // Client component for form functionality
    return <EditContentPageClient id={id} />
}

function EditContentPageClient({ id }: { id: string }) {
    const router = useRouter()
    const isNew = id === 'new'
    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        seo_title: '',
        seo_description: '',
        published: false
    })

    useEffect(() => {
        if (!isNew) loadPage()
    }, [id])

    const loadPage = async () => {
        try {
            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            if (data) setFormData(data)
        } catch (error) {
            console.error(error)
            router.push('/admin/pages')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            const payload = { ...formData, updated_at: new Date().toISOString() }

            if (isNew) {
                const { error } = await supabase.from('pages').insert([payload])
                if (error) throw error
            } else {
                const { error } = await supabase.from('pages').update(payload).eq('id', id)
                if (error) throw error
            }

            // Revalidate
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: `/${formData.slug}` })
            })

            router.push('/admin/pages')
        } catch (error) {
            console.error(error)
            alert('Failed to save')
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
                        <h1 className="text-3xl font-bold">{isNew ? 'New Page' : 'Edit Page'}</h1>
                    </div>
                    <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Content</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Page Title</Label>
                                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Terms of Service" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug</Label>
                                    <Input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="e.g. terms" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Content (Markdown/HTML)</Label>
                                    <Textarea
                                        value={formData.content || ''}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                                        rows={20}
                                        className="font-mono text-sm leading-relaxed"
                                        placeholder="# My Page Title..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
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
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>SEO</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>SEO Title</Label>
                                    <Input value={formData.seo_title || ''} onChange={e => setFormData({ ...formData, seo_title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Meta Description</Label>
                                    <Textarea value={formData.seo_description || ''} onChange={e => setFormData({ ...formData, seo_description: e.target.value })} rows={3} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
