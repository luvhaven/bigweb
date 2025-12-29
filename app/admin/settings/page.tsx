"use client"

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface Setting {
    id: string
    category: string
    setting_key: string
    setting_value: any
    description: string
    data_type: string
}

export default function SiteSettingsPage() {
    const { profile } = useAuth()
    const [settings, setSettings] = useState<Setting[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .order('category', { ascending: true })
                .order('setting_key', { ascending: true })

            if (error) throw error
            setSettings(data || [])
        } catch (error) {
            console.error('Error loading settings:', error)
            setMessage({ type: 'error', text: 'Failed to load settings' })
        } finally {
            setLoading(false)
        }
    }

    const updateSetting = (key: string, value: any) => {
        setSettings(settings.map(s =>
            s.setting_key === key ? { ...s, setting_value: value } : s
        ))
    }

    const handleSave = async () => {
        try {
            setSaving(true)
            setMessage(null)

            // Update each setting
            for (const setting of settings) {
                const { error } = await supabase
                    .from('site_settings')
                    .update({
                        setting_value: setting.setting_value,
                        updated_at: new Date().toISOString()
                    })
                    .eq('setting_key', setting.setting_key)

                if (error) throw error
            }

            // Trigger revalidation to update frontend
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: '/' })
            })

            setMessage({ type: 'success', text: 'Settings saved successfully! Frontend will update shortly.' })
        } catch (error) {
            console.error('Error saving settings:', error)
            setMessage({ type: 'error', text: 'Failed to save settings' })
        } finally {
            setSaving(false)
        }
    }

    const renderSettingInput = (setting: Setting) => {
        const value = typeof setting.setting_value === 'string'
            ? setting.setting_value.replace(/^"|"$/g, '')
            : setting.setting_value

        switch (setting.data_type) {
            case 'boolean':
                return (
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id={setting.setting_key}
                            checked={value === true}
                            onChange={(e) => updateSetting(setting.setting_key, e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300"
                        />
                        <Label htmlFor={setting.setting_key} className="cursor-pointer">
                            {setting.description}
                        </Label>
                    </div>
                )

            case 'color':
                return (
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => updateSetting(setting.setting_key, `"${e.target.value}"`)}
                            className="w-12 h-10 rounded border"
                        />
                        <Input
                            type="text"
                            value={value}
                            onChange={(e) => updateSetting(setting.setting_key, `"${e.target.value}"`)}
                            placeholder="#10b981"
                        />
                    </div>
                )

            case 'number':
                return (
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => updateSetting(setting.setting_key, parseInt(e.target.value))}
                    />
                )

            default:
                return (
                    <Input
                        type="text"
                        value={value}
                        onChange={(e) => updateSetting(setting.setting_key, `"${e.target.value}"`)}
                        placeholder={setting.description}
                    />
                )
        }
    }

    const categories = [...new Set(settings.map(s => s.category))]

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">Site Settings</h1>
                        <p className="text-muted-foreground mt-2">
                            Configure your website's global settings, branding, and integrations
                        </p>
                    </div>

                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        size="lg"
                        className="gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save All Changes
                            </>
                        )}
                    </Button>
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
                    <Tabs defaultValue={categories[0]} className="space-y-6">
                        <TabsList className="grid grid-cols-6 w-full max-w-3xl">
                            {categories.map(category => (
                                <TabsTrigger key={category} value={category} className="capitalize">
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {categories.map(category => (
                            <TabsContent key={category} value={category}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="capitalize">{category} Settings</CardTitle>
                                        <CardDescription>
                                            Manage {category} configuration options
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {settings
                                            .filter(s => s.category === category)
                                            .map(setting => (
                                                <div key={setting.setting_key} className="space-y-2">
                                                    {setting.data_type !== 'boolean' && (
                                                        <Label htmlFor={setting.setting_key}>
                                                            {setting.description}
                                                        </Label>
                                                    )}
                                                    {renderSettingInput(setting)}
                                                    <p className="text-xs text-muted-foreground">
                                                        Key: {setting.setting_key}
                                                    </p>
                                                </div>
                                            ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </div>
        </div>
    )
}
