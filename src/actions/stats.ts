'use server'

import { createClient } from '@/lib/supabase/server'

export async function getGlobalStats() {
    try {
        const supabase = await createClient()
        const { data: stats, error } = await supabase
            .from('statistics')
            .select('*')
            .eq('active', true)
            .order('sort_order', { ascending: true })

        if (error) throw error

        if (!stats || stats.length === 0) return null

        // Map settings to { value, label } format
        return stats.map((s: any) => ({
            value: `${s.value || ''}${s.suffix || ''}`,
            label: s.label
        }))
    } catch (error: any) {
        console.error('Failed to fetch Global Stats:', error.message || error)
        return null
    }
}
