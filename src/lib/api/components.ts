import { adminSupabase as supabase } from '@/utils/adminSupabase'

export interface Component {
    id: string
    type: string
    name: string
    data: any
    status: 'active' | 'inactive' | 'draft'
    order_index: number
    page_ids: string[]
    created_at: string
    updated_at: string
}

export const componentsAPI = {
    // Get all components
    async getAll(type?: string, status?: string) {
        let query = supabase
            .from('components')
            .select('*')
            .order('order_index', { ascending: true })

        if (type) {
            query = query.eq('type', type)
        }

        if (status) {
            query = query.eq('status', status)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get component by ID
    async getById(id: string) {
        const { data, error } = await supabase
            .from('components')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Get components by page
    async getByPage(page_id: string) {
        const { data, error } = await supabase
            .from('components')
            .select('*')
            .contains('page_ids', [page_id])
            .eq('status', 'active')
            .order('order_index', { ascending: true })

        if (error) throw error
        return data
    },

    // Create component
    async create(component: Omit<Component, 'id' | 'created_at' | 'updated_at'>) {
        const { data, error } = await supabase
            .from('components')
            .insert(component as any)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update component
    async update(id: string, updates: Partial<Component>) {
        const { data, error } = await supabase
            .from('components')
            .update(updates as any)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update order
    async updateOrder(components: Array<{ id: string; order_index: number }>) {
        const updates = components.map(c => ({
            id: c.id,
            order_index: c.order_index
        }))

        const { data, error } = await supabase
            .from('components')
            .upsert(updates as any)
            .select()

        if (error) throw error
        return data
    },

    // Toggle status
    async toggleStatus(id: string) {
        const component = await this.getById(id)
        const newStatus = component.status === 'active' ? 'inactive' : 'active'

        return this.update(id, { status: newStatus })
    },

    // Delete component
    async delete(id: string) {
        const { error } = await supabase
            .from('components')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}
