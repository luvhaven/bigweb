import { supabase } from '../supabase/client'

export interface AnalyticsEvent {
    id: string
    event_type: string
    page_path?: string
    user_id?: string
    session_id?: string
    data?: any
    created_at: string
}

export interface AnalyticsStats {
    totalVisitors: number
    totalPageViews: number
    avgSessionDuration: number
    bounceRate: number
    conversions: number
}

export const analyticsAPI = {
    // Track event
    async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'created_at'>) {
        const { data, error } = await supabase
            .from('analytics_events')
            .insert(event)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Get events
    async getEvents(filters?: {
        event_type?: string
        page_path?: string
        start_date?: string
        end_date?: string
        limit?: number
    }) {
        let query = supabase
            .from('analytics_events')
            .select('*')
            .order('created_at', { ascending: false })

        if (filters?.event_type) {
            query = query.eq('event_type', filters.event_type)
        }

        if (filters?.page_path) {
            query = query.eq('page_path', filters.page_path)
        }

        if (filters?.start_date) {
            query = query.gte('created_at', filters.start_date)
        }

        if (filters?.end_date) {
            query = query.lte('created_at', filters.end_date)
        }

        if (filters?.limit) {
            query = query.limit(filters.limit)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get stats (aggregated)
    async getStats(start_date?: string, end_date?: string): Promise<AnalyticsStats> {
        // In a real implementation, this would use Supabase functions or views
        // For now, returning mock data structure
        const events = await this.getEvents({ start_date, end_date })

        const pageViews = events?.filter(e => e.event_type === 'page_view').length || 0
        const uniqueSessions = new Set(events?.map(e => e.session_id).filter(Boolean)).size

        return {
            totalVisitors: uniqueSessions,
            totalPageViews: pageViews,
            avgSessionDuration: 180, // seconds
            bounceRate: 45, // percentage
            conversions: events?.filter(e => e.event_type === 'conversion').length || 0
        }
    },

    // Get popular pages
    async getPopularPages(limit: number = 10, start_date?: string, end_date?: string) {
        const events = await this.getEvents({
            event_type: 'page_view',
            start_date,
            end_date
        })

        const pageCounts: Record<string, number> = {}
        events?.forEach(event => {
            if (event.page_path) {
                pageCounts[event.page_path] = (pageCounts[event.page_path] || 0) + 1
            }
        })

        return Object.entries(pageCounts)
            .map(([path, views]) => ({ path, views }))
            .sort((a, b) => b.views - a.views)
            .slice(0, limit)
    },

    // Get traffic by source
    async getTrafficSources(start_date?: string, end_date?: string) {
        const events = await this.getEvents({ start_date, end_date })

        const sources: Record<string, number> = {}
        events?.forEach(event => {
            const source = event.data?.source || 'direct'
            sources[source] = (sources[source] || 0) + 1
        })

        return Object.entries(sources).map(([name, count]) => ({ name, count }))
    }
}
