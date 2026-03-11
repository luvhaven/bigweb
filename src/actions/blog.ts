'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'
import { BlogPost, BlogPostSchema, safeParseList } from '@/lib/schemas'

const BlogListSchema = BlogPostSchema.array()

/**
 * Fetch all published blog posts, ordered by newest first.
 * Uses Zod safeParseList to filter out any malformed rows without crashing.
 */
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
    const supabase = await createClient()

    const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published') // Using 'status' based on the save logic below
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Failed to fetch blog posts:', error)
        return []
    }

    return safeParseList<BlogPost>(BlogListSchema, posts, 'BlogPost')
})

/**
 * Fetch a single blog post by its slug.
 * Uses strict Zod parsing to guarantee type safety in the UI.
 */
export const getBlogPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
    const supabase = await createClient()

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error || !post) {
        if (error?.code !== 'PGRST116') // ignore "Not found" noise
            console.error(`Failed to fetch blog post (${slug}):`, error)
        return null
    }

    const result = BlogPostSchema.safeParse(post)

    if (!result.success) {
        console.error(`[Schema:BlogPost] Validation failed for slug ${slug}:`, result.error.flatten())
        return null
    }

    return result.data
})

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
