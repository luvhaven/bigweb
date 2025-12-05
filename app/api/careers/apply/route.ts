import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      resumeUrl,
      coverLetter,
      linkedin,
      portfolio,
      jobId,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !resumeUrl || !jobId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if job exists and is active
    const job = await prisma.careerOpening.findUnique({
      where: { id: jobId },
    })

    if (!job || !job.isActive) {
      return NextResponse.json(
        { success: false, error: 'Job opening not found or no longer active' },
        { status: 404 }
      )
    }

    // Create application
    const application = await prisma.jobApplication.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        resumeUrl,
        coverLetter,
        linkedin,
        portfolio,
        jobId,
      },
    })

    // TODO: Send email notification to admin
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `New Application: ${job.title}`,
    //   template: 'job-application',
    //   data: { firstName, lastName, email, jobTitle: job.title }
    // })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      applicationId: application.id,
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
