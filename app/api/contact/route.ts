import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Simple in-memory rate limiter (per IP, 5 req/min)
const rateLimitMap = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const entry = rateLimitMap.get(ip)
    if (!entry || now > entry.reset) {
        rateLimitMap.set(ip, { count: 1, reset: now + 60_000 })
        return true
    }
    if (entry.count >= 5) return false
    entry.count++
    return true
}

export async function POST(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin()
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1'

    if (!checkRateLimit(ip)) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again in a minute.' },
            { status: 429 }
        )
    }

    try {
        const body = await request.json()
        const { name, email, message, plan, company, revenue, type } = body

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json({ error: 'Missing required fields: name, email, message' }, { status: 400 })
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
        }

        const { data, error } = await supabaseAdmin
            .from('cms_leads')
            .insert({
                type: type || 'contact',
                name: name.trim(),
                email: email.trim().toLowerCase(),
                message: message.trim(),
                plan: plan || null,
                revenue: revenue || null,
                status: 'new',
                metadata: {
                    company: company || null,
                    source: 'api_contact_form',
                    ip_address: ip,
                    submitted_at: new Date().toISOString(),
                },
            })
            .select()
            .single()

        if (error) {
            console.error('[Contact API] Supabase insert error:', error)
            return NextResponse.json({ error: 'Failed to save submission. Please try again.' }, { status: 500 })
        }

        return NextResponse.json({ success: true, id: data?.id })
    } catch (error) {
        console.error('[Contact API] Fatal error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

