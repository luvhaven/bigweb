'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface TeamMember {
    id: string
    name: string
    role: string
    image_url: string | null
    sort_order: number
}

export default function TeamAdminPage() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadMembers()
    }, [])

    const loadMembers = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('cms_team_members')
            .select('*')
            .order('sort_order', { ascending: true })

        setMembers(data || [])
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this team member?')) return
        await supabase.from('cms_team_members').delete().eq('id', id)
        loadMembers()
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
                    <h1 className="text-3xl font-bold text-white">Team Members</h1>
                    <p className="text-zinc-400 mt-1">Manage your team profiles</p>
                </div>
                <Link href="/admin/team/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-500">
                        <Plus className="w-4 h-4 mr-2" /> Add Member
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden"
                    >
                        <div className="flex items-center p-6 gap-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                                {member.image_url ? (
                                    <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-emerald-400">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white">{member.name}</h3>
                                <p className="text-sm text-zinc-400">{member.role}</p>
                            </div>
                        </div>
                        <div className="bg-zinc-800/50 p-4 flex justify-end items-center gap-2 border-t border-white/5">
                            <Link href={`/admin/team/${member.id}`}>
                                <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-red-400" onClick={() => handleDelete(member.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                ))}

                {members.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-zinc-900/50 border border-white/10 rounded-2xl text-zinc-500">
                        No team members yet. Add your first team member.
                    </div>
                )}
            </div>
        </div>
    )
}
