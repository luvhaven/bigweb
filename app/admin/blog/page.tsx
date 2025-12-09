'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    EyeOff,
    FileText,
    Calendar,
    User,
    Tag,
    Loader2,
    AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { GlassCard, SectionHeader, EmptyState, Skeleton } from '@/components/admin/ui/GlassCard'
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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useBlogPosts, useDeleteBlogPost, useUpdateBlogPost } from '@/hooks/useAdminContent'
import { cn } from '@/lib/utils'
import { formatDistanceToNow, format } from 'date-fns'
import { toast } from 'sonner'

const categoryColors: Record<string, string> = {
    'Web Development': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'UI/UX Design': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'AI & Automation': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'SEO & Marketing': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Industry News': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
}

export default function BlogPage() {
    const { data: posts, isLoading, error } = useBlogPosts()
    const deletePost = useDeleteBlogPost()
    const updatePost = useUpdateBlogPost()

    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState<any>(null)

    const filteredPosts = posts?.filter(p => {
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus =
            !statusFilter ||
            (statusFilter === 'published' && p.published) ||
            (statusFilter === 'draft' && !p.published)

        return matchesSearch && matchesStatus
    })

    const handleDelete = async () => {
        if (!selectedPost) return

        try {
            await deletePost.mutateAsync(selectedPost.id)
            toast.success('Post deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedPost(null)
        } catch (error) {
            toast.error('Failed to delete post')
        }
    }

    const handleTogglePublished = async (post: any) => {
        try {
            await updatePost.mutateAsync({
                id: post.id,
                published: !post.published,
                published_at: !post.published ? new Date().toISOString() : null
            })
            toast.success(post.published ? 'Post unpublished' : 'Post published')
        } catch (error) {
            toast.error('Failed to update post')
        }
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-zinc-400">Failed to load blog posts. Please try again.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
                    <p className="text-zinc-400 mt-1">
                        Create and manage your blog content
                    </p>
                </div>
                <Link href="/admin/blog/new">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                        <Plus className="w-4 h-4 mr-2" />
                        New Post
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={!statusFilter ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setStatusFilter(null)}
                            className={!statusFilter ? 'bg-emerald-500' : 'text-zinc-400'}
                        >
                            All
                        </Button>
                        <Button
                            variant={statusFilter === 'published' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setStatusFilter('published')}
                            className={statusFilter === 'published' ? 'bg-emerald-500' : 'text-zinc-400'}
                        >
                            Published
                        </Button>
                        <Button
                            variant={statusFilter === 'draft' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setStatusFilter('draft')}
                            className={statusFilter === 'draft' ? 'bg-emerald-500' : 'text-zinc-400'}
                        >
                            Drafts
                        </Button>
                    </div>
                </div>
            </GlassCard>

            {/* Posts List */}
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <GlassCard key={i} className="p-6">
                            <Skeleton className="h-5 w-3/4 mb-3" />
                            <Skeleton className="h-4 w-full mb-4" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-24" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </GlassCard>
                    ))}
                </div>
            ) : filteredPosts?.length === 0 ? (
                <EmptyState
                    icon={<FileText className="w-8 h-8" />}
                    title="No blog posts yet"
                    description="Create your first blog post to start sharing content."
                    action={
                        <Link href="/admin/blog/new">
                            <Button className="bg-emerald-500 hover:bg-emerald-600">
                                <Plus className="w-4 h-4 mr-2" />
                                New Post
                            </Button>
                        </Link>
                    }
                />
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {filteredPosts?.map((post, index) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <GlassCard className="p-6">
                                    <div className="flex items-start gap-4">
                                        {/* Image thumbnail */}
                                        {post.image && (
                                            <div className="w-24 h-16 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                                        <h3 className="font-medium text-white text-lg">{post.title}</h3>
                                                        {!post.published && (
                                                            <Badge variant="outline" className="bg-zinc-700/50 text-zinc-400 border-zinc-600">
                                                                Draft
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-4 flex-wrap text-sm text-zinc-500">
                                                        <Badge variant="outline" className={cn('text-xs', categoryColors[post.category] || 'bg-zinc-700 text-zinc-300')}>
                                                            {post.category}
                                                        </Badge>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {post.published_at
                                                                ? format(new Date(post.published_at), 'MMM d, yyyy')
                                                                : format(new Date(post.created_at), 'MMM d, yyyy')}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="w-3 h-3" />
                                                            {post.views.toLocaleString()} views
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <Link href={`/admin/blog/${post.id}`}>
                                                        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                                            <DropdownMenuItem
                                                                onClick={() => handleTogglePublished(post)}
                                                                className="text-zinc-300 focus:bg-zinc-800"
                                                            >
                                                                {post.published ? (
                                                                    <>
                                                                        <EyeOff className="w-4 h-4 mr-2" />
                                                                        Unpublish
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Eye className="w-4 h-4 mr-2" />
                                                                        Publish
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-zinc-800" />
                                                            <Link href={`/admin/blog/${post.id}`}>
                                                                <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800">
                                                                    <Edit2 className="w-4 h-4 mr-2" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setSelectedPost(post)
                                                                    setDeleteDialogOpen(true)
                                                                }}
                                                                className="text-red-400 focus:bg-red-500/10"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-white">Delete Blog Post</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Are you sure you want to delete "{selectedPost?.title}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            className="border-zinc-700 text-zinc-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={deletePost.isPending}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {deletePost.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
