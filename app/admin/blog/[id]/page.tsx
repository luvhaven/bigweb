'use client'

import { useEffect, useState } from 'react'
import BlogForm from '../components/BlogForm'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditPostPage() {
    const params = useParams()
    const router = useRouter()
    const [post, setPost] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPost = async () => {
            try {
                const id = Array.isArray(params.id) ? params.id[0] : params.id
                if (!id) return;

                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setPost(data)
            } catch (error) {
                console.error('Error loading post:', error)
                router.push('/admin/blog')
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            loadPost()
        }
    }, [params.id, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!post) return null

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Edit Post</h1>
                <p className="text-zinc-400 mt-1">Update blog post content and settings</p>
            </div>
            <BlogForm initialData={post} isEditing />
        </div>
    )
}
