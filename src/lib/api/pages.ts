import { supabase } from '../supabase/client'
import type { Database } from '../supabase/client'

type Page = Database['public']['Tables']['pages']['Row']
type PageInsert = Database['public']['Tables']['pages']['Insert']
type PageUpdate = Database['public']['Tables']['pages']['Update']

export const pagesAPI = {
    // Get all pages
    async getAll(filters?: { status?: string; author_id?: string }) {
        let query = supabase
            .from('pages')
            .select('*, author:profiles(full_name, avatar_url)')
            .order('created_at', { ascending: false })

        if (filters?.status) {
            query = query.eq('status', filters.status)
        }

        if (filters?.author_id) {
            query = query.eq('author_id', filters.author_id)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get page by ID
    async getById(id: string) {
        const { data, error } = await supabase
            .from('pages')
            .select('*, author:profiles(full_name, avatar_url)')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Get page by slug
    async getBySlug(slug: string) {
        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) throw error
        return data
    },

    // Create new page
    async create(page: PageInsert) {
        const { data, error } = await supabase
            .from('pages')
            .insert(page)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update page
    async update(id: string, updates: PageUpdate) {
        const { data, error } = await supabase
            .from('pages')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Delete page
    async delete(id: string) {
        const { error } = await supabase
            .from('pages')
            .delete()
            .eq('id', id)

        if (error) throw error
    },

    // Publish page
    async publish(id: string) {
        const { data, error } = await supabase
            .from('pages')
            .update({
                status: 'published',
                published_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Increment view count
    async incrementViews(id: string) {
        const { error } = await supabase.rpc('increment_page_views', { page_id: id })
        if (error) throw error
    },

    // Create page version
    async createVersion(pageId: string, content: any, userId: string) {
        // Get current version number
        const { data: versions } = await supabase
            .from('page_versions')
            .select('version_number')
            .eq('page_id', pageId)
            .order('version_number', { ascending: false })
            .limit(1)

        const nextVersion = versions && versions.length > 0 ? versions[0].version_number + 1 : 1

        const { data, error } = await supabase
            .from('page_versions')
            .insert({
                page_id: pageId,
                content,
                version_number: nextVersion,
                created_by: userId
            })
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Get page versions
    async getVersions(pageId: string) {
        const { data, error } = await supabase
            .from('page_versions')
            .select('*, created_by:profiles(full_name)')
            .eq('page_id', pageId)
            .order('version_number', { ascending: false })

        if (error) throw error
        return data
    }
}
