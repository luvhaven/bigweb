'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, Trash2, Download, Archive, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { contactsAPI } from '@/lib/api/contacts'
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

export default function ContactsPage() {
    const [submissions, setSubmissions] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('')

    useEffect(() => {
        loadSubmissions()
    }, [statusFilter])

    const loadSubmissions = async () => {
        try {
            const data = await contactsAPI.getAll(statusFilter ? { status: statusFilter } : undefined)
            setSubmissions(data || [])
        } catch (error) {
            toast.error('Failed to load submissions')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this submission?')) return

        try {
            await contactsAPI.delete(id)
            setSubmissions(submissions.filter(s => s.id !== id))
            toast.success('Submission deleted')
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    const handleExport = async () => {
        try {
            const csv = await contactsAPI.exportToCSV()
            const blob = new Blob([csv], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`
            a.click()
            toast.success('Exported to CSV')
        } catch (error) {
            toast.error('Failed to export')
        }
    }

    const filteredSubmissions = submissions.filter(sub =>
        sub.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.message?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Contact Submissions</h1>
                    <p className="text-muted-foreground">Manage inquiries and messages</p>
                </div>
                <Button onClick={handleExport} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export CSV
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search submissions..."
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
                        <SelectItem value="">All</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading submissions...</div>
            ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="text-muted-foreground">No submissions found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredSubmissions.map((sub, index) => (
                        <motion.div
                            key={sub.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg">{sub.name}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.status === 'new' ? 'bg-blue-500/10 text-blue-500' :
                                                sub.status === 'replied' ? 'bg-green-500/10 text-green-500' :
                                                    'bg-secondary text-muted-foreground'
                                            }`}>
                                            {sub.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {sub.email}
                                        </span>
                                        {sub.phone && <span>{sub.phone}</span>}
                                        {sub.company && <span>• {sub.company}</span>}
                                    </div>
                                    <div className="text-sm mb-3 bg-secondary/20 p-3 rounded-lg">
                                        {sub.subject && <div className="font-medium mb-1">{sub.subject}</div>}
                                        <p className="text-muted-foreground line-clamp-2">{sub.message}</p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Received {new Date(sub.created_at).toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/admin/contacts/${sub.id}`}>
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500"
                                        onClick={() => handleDelete(sub.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
