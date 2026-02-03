'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus, Trash2, Save, Layers, ChevronRight,
    Search, ExternalLink, Globe, Layout,
    Type, Image as ImageIcon, Code,
    MoreVertical, Edit3, CheckCircle2, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import type { PageSection } from '@/types/database'

export default function SectionsAdmin() {
    const [sections, setSections] = useState<PageSection[]>([])
    const [loading, setLoading] = useState(true)
    const [filterRoute, setFilterRoute] = useState('/')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<PageSection>>({
        page_route: '/',
        section_key: '',
        section_type: 'content',
        status: 'published'
    })

    useEffect(() => {
        fetchSections()
    }, [filterRoute])

    const fetchSections = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('page_sections')
            .select('*')
            .eq('page_route', filterRoute)
            .order('order_index', { ascending: true })

        if (error) {
            toast.error('Failed to fetch sections')
        } else {
            setSections(data || [])
        }
        setLoading(false)
    }

    const handleSave = async () => {
        if (!formData.section_key || !formData.page_route) {
            toast.error('Route and Key are required')
            return
        }

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            toast.error('Unauthorized')
            return
        }

        if (editingId) {
            const { error } = await supabase
                .from('page_sections')
                .update(formData)
                .eq('id', editingId)

            if (error) toast.error(error.message)
            else toast.success('Section updated')
        } else {
            const { error } = await supabase
                .from('page_sections')
                .insert([{ ...formData, order_index: sections.length }])

            if (error) toast.error(error.message)
            else toast.success('Section created')
        }

        setEditingId(null)
        setFormData({ page_route: filterRoute, section_key: '', section_type: 'content', status: 'published' })
        fetchSections()
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure? This action cannot be undone.')) return
        const { error } = await supabase.from('page_sections').delete().eq('id', id)
        if (error) toast.error(error.message)
        else {
            toast.success('Section deleted')
            fetchSections()
        }
    }

    return (
        <div className="p-8 max-w-7xl mx-auto selection:bg-orange-500/30">
            {/* Header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-orange-600 rounded-none flex items-center justify-center">
                            <Layers className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">SECTION_REGISTRY</h1>
                    </div>
                    <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">Granular control over page architecture</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-orange-500 transition-colors" />
                        <Input
                            value={filterRoute}
                            onChange={(e) => setFilterRoute(e.target.value)}
                            placeholder="/services/web-engineering"
                            className="bg-zinc-900/50 border-zinc-800 rounded-none h-12 pl-10 w-64 text-sm font-mono focus:border-orange-500/50 transition-all"
                        />
                    </div>
                    <Button
                        onClick={() => {
                            setEditingId(null)
                            setFormData({ page_route: filterRoute, section_key: '', section_type: 'content', status: 'published' })
                        }}
                        className="bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest rounded-none h-12 px-6"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        INITIALIZE_BLOCK
                    </Button>
                </div>
            </div>

            {/* Editor Overlay */}
            <AnimatePresence>
                {(editingId || formData.section_key) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mb-12"
                    >
                        <Card className="p-8 bg-zinc-950 border-zinc-800 rounded-none shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <Layers className="w-32 h-32 text-white" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Route Binding</label>
                                        <Input
                                            className="bg-black border-zinc-800 rounded-none h-12 font-mono"
                                            value={formData.page_route}
                                            onChange={(e) => setFormData({ ...formData, page_route: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Section Key (Unique ID)</label>
                                        <Input
                                            className="bg-black border-zinc-800 rounded-none h-12 font-mono"
                                            placeholder="hero_section_v1"
                                            value={formData.section_key}
                                            onChange={(e) => setFormData({ ...formData, section_key: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Block Type</label>
                                        <select
                                            className="w-full h-12 bg-black border border-zinc-800 rounded-none px-4 text-white text-sm font-mono focus:border-orange-500 outline-none"
                                            value={formData.section_type}
                                            onChange={(e) => setFormData({ ...formData, section_type: e.target.value })}
                                        >
                                            <option value="hero">HERO</option>
                                            <option value="features">FEATURES</option>
                                            <option value="cta">CTA</option>
                                            <option value="content">CONTENT</option>
                                            <option value="testimonials">TESTIMONIALS</option>
                                            <option value="pricing">PRICING</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Title / Heading</label>
                                        <Input
                                            className="bg-black border-zinc-800 rounded-none h-12"
                                            value={formData.title || ''}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Subtitle / Label</label>
                                        <Input
                                            className="bg-black border-zinc-800 rounded-none h-12"
                                            value={formData.subtitle || ''}
                                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Description / Body</label>
                                        <textarea
                                            className="w-full bg-black border border-zinc-800 rounded-none p-4 text-white text-sm focus:border-orange-500 outline-none min-h-[100px]"
                                            value={formData.description || ''}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Status Control</label>
                                        <div className="flex gap-2">
                                            {['draft', 'published', 'archived'].map((s) => (
                                                <Button
                                                    key={s}
                                                    onClick={() => setFormData({ ...formData, status: s })}
                                                    className={`flex-1 rounded-none h-12 font-black text-[10px] uppercase tracking-widest transition-all ${formData.status === s
                                                        ? 'bg-orange-600 text-white'
                                                        : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'
                                                        }`}
                                                >
                                                    {s}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-zinc-900/50 border border-zinc-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Code className="w-4 h-4 text-zinc-500" />
                                            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">JSON_PAYLOAD_READY</span>
                                        </div>
                                        <p className="text-[10px] text-zinc-600 leading-relaxed italic">
                                            Support for complex nested content and metadata available via direct API or advanced editor.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-12 bg-zinc-900/10 p-4 border border-zinc-900">
                                <Button
                                    onClick={handleSave}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-none h-14 px-10 shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    COMMIT_DATA_STRUCTURE
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setEditingId(null)
                                        setFormData({ page_route: filterRoute, section_key: '', section_type: 'content', status: 'published' })
                                    }}
                                    className="bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white font-black uppercase tracking-widest rounded-none h-14 px-10"
                                >
                                    ABORT_OPERATION
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sections List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center p-20">
                        <div className="w-8 h-8 border-t-2 border-orange-500 rounded-full animate-spin" />
                    </div>
                ) : sections.length === 0 ? (
                    <Card className="p-20 text-center bg-zinc-950 border-zinc-900 border-dashed rounded-none">
                        <Layout className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                        <p className="text-zinc-600 font-mono text-sm uppercase tracking-widest">No active sections mapped for {filterRoute}</p>
                    </Card>
                ) : (
                    sections.map((section) => (
                        <Card
                            key={section.id}
                            className={`group overflow-hidden rounded-none bg-zinc-950 border transition-all duration-500 ${section.status === 'published' ? 'border-zinc-900 hover:border-orange-500/30' : 'border-zinc-900 opacity-60'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-stretch">
                                <div className={`w-2 shrink-0 ${section.status === 'published' ? 'bg-emerald-500/20' : 'bg-zinc-800'
                                    }`} />

                                <div className="p-6 flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-widest bg-zinc-900 px-2 py-1">
                                                ID: {section.section_key}
                                            </span>
                                            <span className="text-[10px] font-mono font-black text-orange-500 uppercase tracking-widest">
                                                [{section.section_type}]
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    setEditingId(section.id)
                                                    setFormData(section)
                                                }}
                                                className="text-zinc-500 hover:text-white"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDelete(section.id)}
                                                className="text-zinc-500 hover:text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{section.title || 'Untitled Block'}</h3>
                                    <p className="text-sm text-zinc-500 mt-2 line-clamp-2 leading-relaxed">{section.description}</p>
                                </div>

                                <div className="w-full md:w-64 bg-zinc-900/30 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-zinc-900">
                                    <div className="flex items-center gap-2 mb-4">
                                        {section.status === 'published' ? (
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        ) : (
                                            <AlertCircle className="w-3 h-3 text-zinc-500" />
                                        )}
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${section.status === 'published' ? 'text-emerald-500' : 'text-zinc-500'
                                            }`}>
                                            STATUS_{section.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600">
                                            <span>VERSION</span>
                                            <span className="text-white">1.0.4</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600">
                                            <span>SYNC_STATE</span>
                                            <span className="text-emerald-500">OPTIMAL</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
