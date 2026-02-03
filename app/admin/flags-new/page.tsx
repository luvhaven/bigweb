'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { FeatureFlag } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Plus, Save, Trash2, Power, Zap, Lock, Shield, Eye } from 'lucide-react'
import { toast } from 'sonner'

export default function FlagsAdmin() {
    const [flags, setFlags] = useState<FeatureFlag[]>([])
    const [loading, setLoading] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<FeatureFlag>>({})

    useEffect(() => {
        fetchFlags()
    }, [])

    const fetchFlags = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('feature_flags')
            .select('*')
            .order('key', { ascending: true })

        if (error) {
            toast.error('Failed to fetch feature flags')
            console.error(error)
        } else {
            setFlags(data as FeatureFlag[])
        }
        setLoading(false)
    }

    const handleSave = async () => {
        if (!formData.flag_key || !formData.flag_name) {
            toast.error('Key and name are required')
            return
        }

        const supabase = createClient()

        if (editingId) {
            // Update existing
            const { error } = await supabase
                .from('feature_flags')
                .update(formData)
                .eq('id', editingId)

            if (error) {
                toast.error('Failed to update flag')
                console.error(error)
            } else {
                toast.success('Feature flag updated successfully')
                resetForm()
                fetchFlags()
            }
        } else {
            // Create new
            const { error } = await supabase
                .from('feature_flags')
                .insert({ ...formData, enabled: formData.enabled ?? true })

            if (error) {
                toast.error('Failed to create flag')
                console.error(error)
            } else {
                toast.success('Feature flag created successfully')
                resetForm()
                fetchFlags()
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this feature flag?')) return

        const supabase = createClient()
        const { error } = await supabase
            .from('feature_flags')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error('Failed to delete flag')
            console.error(error)
        } else {
            toast.success('Feature flag deleted successfully')
            fetchFlags()
        }
    }

    const toggleFlag = async (flag: FeatureFlag) => {
        const supabase = createClient()
        const newState = !flag.enabled

        const { error } = await supabase
            .from('feature_flags')
            .update({ enabled: newState })
            .eq('id', flag.id)

        if (error) {
            toast.error('Failed to toggle flag')
        } else {
            toast.success(`Flag ${flag.flag_key} ${newState ? 'enabled' : 'disabled'}`)
            fetchFlags()
        }
    }

    const resetForm = () => {
        setEditingId(null)
        setFormData({})
    }

    const startEdit = (flag: FeatureFlag) => {
        setEditingId(flag.id)
        setFormData(flag)
    }

    if (loading) {
        return <div className="p-8 text-zinc-500 font-mono">SCANNING_FEATURE_MATRIX...</div>
    }

    return (
        <div className="p-8 max-w-7xl mx-auto selection:bg-orange-500/30">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic">Flag_Control</h1>
                    <p className="text-zinc-500 mt-2 font-mono text-xs uppercase tracking-[0.3em]">System_Logic_Toggles_v1.0</p>
                </div>
                <Button
                    className="bg-white text-black hover:bg-orange-600 hover:text-white font-black uppercase tracking-widest rounded-none"
                    onClick={() => {
                        resetForm()
                        setFormData({ enabled: true })
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Register Feature
                </Button>
            </div>

            {/* Edit Form */}
            {(editingId || Object.keys(formData).length > 0) && (
                <Card className="p-8 mb-12 bg-zinc-950 border-zinc-800 rounded-none shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600" />
                    <h2 className="text-2xl font-black uppercase italic mb-8 tracking-tight">
                        {editingId ? 'Modify_Logic' : 'New_Protocol_Definition'}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Logic Key (System Internal)</label>
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12 font-mono"
                                    placeholder="ENABLE_VISITOR_ANALYTICS"
                                    value={formData.flag_key || ''}
                                    onChange={(e) => setFormData({ ...formData, flag_key: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Human-Readable Name</label>
                                <Input
                                    className="bg-black border-zinc-800 rounded-none h-12"
                                    placeholder="Visitor Counter v2"
                                    value={formData.flag_name || ''}
                                    onChange={(e) => setFormData({ ...formData, flag_name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-2 block">Operational Intent</label>
                                <Textarea
                                    className="bg-black border-zinc-800 rounded-none"
                                    placeholder="Explain why this flag exists and what it controls..."
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <div className="bg-zinc-900/10 p-4 border border-zinc-800 flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Initial_State</div>
                                    <div className="text-white font-black uppercase italic tracking-tighter">
                                        {formData.enabled ? 'Logic_Active' : 'Logic_Suppressed'}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className={`rounded-none border-zinc-700 ${formData.enabled ? 'bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600/20' : 'bg-red-600/10 text-red-500 hover:bg-red-600/20'}`}
                                    onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
                                >
                                    <Power className="w-4 h-4 mr-2" />
                                    Toggle
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12 bg-zinc-900/10 p-4 border border-zinc-900">
                        <Button
                            onClick={handleSave}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-none h-14 px-10"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            COMMIT_ENGINE_CHANGE
                        </Button>
                        <Button
                            variant="outline"
                            onClick={resetForm}
                            className="bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white font-black uppercase tracking-widest rounded-none h-14 px-10"
                        >
                            PURGE_BUFFER
                        </Button>
                    </div>
                </Card>
            )}

            {/* Flags Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flags.map((flag) => (
                    <Card
                        key={flag.id}
                        className={`p-6 bg-zinc-950 border border-zinc-900 rounded-none transition-all group relative overflow-hidden ${flag.enabled ? 'hover:border-emerald-900/50' : 'hover:border-red-900/50'}`}
                    >
                        {/* Visual background indicator */}
                        <div className={`absolute -right-4 -bottom-4 opacity-[0.03] transform rotate-12 transition-all duration-700 group-hover:scale-110 ${flag.enabled ? 'text-emerald-500' : 'text-red-500'}`}>
                            {flag.enabled ? <Zap className="w-48 h-48" /> : <Lock className="w-48 h-48" />}
                        </div>

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-10 h-10 border flex items-center justify-center ${flag.enabled ? 'border-emerald-500/30 text-emerald-500' : 'border-zinc-800 text-zinc-700'}`}>
                                    {flag.enabled ? <Zap className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 hover:bg-zinc-900 text-zinc-700 hover:text-white"
                                        onClick={() => startEdit(flag)}
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 hover:bg-red-500/10 text-zinc-700 hover:text-red-500"
                                        onClick={() => handleDelete(flag.id)}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="mb-2">
                                <h3 className="text-lg font-black uppercase italic tracking-tight text-white mb-2 leading-tight">{flag.flag_name}</h3>
                                <div className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-900/50 inline-block px-2 py-0.5 border border-zinc-900/50">{flag.flag_key}</div>
                            </div>

                            <p className="text-zinc-600 text-xs mb-8 leading-relaxed line-clamp-2">
                                {flag.description || 'No description provided for this protocol.'}
                            </p>

                            <div className="mt-auto pt-6 border-t border-zinc-900/50 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${flag.enabled ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                    <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${flag.enabled ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {flag.enabled ? 'ONLINE' : 'OFFLINE'}
                                    </span>
                                </div>
                                <Button
                                    size="sm"
                                    className={`h-10 px-6 rounded-none font-black uppercase tracking-tighter italic text-[10px] transition-all duration-500 ${flag.enabled ? 'bg-zinc-900 text-zinc-500 hover:bg-red-600 hover:text-white' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}
                                    onClick={() => toggleFlag(flag)}
                                >
                                    {flag.enabled ? 'KILL_SWITCH' : 'ACTIVATE'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
