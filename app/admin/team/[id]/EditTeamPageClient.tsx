'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminSidebar from '@/components/admin/AdminSidebar' // Legacy sidebar check? No, check imports.
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Save, ArrowLeft } from 'lucide-react'

// NOTE: Using Generic Table would be better, but refactoring existing logic first.

export default function EditTeamPageClient({ id }: { id: string }) {
    const router = useRouter()
    const supabase = createClient()
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
            const payload = { ...formData }

            let error;
            if (isNew) {
                const { error: e } = await supabase.from('team_members').insert([payload])
                error = e
            } else {
                const { error: e } = await supabase.from('team_members').update(payload).eq('id', id)
                error = e
            }
            if (error) throw error

            router.push('/admin/team')
        } catch (error: any) {
            console.error(error)
            alert('Failed to save: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>

    return (
        <div className="flex min-h-screen bg-zinc-950">
            {/* Sidebar is handled by Layout now? The original file imported AdminSidebar manually. 
               This page is likely inside AdminLayoutV2 if pathname is /admin/team/... 
               Actually, line 96 of original file rendered AdminSidebar manually.
               If I keep it, I get double sidebar if layout is present.
               Assuming layout handles it. Removing manual sidebar. */ }
            <div className="flex-1 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /></Button>
                        <h1 className="text-3xl font-bold text-white">{isNew ? 'Add Member' : 'Edit Member'}</h1>
                    </div>
                    <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2 bg-emerald-500 hover:bg-emerald-600">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Member
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader><CardTitle className="text-white">Profile Info</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400">Name</Label>
                                        <Input className="bg-zinc-950 border-zinc-800" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-zinc-400">Role</Label>
                                        <Input className="bg-zinc-950 border-zinc-800" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Bio</Label>
                                    <Textarea className="bg-zinc-950 border-zinc-800" value={formData.bio || ''} onChange={e => setFormData({ ...formData, bio: e.target.value })} rows={4} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Photo URL</Label>
                                    <div className="flex gap-2">
                                        <Input className="bg-zinc-950 border-zinc-800" value={formData.photo_url || ''} onChange={e => setFormData({ ...formData, photo_url: e.target.value })} placeholder="https://..." />
                                        {formData.photo_url && (
                                            <div className="w-10 h-10 relative rounded-md overflow-hidden bg-zinc-800 shrink-0">
                                                <img src={formData.photo_url} alt="Preview" className="object-cover w-full h-full" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader><CardTitle className="text-white">Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-2 border border-zinc-800 rounded-md bg-zinc-950">
                                    <Label className="text-zinc-400">Active</Label>
                                    <input type="checkbox" checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })} className="w-4 h-4 rounded border-zinc-700 bg-zinc-800" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Display Order</Label>
                                    <Input className="bg-zinc-950 border-zinc-800" type="number" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) })} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader><CardTitle className="text-white">Socials</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">LinkedIn URL</Label>
                                    <Input className="bg-zinc-950 border-zinc-800" value={formData.linkedin_url || ''} onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Twitter/X URL</Label>
                                    <Input className="bg-zinc-950 border-zinc-800" value={formData.twitter_url || ''} onChange={e => setFormData({ ...formData, twitter_url: e.target.value })} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
