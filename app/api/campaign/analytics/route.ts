import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()
        const body = await request.json()

        const {
            packageSlug,
            eventType,
            visitorId,
            sessionId,
            referrer,
            deviceType
        } = body

        // Get country from headers (works with Vercel)
        const country = request.headers.get('x-vercel-ip-country') || 'Unknown'
        const userAgent = request.headers.get('user-agent') || ''

        const { error } = await supabase
            .from('campaign_analytics')
            .insert({
                package_slug: packageSlug,
                event_type: eventType,
                visitor_id: visitorId,
                session_id: sessionId,
                referrer,
                user_agent: userAgent,
                country,
                device_type: deviceType
            })

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Analytics error:', error)
        return NextResponse.json(
            { error: 'Failed to track event' },
            { status: 500 }
        )
    }
}

// Get analytics data for admin dashboard
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient()
        const { searchParams } = new URL(request.url)
        const packageSlug = searchParams.get('package')

        let query = supabase
            .from('campaign_analytics')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1000)

        if (packageSlug) {
            query = query.eq('package_slug', packageSlug)
        }

        const { data, error } = await query

        if (error) throw error

        // Aggregate stats
        const stats = {
            totalViews: data?.filter(e => e.event_type === 'page_view').length || 0,
            ctaClicks: data?.filter(e => e.event_type === 'cta_click').length || 0,
            formStarts: data?.filter(e => e.event_type === 'form_start').length || 0,
            formCompletes: data?.filter(e => e.event_type === 'form_complete').length || 0,
            byCountry: {},
            byDevice: {},
            raw: data
        }

        // Group by country
        data?.forEach(event => {
            if (event.country) {
                stats.byCountry[event.country] = (stats.byCountry[event.country] || 0) + 1
            }
            if (event.device_type) {
                stats.byDevice[event.device_type] = (stats.byDevice[event.device_type] || 0) + 1
            }
        })

        return NextResponse.json(stats)
    } catch (error) {
        console.error('Analytics GET error:', error)
        return NextResponse.json(
            { error: 'Failed to get analytics' },
            { status: 500 }
        )
    }
}
