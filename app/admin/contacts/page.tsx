'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Mail,
    Phone,
    Building2,
    Clock,
    MoreVertical,
    CheckCircle,
    XCircle,
    MessageSquare,
    Loader2,
    AlertCircle,
    Search,
    Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassCard, SectionHeader, EmptyState, Skeleton } from '@/components/admin/ui/GlassCard'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useContacts, useUpdateContactStatus } from '@/hooks/useAdminData'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

const statusConfig = {
    new: { label: 'New', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    contacted: { label: 'Contacted', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    converted: { label: 'Converted', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    closed: { label: 'Closed', color: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20' }
}

export default function ContactsPage() {
    const { data: contacts, isLoading, error } = useContacts()
    const updateStatus = useUpdateContactStatus()

    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string | null>(null)
    const [selectedContact, setSelectedContact] = useState<any>(null)

    const filteredContacts = contacts?.filter(c => {
        const matchesSearch =
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.message.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = !statusFilter || c.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await updateStatus.mutateAsync({ id, status: status as any })
            toast.success(`Status updated to ${status}`)
        } catch (error) {
            toast.error('Failed to update status')
        }
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-zinc-400">Failed to load contacts. Please try again.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Contact Submissions</h1>
                <p className="text-zinc-400 mt-1">
                    Manage inquiries and lead responses
                </p>
            </div>

            {/* Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Search contacts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <Button
                            variant={!statusFilter ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setStatusFilter(null)}
                            className={!statusFilter ? 'bg-emerald-500' : 'text-zinc-400'}
                        >
                            All
                        </Button>
                        {Object.entries(statusConfig).map(([key, config]) => (
                            <Button
                                key={key}
                                variant={statusFilter === key ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setStatusFilter(key)}
                                className={statusFilter === key ? 'bg-emerald-500' : 'text-zinc-400'}
                            >
                                {config.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </GlassCard>

            {/* Contacts List */}
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <GlassCard key={i} className="p-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="flex-1">
                                    <Skeleton className="h-5 w-48 mb-2" />
                                    <Skeleton className="h-4 w-full max-w-md" />
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            ) : filteredContacts?.length === 0 ? (
                <EmptyState
                    icon={<Mail className="w-8 h-8" />}
                    title="No contacts found"
                    description="No contact submissions match your search criteria."
                />
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {filteredContacts?.map((contact, index) => (
                            <motion.div
                                key={contact.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <GlassCard className="p-4">
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-medium text-lg shrink-0">
                                            {contact.name.charAt(0).toUpperCase()}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="font-medium text-white">{contact.name}</h3>
                                                        <Badge variant="outline" className={cn('text-xs', statusConfig[contact.status as keyof typeof statusConfig]?.color)}>
                                                            {statusConfig[contact.status as keyof typeof statusConfig]?.label}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                                                        <span className="flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {contact.email}
                                                        </span>
                                                        {contact.phone && (
                                                            <span className="flex items-center gap-1">
                                                                <Phone className="w-3 h-3" />
                                                                {contact.phone}
                                                            </span>
                                                        )}
                                                        {contact.company && (
                                                            <span className="flex items-center gap-1">
                                                                <Building2 className="w-3 h-3" />
                                                                {contact.company}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}
                                                    </span>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                                            <DropdownMenuItem
                                                                onClick={() => setSelectedContact(contact)}
                                                                className="text-zinc-300 focus:bg-zinc-800"
                                                            >
                                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-zinc-800" />
                                                            <DropdownMenuItem
                                                                onClick={() => handleStatusChange(contact.id, 'contacted')}
                                                                className="text-amber-500 focus:bg-amber-500/10"
                                                            >
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                Mark Contacted
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleStatusChange(contact.id, 'converted')}
                                                                className="text-emerald-500 focus:bg-emerald-500/10"
                                                            >
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                Mark Converted
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleStatusChange(contact.id, 'closed')}
                                                                className="text-zinc-400 focus:bg-zinc-800"
                                                            >
                                                                <XCircle className="w-4 h-4 mr-2" />
                                                                Close
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>

                                            {/* Message Preview */}
                                            <p className="mt-3 text-sm text-zinc-300 line-clamp-2">
                                                {contact.message}
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Contact Details Dialog */}
            <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
                <DialogContent className="bg-zinc-900 border-zinc-800 max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-white">Contact Details</DialogTitle>
                    </DialogHeader>
                    {selectedContact && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-medium text-2xl">
                                    {selectedContact.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white">{selectedContact.name}</h3>
                                    <Badge variant="outline" className={cn('text-xs', statusConfig[selectedContact.status as keyof typeof statusConfig]?.color)}>
                                        {statusConfig[selectedContact.status as keyof typeof statusConfig]?.label}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-zinc-500" />
                                    <a href={`mailto:${selectedContact.email}`} className="text-emerald-500 hover:underline">
                                        {selectedContact.email}
                                    </a>
                                </div>
                                {selectedContact.phone && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-zinc-500" />
                                        <a href={`tel:${selectedContact.phone}`} className="text-emerald-500 hover:underline">
                                            {selectedContact.phone}
                                        </a>
                                    </div>
                                )}
                                {selectedContact.company && (
                                    <div className="flex items-center gap-3">
                                        <Building2 className="w-4 h-4 text-zinc-500" />
                                        <span className="text-zinc-300">{selectedContact.company}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-zinc-500" />
                                    <span className="text-zinc-400 text-sm">
                                        {formatDistanceToNow(new Date(selectedContact.created_at), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-800">
                                <h4 className="text-sm font-medium text-zinc-400 mb-2">Message</h4>
                                <p className="text-zinc-300 whitespace-pre-wrap">{selectedContact.message}</p>
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button
                                    onClick={() => handleStatusChange(selectedContact.id, 'contacted')}
                                    variant="outline"
                                    className="flex-1 border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
                                >
                                    Mark Contacted
                                </Button>
                                <Button
                                    onClick={() => handleStatusChange(selectedContact.id, 'converted')}
                                    className="flex-1 bg-emerald-500 hover:bg-emerald-600"
                                >
                                    Mark Converted
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
