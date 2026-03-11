import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const department = searchParams.get('department')
    const type = searchParams.get('type')

    let query = supabaseAdmin
      .from('career_openings')
      .select('*')
      .eq('is_active', true)
      .order('posted_date', { ascending: false })

    if (department && department !== 'All') {
      query = query.eq('department', department)
    }
    if (type && type !== 'All') {
      query = query.eq('type', type)
    }

    const { data: openings, error } = await query

    if (error) {
      console.error('Careers openings error:', error)
      return NextResponse.json({ success: false, error: 'Failed to fetch career openings' }, { status: 500 })
    }

    const formattedOpenings = (openings || []).map((opening: any) => ({
      id: opening.id,
      title: opening.title,
      location: opening.location,
      type: opening.type,
      department: opening.department,
      description: opening.description,
      salaryRange: opening.salary_range,
      postedDate: opening.posted_date,
      applicants: 0,
    }))

    return NextResponse.json({ success: true, data: formattedOpenings })
  } catch (error) {
    console.error('Error fetching career openings:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch career openings' }, { status: 500 })
  }
}
