'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2, Eye, Calendar, FileText } from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { format } from 'date-fns'

interface BlogPost {
    id: string
    title: string
    status: string
    published_at: string | null
    views_count: number
    author_id: string
    category_id: string
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('blog_posts')
                .select('id, title, status, published_at, views_count, author_id, category_id')
                .order('created_at', { ascending: false })

            if (error) throw error
            setPosts(data || [])
        } catch (error) {
            console.error('Error loading posts:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id)

            if (error) throw error
            setPosts(posts.filter(p => p.id !== id))
        } catch (error) {
            console.error('Error deleting post:', error)
            alert('Failed to delete post')
        }
    }

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20'
            case 'draft': return 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20'
            case 'scheduled': return 'bg-blue-500/10 text-blue-500 ring-blue-500/20'
            case 'archived': return 'bg-orange-500/10 text-orange-500 ring-orange-500/20'
            default: return 'bg-zinc-500/10 text-zinc-400'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Blog Content</h1>
                    <p className="text-zinc-400 mt-1">Manage articles, news, and updates</p>
                </div>
                <Link
                    href="/admin/blog/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Create Post
                </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                </div>
            </div>

            {/* Posts List */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-800/50 text-zinc-400 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Views</th>
                                <th className="px-6 py-4">Published Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                                        Loading posts...
                                    </td>
                                </tr>
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                                        No posts found. Write something new!
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white line-clamp-1">{post.title}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset capitalize ${getStatusColor(post.status)}`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400 font-mono">
                                            {post.views_count}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-400">
                                            {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/blog/${post.id}`}
                                                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

