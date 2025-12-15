import { adminSupabase as supabase } from '@/utils/adminSupabase'

export interface Service {
    id: string
    title: string
    slug: string
    description?: string
    short_description?: string
    icon?: string
    icon_type?: 'lucide' | 'image' | 'svg'
    features?: string[]
    pricing?: {
        starting_price?: string
        currency?: string
        billing?: string
    }
    process_steps?: any[]
    technologies?: string[]
    case_studies?: string[]
    is_featured: boolean
    status: 'published' | 'draft' | 'archived'
    order_index: number
    meta_title?: string
    meta_description?: string
    created_at: string
    updated_at: string
}

export const servicesAPI = {
    // Get all services
    async getAll(status?: string) {
        let query = supabase
            .from('services')
            .select('*')
            .order('order_index', { ascending: true })

        if (status) {
            query = query.eq('status', status)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get published services
    async getPublished() {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('status', 'published')
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    },

    // Get featured services
    async getFeatured() {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('status', 'published')
            .eq('is_featured', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    },

    // Get by slug
    async getBySlug(slug: string) {
        const { data, error } = await supabase
            .from('services')
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
            .from('services')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Create service
    async create(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
        const { data, error } = await supabase
            .from('services')
            .insert(service as any)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update service
    async update(id: string, updates: Partial<Service>) {
        const { data, error } = await supabase
            .from('services')
            .update(updates as any)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Delete service
    async delete(id: string) {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
