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
    const { firstName, lastName, email, phone, resumeUrl, coverLetter, linkedin, portfolio, jobId } = body

    if (!firstName || !lastName || !email || !resumeUrl || !jobId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Check if job exists and is active
    const { data: job } = await supabaseAdmin
      .from('career_openings')
      .select('id, is_active, title')
      .eq('id', jobId)
      .single()

    if (!job || !job.is_active) {
      return NextResponse.json({ success: false, error: 'Job opening not found or no longer active' }, { status: 404 })
    }

    // Create application
    const { data: application, error } = await supabaseAdmin
      .from('job_applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        resume_url: resumeUrl,
        cover_letter: coverLetter || null,
        linkedin: linkedin || null,
        portfolio: portfolio || null,
        job_id: jobId,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Careers apply error:', error)
      return NextResponse.json({ success: false, error: 'Failed to submit application' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      applicationId: application?.id,
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit application' }, { status: 500 })
  }
}
