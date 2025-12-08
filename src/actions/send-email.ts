'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { calculateLeadScore } from '@/lib/lead-scoring'

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactFormSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    company: z.string().optional(),
    inspiration: z.string().optional(),
    message: z.string().min(10),
    budget: z.string().optional()
})

export type ContactFormState = {
    success?: boolean
    error?: string
    fieldErrors?: {
        [key: string]: string[]
    }
}

export async function sendContactEmail(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
    // Validate fields
    const validatedFields = ContactFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        company: formData.get('company'),
        inspiration: formData.get('inspiration'),
        message: formData.get('message'),
        budget: formData.get('budget')
    })

    if (!validatedFields.success) {
        return {
            error: 'Validation failed',
            fieldErrors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { firstName, lastName, email, company, inspiration, message, budget } = validatedFields.data

    try {
        // Calculate Lead Score
        const { score, tier } = calculateLeadScore({
            budget,
            company,
            messageLength: message.length,
            hasInspiration: !!inspiration
        })

        // Check if API key exists (mock mode if not)
        if (!process.env.RESEND_API_KEY) {
            console.log('MOCK EMAIL SEND:', { firstName, lastName, email, score, tier })
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay
            return { success: true }
        }

        // 1. Send Admin Notification
        const adminEmail = await resend.emails.send({
            from: 'BigWeb Contact <contact@bigwebdigital.com>',
            to: ['your-email@example.com'], // Replace with actual admin email
            replyTo: email,
            subject: `[${tier} Lead] New Inquiry from ${firstName} ${lastName}`,
            html: `
        <div style="font-family: sans-serif;">
          <h1>New Lead: ${firstName} ${lastName}</h1>
          <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Score:</strong> ${score}/100</p>
            <p><strong>Tier:</strong> <span style="color: ${tier === 'Elite' ? '#FF6B35' : 'black'}; font-weight: bold;">${tier}</span></p>
          </div>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
          <p><strong>Inspiration:</strong> ${inspiration || 'N/A'}</p>
          <hr />
          <h3>Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
        })

        if (adminEmail.error) {
            console.error('Admin email error:', adminEmail.error)
            // We continue to try sending the auto-response
        }

        // 2. Send Auto-Response to User
        await resend.emails.send({
            from: 'BigWeb Team <team@bigwebdigital.com>',
            to: [email],
            subject: `We've received your message, ${firstName}!`,
            html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
          <h1 style="color: #FF6B35;">Thanks for reaching out!</h1>
          <p>Hi ${firstName},</p>
          <p>This is an automated confirmation that we've received your inquiry. Our team is already reviewing your project details.</p>
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>We'll analyze your requirements (usually within 24 hours).</li>
            <li>We'll schedule a brief discovery call if we need more info.</li>
            <li>We'll prepare a custom strategy and proposal for you.</li>
          </ul>
          <p>In the meantime, feel free to browse our <a href="https://bigwebdigital.com/portfolio">latest work</a>.</p>
          <br/>
          <p>Best regards,<br/>The BigWeb Team</p>
        </div>
      `
        })

        return { success: true }
    } catch (error) {
        console.error('Email send error:', error)
        return { error: 'Failed to send email. Please try again later.' }
    }
}
