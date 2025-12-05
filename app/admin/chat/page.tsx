'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageCircle, UserCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { chatAPI } from '@/lib/api/chat'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ChatPage() {
    const { user } = useAuth()
    const [sessions, setSessions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')

    useEffect(() => {
        loadSessions()
    }, [statusFilter])

    const loadSessions = async () => {
        try {
            const data = await chatAPI.getAllSessions(statusFilter && statusFilter !== 'all' ? { status: statusFilter } : undefined)
            setSessions(data || [])
        } catch (error) {
            toast.error('Failed to load chat sessions')
        } finally {
            setLoading(false)
        }
    }

    const handleAssign = async (sessionId: string) => {
        if (!user) return

        try {
            await chatAPI.assignSession(sessionId, user.id)
            loadSessions()
            toast.success('Session assigned')
        } catch (error) {
            toast.error('Failed to assign session')
        }
    }

    const filteredSessions = sessions.filter(session =>
        session.visitor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.visitor_email?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Chat Sessions</h1>
                    <p className="text-muted-foreground">Manage visitor conversations</p>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search sessions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            ) : filteredSessions.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-muted-foreground">No active chat sessions</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredSessions.map((session, index) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                        <UserCircle className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{session.visitor_name || 'Anonymous'}</h3>
                                        <p className="text-sm text-muted-foreground">{session.visitor_email}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${session.status === 'active' ? 'bg-green-500/10 text-green-500' :
                                    session.status === 'waiting' ? 'bg-blue-500/10 text-blue-500' :
                                        'bg-secondary text-muted-foreground'
                                    }`}>
                                    {session.status}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    {session.assigned?.full_name ? (
                                        <span>Assigned to {session.assigned.full_name}</span>
                                    ) : (
                                        <span>Unassigned</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {!session.assigned_to && (
                                        <Button size="sm" variant="outline" onClick={() => handleAssign(session.id)}>
                                            Assign to Me
                                        </Button>
                                    )}
                                    <Link href={`/admin/chat/${session.id}`}>
                                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                                            View Chat
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                                Started {new Date(session.created_at).toLocaleString()}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
