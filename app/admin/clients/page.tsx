'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MoreVertical, Edit, Trash2, Globe } from 'lucide-react'
import Link from 'next/link'
import { clientsAPI } from '@/lib/api/clients'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ClientsPage() {
    const [clients, setClients] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        loadClients()
    }, [])

    const loadClients = async () => {
        try {
            const data = await clientsAPI.getAll()
            setClients(data || [])
        } catch (error) {
            toast.error('Failed to load clients')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this client?')) return
        try {
            await clientsAPI.delete(id)
            setClients(clients.filter(c => c.id !== id))
            toast.success('Client deleted')
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    const filteredClients = clients.filter(client =>
        client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Clients</h1>
                    <p className="text-muted-foreground">Manage your client relationships.</p>
                </div>
                <Link href="/admin/clients/new">
                    <Button className="bg-accent hover:bg-accent/90">
                        <Plus className="w-4 h-4 mr-2" /> Add Client
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search clients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading clients...</div>
            ) : filteredClients.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
                    <p className="text-muted-foreground">No clients found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClients.map((client, index) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                        {client.logo_url ? (
                                            <img src={client.logo_url} alt={client.company} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="font-bold text-lg">{client.company?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{client.company}</h3>
                                        <p className="text-sm text-muted-foreground">{client.name}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <Link href={`/admin/clients/${client.id}`}>
                                            <DropdownMenuItem>
                                                <Edit className="w-4 h-4 mr-2" /> Edit
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(client.id)}>
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Globe className="w-4 h-4" />
                                    <a href={client.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                                        {client.website || 'No website'}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
