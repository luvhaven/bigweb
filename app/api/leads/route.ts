import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin()
    try {
        const body = await req.json()
        const { name, email, source = 'AI_CHAT', notes } = body

        if (!email) {
            return new NextResponse('Email is required', { status: 400 })
        }

        // 1. Save to cms_leads (primary Supabase table for all lead capture)
        const { data, error } = await supabaseAdmin
            .from('cms_leads')
            .insert({
                type: source || 'ai_chat',
                name: name || 'Anonymous Visitor',
                email,
                message: notes || 'Lead captured via AI Chatbot',
                status: 'new',
                metadata: {
                    source,
                    captured_at: new Date().toISOString(),
                    notes,
                }
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
