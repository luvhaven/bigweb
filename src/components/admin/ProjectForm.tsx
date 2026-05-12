'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner'
import { projectsAPI } from '@/lib/api/projects'
import { clientsAPI } from '@/lib/api/clients'
import { Loader2, Save, ArrowLeft, Image as ImageIcon, X } from 'lucide-react'
import Link from 'next/link'
import AdminHeader from '@/components/admin/AdminHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold' | 'cancelled'

interface ProjectFormProps {
    initialData?: any
    isEditing?: boolean
}

interface FormData {
    title: string
    description: string
    client_id: string
    status: ProjectStatus
    image_url: string
    budget: string
    timeline: string
    tags: string
}

export default function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [clients, setClients] = useState<any[]>([])
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        client_id: '',
        status: 'planning',
        image_url: '',
        budget: '',
        timeline: '',
        tags: ''
    })

    useEffect(() => {
        loadClients()
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                client_id: initialData.client_id || '',
                status: initialData.status || 'planning',
                image_url: initialData.image_url || '',
                budget: initialData.budget || '',
                timeline: initialData.timeline || '',
                tags: initialData.tags ? initialData.tags.join(', ') : ''
            })
        }
    }, [initialData])

    const loadClients = async () => {
        try {
            const data = await clientsAPI.getAll()
            setClients(data || [])
        } catch (error) {
            // Silently handle error - clients feature may not be set up yet
            // Allow project creation without client assignment
            setClients([])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                budget: formData.budget ? parseFloat(formData.budget.toString()) : null
            }

            if (isEditing && initialData?.id) {
                await projectsAPI.update(initialData.id, payload)
                toast.success('Project updated successfully')
            } else {
                await projectsAPI.create(payload as any)
                toast.success('Project created successfully')
            }
            router.push('/admin/projects')
            router.refresh()
        } catch (error) {
            toast.error('Failed to save project')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <AdminHeader
                title={isEditing ? 'Edit Project' : 'New Project'}
                description={isEditing ? 'Update project details' : 'Create a new project portfolio item'}
            >
                <div className="flex gap-2">
                    <Link href="/admin/projects">
                        <Button variant="outline" type="button">Cancel</Button>
                    </Link>
                    <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90">
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" /> Save Project
                            </>
                        )}
                    </Button>
                </div>
            </AdminHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Project Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Project Title</label>
                                <Input
                                    required
                                    placeholder="e.g. E-commerce Redesign"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="text-lg font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <RichTextEditor
                                    placeholder="Describe the project... (Markdown supported)"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="min-h-[300px]"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Info</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Budget ($)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                    <Input
                                        type="number"
                                        placeholder="5000"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="pl-7"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Timeline</label>
                                <Input
                                    placeholder="e.g. 3 months"
                                    value={formData.timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-sm font-medium">Tags</label>
                                <Input
                                    placeholder="e.g. React, Next.js, UI/UX"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                />
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags.split(',').map(t => t.trim()).filter(Boolean).map((tag, i) => (
                                        <Badge key={i} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Status & Client</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="planning">Planning</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="review">Review</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="on_hold">On Hold</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Client</label>
                                <Select
                                    value={formData.client_id}
                                    onValueChange={(value) => setFormData({ ...formData, client_id: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map((client) => (
                                            <SelectItem key={client.id} value={client.id}>
                                                {client.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Image</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-accent/5 transition-colors cursor-pointer">
                                {formData.image_url ? (
                                    <div className="relative aspect-video rounded-lg overflow-hidden group">
                                        <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => setFormData({ ...formData, image_url: '' })}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-4">
                                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image URL</label>
                                <Input
                                    placeholder="https://..."
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
