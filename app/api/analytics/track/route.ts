import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { parseUserAgent, getCountryFromHeaders, getCityFromHeaders } from '@/lib/analytics-utils'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, data } = body
        const userAgent = request.headers.get('user-agent') || ''

        const uaInfo = parseUserAgent(userAgent)
        const country = getCountryFromHeaders(request.headers) || 'Unknown'
        const city = getCityFromHeaders(request.headers) || 'Unknown'

        if (type === 'pageview') {
            await supabaseAdmin.from('page_views').insert({
                page: data.page,
                referrer: data.referrer || null,
                user_agent: userAgent,
                session_id: data.sessionId || null,
                country,
                city,
                device: uaInfo.device,
                browser: uaInfo.browser,
                os: uaInfo.os,
                viewed_at: new Date().toISOString(),
            })
        } else if (type === 'event') {
            await supabaseAdmin.from('events').insert({
                event: data.event,
                category: data.category,
                label: data.label || null,
                value: data.value || null,
                metadata: data.metadata || null,
                occurred_at: new Date().toISOString(),
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Analytics track error:', error)
        // Never fail silently-return but don't break page loads for analytics errors
        return NextResponse.json({ success: false, error: 'Failed to track' }, { status: 200 })
    }
}
