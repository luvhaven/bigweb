import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, subject, content } = body

        if (!name || !email || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const submission = await prisma.contactSubmission.create({
            data: {
                name,
                email,
                subject: subject || 'New Contact Message',
                message: content,
                status: 'NEW'
            }
        })

        return NextResponse.json({ success: true, data: submission })
    } catch (error) {
        console.error('Contact submission error:', error)
        return NextResponse.json(
            { error: 'Failed to submit message' },
            { status: 500 }
        )
    }
}
