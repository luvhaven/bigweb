'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { messagesAPI } from '@/lib/api/messages'
import { Button } from '@/components/ui/button'
import { Loader2, ArrowLeft, Mail, Calendar, User, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function MessageDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [message, setMessage] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            loadMessage(params.id as string)
        }
    }, [params.id])

    const loadMessage = async (id: string) => {
        try {
            const data = await messagesAPI.getById(id)
            setMessage(data)
            // Mark as read if not already
            if (!data.is_read) {
                await messagesAPI.update(id, { is_read: true })
            }
        } catch (error) {
            toast.error('Failed to load message')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Delete this message?')) return
        try {
            await messagesAPI.delete(message.id)
            toast.success('Message deleted')
            router.push('/admin/messages')
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
    if (!message) return <div>Message not found</div>

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link href="/admin/messages">
                    <Button variant="ghost">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Messages
                    </Button>
                </Link>
                <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border bg-secondary/10">
                    <h1 className="text-2xl font-bold mb-4">{message.subject}</h1>
                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="text-foreground font-medium">{message.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${message.email}`} className="text-accent hover:underline">
                                {message.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(message.created_at).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div className="p-8 whitespace-pre-wrap leading-relaxed">
                    {message.content || message.message}
                </div>
            </div>
        </div>
    )
}
