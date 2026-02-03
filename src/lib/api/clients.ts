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
        // Try both potential table names
        let { data, error } = await supabase.from('cms_clients').select('*').order('sort_order', { ascending: true })
        if (error) {
            const fallback = await supabase.from('clients').select('*').order('sort_order', { ascending: true })
            data = fallback.data
            error = fallback.error
        }

        if (error) throw error
        return data as Client[]
    },

    getActive: async () => {
        // Try both potential table names and field names (is_active vs active)
        let res = await supabase.from('cms_clients').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        if (res.error) {
            res = await supabase.from('cms_clients').select('*').eq('active', true).order('sort_order', { ascending: true })
        }
        if (res.error) {
            res = await supabase.from('clients').select('*').eq('active', true).order('sort_order', { ascending: true })
        }
        if (res.error) {
            res = await supabase.from('clients').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        }

        if (res.error) {
            console.error('Failed to fetch active clients from any table:', res.error)
            return []
        }
        return res.data as Client[]
    },

    create: async (client: Partial<Client>) => {
        const { data, error } = await supabase.from('cms_clients').insert(client).select().single()
        if (error) throw error
        return data as Client
    },

    update: async (id: string, client: Partial<Client>) => {
        const { data, error } = await supabase.from('cms_clients').update(client).eq('id', id).select().single()
        if (error) throw error
        return data as Client
    },

    delete: async (id: string) => {
        const { error } = await supabase.from('cms_clients').delete().eq('id', id)
        if (error) throw error
    }
}
