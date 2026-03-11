'use server'

import { createClient } from '@/lib/supabase/server'
import { unstable_noStore } from 'next/cache'
import { EngagementListSchema, safeParseList, type Engagement } from '@/lib/schemas'

export async function getPricingTiers(): Promise<Engagement[]> {
    unstable_noStore()
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('engagements')
            .select('*')
            .eq('status', 'published')
            .order('sort_order', { ascending: true })

        if (error) throw error

        return safeParseList<Engagement>(EngagementListSchema, data || [], 'Engagement')
    } catch (error: any) {
        console.error('Failed to fetch pricing tiers:', error.message || error)
        return []
    }
}
