import { adminSupabase as supabase } from '@/utils/adminSupabase'

export interface Client {
    id: string
    name: string
    logo_url: string
    active: boolean
    sort_order: number
}

export const clientsAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data as Client[]
    },

    getActive: async () => {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('active', true)
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data as Client[]
    }
}
