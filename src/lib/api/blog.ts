import { supabase } from '../supabase/client'

export const blogAPI = {
    // Categories
    async getAllCategories() {
        const { data, error } = await supabase
            .from('blog_categories')
            .select('*')
            .order('name')
        if (error) throw error
        return data
    },

    async createCategory(category: { name: string; slug: string; description?: string; color?: string }) {
        const { data, error } = await supabase
            .from('blog_categories')
            .insert(category)
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Posts
    async getAllPosts(filters?: { status?: string; category_id?: string }) {
        let query = supabase
            .from('blog_posts')
            .select('*, author:profiles(full_name, avatar_url), category:blog_categories(name, slug)')
            .order('created_at', { ascending: false })

        if (filters?.status) query = query.eq('status', filters.status)
        if (filters?.category_id) query = query.eq('category_id', filters.category_id)

        const { data, error } = await query
        if (error) throw error
        return data
    },

    async getPostById(id: string) {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*, author:profiles(full_name, avatar_url), category:blog_categories(*)')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    async getPostBySlug(slug: string) {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*, author:profiles(full_name, avatar_url), category:blog_categories(*)')
            .eq('slug', slug)
            .single()
        if (error) throw error
        return data
    },

    async createPost(post: any) {
        const { data, error } = await supabase
            .from('blog_posts')
            .insert(post)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async updatePost(id: string, updates: any) {
        const { data, error } = await supabase
            .from('blog_posts')
            .update(updates)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async deletePost(id: string) {
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id)
        if (error) throw error
    },

    async publishPost(id: string) {
        const { data, error } = await supabase
            .from('blog_posts')
            .update({ status: 'published', published_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    }
}
