import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// GET /api/portfolio/projects
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'

    let query = supabaseAdmin
      .from('cms_projects')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }
    if (featured) {
      query = query.eq('is_featured', true)
    }

    const { data: projects, error } = await query

    if (error) {
      console.error('Portfolio projects error:', error)
      return NextResponse.json({ success: false, error: 'Failed to fetch portfolio projects' }, { status: 500 })
    }

    const formattedProjects = (projects || []).map((project: any) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      fullDescription: project.full_description,
      category: project.category,
      client: project.client_name,
      completionDate: project.completion_date,
      duration: project.duration,
      url: project.project_url,
      featured: project.is_featured,
      challenge: project.challenge,
      solution: project.solution,
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      teamSize: project.team_size,
      images: Array.isArray(project.images) ? project.images : [],
      results: Array.isArray(project.results) ? project.results : [],
      testimonial: project.testimonial || null,
    }))

    return NextResponse.json({ success: true, data: formattedProjects })
  } catch (error) {
    console.error('Error fetching portfolio projects:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch portfolio projects' }, { status: 500 })
  }
}
