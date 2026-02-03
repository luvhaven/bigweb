'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function savePost(data: any) {
    try {
        const supabase = await createClient()

        // Map data to database columns
        const postData = {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            category_id: data.category_id,
            author_id: data.author_id,
            status: data.status,
            published_at: data.published_at,
            is_featured: data.is_featured,
            allow_comments: data.allow_comments,
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            featured_image: data.featured_image || null
        }

        let result;
        if (data.id) {
            result = await supabase
                .from('blog_posts')
                .update(postData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('blog_posts')
                .insert([postData])
        }

        if (result.error) throw result.error

        // Revalidate frontend paths
        revalidatePath('/')
        revalidatePath('/blog')
        if (data.slug) {
            revalidatePath(`/blog/${data.slug}`)
        }

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save post:', error.message || error)
        return { success: false, error: error.message }
    }
}

export async function deletePost(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/')
        revalidatePath('/blog')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete post:', error.message || error)
        return { success: false, error: error.message }
    }
}
