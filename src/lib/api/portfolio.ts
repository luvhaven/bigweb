import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

export interface PortfolioItem {
    id: string
    title: string
    slug: string
    description?: string
    excerpt?: string
    client_name?: string
    client_logo?: string
    industry?: string
    project_type?: string
    technologies?: string[]
    featured_image?: string
    gallery_images?: string[]
    video_url?: string
    live_url?: string
    github_url?: string
    duration?: string
    team_size?: number
    metrics?: {
        [key: string]: string
    }
    challenge?: string
    solution?: string
    results?: string
    testimonial?: {
        client_name: string
        client_role: string
        content: string
        rating: number
    }
    is_featured: boolean
    status: 'published' | 'draft' | 'archived'
    order_index: number
    meta_title?: string
    meta_description?: string
    og_image?: string
    published_at?: string
    created_at: string
    updated_at: string
}

export const portfolioAPI = {
    // Get all portfolio items
    async getAll(status?: string) {
        let query = supabase
            .from('portfolio_items')
            .select('*')
            .order('order_index', { ascending: true })

        if (status) {
            query = query.eq('status', status)
        }

        const { data, error } = await query

        if (error) {
            console.error('🔥 Supabase API Error (getAll):', error)
            console.error('Query:', { table: 'portfolio_items', status })
            throw error
        }

        return data
    },

    // Get published items
    async getPublished() {
        const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false })

        if (error) throw error
        return data
    },

    // Get featured items
    async getFeatured(limit?: number) {
        let query = supabase
            .from('portfolio_items')
            .select('*')
            .eq('status', 'published')
            .eq('is_featured', true)
            .order('order_index', { ascending: true })

        if (limit) {
            query = query.limit(limit)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get by slug
    async getBySlug(slug: string) {
        const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .single()

        if (error) throw error
        return data
    },

    // Get by ID
    async getById(id: string) {
        const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Get by industry
    async getByIndustry(industry: string) {
        const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .eq('status', 'published')
            .eq('industry', industry)
            .order('published_at', { ascending: false })

        if (error) throw error
        return data
    },

    // Create portfolio item
    async create(item: Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'>) {
        const { data, error } = await supabase
            .from('portfolio_items')
            .insert(item as any)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update portfolio item
    async update(id: string, updates: Partial<PortfolioItem>) {
        const { data, error } = await supabase
            .from('portfolio_items')
            .update(updates as any)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Publish item
    async publish(id: string) {
        return this.update(id, {
            status: 'published',
            published_at: new Date().toISOString()
        })
    },

    // Delete portfolio item
    async delete(id: string) {
        const { error } = await supabase
            .from('portfolio_items')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
