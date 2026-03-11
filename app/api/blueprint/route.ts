import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

// Rate limit store (in-memory, resets on cold start)
const rateLimit = new Map<string, number>()

export async function POST(request: NextRequest) {
    const supabaseAdmin = getSupabaseAdmin()

    try {
        const body = await request.json()
        const { email } = body

        // Validate email
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ success: false, error: 'Valid email required' }, { status: 400 })
        }

        // Rate limit: 3 requests per IP per hour
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
        const now = Date.now()
        const key = `${ip}:${Math.floor(now / 3600000)}`
        const count = rateLimit.get(key) || 0
        if (count >= 3) {
            return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
        }
        rateLimit.set(key, count + 1)

        // Save lead to Supabase
        const { error: insertError } = await supabaseAdmin
            .from('cms_leads')
            .insert({
                type: 'blueprint_download',
                email: email.toLowerCase().trim(),
                name: null,
                message: '90-Day Conversion Blueprint download request',
                status: 'new',
                metadata: {
                    source: 'exit_intent_modal',
                    ip,
                    requested_at: new Date().toISOString(),
                },
            })

        if (insertError) {
            console.error('Blueprint lead insert error:', insertError.message)
            // Don't block download if DB insert fails
        }

        // Generate a signed URL to the PDF stored in Supabase Storage
        const { data: signedUrlData, error: urlError } = await supabaseAdmin
            .storage
            .from('assets')
            .createSignedUrl('blueprint/90-day-conversion-blueprint.pdf', 3600) // 1 hour expiry

        if (urlError || !signedUrlData?.signedUrl) {
            console.error('Blueprint signed URL error:', urlError?.message)
            return NextResponse.json({
                success: true,
                downloadUrl: null,
                message: 'Blueprint request received. Check your email shortly.',
            })
        }

        return NextResponse.json({
            success: true,
            downloadUrl: signedUrlData.signedUrl,
            message: 'Blueprint ready for download!',
        })
    } catch (error) {
        console.error('Blueprint API error:', error)
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 })
    }
}
