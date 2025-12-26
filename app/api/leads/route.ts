import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase Admin Client for generic API routes
// We use Service Role Key to bypass RLS for public submissions
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-key',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, source = 'AI_CHAT', notes } = body

        if (!email) {
            return new NextResponse('Email is required', { status: 400 })
        }

        // 1. Save to Database
        const { data, error } = await supabaseAdmin
            .from('contact_submissions')
            .insert({
                name: name || 'Anonymous Visitor',
                email,
                source,
                message: notes || 'Lead captured via AI Chatbot',
                status: 'new',
                priority: 'medium'
            })
            .select()
            .single()

        if (error) {
            console.error('Database Error:', error)
            throw error
        }

        // 2. Trigger Integrations (Zapier, etc.)
        // This allows the user to connect external tools easily
        if (process.env.ZAPIER_WEBHOOK_URL) {
            try {
                await fetch(process.env.ZAPIER_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        event: 'new_lead',
                        data: { name, email, source, timestamp: new Date().toISOString() }
                    })
                })
            } catch (integrationError) {
                console.error('Integration Error (Zapier):', integrationError)
                // Don't fail the request if integration fails
            }
        }

        return NextResponse.json({ success: true, id: data.id })
    } catch (error) {
        console.error('Lead Submission Error:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
