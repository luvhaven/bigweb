'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Save,
  Globe,
  Mail,
  Phone,
  Twitter,
  Linkedin,
  Settings as SettingsIcon,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GlassCard, SectionHeader, Skeleton } from '@/components/admin/ui/GlassCard'
import { Switch } from '@/components/ui/switch'
import { useSiteSettings, useUpdateSiteSetting } from '@/hooks/useAdminContent'
import { toast } from 'sonner'

export default function SettingsPage() {
  const { data: settings, isLoading, error } = useSiteSettings()
  const updateSetting = useUpdateSiteSetting()

  const [formData, setFormData] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)

  // Initialize form data when settings load
  useEffect(() => {
    if (settings) {
      const data: Record<string, any> = {}
      settings.forEach(setting => {
        data[setting.key] = setting.value
      })
      setFormData(data)
    }
  }, [settings])

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Update all changed settings
      const promises = Object.entries(formData).map(([key, value]) => {
        const setting = settings?.find(s => s.key === key)
        if (setting && JSON.stringify(setting.value) !== JSON.stringify(value)) {
          return updateSetting.mutateAsync({ key, value })
        }
        return Promise.resolve()
      })

      await Promise.all(promises)
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-zinc-400">Failed to load settings. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Site Settings</h1>
          <p className="text-zinc-400 mt-1">
            Configure your website settings and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <GlassCard key={i} className="p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-10 w-full" />
            </GlassCard>
          ))}
        </div>
      ) : (
        <>
          {/* General Settings */}
          <GlassCard className="p-6">
            <SectionHeader title="General Information" />
            <div className="space-y-4">
              <div>
                <Label htmlFor="site_name" className="text-zinc-300">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Site Name
                </Label>
                <Input
                  id="site_name"
                  value={formData.site_name || ''}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  placeholder="Your Company Name"
                  className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                />
              </div>

              <div>
                <Label htmlFor="site_description" className="text-zinc-300">
                  Site Description
                </Label>
                <Input
                  id="site_description"
                  value={formData.site_description || ''}
                  onChange={(e) => handleChange('site_description', e.target.value)}
                  placeholder="A brief description of your website"
                  className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                />
              </div>
            </div>
          </GlassCard>

          {/* Contact Information */}
          <GlassCard className="p-6">
            <SectionHeader title="Contact Information" />
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact_email" className="text-zinc-300">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Contact Email
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email || ''}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  placeholder="hello@example.com"
                  className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                />
              </div>

              <div>
                <Label htmlFor="contact_phone" className="text-zinc-300">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Contact Phone
                </Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  value={formData.contact_phone || ''}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                />
              </div>
            </div>
          </GlassCard>

          {/* Social Media */}
          <GlassCard className="p-6">
            <SectionHeader title="Social Media" />
            <div className="space-y-4">
              <div>
                <Label htmlFor="social_twitter" className="text-zinc-300">
                  <Twitter className="w-4 h-4 inline mr-2" />
                  Twitter Handle
                </Label>
                <Input
                  id="social_twitter"
                  value={formData.social_twitter || ''}
                  onChange={(e) => handleChange('social_twitter', e.target.value)}
                  placeholder="@yourcompany"
                  className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                />
              </div>

              <div>
                <Label htmlFor="social_linkedin" className="text-zinc-300">
                  <Linkedin className="w-4 h-4 inline mr-2" />
                  LinkedIn Profile
                </Label>
                <Input
                  id="social_linkedin"
                  value={formData.social_linkedin || ''}
                  onChange={(e) => handleChange('social_linkedin', e.target.value)}
                  placeholder="company-name"
                  className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                />
              </div>
            </div>
          </GlassCard>

          {/* Advanced Settings */}
          <GlassCard className="p-6">
            <SectionHeader title="Advanced Settings" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-zinc-300">Analytics Tracking</Label>
                  <p className="text-sm text-zinc-500 mt-1">
                    Enable page view tracking and analytics
                  </p>
                </div>
                <Switch
                  checked={formData.analytics_enabled === true}
                  onCheckedChange={(checked) => handleChange('analytics_enabled', checked)}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div>
                  <Label className="text-zinc-300">Maintenance Mode</Label>
                  <p className="text-sm text-zinc-500 mt-1">
                    Put the website in maintenance mode
                  </p>
                </div>
                <Switch
                  checked={formData.maintenance_mode === true}
                  onCheckedChange={(checked) => handleChange('maintenance_mode', checked)}
                />
              </div>
            </div>
          </GlassCard>

          {/* Save Button (Bottom) */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
