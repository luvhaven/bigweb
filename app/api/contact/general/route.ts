import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, subject, source } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        company,
        message,
        subject,
        source,
      },
    })

    // TODO: Send email notification to admin
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `New Contact Form: ${subject || 'General Inquiry'}`,
    //   template: 'contact-form',
    //   data: { name, email, company, message }
    // })

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      ticketId: submission.id,
    }, { status: 201 })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
