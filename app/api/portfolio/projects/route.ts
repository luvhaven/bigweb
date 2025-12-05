import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/portfolio/projects - Fetch portfolio projects with filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const featured = searchParams.get('featured') === 'true'

    const where: any = {}
    
    if (category && category !== 'All') {
      where.category = category
    }
    
    if (featured) {
      where.featured = true
    }

    const projects = await prisma.portfolioProject.findMany({
      where,
      orderBy: { completionDate: 'desc' },
      include: {
        results: true,
        testimonial: true,
      },
    })

    // Parse JSON fields and format response
    const formattedProjects = projects.map(project => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      fullDescription: project.fullDescription,
      category: project.category,
      client: project.client,
      completionDate: project.completionDate.toISOString(),
      duration: project.duration,
      url: project.url,
      featured: project.featured,
      challenge: project.challenge,
      solution: project.solution,
      technologies: project.technologies ? JSON.parse(project.technologies) : [],
      teamSize: project.teamSize,
      images: project.images ? JSON.parse(project.images) : [],
      results: project.results.map(r => ({
        metric: r.metric,
        value: r.value,
        description: r.description,
      })),
      testimonial: project.testimonial ? {
        quote: project.testimonial.quote,
        author: project.testimonial.author,
        role: project.testimonial.role,
        avatar: project.testimonial.avatar,
      } : null,
    }))

    return NextResponse.json({
      success: true,
      data: formattedProjects,
    })
  } catch (error) {
    console.error('Error fetching portfolio projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio projects' },
      { status: 500 }
    )
  }
}
