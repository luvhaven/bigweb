import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/careers/openings - Fetch all active job openings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const department = searchParams.get('department')
    const type = searchParams.get('type')

    const where: any = { isActive: true }
    
    if (department && department !== 'All') {
      where.department = department
    }
    
    if (type && type !== 'All') {
      where.type = type
    }

    const openings = await prisma.careerOpening.findMany({
      where,
      orderBy: { postedDate: 'desc' },
      select: {
        id: true,
        title: true,
        location: true,
        type: true,
        department: true,
        description: true,
        salaryRange: true,
        postedDate: true,
        _count: {
          select: { applications: true },
        },
      },
    })

    // Parse JSON fields
    const formattedOpenings = openings.map(opening => ({
      id: opening.id,
      title: opening.title,
      location: opening.location,
      type: opening.type,
      department: opening.department,
      description: opening.description,
      salaryRange: opening.salaryRange,
      postedDate: opening.postedDate.toISOString(),
      applicants: opening._count.applications,
    }))

    return NextResponse.json({
      success: true,
      data: formattedOpenings,
    })
  } catch (error) {
    console.error('Error fetching career openings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch career openings' },
      { status: 500 }
    )
  }
}
