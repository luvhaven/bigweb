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

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <EditTeamPageClient id={id} />
}

function EditTeamPageClient({ id }: { id: string }) {
    const router = useRouter()
    const isNew = id === 'new'
    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        photo_url: '',
        linkedin_url: '',
        twitter_url: '',
        sort_order: 0,
        active: true
    })

    useEffect(() => {
        if (!isNew) loadMember()
    }, [id])

    const loadMember = async () => {
        try {
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .eq('id', id)
                .single()
            if (error) throw error
            if (data) setFormData(data)
        } catch (error) {
            console.error(error)
            router.push('/admin/team')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            const payload = { ...formData } // updated_at if schema has it, checks 001 schema... schema doesn't seem to have updated_at for team, verifying...

            // Check schema for team_members date fields? Usually created_at is default. 
            // 001_cms_schema.sql: 
            // created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

            let error;
            if (isNew) {
                const { error: e } = await supabase.from('team_members').insert([payload])
                error = e
            } else {
                const { error: e } = await supabase.from('team_members').update(payload).eq('id', id)
                error = e
            }
            if (error) throw error

            // Revalidate
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: '/about' }) // Assuming team is on about page
            })

            router.push('/admin/team')
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
                        <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /></Button>
                        <h1 className="text-3xl font-bold">{isNew ? 'Add Member' : 'Edit Member'}</h1>
                    </div>
                    <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Member
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Profile Info</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Name</Label>
                                        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Role</Label>
                                        <Input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Bio</Label>
                                    <Textarea value={formData.bio || ''} onChange={e => setFormData({ ...formData, bio: e.target.value })} rows={4} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Photo URL (from Media Library)</Label>
                                    <div className="flex gap-2">
                                        <Input value={formData.photo_url || ''} onChange={e => setFormData({ ...formData, photo_url: e.target.value })} placeholder="https://..." />
                                        {formData.photo_url && (
                                            <div className="w-10 h-10 relative rounded-md overflow-hidden bg-muted shrink-0">
                                                <img src={formData.photo_url} alt="Preview" className="object-cover w-full h-full" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-2 border rounded-md">
                                    <Label>Active</Label>
                                    <input type="checkbox" checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Display Order</Label>
                                    <Input type="number" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) })} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Socials</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>LinkedIn URL</Label>
                                    <Input value={formData.linkedin_url || ''} onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Twitter/X URL</Label>
                                    <Input value={formData.twitter_url || ''} onChange={e => setFormData({ ...formData, twitter_url: e.target.value })} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
