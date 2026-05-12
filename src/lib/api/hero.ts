import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

export const heroAPI = {
    async getAllSlides() {
        const { data, error } = await supabase
            .from('hero_slides')
            .select('*')
            .order('order_index')
        if (error) throw error
        return data
    },

    async getActiveSlides() {
        const { data, error } = await supabase
            .from('hero_slides')
            .select('*')
            .eq('active', true)
            .order('sort_order', { ascending: true })
        if (error) throw error
        return data
    },

    async getSlideById(id: string) {
        const { data, error } = await supabase
            .from('hero_slides')
            .select('*')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    },

    async createSlide(slide: any) {
        const { data, error } = await supabase
            .from('hero_slides')
            .insert(slide as any)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async updateSlide(id: string, updates: any) {
        const { data, error } = await supabase
            .from('hero_slides')
            .update(updates as any)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return data
    },

    async deleteSlide(id: string) {
        const { error } = await supabase
            .from('hero_slides')
            .delete()
            .eq('id', id)
        if (error) throw error
    },

    async reorderSlides(slides: { id: string; order_index: number }[]) {
        const promises = slides.map(slide =>
            supabase
                .from('hero_slides')
                .update({ order_index: slide.order_index } as any)
                .eq('id', slide.id)
        )
        await Promise.all(promises)
    }
}
