'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { motion } from 'framer-motion'
import { Save, Globe, Mail, Phone, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

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
    const [settings, setSettings] = useState<Settings | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

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

    function updateSocialLink(key: string, value: string) {
        if (!settings) return
        setSettings({
            ...settings,
            social_links: { ...settings.social_links, [key]: value }
        })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
        )
    }

    if (!settings) {
        return (
            <div className="text-center py-12">
                <p className="text-zinc-500">No settings found. Please run the seed script.</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-zinc-400 mt-1">Configure your site settings</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-500">
                    <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            {/* General */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-blue-500/20">
                        <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">General</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Site Name</label>
                        <Input
                            value={settings.site_name}
                            onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                            className="bg-zinc-800 border-white/10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Logo URL</label>
                        <Input
                            value={settings.logo_url || ''}
                            onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                            placeholder="/assets/logo.svg"
                            className="bg-zinc-800 border-white/10"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-zinc-400 mb-1">Site Description</label>
                        <Textarea
                            value={settings.site_description || ''}
                            onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                            rows={2}
                            className="bg-zinc-800 border-white/10"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Contact */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-emerald-500/20">
                        <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Contact</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Email</label>
                        <Input
                            value={settings.contact_email || ''}
                            onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                            className="bg-zinc-800 border-white/10"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Phone</label>
                        <Input
                            value={settings.contact_phone || ''}
                            onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                            className="bg-zinc-800 border-white/10"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-purple-500/20">
                        <Share2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Social Links</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['linkedin', 'twitter', 'instagram', 'github'].map(platform => (
                        <div key={platform}>
                            <label className="block text-sm text-zinc-400 mb-1 capitalize">{platform}</label>
                            <Input
                                value={settings.social_links?.[platform] || ''}
                                onChange={(e) => updateSocialLink(platform, e.target.value)}
                                placeholder={`https://${platform}.com/...`}
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
