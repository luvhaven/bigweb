'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Settings,
    Globe,
    Palette,
    Share2,
    Code2,
    Zap,
    Image as ImageIcon,
    Save,
    Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import AdminHeader from '@/components/admin/AdminHeader'
import { toast } from 'sonner'
import { settingsAPI } from '@/lib/api/settings'

interface SiteSettings {
    // General
    siteName: string
    tagline: string
    description: string
    contactEmail: string
    contactPhone: string
    address: string

    // SEO
    defaultMetaTitle: string
    defaultMetaDescription: string
    ogTitle: string
    ogDescription: string
    ogImage: string
    twitterHandle: string

    // Branding
    primaryColor: string
    secondaryColor: string

    // Social Media
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
    youtube: string

    // Integrations
    googleAnalyticsId: string
    googleTagManagerId: string
    facebookPixelId: string

    // Advanced
    customCss: string
    customJs: string
    cookieConsentEnabled: boolean
}

// Mapping between our state keys and database keys
const settingsKeyMap: Record<keyof SiteSettings, { key: string; category: string }> = {
    siteName: { key: 'site_name', category: 'general' },
    tagline: { key: 'site_tagline', category: 'general' },
    description: { key: 'site_description', category: 'general' },
    contactEmail: { key: 'contact_email', category: 'general' },
    contactPhone: { key: 'contact_phone', category: 'general' },
    address: { key: 'address', category: 'general' },
    defaultMetaTitle: { key: 'default_meta_title', category: 'seo' },
    defaultMetaDescription: { key: 'default_meta_description', category: 'seo' },
    ogTitle: { key: 'og_title', category: 'seo' },
    ogDescription: { key: 'og_description', category: 'seo' },
    ogImage: { key: 'og_image', category: 'seo' },
    twitterHandle: { key: 'twitter_handle', category: 'seo' },
    primaryColor: { key: 'primary_color', category: 'branding' },
    secondaryColor: { key: 'secondary_color', category: 'branding' },
    facebook: { key: 'social_facebook', category: 'social' },
    twitter: { key: 'social_twitter', category: 'social' },
    instagram: { key: 'social_instagram', category: 'social' },
    linkedin: { key: 'social_linkedin', category: 'social' },
    youtube: { key: 'social_youtube', category: 'social' },
    googleAnalyticsId: { key: 'google_analytics_id', category: 'integrations' },
    googleTagManagerId: { key: 'google_tag_manager_id', category: 'integrations' },
    facebookPixelId: { key: 'facebook_pixel_id', category: 'integrations' },
    customCss: { key: 'custom_css', category: 'advanced' },
    customJs: { key: 'custom_js', category: 'advanced' },
    cookieConsentEnabled: { key: 'cookie_consent_enabled', category: 'advanced' },
}

