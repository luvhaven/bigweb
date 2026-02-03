'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { PageMetadata } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Plus, Save, Trash2, Globe, Share2, Search } from 'lucide-react'
import { toast } from 'sonner'

export default function SEOAdmin() {
    const [metadataList, setMetadataList] = useState<PageMetadata[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<PageMetadata>>({})
    const [keywordsInput, setKeywordsInput] = useState('')

    useEffect(() => {
        fetchMetadata()
    }, [])

    const fetchMetadata = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('page_metadata')
            .select('*')
            .order('route', { ascending: true })

        if (error) {
            toast.error('Failed to fetch metadata')
            console.error(error)
        } else {
            setMetadataList(data as PageMetadata[])
        }
        setLoading(false)
    }

    const handleSave = async () => {
        if (!formData.route || !formData.title) {
            toast.error('Route and title are required')
            return
        }

        // Convert keywords input to array
        const keywords = keywordsInput
            .split(',')
            .map(k => k.trim())
            .filter(k => k.length > 0)

        const dataToSave = {
            ...formData,
            keywords
        }

        const supabase = createClient()

        if (editingId) {
            // Update existing
            const { error } = await supabase
                .from('page_metadata')
                .update(dataToSave)
                .eq('id', editingId)

            if (error) {
                toast.error('Failed to update metadata')
                console.error(error)
            } else {
                toast.success('Metadata updated successfully')
                resetForm()
                fetchMetadata()
            }
        } else {
            // Create new
            const { error } = await supabase
                .from('page_metadata')
                .insert(dataToSave)

            if (error) {
                toast.error('Failed to create metadata')
                console.error(error)
            } else {
                toast.success('Metadata created successfully')
                resetForm()
                fetchMetadata()
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this metadata?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('page_metadata')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error('Failed to delete metadata')
            console.error(error)
        } else {
            toast.success('Metadata deleted successfully')
            fetchMetadata()
        }
    }

    const resetForm = () => {
        setEditingId(null)
        setFormData({})
        setKeywordsInput('')
    }

    const startEdit = (metadata: PageMetadata) => {
        setEditingId(metadata.id)
        setFormData(metadata)
        setKeywordsInput(metadata.keywords?.join(', ') || '')
    }

    if (loading) {
        return <div className="p-8 text-zinc-500 font-mono">LOADING_SEO_DATABASE...</div>
    }

    return (
        <div className="p-8 max-w-7xl mx-auto selection:bg-orange-500/30">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">SEO_Engine</h1>
                    <p className="text-zinc-500 mt-2 font-mono text-xs uppercase tracking-[0.3em]">Metadata_Registry_CRUD_v2.1</p>
                </div>
                <Button
                    className="bg-white text-black hover:bg-orange-600 hover:text-white font-black uppercase tracking-widest rounded-none"
                    onClick={() => {
                        resetForm()
                        setFormData({})
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Page Route
                </Button>
            </div>

            {/* Edit Form */}
            {(editingId || Object.keys(formData).length > 0) && (
                <Card className="p-8 mb-12 bg-zinc-950 border-zinc-800 rounded-none shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                    <h2 className="text-2xl font-black uppercase italic mb-8 tracking-tight">
                        {editingId ? 'Edit_Metadata' : 'New_Registry_Entry'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Standard Meta */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Route Configuration</label>
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12 font-mono"
                                    placeholder="/services/web-engineering"
                                    value={formData.route || ''}
                                    onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Meta Title</label>
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="Page Title (Max 60 chars)"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Meta Description</label>
                                <Textarea
                                    className="bg-black border-zinc-800 rounded-none"
                                    placeholder="Page description (Max 160 chars)"
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Keywords (Comma separated)</label>
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="web engineering, seo, revenue..."
                                    value={keywordsInput}
                                    onChange={(e) => setKeywordsInput(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Social / Advanced */}
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">OpenGraph Title</label>
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="OG Title"
                                    value={formData.og_title || ''}
                                    onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">OpenGraph Description</label>
                                <Textarea
                                    className="bg-black border-zinc-800 rounded-none"
                                    placeholder="OG Description"
                                    value={formData.og_description || ''}
                                    onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Robots Tag</label>
                                    <Input
                                        className="bg-black border-zinc-800 rounded-none h-12 font-mono text-xs"
                                        placeholder="index, follow"
                                        value={formData.robots || ''}
                                        onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Twitter Card</label>
                                    <Input
                                        className="bg-black border-zinc-800 rounded-none h-12 font-mono text-xs"
                                        placeholder="summary_large_image"
                                        value={formData.twitter_card || ''}
                                        onChange={(e) => setFormData({ ...formData, twitter_card: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12 bg-zinc-900/10 p-4 border border-zinc-900">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-none h-14 px-10"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            UPGRADE_MANIFEST
                        </Button>
                        <Button
                            variant="outline"
                            onClick={resetForm}
                            className="bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white font-black uppercase tracking-widest rounded-none h-14 px-10"
                        >
                            DISCARD_BUFFER
                        </Button>
                    </div>
                </Card>
            )}

            {/* Metadata List */}
            <div className="grid gap-6">
                {metadataList.map((meta) => (
                    <Card
                        key={meta.id}
                        className="p-0 bg-zinc-950 border border-zinc-900 rounded-none hover:border-zinc-700 transition-all group overflow-hidden"
                    >
                        <div className="flex items-stretch divide-x divide-zinc-900">
                            {/* Route Label */}
                            <div className="w-48 bg-zinc-900/10 flex flex-col justify-center items-center p-4">
                                <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest mb-2">Route</div>
                                <div className="text-white font-black font-mono text-xs text-center break-all">{meta.route}</div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 p-8">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h3 className="text-xl font-black uppercase italic tracking-tight">{meta.title}</h3>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-10 px-4 font-black uppercase italic tracking-widest text-[10px] hover:bg-zinc-900 text-zinc-600 hover:text-white"
                                            onClick={() => startEdit(meta)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-10 w-10 p-0 hover:bg-red-500/10 text-zinc-600 hover:text-red-500"
                                            onClick={() => handleDelete(meta.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-zinc-500 text-sm mb-6 leading-relaxed border-l-2 border-zinc-800 pl-4">
                                    {meta.description}
                                </p>

                                <div className="flex flex-wrap gap-4 text-[9px] font-mono font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2 text-zinc-600 bg-zinc-900/50 px-3 py-1.5 border border-zinc-900">
                                        <Globe className="w-3 h-3 text-blue-500" /> SEO_Active
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-600 bg-zinc-900/50 px-3 py-1.5 border border-zinc-900">
                                        <Share2 className="w-3 h-3 text-purple-500" /> OG_Configured
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-600 bg-zinc-900/50 px-3 py-1.5 border border-zinc-900">
                                        <Search className="w-3 h-3 text-green-500" /> {meta.keywords?.length || 0} Keywords
                                    </div>
                                </div>
                            </div>

                            {/* Status Visual */}
                            <div className="w-2 flex flex-col">
                                <div className="flex-1 bg-green-500/20" />
                                <div className="flex-1 bg-blue-500/20" />
                                <div className="flex-1 bg-purple-500/20" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
