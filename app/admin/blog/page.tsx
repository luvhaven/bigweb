'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { blogAPI } from '@/lib/api/blog'
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

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('')

    useEffect(() => {
        loadData()
    }, [statusFilter])

    const loadData = async () => {
        try {
            const [postsData, categoriesData] = await Promise.all([
                blogAPI.getAllPosts(statusFilter ? { status: statusFilter } : undefined),
                blogAPI.getAllCategories()
            ])
            setPosts(postsData || [])
            setCategories(categoriesData || [])
        } catch (error) {
            toast.error('Failed to load blog data')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this post?')) return

        try {
            await blogAPI.deletePost(id)
            setPosts(posts.filter(p => p.id !== id))
            toast.success('Post deleted')
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    const handlePublish = async (post: any) => {
        try {
            await blogAPI.publishPost(post.id)
            loadData()
            toast.success('Post published')
        } catch (error) {
            toast.error('Failed to publish')
        }
    }

    const filteredPosts = posts.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
                    <p className="text-muted-foreground">Create and manage your blog content</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/admin/blog/categories">
                        <Button variant="outline">Manage Categories</Button>
                    </Link>
                    <Link href="/admin/blog/new">
                        <Button className="bg-accent hover:bg-accent/90">
                            <Plus className="w-4 h-4 mr-2" /> New Post
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search posts..."
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
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading posts...</div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
                    <p className="text-muted-foreground mb-4">No posts found</p>
                    <Link href="/admin/blog/new">
                        <Button>Create your first post</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
                        >
                            {post.featured_image && (
                                <div className="aspect-video bg-secondary relative overflow-hidden">
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-green-500/10 text-green-500' :
                                                post.status === 'scheduled' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-secondary text-muted-foreground'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    {post.category && (
                                        <span className="px-2 py-1 rounded-full text-xs bg-accent/10 text-accent">
                                            {post.category.name}
                                        </span>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {post.excerpt || 'No excerpt'}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <div className="flex items-center gap-2">
                                        {post.status === 'draft' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handlePublish(post)}
                                                className="text-green-500 hover:text-green-600"
                                            >
                                                <Eye className="w-4 h-4 mr-1" /> Publish
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        <Link href={`/admin/blog/${post.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500"
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
