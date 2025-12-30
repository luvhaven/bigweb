import { supabase } from '@/utils/supabase'

export interface PricingTier {
    id: string
    name: string
    price: string
    description: string
    is_popular: boolean
    features: string[]
    sort_order: number
}

export const pricingAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('pricing_tiers')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data as PricingTier[]
    }
}
