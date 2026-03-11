import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin()
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
