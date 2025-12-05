'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    Save,
    Eye,
    Loader2,
    Image as ImageIcon,
    Tag,
    Calendar,
    Type,
    AlignLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GlassCard, SectionHeader } from '@/components/admin/ui/GlassCard'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCreateBlogPost } from '@/hooks/useAdminContent'
import Link from 'next/link'
import toast from 'react-hot-toast'

const categories = [
    'Web Development',
    'UI/UX Design',
    'AI & Automation',
    'SEO & Marketing',
    'Industry News',
    'Case Studies'
]

export default function NewBlogPost() {
    const router = useRouter()
    const createPost = useCreateBlogPost()

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        image: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: [] as string[],
        published: false
    })

    const [keywordInput, setKeywordInput] = useState('')

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        // Auto-generate slug from title
        if (field === 'title' && !formData.slug) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            setFormData(prev => ({ ...prev, slug }))
        }
    }

    const handleAddKeyword = () => {
        if (keywordInput.trim()) {
            setFormData(prev => ({
                ...prev,
                seo_keywords: [...prev.seo_keywords, keywordInput.trim()]
            }))
            setKeywordInput('')
        }
    }

    const handleRemoveKeyword = (index: number) => {
        setFormData(prev => ({
            ...prev,
            seo_keywords: prev.seo_keywords.filter((_, i) => i !== index)
        }))
    }

    const handleSave = async (publish: boolean) => {
        if (!formData.title || !formData.slug || !formData.category || !formData.content) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            await createPost.mutateAsync({
                ...formData,
                published: publish,
                published_at: publish ? new Date().toISOString() : null
            })

            toast.success(publish ? 'Post published successfully' : 'Draft saved successfully')
            router.push('/admin/blog')
        } catch (error) {
            toast.error('Failed to save post')
        }
    }

    return (
        <div className="space-y-6 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog">
                        <Button variant="ghost" size="icon" className="text-zinc-400">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">New Blog Post</h1>
                        <p className="text-zinc-400 mt-1">Create a new blog post</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleSave(false)}
                        disabled={createPost.isPending}
                        className="border-zinc-700 text-zinc-300"
                    >
                        {createPost.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Save Draft
                    </Button>
                    <Button
                        onClick={() => handleSave(true)}
                        disabled={createPost.isPending}
                        className="bg-emerald-500 hover:bg-emerald-600"
                    >
                        {createPost.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        <Eye className="w-4 h-4 mr-2" />
                        Publish
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <GlassCard className="p-6">
                        <SectionHeader title="Basic Information" />
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title" className="text-zinc-300">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="Enter post title..."
                                    className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="slug" className="text-zinc-300">Slug *</Label>
                                <Input
                                    id="slug"
                                    value={formData.slug}
                                    onChange={(e) => handleInputChange('slug', e.target.value)}
                                    placeholder="post-url-slug"
                                    className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                                />
                                <p className="text-xs text-zinc-500 mt-1">URL-friendly version of the title</p>
                            </div>

                            <div>
                                <Label htmlFor="excerpt" className="text-zinc-300">Excerpt *</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                                    placeholder="Brief summary of the post..."
                                    rows={3}
                                    className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                                />
                            </div>
                        </div>
                    </GlassCard>

                    {/* Content Editor */}
                    <GlassCard className="p-6">
                        <SectionHeader title="Content" description="Use Markdown for formatting" />
                        <Textarea
                            value={formData.content}
                            onChange={(e) => handleInputChange('content', e.target.value)}
                            placeholder="Write your post content here using Markdown...

## Heading 2
### Heading 3

**Bold text** and *italic text*

- List item 1
- List item 2

```javascript
// Code block
const example = 'Hello World';
```

[Link text](https://example.com)"
                            rows={20}
                            className="bg-zinc-800/50 border-zinc-700 text-white font-mono text-sm"
                        />
                    </GlassCard>

                    {/* SEO Settings */}
                    <GlassCard className="p-6">
                        <SectionHeader title="SEO Settings" description="Optimize for search engines" />
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="seo-title" className="text-zinc-300">SEO Title</Label>
                                <Input
                                    id="seo-title"
                                    value={formData.seo_title}
                                    onChange={(e) => handleInputChange('seo_title', e.target.value)}
                                    placeholder="Custom title for search engines"
                                    className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                                />
                                <p className="text-xs text-zinc-500 mt-1">
                                    {formData.seo_title.length}/60 characters
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="seo-description" className="text-zinc-300">SEO Description</Label>
                                <Textarea
                                    id="seo-description"
                                    value={formData.seo_description}
                                    onChange={(e) => handleInputChange('seo_description', e.target.value)}
                                    placeholder="Custom description for search engines..."
                                    rows={3}
                                    className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                                />
                                <p className="text-xs text-zinc-500 mt-1">
                                    {formData.seo_description.length}/160 characters
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="keywords" className="text-zinc-300">SEO Keywords</Label>
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        id="keywords"
                                        value={keywordInput}
                                        onChange={(e) => setKeywordInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                                        placeholder="Add keyword..."
                                        className="bg-zinc-800/50 border-zinc-700 text-white"
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleAddKeyword}
                                        variant="outline"
                                        className="border-zinc-700"
                                    >
                                        Add
                                    </Button>
                                </div>
                                {formData.seo_keywords.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.seo_keywords.map((keyword, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm"
                                            >
                                                {keyword}
                                                <button
                                                    onClick={() => handleRemoveKeyword(index)}
                                                    className="hover:text-emerald-400"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Category & Image */}
                    <GlassCard className="p-6">
                        <SectionHeader title="Post Settings" />
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="category" className="text-zinc-300">Category *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => handleInputChange('category', value)}
                                >
                                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white mt-2">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="text-zinc-300">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="image" className="text-zinc-300">Featured Image URL</Label>
                                <Input
                                    id="image"
                                    value={formData.image}
                                    onChange={(e) => handleInputChange('image', e.target.value)}
                                    placeholder="https://..."
                                    className="bg-zinc-800/50 border-zinc-700 text-white mt-2"
                                />
                                {formData.image && (
                                    <div className="mt-3 rounded-lg overflow-hidden bg-zinc-800">
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-32 object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </GlassCard>

                    {/* Publishing Info */}
                    <GlassCard className="p-6">
                        <SectionHeader title="Publishing" />
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400">Status</span>
                                <span className="text-white">Draft</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400">Visibility</span>
                                <span className="text-white">Public</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400">Author</span>
                                <span className="text-white">You</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    )
}
