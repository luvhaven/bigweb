'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Mail, Eye, Calendar, User, MessageSquare, Archive, Trash2, CheckCircle } from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactSubmission {
    id: string
    name: string
    email: string
    subject: string
    message: string
    status: string
    created_at: string
}

export default function ContactsPage() {
    const [messages, setMessages] = useState<ContactSubmission[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadMessages()
    }, [])

    const loadMessages = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('contact_submissions')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setMessages(data || [])
        } catch (error) {
            console.error('Error loading messages:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-500/10 text-blue-500 ring-blue-500/20'
            case 'read': return 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20'
            case 'replied': return 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20'
            case 'archived': return 'bg-orange-500/10 text-orange-500 ring-orange-500/20'
            default: return 'bg-zinc-500/10 text-zinc-400'
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Inbox</h1>
                    <p className="text-zinc-400 mt-1">Manage contact form submissions and inquiries</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 sticky top-0 z-10 shadow-lg shadow-black/5">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search messages by name, email, or subject..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                </div>
            </div>

            {/* Messages List */}
            <div className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-900/80 text-zinc-400 uppercase font-medium border-b border-zinc-800">
                            <tr>
                                <th className="px-6 py-4">Sender</th>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                            <span>Loading messages...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredMessages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center">
                                                <Mail className="w-6 h-6 text-zinc-600" />
                                            </div>
                                            <p>No messages found in your inbox.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <AnimatePresence>
                                    {filteredMessages.map((msg, index) => (
                                        <motion.tr
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="group hover:bg-zinc-800/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                                                        ${msg.status === 'new' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-400'}`}>
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className={`font-medium ${msg.status === 'new' ? 'text-white' : 'text-zinc-300'}`}>{msg.name}</div>
                                                        <div className="text-xs text-zinc-500">{msg.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs">
                                                    <span className={`block truncate ${msg.status === 'new' ? 'text-zinc-200 font-medium' : 'text-zinc-400'}`}>
                                                        {msg.subject || '(No Subject)'}
                                                    </span>
                                                    <span className="text-xs text-zinc-500 block truncate mt-0.5">
                                                        {msg.message}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset capitalize ${getStatusColor(msg.status)}`}>
                                                    {msg.status === 'new' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                                    {msg.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-zinc-400 font-mono text-xs">
                                                {format(new Date(msg.created_at), 'MMM d, h:mm a')}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/admin/contacts/${msg.id}`}
                                                    className="inline-flex items-center justify-center w-8 h-8 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"
                                                    title="View Message"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span className="sr-only">View</span>
                                                </Link>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

