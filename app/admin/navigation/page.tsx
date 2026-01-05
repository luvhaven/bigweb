'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { motion } from 'framer-motion'
import { Plus, Trash2, Save, GripVertical, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NavItem {
    id: string
    label: string
    url: string | null
    parent_id: string | null
    type: string
    sort_order: number
    children?: NavItem[]
}

export default function NavigationPage() {
    const [items, setItems] = useState<NavItem[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({ label: '', url: '', type: 'link' })
    const [saving, setSaving] = useState(false)
    const [expanded, setExpanded] = useState<Set<string>>(new Set())

    useEffect(() => {
        fetchNavigation()
    }, [])

    async function fetchNavigation() {
        const { data } = await supabase
            .from('cms_navigation')
            .select('*')
            .order('sort_order')

        if (data) {
            // Build tree structure
            const tree = buildTree(data)
            setItems(tree)
        }
        setLoading(false)
    }

    function buildTree(flat: NavItem[]): NavItem[] {
        const map = new Map<string, NavItem>()
        const roots: NavItem[] = []

        flat.forEach(item => {
            map.set(item.id, { ...item, children: [] })
        })

        flat.forEach(item => {
            const current = map.get(item.id)!
            if (item.parent_id && map.has(item.parent_id)) {
                map.get(item.parent_id)!.children?.push(current)
            } else {
                roots.push(current)
            }
        })

        return roots
    }

    async function handleSave() {
        if (!formData.label) return
        setSaving(true)

        try {
            if (editingId && editingId !== 'new') {
                await supabase.from('cms_navigation').update({
                    label: formData.label,
                    url: formData.url || null,
                    type: formData.type
                }).eq('id', editingId)
            } else {
                await supabase.from('cms_navigation').insert([{
                    label: formData.label,
                    url: formData.url || null,
                    type: formData.type,
                    sort_order: items.length + 1
                }])
            }
            await fetchNavigation()
            setEditingId(null)
            setFormData({ label: '', url: '', type: 'link' })
        } catch (error) {
            console.error('Error saving:', error)
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this navigation item and all children?')) return
        await supabase.from('cms_navigation').delete().eq('id', id)
        await fetchNavigation()
    }

    function toggleExpand(id: string) {
        const next = new Set(expanded)
        if (next.has(id)) {
            next.delete(id)
        } else {
            next.add(id)
        }
        setExpanded(next)
    }

    function renderItem(item: NavItem, depth = 0) {
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expanded.has(item.id)

        return (
            <div key={item.id}>
                <div
                    className={`flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group ${depth > 0 ? 'ml-6' : ''}`}
                >
                    <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab" />

                    {hasChildren ? (
                        <button onClick={() => toggleExpand(item.id)} className="text-zinc-400">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                    ) : (
                        <div className="w-4" />
                    )}

                    <span className="text-white font-medium flex-1">{item.label}</span>

                    {item.url && (
                        <span className="text-xs text-zinc-500">{item.url}</span>
                    )}

                    <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{item.type}</span>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item.id)}
                        className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-400"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

                {hasChildren && isExpanded && (
                    <div className="border-l border-white/10 ml-6">
                        {item.children!.map(child => renderItem(child, depth + 1))}
                    </div>
                )}
            </div>
        )
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Navigation</h1>
                    <p className="text-zinc-400 mt-1">Manage your site navigation structure</p>
                </div>
                <Button
                    onClick={() => {
                        setEditingId('new')
                        setFormData({ label: '', url: '', type: 'link' })
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
            </div>

            {/* Quick Add Form */}
            {editingId && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6"
                >
                    <h2 className="text-lg font-semibold text-white mb-4">Add Navigation Item</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            value={formData.label}
                            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                            placeholder="Label"
                            className="bg-zinc-800 border-white/10"
                        />
                        <Input
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            placeholder="URL (optional)"
                            className="bg-zinc-800 border-white/10"
                        />
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="bg-zinc-800 border border-white/10 rounded-md px-3 text-white"
                        >
                            <option value="link">Link</option>
                            <option value="dropdown">Dropdown</option>
                            <option value="mega_menu">Mega Menu</option>
                        </select>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <Button onClick={handleSave} disabled={saving} className="bg-emerald-600">
                            <Save className="w-4 h-4 mr-2" /> {saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button variant="outline" onClick={() => setEditingId(null)} className="border-white/10">
                            Cancel
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Navigation Tree */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4">
                {items.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                        No navigation items. Add your first menu item.
                    </div>
                ) : (
                    items.map(item => renderItem(item))
                )}
            </div>

            <div className="text-xs text-zinc-600">
                Note: Drag-and-drop reordering is under development. Use the Supabase dashboard to modify sort_order manually.
            </div>
        </div>
    )
}
