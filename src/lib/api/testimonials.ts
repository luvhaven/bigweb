import { adminSupabase as supabase } from '@/utils/adminSupabase'

export interface Testimonial {
    id: string
    client_name: string
    client_role?: string
    client_company?: string
    client_image?: string
    content: string
    rating: number
    result_metric?: string
    project_id?: string
    is_featured: boolean
    status: 'active' | 'inactive' | 'draft'
    order_index: number
    created_at: string
    updated_at: string
}

export const testimonialsAPI = {
    // Get all testimonials
    async getAll(status?: string) {
        let query = supabase
            .from('testimonials')
            .select('*')
            .order('order_index', { ascending: true })

        if (status) {
            query = query.eq('status', status)
        }

        const { data, error } = await query

        if (error) {
            console.error('🔥 Supabase API Error (getAll):', error)
            console.error('Query:', { table: 'testimonials', status })
            throw error
        }

        return data
    },

    // Get featured testimonials
    async getFeatured() {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('status', 'active')
            .eq('is_featured', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    },

    // Get by ID
    async getById(id: string) {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Create testimonial
    async create(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
        const { data, error } = await supabase
            .from('testimonials')
            .insert(testimonial as any)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update testimonial
    async update(id: string, updates: Partial<Testimonial>) {
        const { data, error } = await supabase
            .from('testimonials')
            .update(updates as any)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update order
    async updateOrder(testimonials: Array<{ id: string; order_index: number }>) {
        const updates = testimonials.map(t => ({
            id: t.id,
            order_index: t.order_index
        }))

        const { data, error } = await supabase
            .from('testimonials')
            .upsert(updates as any)
            .select()

        if (error) throw error
        return data
    },

    // Toggle featured status
    async toggleFeatured(id: string) {
        const testimonial = await this.getById(id)
        return this.update(id, { is_featured: !testimonial.is_featured })
    },

    // Delete testimonial
    async delete(id: string) {
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
