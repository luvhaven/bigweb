'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/utils/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Service {
    id: string
    title: string
    slug: string
    short_description: string | null
    icon: string | null
    is_active: boolean
    sort_order: number
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<Service>>({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchServices()
    }, [])

    async function fetchServices() {
        const { data } = await supabase
            .from('cms_services')
            .select('*')
            .order('sort_order')

        if (data) setServices(data)
        setLoading(false)
    }

    async function handleSave() {
        if (!formData.slug || !formData.title) return

        setSaving(true)
        try {
            if (editingId && editingId !== 'new') {
                await supabase
                    .from('cms_services')
                    .update({
                        title: formData.title,
                        slug: formData.slug,
                        short_description: formData.short_description,
                        icon: formData.icon,
                        is_active: formData.is_active ?? true,
                        sort_order: formData.sort_order ?? 0
                    })
                    .eq('id', editingId)
            } else {
                await supabase.from('cms_services').insert([{
                    title: formData.title,
                    slug: formData.slug,
                    short_description: formData.short_description,
                    icon: formData.icon,
                    is_active: formData.is_active ?? true,
                    sort_order: formData.sort_order ?? services.length + 1
                }])
            }

            await fetchServices()
            setEditingId(null)
            setFormData({})
        } catch (error) {
            console.error('Error saving service:', error)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this service?')) return

        await supabase.from('cms_services').delete().eq('id', id)
        await fetchServices()
    }

    async function toggleActive(id: string, current: boolean) {
        await supabase.from('cms_services').update({ is_active: !current }).eq('id', id)
        await fetchServices()
    }

    function startEdit(service: Service) {
        setEditingId(service.id)
        setFormData({ ...service })
    }

    function startCreate() {
        setEditingId('new')
        setFormData({ slug: '', title: '', is_active: true })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Services</h1>
                    <p className="text-zinc-400 mt-1">Manage your service offerings</p>
                </div>
                <Button
                    onClick={startCreate}
                    className="bg-emerald-600 hover:bg-emerald-500"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Service
                </Button>
            </div>

            {/* Edit/Create Form */}
            {editingId && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
                >
                    <h2 className="text-lg font-semibold text-white mb-4">
                        {editingId === 'new' ? 'Create Service' : 'Edit Service'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Title</label>
                            <Input
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Service Name"
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Slug</label>
                            <Input
                                value={formData.slug || ''}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="web-development"
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Icon (Lucide name)</label>
                            <Input
                                value={formData.icon || ''}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                placeholder="Code, Brain, Search..."
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Sort Order</label>
                            <Input
                                type="number"
                                value={formData.sort_order || 0}
                                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                                className="bg-zinc-800 border-white/10"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-1">Short Description</label>
                            <Textarea
                                value={formData.short_description || ''}
                                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                                placeholder="Brief description of this service..."
                                className="bg-zinc-800 border-white/10"
                                rows={2}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-emerald-600 hover:bg-emerald-500"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {saving ? 'Saving...' : 'Save Service'}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => { setEditingId(null); setFormData({}) }}
                            className="border-white/10"
                        >
                            <X className="w-4 h-4 mr-2" /> Cancel
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`bg-zinc-900/50 border rounded-2xl p-5 transition-all ${service.is_active ? 'border-white/10' : 'border-red-500/20 opacity-60'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-white font-semibold">{service.title}</h3>
                                <code className="text-xs text-emerald-400">/services/{service.slug}</code>
                            </div>
                            <div className="flex gap-1">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => toggleActive(service.id, service.is_active)}
                                    className="text-zinc-400 hover:text-white"
                                >
                                    {service.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => startEdit(service)}
                                    className="text-zinc-400 hover:text-white"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDelete(service.id)}
                                    className="text-zinc-400 hover:text-red-400"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="text-zinc-400 text-sm line-clamp-2">
                            {service.short_description || 'No description'}
                        </p>
                    </motion.div>
                ))}
            </div>

            {services.length === 0 && !editingId && (
                <div className="text-center py-12 bg-zinc-900/50 border border-white/10 rounded-2xl">
                    <p className="text-zinc-500">No services yet. Create your first service.</p>
                </div>
            )}
        </div>
    )
}
