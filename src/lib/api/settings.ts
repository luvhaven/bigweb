import { supabase } from '../supabase/client'

export interface SiteSetting {
    id: string
    key: string
    value: any
    category: string
    description?: string
    updated_at: string
    created_at: string
}

export const settingsAPI = {
    // Get all settings
    async getAll(category?: string) {
        let query = supabase
            .from('site_settings')
            .select('*')
            .order('category', { ascending: true })

        if (category) {
            query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get settings as key-value object
    async getAllAsObject() {
        const { data, error } = await supabase
            .from('site_settings')
            .select('key, value')

        if (error) throw error

        const settings: Record<string, any> = {}
        data?.forEach(item => {
            settings[item.key] = item.value
        })
        return settings
    },

    // Get single setting by key
    async getByKey(key: string) {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('key', key)
            .single()

        if (error) throw error
        return data
    },

    // Update or create setting
    async upsert(key: string, value: any, category: string = 'general', description?: string) {
        const { data, error } = await supabase
            .from('site_settings')
            .upsert({
                key,
                value,
                category,
                description
            }, {
                onConflict: 'key'
            })
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Bulk update settings
    async bulkUpdate(settings: Array<{ key: string; value: any; category?: string }>) {
        const updates = settings.map(s => ({
            key: s.key,
            value: s.value,
            category: s.category || 'general'
        }))

        const { data, error } = await supabase
            .from('site_settings')
            .upsert(updates, { onConflict: 'key' })
            .select()

        if (error) throw error
        return data
    },

    // Delete setting
    async delete(key: string) {
        const { error } = await supabase
            .from('site_settings')
            .delete()
            .eq('key', key)

        if (error) throw error
    }
}
