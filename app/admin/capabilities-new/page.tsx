'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Capability } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Plus, Save, Trash2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function CapabilitiesAdmin() {
    const [capabilities, setCapabilities] = useState<Capability[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<Capability>>({})

    useEffect(() => {
        fetchCapabilities()
    }, [])

    const fetchCapabilities = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('capabilities')
            .select('*')
            .order('order_index', { ascending: true })

        if (error) {
            toast.error('Failed to fetch capabilities')
            console.error(error)
        } else {
            setCapabilities(data as Capability[])
        }
        setLoading(false)
    }

    const handleSave = async () => {
        if (!formData.title || !formData.slug) {
            toast.error('Title and slug are required')
            return
        }

        const supabase = createClient()

        if (editingId) {
            // Update existing
            const { error } = await supabase
                .from('capabilities')
                .update(formData)
                .eq('id', editingId)

            if (error) {
                toast.error('Failed to update capability')
                console.error(error)
            } else {
                toast.success('Capability updated successfully')
                setEditingId(null)
                setFormData({})
                fetchCapabilities()
            }
        } else {
            // Create new
            const { error } = await supabase
                .from('capabilities')
                .insert({ ...formData, order_index: capabilities.length + 1 })

            if (error) {
                toast.error('Failed to create capability')
                console.error(error)
            } else {
                toast.success('Capability created successfully')
                setFormData({})
                fetchCapabilities()
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this capability?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('capabilities')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error('Failed to delete capability')
            console.error(error)
        } else {
            toast.success('Capability deleted successfully')
            fetchCapabilities()
        }
    }

    const toggleStatus = async (capability: Capability) => {
        const supabase = createClient()
        const newStatus = capability.status === 'published' ? 'draft' : 'published'

        const { error } = await supabase
            .from('capabilities')
            .update({ status: newStatus })
            .eq('id', capability.id)

        if (error) {
            toast.error('Failed to toggle status')
        } else {
            toast.success(`Capability ${newStatus}`)
            fetchCapabilities()
        }
    }

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Capabilities Manager</h1>
                    <p className="text-zinc-500 mt-2">Manage your 5 core service offerings</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingId(null)
                        setFormData({
                            status: 'draft',
                            features: [],
                            metadata: {}
                        })
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Capability
                </Button>
            </div>

            {/* Edit Form */}
            {(editingId || Object.keys(formData).length > 0) && (
                <Card className="p-6 mb-8 bg-zinc-950 border-zinc-800">
                    <h2 className="text-xl font-bold mb-4">
                        {editingId ? 'Edit Capability' : 'New Capability'}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            placeholder="Slug (e.g., web-engineering)"
                            value={formData.slug || ''}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                        <Input
                            placeholder="Number (e.g., 01)"
                            value={formData.number || ''}
                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        />
                        <Input
                            className="col-span-2"
                            placeholder="Title"
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <Textarea
                            className="col-span-2"
                            placeholder="Description"
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                        <Input
                            placeholder="Icon (e.g., Terminal)"
                            value={formData.icon || ''}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        />
                        <Input
                            placeholder="Color (e.g., blue)"
                            value={formData.color || ''}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        />
                        <Input
                            className="col-span-2"
                            placeholder="Route (e.g., /services/web-engineering)"
                            value={formData.route || ''}
                            onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button onClick={handleSave}>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setEditingId(null)
                                setFormData({})
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Card>
            )}

            {/* Capabilities List */}
            <div className="grid gap-4">
                {capabilities.map((capability) => (
                    <Card
                        key={capability.id}
                        className="p-6 bg-zinc-950 border-zinc-800 hover:border-zinc-700 transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-mono text-zinc-600">
                                        {capability.number}
                                    </span>
                                    <h3 className="text-xl font-black">{capability.title}</h3>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded ${capability.status === 'published'
                                                ? 'bg-green-500/20 text-green-500'
                                                : 'bg-yellow-500/20 text-yellow-500'
                                            }`}
                                    >
                                        {capability.status}
                                    </span>
                                </div>
                                <p className="text-zinc-400 text-sm mb-2">{capability.description}</p>
                                <div className="flex gap-2 text-xs text-zinc-600">
                                    <span>Icon: {capability.icon}</span>
                                    <span>•</span>
                                    <span>Color: {capability.color}</span>
                                    <span>•</span>
                                    <span>Route: {capability.route}</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleStatus(capability)}
                                >
                                    {capability.status === 'published' ? (
                                        <Eye className="w-4 h-4" />
                                    ) : (
                                        <EyeOff className="w-4 h-4" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setEditingId(capability.id)
                                        setFormData(capability)
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(capability.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
