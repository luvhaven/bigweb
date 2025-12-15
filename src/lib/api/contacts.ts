import { adminSupabase as supabase } from '@/utils/adminSupabase'

export const contactsAPI = {
    async getAll(filters?: { status?: string }) {
        let query = supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false })

        if (filters?.status) query = query.eq('status', filters.status)

        const { data, error } = await query
        if (error) throw error
        return data
    },

    async getById(id: string) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*, replied_by:admin_users(full_name:name)')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    async create(submission: any) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert(submission as any)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async updateStatus(id: string, status: string) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .update({ status } as any)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async markAsReplied(id: string, userId: string, notes?: string) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .update({
                status: 'replied',
                replied_at: new Date().toISOString(),
                replied_by: userId,
                notes
            } as any)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async delete(id: string) {
        const { error } = await supabase
            .from('contact_submissions')
            .delete()
            .eq('id', id)
        if (error) throw error
    },

    async exportToCSV() {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        // Convert to CSV
        if (!data || data.length === 0) return ''

        const headers = Object.keys(data[0]).join(',')
        const rows = data.map(row => Object.values(row).map(val =>
            typeof val === 'string' && val.includes(',') ? `"${val}"` : val
        ).join(','))

        return [headers, ...rows].join('\n')
    }
}
