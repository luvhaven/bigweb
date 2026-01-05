'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Save, Globe, Mail, Phone, Share2, Upload, Cloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import Image from 'next/image'

interface Settings {
    id: string
    site_name: string
    site_description: string | null
    logo_url: string | null
    favicon_url: string | null
    contact_email: string | null
    contact_phone: string | null
    social_links: Record<string, string>
}

export default function SettingsPage() {
    const supabase = createClient()
    const [settings, setSettings] = useState<Settings | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        const { data } = await supabase
            .from('cms_settings')
            .select('*')
            .single()

        setSettings(data)
        setLoading(false)
    }

    async function handleSave() {
        if (!settings) return
        setSaving(true)

        try {
            await supabase.from('cms_settings').update({
                site_name: settings.site_name,
                site_description: settings.site_description,
                logo_url: settings.logo_url,
                favicon_url: settings.favicon_url,
                contact_email: settings.contact_email,
                contact_phone: settings.contact_phone,
                social_links: settings.social_links
            }).eq('id', settings.id)

            toast.success('Settings saved successfully!')
        } catch (error) {
            toast.error('Failed to save settings')
            console.error(error)
        } finally {
            setSaving(false)
        }
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, field: 'logo_url' | 'favicon_url') {
        const file = e.target.files?.[0]
        if (!file || !settings) return

        setUploading(true)
        const toastId = toast.loading('Uploading...')

        try {
            const fileName = `settings/${Date.now()}-${file.name}`
            const { error: uploadError } = await supabase.storage
                .from('cms_media')
                .upload(fileName, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage.from('cms_media').getPublicUrl(fileName)

            setSettings({ ...settings, [field]: data.publicUrl })
            toast.success('Uploaded!', { id: toastId })
        } catch (error: any) {
            toast.error('Upload failed: ' + error.message, { id: toastId })
        } finally {
            setUploading(false)
        }
    }

    function updateSocialLink(key: string, value: string) {
        if (!settings) return
        setSettings({
            ...settings,
            social_links: { ...settings.social_links, [key]: value }
        })
    }

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" /></div>

    if (!settings) {
        return (
            <div className="text-center py-12">
                <Button onClick={async () => {
                    await supabase.from('cms_settings').insert([{ site_name: 'BigWeb' }])
                    fetchSettings()
                }}>Initialize Settings</Button>
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between sticky top-0 z-20 bg-zinc-950/80 backdrop-blur-sm py-4 border-b border-zinc-800">
                <div>
                    <h1 className="text-3xl font-bold text-white">Site Settings</h1>
                    <p className="text-zinc-400 mt-1">Configure global site identity and assets</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-500">
                    <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General & Identity */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-blue-500/10"><Globe className="w-5 h-5 text-blue-400" /></div>
                            <h2 className="text-lg font-semibold text-white">General Information</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Site Name</label>
                                <Input value={settings.site_name} onChange={(e) => setSettings({ ...settings, site_name: e.target.value })} className="bg-zinc-950 border-zinc-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Description (SEO)</label>
                                <Textarea value={settings.site_description || ''} onChange={(e) => setSettings({ ...settings, site_description: e.target.value })} className="bg-zinc-950 border-zinc-800" rows={3} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-emerald-500/10"><Mail className="w-5 h-5 text-emerald-400" /></div>
                            <h2 className="text-lg font-semibold text-white">Contact Info</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Public Email</label>
                                <Input value={settings.contact_email || ''} onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })} className="bg-zinc-950 border-zinc-800" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Phone Number</label>
                                <Input value={settings.contact_phone || ''} onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })} className="bg-zinc-950 border-zinc-800" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Assets Sidebar */}
                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-purple-500/10"><Cloud className="w-5 h-5 text-purple-400" /></div>
                            <h2 className="text-lg font-semibold text-white">Brand Assets</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Logo */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-3">Main Logo</label>
                                <div className="space-y-3">
                                    <div className="w-full h-32 bg-zinc-950 border border-dashed border-zinc-800 rounded-lg flex items-center justify-center relative overflow-hidden group">
                                        {settings.logo_url ? (
                                            <img src={settings.logo_url} alt="Logo" className="max-w-full max-h-full p-4 object-contain" />
                                        ) : (
                                            <span className="text-zinc-600 text-sm">No logo</span>
                                        )}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-xs text-white">Change Image</p>
                                        </div>
                                    </div>
                                    <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo_url')} className="cursor-pointer" />
                                </div>
                            </div>

                            {/* Favicon */}
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-3">Favicon</label>
                                <div className="space-y-3">
                                    <div className="w-16 h-16 bg-zinc-950 border border-dashed border-zinc-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                                        {settings.favicon_url ? (
                                            <img src={settings.favicon_url} alt="Favicon" className="w-8 h-8 object-contain" />
                                        ) : (
                                            <div className="w-8 h-8 rounded bg-zinc-800" />
                                        )}
                                    </div>
                                    <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'favicon_url')} className="cursor-pointer" />
                                    <p className="text-xs text-zinc-500">Recommended: 32x32 SVG or PNG</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-pink-500/10"><Share2 className="w-5 h-5 text-pink-400" /></div>
                            <h2 className="text-lg font-semibold text-white">Socials</h2>
                        </div>
                        <div className="space-y-3">
                            {['linkedin', 'twitter', 'instagram', 'github'].map(platform => (
                                <div key={platform}>
                                    <Input
                                        value={settings.social_links?.[platform] || ''}
                                        onChange={(e) => updateSocialLink(platform, e.target.value)}
                                        placeholder={`${platform}.com/...`}
                                        className="bg-zinc-950 border-zinc-800 text-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
