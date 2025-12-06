import { supabase } from '@/lib/supabase/client'

export interface AnalyticsEvent {
    event_name: string
    event_data?: Record<string, any>
    page_url?: string
    user_id?: string
    session_id?: string
}

class Analytics {
    private sessionId: string
    private userId: string | null = null

    constructor() {
        this.sessionId = this.getOrCreateSessionId()
        this.initializeUser()
    }

    private getOrCreateSessionId(): string {
        if (typeof window === 'undefined') return ''

        let sessionId = sessionStorage.getItem('analytics_session_id')
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            sessionStorage.setItem('analytics_session_id', sessionId)
        }
        return sessionId
    }

    private async initializeUser() {
        if (!supabase) return

        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            this.userId = user.id
        }
    }

    async track(event: AnalyticsEvent) {
        if (!supabase) {
            console.warn('Supabase not initialized, skipping analytics')
            return
        }

        try {
            const eventData = {
                event_name: event.event_name,
                event_data: event.event_data || {},
                page_url: event.page_url || (typeof window !== 'undefined' ? window.location.href : ''),
                user_id: event.user_id || this.userId,
                session_id: event.session_id || this.sessionId,
                timestamp: new Date().toISOString(),
                user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                referrer: typeof document !== 'undefined' ? document.referrer : ''
            }

            const { error } = await supabase
                .from('analytics_events')
                .insert(eventData)

            if (error) {
                console.error('Analytics tracking error:', error)
            }
        } catch (error) {
            console.error('Failed to track event:', error)
        }
    }

    // Convenience methods for common events
    pageView(page: string, metadata?: Record<string, any>) {
        this.track({
            event_name: 'page_view',
            event_data: { page, ...metadata }
        })
    }

    buttonClick(buttonName: string, location?: string) {
        this.track({
            event_name: 'button_click',
            event_data: { button_name: buttonName, location }
        })
    }

    formSubmit(formName: string, success: boolean, data?: Record<string, any>) {
        this.track({
            event_name: 'form_submit',
            event_data: { form_name: formName, success, ...data }
        })
    }

    linkClick(url: string, text?: string, location?: string) {
        this.track({
            event_name: 'link_click',
            event_data: { url, text, location }
        })
    }

    videoPlay(videoId: string, title?: string) {
        this.track({
            event_name: 'video_play',
            event_data: { video_id: videoId, title }
        })
    }

    searchQuery(query: string, results?: number) {
        this.track({
            event_name: 'search',
            event_data: { query, results }
        })
    }

    conversion(type: string, value?: number, metadata?: Record<string, any>) {
        this.track({
            event_name: 'conversion',
            event_data: { type, value, ...metadata }
        })
    }

    error(errorMessage: string, errorStack?: string, context?: Record<string, any>) {
        this.track({
            event_name: 'error',
            event_data: { message: errorMessage, stack: errorStack, ...context }
        })
    }

    // Scroll depth tracking
    scrollDepth(percentage: number) {
        this.track({
            event_name: 'scroll_depth',
            event_data: { percentage }
        })
    }

    // Time on page tracking
    timeOnPage(seconds: number) {
        this.track({
            event_name: 'time_on_page',
            event_data: { seconds }
        })
    }
}

// Export singleton instance
export const analytics = new Analytics()

// React hook for analytics
export function useAnalytics() {
    return analytics
}
