'use client'

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Loader2, Edit, Trash2, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface TeamMember {
    id: string
    name: string
    role: string
    photo_url: string
    active: boolean
}

export default function TeamAdminPage() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadMembers()
    }, [])

    const loadMembers = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('team_members')
                .select('*')
                .order('sort_order', { ascending: true })

            if (error) throw error
            setMembers(data || [])
        } catch (error) {
            console.error('Error loading team:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this team member?')) return
        try {
            const { error } = await supabase.from('team_members').delete().eq('id', id)
            if (error) throw error
            loadMembers()
        } catch (error) {
            console.error(error)
            alert('Failed to delete')
        }
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Team Members</h1>
                        <p className="text-muted-foreground">Manage your team profiles.</p>
                    </div>
                    <Link href="/admin/team/new">
                        <Button size="lg" className="gap-2"><Plus className="w-4 h-4" /> Add Member</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members.map(member => (
                            <Card key={member.id} className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex items-center p-6 gap-4">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
                                            {member.photo_url ? (
                                                <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-primary/10 text-primary">
                                                    {member.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{member.name}</h3>
                                            <p className="text-sm text-muted-foreground">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="bg-muted/50 p-4 flex justify-between items-center border-t">
                                        <span className={`text-xs px-2 py-1 rounded-full ${member.active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {member.active ? 'Active' : 'Inactive'}
                                        </span>
                                        <div className="flex gap-2">
                                            <Link href={`/admin/team/${member.id}`}>
                                                <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                                            </Link>
                                            <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(member.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {members.length === 0 && (
                            <div className="col-span-full py-24 text-center border-2 border-dashed rounded-xl text-muted-foreground">
                                No team members found.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )

}
