import { supabase } from '../supabase/client'

export const chatAPI = {
    // Sessions
    async getAllSessions(filters?: { status?: string; assigned_to?: string }) {
        let query = supabase
            .from('chat_sessions')
            .select('*, assigned:profiles(full_name, avatar_url)')
            .order('created_at', { ascending: false })

        if (filters?.status) query = query.eq('status', filters.status)
        if (filters?.assigned_to) query = query.eq('assigned_to', filters.assigned_to)

        const { data, error } = await query
        if (error) throw error
        return data
    },

    async getSessionById(id: string) {
        const { data, error } = await supabase
            .from('chat_sessions')
            .select('*, assigned:profiles(full_name, avatar_url)')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    async createSession(session: any) {
        const { data, error } = await supabase
            .from('chat_sessions')
            .insert(session)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async updateSession(id: string, updates: any) {
        const { data, error } = await supabase
            .from('chat_sessions')
            .update(updates)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async assignSession(id: string, agentId: string) {
        const { data, error } = await supabase
            .from('chat_sessions')
            .update({ assigned_to: agentId, status: 'active' })
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async closeSession(id: string, rating?: number) {
        const { data, error } = await supabase
            .from('chat_sessions')
            .update({
                status: 'closed',
                ended_at: new Date().toISOString(),
                ...(rating && { rating })
            })
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Messages
    async getMessages(sessionId: string) {
        const { data, error } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('session_id', sessionId)
            .order('created_at')
        if (error) throw error
        return data
    },

    async sendMessage(message: any) {
        const { data, error } = await supabase
            .from('chat_messages')
            .insert(message)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async markAsRead(messageId: string) {
        const { data, error } = await supabase
            .from('chat_messages')
            .update({ is_read: true })
            .eq('id', messageId)
            .select()
            .single()
        if (error) throw error
        return data
    },

    // Real-time subscriptions
    subscribeToSession(sessionId: string, callback: (payload: any) => void) {
        return supabase
            .channel(`chat:${sessionId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'chat_messages',
                filter: `session_id=eq.${sessionId}`
            }, callback)
            .subscribe()
    }
}
