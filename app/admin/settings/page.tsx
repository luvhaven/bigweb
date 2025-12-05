'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Save, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSettings, updateSettings, SiteSettings, initializeDataStore } from '@/lib/dataStore'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    initializeDataStore()
    setSettings(getSettings())
  }, [router])

  const handleSave = () => {
    if (!settings) return
    
    setIsSaving(true)
    updateSettings(settings)
    
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage('Settings saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
      
      // Trigger a page reload to reflect changes
      window.dispatchEvent(new Event('settingsUpdated'))
    }, 500)
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Site Settings</h1>
                <p className="text-sm text-muted-foreground">
                  Configure your website settings
                </p>
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-accent hover:bg-accent/90"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Save Message */}
        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500"
          >
            {saveMessage}
          </motion.div>
        )}

        <div className="space-y-8">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6">General Information</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Site Tagline</label>
                  <input
                    type="text"
                    value={settings.siteTagline}
                    onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6">Homepage Hero</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Hero Title</label>
                <input
                  type="text"
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                <input
                  type="text"
                  value={settings.heroSubtitle}
                  onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">About Text</label>
                <textarea
                  value={settings.aboutText}
                  onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none h-32 resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Feature Toggles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6">Feature Toggles</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                <input
                  type="checkbox"
                  checked={settings.servicesEnabled}
                  onChange={(e) => setSettings({ ...settings, servicesEnabled: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-medium">Enable Services Section</p>
                  <p className="text-sm text-muted-foreground">Show/hide services page and navigation</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg cursor-pointer hover:bg-secondary/30 transition-colors">
                <input
                  type="checkbox"
                  checked={settings.portfolioEnabled}
                  onChange={(e) => setSettings({ ...settings, portfolioEnabled: e.target.checked })}
                  className="w-5 h-5"
                />
                <div>
                  <p className="font-medium">Enable Portfolio Section</p>
                  <p className="text-sm text-muted-foreground">Show/hide portfolio gallery and projects</p>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-muted-foreground"
          >
            Last updated: {new Date(settings.updatedAt).toLocaleString()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
