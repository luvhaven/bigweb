'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Phone, Building, Send, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { contactsAPI } from '@/lib/api/contacts'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function ContactDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { user } = useAuth()
    const [submission, setSubmission] = useState<any>(null)
    const [reply, setReply] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            loadSubmission(params.id as string)
            markAsRead()
        }
    }, [params.id])

    const loadSubmission = async (id: string) => {
        try {
            const data = await contactsAPI.getById(id)
            setSubmission(data)
        } catch (error) {
            toast.error('Failed to load submission')
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = async () => {
        if (params.id) {
            try {
                await contactsAPI.updateStatus(params.id as string, 'read')
            } catch (error) {
                console.error('Failed to mark as read')
            }
        }
    }

    const handleReply = async () => {
        if (!user || !reply.trim()) return

        try {
            await contactsAPI.markAsReplied(params.id as string, user.id, reply)
            toast.success('Marked as replied')
            // Here you would typically also send an email
            router.push('/admin/contacts')
        } catch (error) {
            toast.error('Failed to save reply')
        }
    }

    const handleDelete = async () => {
        if (!confirm('Delete this submission?')) return

        try {
            await contactsAPI.delete(params.id as string)
            toast.success('Submission deleted')
            router.push('/admin/contacts')
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    if (loading) {
        return <div className="text-center py-20">Loading...</div>
    }

    if (!submission) {
        return <div className="text-center py-20">Submission not found</div>
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <Link href="/admin/contacts">
                    <Button variant="ghost">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Submissions
                    </Button>
                </Link>
                <Button variant="ghost" className="text-red-500" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">{submission.name}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${submission.status === 'new' ? 'bg-blue-500/10 text-blue-500' :
                                submission.status === 'replied' ? 'bg-green-500/10 text-green-500' :
                                    'bg-secondary text-muted-foreground'
                            }`}>
                            {submission.status}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${submission.email}`} className="hover:text-accent">
                                {submission.email}
                            </a>
                        </div>
                        {submission.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <a href={`tel:${submission.phone}`} className="hover:text-accent">
                                    {submission.phone}
                                </a>
                            </div>
                        )}
                        {submission.company && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Building className="w-4 h-4" />
                                {submission.company}
                            </div>
                        )}
                        <div className="text-muted-foreground">
                            {new Date(submission.created_at).toLocaleString()}
                        </div>
                    </div>
                </div>

                {submission.subject && (
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Subject</h3>
                        <p className="font-semibold">{submission.subject}</p>
                    </div>
                )}

                <div className="mb-8">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Message</h3>
                    <div className="bg-secondary/20 p-6 rounded-xl">
                        <p className="whitespace-pre-wrap">{submission.message}</p>
                    </div>
                </div>

                {submission.status !== 'replied' && (
                    <div className="pt-6 border-t border-border space-y-4">
                        <h3 className="font-semibold">Reply</h3>
                        <Textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Type your reply here..."
                            rows={6}
                            className="resize-none"
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={handleReply}
                                disabled={!reply.trim()}
                                className="bg-accent hover:bg-accent/90"
                            >
                                <Send className="w-4 h-4 mr-2" /> Mark as Replied
                            </Button>
                            <Button variant="outline" onClick={() => setReply('')}>
                                Clear
                            </Button>
                        </div>
                    </div>
                )}

                {submission.replied_at && (
                    <div className="pt-6 border-t border-border">
                        <div className="flex items-center gap-2 text-green-500 mb-2">
                            <Send className="w-4 h-4" />
                            <span className="font-medium">Replied</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {new Date(submission.replied_at).toLocaleString()}
                        </div>
                        {submission.notes && (
                            <div className="mt-3 bg-secondary/20 p-4 rounded-lg">
                                <p className="text-sm whitespace-pre-wrap">{submission.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
