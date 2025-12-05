import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/client'

type Message = Database['public']['Tables']['messages']['Row']

export const messagesAPI = {
    getAll: async () => {
        const { data, error } = await supabase.from('messages').select('*')
        if (error) throw error
        return data as Message[]
    },
    getById: async (id: string) => {
        const { data, error } = await supabase.from('messages').select('*').eq('id', id).single()
        if (error) throw error
        return data as Message
    },
    create: async (payload: Omit<Message, 'id'>) => {
        const { data, error } = await supabase.from('messages').insert(payload).single()
        if (error) throw error
        return data as Message
    },
    update: async (id: string, payload: Partial<Message>) => {
        const { data, error } = await supabase.from('messages').update(payload).eq('id', id).single()
        if (error) throw error
        return data as Message
    },
    delete: async (id: string) => {
        const { error } = await supabase.from('messages').delete().eq('id', id)
        if (error) throw error
    },
}
