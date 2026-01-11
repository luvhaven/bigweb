import { supabase } from '@/utils/supabase'

export interface TeamMember {
    id?: string
    name: string
    role: string
    bio: string
    avatar_url: string
    linkedin_url?: string
    twitter_url?: string
    github_url?: string
    is_active: boolean
    sort_order: number
}

export const teamAPI = {
    async getAll() {
        try {
            const { data, error } = await supabase
                .from('cms_team_members')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true })

            if (error) {
                console.error('Error fetching team members:', error)
                return []
            }

            return data as TeamMember[]
        } catch (err) {
            console.error('Unexpected error in teamAPI.getAll:', err)
            return []
        }
    }
}
