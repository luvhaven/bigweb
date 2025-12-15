'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, User, Mail, Calendar, Archive, Trash2, CheckCircle, Reply } from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { format } from 'date-fns'
import Link from 'next/link'

export default function ContactDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [message, setMessage] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        loadMessage()
    }, [params.id])

    const loadMessage = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('contact_submissions')
                .select('*')
                .eq('id', params.id)
                .single()

            if (error) throw error
            setMessage(data)

            // Mark as read if not already
            if (data && data.status === 'new') {
                await supabase
                    .from('contact_submissions')
                    .update({ status: 'read' })
                    .eq('id', params.id)
            }
        } catch (error) {
            console.error('Error loading message:', error)
            router.push('/admin/contacts')
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (status: string) => {
        try {
            const { error } = await supabase
                .from('contact_submissions')
                .update({ status })
                .eq('id', params.id)

            if (error) throw error
            setMessage({ ...message, status })
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this message?')) return

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .delete()
                .eq('id', params.id)

            if (error) throw error
            router.push('/admin/contacts')
        } catch (error) {
            console.error('Error deleting message:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!message) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/contacts"
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">{message.subject || 'No Subject'}</h1>
                    <div className="flex items-center gap-2 text-sm text-zinc-400 mt-1">
                        <span>Received {format(new Date(message.created_at), 'MMMM d, yyyy at h:mm a')}</span>
                        <span>•</span>
                        <span className="capitalize">{message.status}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {message.status !== 'replied' && (
                        <button
                            onClick={() => updateStatus('replied')}
                            className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded-lg transition-colors text-sm font-medium"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Mark Replied
                        </button>
                    )}
                    <button
                        onClick={() => updateStatus(message.status === 'archived' ? 'read' : 'archived')}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                        title={message.status === 'archived' ? 'Unarchive' : 'Archive'}
                    >
                        <Archive className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 min-h-[400px]">
                        <div className="prose prose-invert max-w-none">
                            <p className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
                                {message.message}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sender Info */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Sender Details</h3>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="font-medium text-white">{message.name}</div>
                                <div className="text-sm text-zinc-500">Visitor</div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-800">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-zinc-500" />
                                <a href={`mailto:${message.email}`} className="text-emerald-500 hover:underline">
                                    {message.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-300">
                                    {format(new Date(message.created_at), 'PPP')}
                                </span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-800">
                            <a
                                href={`mailto:${message.email}?subject=Re: ${message.subject}`}
                                className="flex items-center justify-center gap-2 w-full py-2 bg-white text-black hover:bg-zinc-200 rounded-lg transition-colors font-medium"
                            >
                                <Reply className="w-4 h-4" />
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
