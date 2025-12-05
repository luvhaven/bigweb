'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { blogAPI } from '@/lib/api/blog'
import { toast } from 'sonner'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function BlogEditorPage() {
    const router = useRouter()
    const params = useParams()
    const isEditing = !!params?.id
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        category_id: '',
        tags: '',
        meta_title: '',
        meta_description: '',
        status: 'draft'
    })

    useEffect(() => {
        loadCategories()
        if (isEditing && params.id) {
            loadPost(params.id as string)
        }
    }, [isEditing, params.id])

    const loadCategories = async () => {
        try {
            const data = await blogAPI.getAllCategories()
            setCategories(data || [])
        } catch (error) {
            console.error('Failed to load categories')
        }
    }

    const loadPost = async (id: string) => {
        try {
            const data = await blogAPI.getPostById(id)
            setFormData({
                title: data.title || '',
                slug: data.slug || '',
                excerpt: data.excerpt || '',
                content: JSON.stringify(data.content) || '',
                featured_image: data.featured_image || '',
                category_id: data.category_id || '',
                tags: data.tags?.join(', ') || '',
                meta_title: data.meta_title || '',
                meta_description: data.meta_description || '',
                status: data.status || 'draft'
            })
        } catch (error) {
            toast.error('Failed to load post')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                ...formData,
                content: formData.content ? JSON.parse(formData.content) : {},
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
            }

            if (isEditing && params.id) {
                await blogAPI.updatePost(params.id as string, payload)
                toast.success('Post updated')
            } else {
                await blogAPI.createPost(payload)
                toast.success('Post created')
            }
            router.push('/admin/blog')
        } catch (error) {
            toast.error('Failed to save post')
        } finally {
            setLoading(false)
        }
    }

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog">
                        <Button variant="ghost" type="button">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Post' : 'New Post'}</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormData({ ...formData, status: 'draft' })}
                    >
                        Save Draft
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90">
                        <Save className="w-4 h-4 mr-2" />
                        {formData.status === 'published' ? 'Update' : 'Publish'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title *</label>
                        <Input
                            required
                            value={formData.title}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                    slug: generateSlug(e.target.value)
                                })
                            }}
                            placeholder="Enter post title..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <Input
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="post-slug"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Excerpt</label>
                        <Textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="Brief description..."
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content (JSON/Markdown)</label>
                        <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder='{"blocks": []}'
                            className="min-h-[400px] font-mono text-sm"
                        />
                    </div>

                    <div className="space-y-4 p-6 bg-secondary/10 rounded-xl">
                        <h3 className="font-semibold">SEO Settings</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Meta Title</label>
                            <Input
                                value={formData.meta_title}
                                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Meta Description</label>
                            <Textarea
                                value={formData.meta_description}
                                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 bg-card border border-border rounded-xl space-y-4">
                        <h3 className="font-semibold">Settings</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <Select
                                value={formData.category_id}
                                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tags (comma separated)</label>
                            <Input
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="tech, design, tutorial"
                            />
                        </div>
                    </div>

                    <div className="p-6 bg-card border border-border rounded-xl space-y-4">
                        <h3 className="font-semibold">Featured Image</h3>
                        <div className="space-y-2">
                            <Input
                                value={formData.featured_image}
                                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                                placeholder="Image URL"
                            />
                        </div>
                        {formData.featured_image && (
                            <div className="aspect-video rounded-lg overflow-hidden bg-secondary">
                                <img
                                    src={formData.featured_image}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}
