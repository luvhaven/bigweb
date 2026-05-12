import { createClient } from '@/lib/supabase/client'

export interface VideoItem {
    id: string
    title: string
    description: string
    thumbnail_url: string
    video_url?: string
    duration?: string
    category: string
    featured: boolean
    sort_order: number
}

// Create a client instance
const supabase = createClient()

export const videosAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('cms_video_showroom')
            .select('*')
            .eq('is_active', true) // Added active check for safety
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data as VideoItem[]
    }
}
