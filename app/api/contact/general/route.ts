import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, subject, source } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('cms_leads')
      .insert({
        type: 'general_contact',
        name,
        email,
        message,
        status: 'new',
        metadata: {
          phone: phone || null,
          company: company || null,
          subject: subject || null,
          source: source || 'general_form',
          submitted_at: new Date().toISOString(),
        },
      })
      .select()
      .single()

    if (error) {
      console.error('Contact general error:', error)
      return NextResponse.json({ success: false, error: 'Failed to submit contact form' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      ticketId: data?.id,
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit contact form' }, { status: 500 })
  }
}