export default function SiteSettingsPage() {
    const [settings, setSettings] = useState<SiteSettings>({
        siteName: '',
        tagline: '',
        description: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        defaultMetaTitle: '',
        defaultMetaDescription: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterHandle: '',
        primaryColor: '#3B82F6',
        secondaryColor: '#10B981',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        googleAnalyticsId: '',
        googleTagManagerId: '',
        facebookPixelId: '',
        customCss: '',
        customJs: '',
        cookieConsentEnabled: true,
    })

    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('general')

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        try {
            const dbSettings = await settingsAPI.getAllAsObject()

            // Map database keys to our state structure
            const mappedSettings: Partial<SiteSettings> = {}
            Object.entries(settingsKeyMap).forEach(([stateKey, { key: dbKey }]) => {
                if (dbSettings[dbKey] !== undefined) {
                    mappedSettings[stateKey as keyof SiteSettings] = dbSettings[dbKey]
                }
            })

            setSettings(prev => ({ ...prev, ...mappedSettings }))
        } catch (error) {
            console.error('Error loading settings:', error)
            toast.error('Failed to load settings')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            // Convert our settings to database format
            const settingsToSave = Object.entries(settings).map(([stateKey, value]) => {
                const { key, category } = settingsKeyMap[stateKey as keyof SiteSettings]
                return { key, value, category }
            })

            await settingsAPI.bulkUpdate(settingsToSave)
            toast.success('Settings saved successfully!')
        } catch (error) {
            console.error('Error saving settings:', error)
            toast.error('Failed to save settings')
        } finally {
            setSaving(false)
        }
    }

    const updateSetting = (key: keyof SiteSettings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Site Settings"
                description="Configure your website's global settings and integrations"
            >
                <Button onClick={handleSave} disabled={saving} className="bg-accent hover:bg-accent/90">
                    {saving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </>
                    )}
                </Button>
            </AdminHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                    <TabsTrigger value="general" className="gap-2">
                        <Settings className="w-4 h-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="gap-2">
                        <Globe className="w-4 h-4" />
                        SEO
                    </TabsTrigger>
                    <TabsTrigger value="branding" className="gap-2">
                        <Palette className="w-4 h-4" />
                        Branding
                    </TabsTrigger>
                    <TabsTrigger value="social" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Social
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="gap-2">
                        <Zap className="w-4 h-4" />
                        Integrations
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="gap-2">
                        <Code2 className="w-4 h-4" />
                        Advanced
                    </TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Information</CardTitle>
                            <CardDescription>Basic information about your website</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName">Site Name</Label>
                                    <Input
                                        id="siteName"
                                        value={settings.siteName}
                                        onChange={(e) => updateSetting('siteName', e.target.value)}
                                        placeholder="Your Site Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tagline">Tagline</Label>
                                    <Input
                                        id="tagline"
                                        value={settings.tagline}
                                        onChange={(e) => updateSetting('tagline', e.target.value)}
                                        placeholder="Your brand tagline"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Site Description</Label>
                                <Textarea
                                    id="description"
                                    value={settings.description}
                                    onChange={(e) => updateSetting('description', e.target.value)}
                                    placeholder="Brief description of your website"
                                    rows={3}
                                />
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="contactEmail">Contact Email</Label>
                                    <Input
                                        id="contactEmail"
                                        type="email"
                                        value={settings.contactEmail}
                                        onChange={(e) => updateSetting('contactEmail', e.target.value)}
                                        placeholder="hello@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactPhone">Contact Phone</Label>
                                    <Input
                                        id="contactPhone"
                                        type="tel"
                                        value={settings.contactPhone}
                                        onChange={(e) => updateSetting('contactPhone', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Business Address</Label>
                                <Textarea
                                    id="address"
                                    value={settings.address}
                                    onChange={(e) => updateSetting('address', e.target.value)}
                                    placeholder="Your physical address"
                                    rows={2}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SEO Tab */}
                <TabsContent value="seo" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Defaults</CardTitle>
                            <CardDescription>Default meta tags and SEO settings for your site</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="defaultMetaTitle">Default Meta Title Template</Label>
                                <Input
                                    id="defaultMetaTitle"
                                    value={settings.defaultMetaTitle}
                                    onChange={(e) => updateSetting('defaultMetaTitle', e.target.value)}
                                    placeholder="%page_title% | %site_name%"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Variables: %page_title%, %site_name%, %service%
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                                <Textarea
                                    id="defaultMetaDescription"
                                    value={settings.defaultMetaDescription}
                                    onChange={(e) => updateSetting('defaultMetaDescription', e.target.value)}
                                    placeholder="Your sitewide meta description"
                                    rows={3}
                                />
                            </div>

                            <Separator />

                            <h3 className="text-lg font-semibold">Open Graph (Facebook)</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="ogTitle">OG Title</Label>
                                    <Input
                                        id="ogTitle"
                                        value={settings.ogTitle}
                                        onChange={(e) => updateSetting('ogTitle', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ogDescription">OG Description</Label>
                                    <Textarea
                                        id="ogDescription"
                                        value={settings.ogDescription}
                                        onChange={(e) => updateSetting('ogDescription', e.target.value)}
                                        rows={2}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ogImage">OG Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="ogImage"
                                            value={settings.ogImage}
                                            onChange={(e) => updateSetting('ogImage', e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <Button variant="outline" size="icon">
                                            <Upload className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Recommended: 1200x630px
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <h3 className="text-lg font-semibold">Twitter Card</h3>
                            <div className="space-y-2">
                                <Label htmlFor="twitterHandle">Twitter Handle</Label>
                                <Input
                                    id="twitterHandle"
                                    value={settings.twitterHandle}
                                    onChange={(e) => updateSetting('twitterHandle', e.target.value)}
                                    placeholder="@yourbrand"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Branding Tab */}
                <TabsContent value="branding" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Colors</CardTitle>
                            <CardDescription>Configure your brand color palette</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="primaryColor">Primary Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="primaryColor"
                                            type="color"
                                            value={settings.primaryColor}
                                            onChange={(e) => updateSetting('primaryColor', e.target.value)}
                                            className="w-20 h-10"
                                        />
                                        <Input
                                            value={settings.primaryColor}
                                            onChange={(e) => updateSetting('primaryColor', e.target.value)}
                                            placeholder="#3B82F6"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="secondaryColor"
                                            type="color"
                                            value={settings.secondaryColor}
                                            onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                                            className="w-20 h-10"
                                        />
                                        <Input
                                            value={settings.secondaryColor}
                                            onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                                            placeholder="#10B981"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Logos & Icons</CardTitle>
                            <CardDescription>Upload your brand assets</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label>Logo (Light Mode)</Label>
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Upload Logo</p>
                                        <p className="text-xs text-muted-foreground mt-1">PNG, SVG (Max 2MB)</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Logo (Dark Mode)</Label>
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer bg-secondary">
                                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Upload Logo</p>
                                        <p className="text-xs text-muted-foreground mt-1">PNG, SVG (Max 2MB)</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Favicon</Label>
                                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Upload Icon</p>
                                        <p className="text-xs text-muted-foreground mt-1">ICO, PNG (32x32)</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Social Tab */}
                <TabsContent value="social" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media Links</CardTitle>
                            <CardDescription>Connect your social media profiles</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { key: 'facebook' as keyof SiteSettings, label: 'Facebook', placeholder: 'https://facebook.com/yourpage' },
                                { key: 'twitter' as keyof SiteSettings, label: 'Twitter / X', placeholder: 'https://twitter.com/yourhandle' },
                                { key: 'instagram' as keyof SiteSettings, label: 'Instagram', placeholder: 'https://instagram.com/yourprofile' },
                                { key: 'linkedin' as keyof SiteSettings, label: 'LinkedIn', placeholder: 'https://linkedin.com/company/yourcompany' },
                                { key: 'youtube' as keyof SiteSettings, label: 'YouTube', placeholder: 'https://youtube.com/@yourchannel' },
                            ].map((social) => (
                                <div key={social.key} className="space-y-2">
                                    <Label htmlFor={social.key}>{social.label}</Label>
                                    <Input
                                        id={social.key}
                                        value={settings[social.key] as string}
                                        onChange={(e) => updateSetting(social.key, e.target.value)}
                                        placeholder={social.placeholder}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integrations Tab */}
                <TabsContent value="integrations" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Analytics & Tracking</CardTitle>
                            <CardDescription>Connect your analytics and marketing tools</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="googleAnalyticsId">Google Analytics 4 ID</Label>
                                <Input
                                    id="googleAnalyticsId"
                                    value={settings.googleAnalyticsId}
                                    onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)}
                                    placeholder="G-XXXXXXXXXX"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Find this in your Google Analytics dashboard
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                                <Input
                                    id="googleTagManagerId"
                                    value={settings.googleTagManagerId}
                                    onChange={(e) => updateSetting('googleTagManagerId', e.target.value)}
                                    placeholder="GTM-XXXXXXX"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                                <Input
                                    id="facebookPixelId"
                                    value={settings.facebookPixelId}
                                    onChange={(e) => updateSetting('facebookPixelId', e.target.value)}
                                    placeholder="1234567890123456"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Advanced Tab */}
                <TabsContent value="advanced" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Code</CardTitle>
                            <CardDescription>Add custom CSS and JavaScript to your site</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="customCss">Custom CSS</Label>
                                <Textarea
                                    id="customCss"
                                    value={settings.customCss}
                                    onChange={(e) => updateSetting('customCss', e.target.value)}
                                    placeholder="/* Your custom CSS */&#10;.my-class {&#10;  color: #000;&#10;}"
                                    rows={8}
                                    className="font-mono text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="customJs">Custom JavaScript</Label>
                                <Textarea
                                    id="customJs"
                                    value={settings.customJs}
                                    onChange={(e) => updateSetting('customJs', e.target.value)}
                                    placeholder="// Your custom JavaScript&#10;console.log('Hello World');"
                                    rows={8}
                                    className="font-mono text-sm"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy & Compliance</CardTitle>
                            <CardDescription>Manage privacy and compliance settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Cookie Consent Banner</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Show GDPR-compliant cookie consent notice
                                    </p>
                                </div>
                                <Switch
                                    checked={settings.cookieConsentEnabled}
                                    onCheckedChange={(checked) => updateSetting('cookieConsentEnabled', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Floating Save Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    size="lg"
                    className="bg-accent hover:bg-accent/90 shadow-2xl"
                >
                    {saving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5 mr-2" />
                            Save All Settings
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
