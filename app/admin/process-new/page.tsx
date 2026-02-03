'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ProcessPhase } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Plus, Save, Trash2, Eye, EyeOff, Clock, Package } from 'lucide-react'
import { toast } from 'sonner'

export default function ProcessAdmin() {
    const [phases, setPhases] = useState<ProcessPhase[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<ProcessPhase>>({})
    const [detailsInput, setDetailsInput] = useState('')

    useEffect(() => {
        fetchPhases()
    }, [])

    const fetchPhases = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('process_phases')
            .select('*')
            .order('order_index', { ascending: true })

        if (error) {
            toast.error('Failed to fetch phases')
            console.error(error)
        } else {
            setPhases(data as ProcessPhase[])
        }
        setLoading(false)
    }

    const handleSave = async () => {
        if (!formData.title || !formData.step_number) {
            toast.error('Title and step number are required')
            return
        }

        // Convert details input to array
        const details = detailsInput
            .split('\n')
            .map(d => d.trim())
            .filter(d => d.length > 0)

        const dataToSave = {
            ...formData,
            details
        }

        const supabase = createClient()

        if (editingId) {
            // Update existing
            const { error } = await supabase
                .from('process_phases')
                .update(dataToSave)
                .eq('id', editingId)

            if (error) {
                toast.error('Failed to update phase')
                console.error(error)
            } else {
                toast.success('Phase updated successfully')
                resetForm()
                fetchPhases()
            }
        } else {
            // Create new
            const { error } = await supabase
                .from('process_phases')
                .insert({ ...dataToSave, order_index: phases.length + 1 })

            if (error) {
                toast.error('Failed to create phase')
                console.error(error)
            } else {
                toast.success('Phase created successfully')
                resetForm()
                fetchPhases()
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this phase?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('process_phases')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error('Failed to delete phase')
            console.error(error)
        } else {
            toast.success('Phase deleted successfully')
            fetchPhases()
        }
    }

    const toggleStatus = async (phase: ProcessPhase) => {
        const supabase = createClient()
        const newStatus = phase.status === 'published' ? 'draft' : 'published'

        const { error } = await supabase
            .from('process_phases')
            .update({ status: newStatus })
            .eq('id', phase.id)

        if (error) {
            toast.error('Failed to toggle status')
        } else {
            toast.success(`Phase ${newStatus}`)
            fetchPhases()
        }
    }

    const resetForm = () => {
        setEditingId(null)
        setFormData({})
        setDetailsInput('')
    }

    const startEdit = (phase: ProcessPhase) => {
        setEditingId(phase.id)
        setFormData(phase)
        setDetailsInput(phase.details?.join('\n') || '')
    }

    if (loading) {
        return <div className="p-8 text-zinc-500 font-mono">INITIALIZING_MODULE...</div>
    }

    return (
        <div className="p-8 max-w-7xl mx-auto selection:bg-orange-500/30">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">Process_Manager</h1>
                    <p className="text-zinc-500 mt-2 font-mono text-xs uppercase tracking-[0.3em]">Operational_Doctrine_CRUD_v1.0</p>
                </div>
                <Button
                    className="bg-white text-black hover:bg-orange-600 hover:text-white font-black uppercase tracking-widest rounded-none"
                    onClick={() => {
                        resetForm()
                        setFormData({
                            status: 'published',
                            details: []
                        })
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Phase
                </Button>
            </div>

            {/* Edit Form */}
            {(editingId || Object.keys(formData).length > 0) && (
                <Card className="p-8 mb-12 bg-zinc-950 border-zinc-800 rounded-none shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-orange-600" />
                    <h2 className="text-2xl font-black uppercase italic mb-8 tracking-tight">
                        {editingId ? 'Edit_Phase' : 'New_Phase'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">Core Information</label>
                            <Input
                                className="bg-black border-zinc-800 rounded-none h-12"
                                placeholder="Step Number (e.g., 01)"
                                value={formData.step_number || ''}
                                onChange={(e) => setFormData({ ...formData, step_number: e.target.value })}
                            />
                            <Input
                                className="bg-black border-zinc-800 rounded-none h-12"
                                placeholder="Phase ID (e.g., PHASE_01)"
                                value={formData.phase_id || ''}
                                onChange={(e) => setFormData({ ...formData, phase_id: e.target.value })}
                            />
                            <Input
                                className="bg-black border-zinc-800 rounded-none h-12"
                                placeholder="Title"
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                            <Input
                                className="bg-black border-zinc-800 rounded-none h-12"
                                placeholder="Subtitle"
                                value={formData.subtitle || ''}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            />
                            <Textarea
                                className="bg-black border-zinc-800 rounded-none"
                                placeholder="Description"
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">Logistics & Styling</label>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="Timeline"
                                    value={formData.timeline || ''}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                />
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="Price"
                                    value={formData.price || ''}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                            <Input
                                className="bg-black border-zinc-800 rounded-none h-12"
                                placeholder="Deliverable"
                                value={formData.deliverable || ''}
                                onChange={(e) => setFormData({ ...formData, deliverable: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="CTA Text"
                                    value={formData.cta_text || ''}
                                    onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                                />
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="CTA Link"
                                    value={formData.cta_link || ''}
                                    onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="Icon (e.g., Search)"
                                    value={formData.icon || ''}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                />
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="Text Color (Tailwind)"
                                    value={formData.color || ''}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="BG Color (Tailwind)"
                                    value={formData.bg_color || ''}
                                    onChange={(e) => setFormData({ ...formData, bg_color: e.target.value })}
                                />
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="Border Color (Tailwind)"
                                    value={formData.border_color || ''}
                                    onChange={(e) => setFormData({ ...formData, border_color: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                            <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">Details (One per line)</label>
                            <Textarea
                                className="bg-black border-zinc-800 rounded-none"
                                placeholder="Methodology points..."
                                value={detailsInput}
                                onChange={(e) => setDetailsInput(e.target.value)}
                                rows={6}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12 bg-zinc-900/10 p-4 border border-zinc-900">
                        <Button
                            onClick={handleSave}
                            className="bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-none h-14 px-10"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            DEPLOY_CHANGES
                        </Button>
                        <Button
                            variant="outline"
                            onClick={resetForm}
                            className="bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white font-black uppercase tracking-widest rounded-none h-14 px-10"
                        >
                            ABORT_PROCESS
                        </Button>
                    </div>
                </Card>
            )}

            {/* Phases List */}
            <div className="grid gap-6">
                {phases.map((phase) => (
                    <Card
                        key={phase.id}
                        className="p-8 bg-zinc-950 border border-zinc-900 rounded-none hover:border-zinc-700 transition-all group overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                            <Package className="w-40 h-40 transform rotate-12" />
                        </div>

                        <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                            <div className="flex-1">
                                <div className="flex items-center gap-6 mb-4">
                                    <span className="text-4xl font-black text-zinc-900 italic select-none">
                                        {phase.step_number}
                                    </span>
                                    <div>
                                        <h3 className="text-2xl font-black uppercase italic tracking-tight">{phase.title}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${phase.border_color} ${phase.bg_color} ${phase.color} uppercase tracking-tighter`}>
                                                {phase.phase_id}
                                            </span>
                                            <span
                                                className={`text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded ${phase.status === 'published'
                                                        ? 'bg-green-500/10 text-green-500'
                                                        : 'bg-orange-500/10 text-orange-500'
                                                    }`}
                                            >
                                                {phase.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-zinc-500 text-lg mb-6 leading-relaxed max-w-3xl">
                                    {phase.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="bg-zinc-900/20 p-4 border border-zinc-900/50">
                                        <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-1">Timeline</div>
                                        <div className="text-white font-bold flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-zinc-600" />
                                            {phase.timeline}
                                        </div>
                                    </div>
                                    <div className="bg-zinc-900/20 p-4 border border-zinc-900/50">
                                        <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-1">Investment</div>
                                        <div className="text-white font-bold">{phase.price}</div>
                                    </div>
                                    <div className="bg-zinc-900/20 p-4 border border-zinc-900/50">
                                        <div className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-1">Deliverable</div>
                                        <div className="text-white font-bold text-xs truncate" title={phase.deliverable || ''}>
                                            {phase.deliverable}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-2 shrink-0">
                                <Button
                                    variant="ghost"
                                    className="h-12 w-12 p-0 hover:bg-zinc-900 text-zinc-600 hover:text-white"
                                    onClick={() => toggleStatus(phase)}
                                >
                                    {phase.status === 'published' ? (
                                        <Eye className="w-5 h-5" />
                                    ) : (
                                        <EyeOff className="w-5 h-5" />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="h-12 px-6 font-black uppercase italic tracking-widest text-xs hover:bg-zinc-900 text-zinc-600 hover:text-white"
                                    onClick={() => startEdit(phase)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="h-12 w-12 p-0 hover:bg-red-500/10 text-zinc-600 hover:text-red-500"
                                    onClick={() => handleDelete(phase.id)}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}

                {phases.length === 0 && (
                    <div className="py-20 text-center border-2 border-dashed border-zinc-900 text-zinc-700 font-black uppercase tracking-widest italic">
                        NO_PHASES_REGISTERED
                    </div>
                )}
            </div>
        </div>
    )
}
