import { adminSupabase as supabase } from '@/utils/adminSupabase'

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

export const videosAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('video_showroom')
            .select('*')
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data as VideoItem[]
    }
}
