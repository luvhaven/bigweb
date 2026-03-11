'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Save, Trash2, Edit3, X, RefreshCw, CheckCircle2, Users } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface TeamMember {
    id: string
    name: string
    role: string
    department: string | null
    bio: string
    avatar_url: string | null
    linkedin_url: string | null
    twitter_url: string | null
    github_url: string | null
    is_leadership: boolean
    is_active: boolean
    sort_order: number
}

const empty: Partial<TeamMember> = { name: '', role: '', department: '', bio: '', avatar_url: '', linkedin_url: '', twitter_url: '', github_url: '', is_leadership: false, is_active: true, sort_order: 99 }
const inputCls = 'w-full bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-all'

export default function TeamPage() {
    const supabase = createClient()
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<string | null>(null)
    const [form, setForm] = useState<Partial<TeamMember>>(empty)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState('')

    const load = useCallback(async () => {
        setLoading(true)
        const { data } = await supabase.from('cms_team_members').select('*').order('sort_order', { ascending: true })
        setMembers(data || [])
        setLoading(false)
    }, [supabase])

    useEffect(() => { load() }, [load])

    const startEdit = (m: TeamMember) => { setEditing(m.id); setForm({ ...m }); setError(''); setSaved(false) }
    const startNew = () => { setEditing('new'); setForm({ ...empty }); setError(''); setSaved(false) }
    const cancel = () => { setEditing(null); setForm(empty) }

    async function handleSave() {
        if (!form.name || !form.role) { setError('Name and role are required.'); return }
        setSaving(true); setError('')
        const { id, ...fields } = form
        let result
        if (editing !== 'new' && editing) {
            result = await supabase.from('cms_team_members').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', editing)
        } else {
            result = await supabase.from('cms_team_members').insert(fields)
        }
        setSaving(false)
        if (result.error) { setError(result.error.message); return }
        setSaved(true)
        await load()
        setTimeout(() => { setSaved(false); setEditing(null) }, 1500)
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this team member?')) return
        await supabase.from('cms_team_members').delete().eq('id', id)
        load()
    }

    async function toggleActive(id: string, current: boolean) {
        await supabase.from('cms_team_members').update({ is_active: !current }).eq('id', id)
        load()
    }

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" /></div>

    return (
        <div className="space-y-6 max-w-4xl text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Team Members</h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage team profiles shown on the About page.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={load} className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={startNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-semibold text-sm hover:opacity-90"><Plus className="w-4 h-4" /> Add Member</button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {members.length === 0 && !editing && (
                    <div className="col-span-2 text-center py-16 bg-zinc-900/30 border border-white/[0.06] rounded-2xl">
                        <Users className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                        <p className="text-zinc-500">No team members yet.</p>
                    </div>
                )}
                {members.map((m) => (
                    <motion.div key={m.id} layout className={`bg-zinc-900/50 border rounded-2xl p-5 transition-colors ${m.is_active ? 'border-white/[0.06] hover:border-white/10' : 'border-white/[0.03] opacity-60'}`}>
                        <div className="flex items-start gap-3">
                            {m.avatar_url ? (
                                <img src={m.avatar_url} alt={m.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 text-accent font-bold">{m.name.charAt(0)}</div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-white text-sm">{m.name}</span>
                                    {m.is_leadership && <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-bold">Leadership</span>}
                                    {!m.is_active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700 font-bold">Hidden</span>}
                                </div>
                                <p className="text-zinc-500 text-xs">{m.role}</p>
                                <p className="text-zinc-600 text-xs mt-1 line-clamp-2">{m.bio}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/[0.04]">
                            <button onClick={() => toggleActive(m.id, m.is_active)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${m.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                                {m.is_active ? 'Visible' : 'Hidden'}
                            </button>
                            <button onClick={() => startEdit(m)} className="ml-auto p-2 rounded-lg text-zinc-500 hover:text-white bg-zinc-900 border border-white/[0.06]"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(m.id)} className="p-2 rounded-lg text-zinc-500 hover:text-red-400 bg-zinc-900 border border-white/[0.06]"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {editing && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-zinc-900/80 border border-white/[0.08] rounded-3xl p-8 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">{editing === 'new' ? '✦ New Team Member' : '✦ Edit Team Member'}</h2>
                            <button onClick={cancel} className="p-2 rounded-lg text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { key: 'name', label: 'Full Name *', placeholder: 'John Smith' },
                                    { key: 'role', label: 'Role / Title *', placeholder: 'Head of Design' },
                                    { key: 'department', label: 'Department', placeholder: 'Design' },
                                    { key: 'linkedin_url', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' },
                                    { key: 'twitter_url', label: 'Twitter / X URL', placeholder: 'https://twitter.com/...' },
                                ].map(f => (
                                    <div key={f.key}>
                                        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">{f.label}</label>
                                        <input value={(form as any)[f.key] || ''} onChange={e => setForm(d => ({ ...d, [f.key]: e.target.value }))} placeholder={f.placeholder} className={inputCls} />
                                    </div>
                                ))}
                            </div>
                            <ImageUpload
                                label="Profile Photo"
                                value={form.avatar_url || ''}
                                onChange={(url) => setForm(d => ({ ...d, avatar_url: url }))}
                                folder="team"
                                hint="Upload a square photo or paste a URL. Shown on About page."
                            />
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 block">Bio</label>
                                <textarea value={form.bio || ''} onChange={e => setForm(d => ({ ...d, bio: e.target.value }))} placeholder="Short professional bio..." rows={3} className={inputCls + ' resize-none'} />
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setForm(d => ({ ...d, is_leadership: !d.is_leadership }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.is_leadership ? 'bg-accent' : 'bg-zinc-700'}`}>
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.is_leadership ? 'translate-x-6' : ''}`} />
                                    </button>
                                    <span className="text-sm text-zinc-400">Leadership</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setForm(d => ({ ...d, is_active: !d.is_active }))} className={`w-12 h-6 rounded-full transition-colors relative ${form.is_active ? 'bg-accent' : 'bg-zinc-700'}`}>
                                        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-6' : ''}`} />
                                    </button>
                                    <span className="text-sm text-zinc-400">Visible on site</span>
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                        <div className="flex gap-3 mt-6">
                            <button onClick={handleSave} disabled={saving || saved} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 disabled:opacity-60">
                                {saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</> : saving ? <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Member</>}
                            </button>
                            <button onClick={cancel} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 hover:text-white text-sm">Cancel</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
