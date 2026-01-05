import { createClient } from '@/lib/supabase/client'

export interface Client {
    id: string
    name: string
    logo_url: string
    active: boolean
    sort_order: number
}

// Create a client instance
const supabase = createClient()

export const clientsAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('cms_clients')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data as Client[]
    },

    getActive: async () => {
        const { data, error } = await supabase
            .from('cms_clients')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data as Client[]
    }
}
