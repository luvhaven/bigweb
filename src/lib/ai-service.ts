import { GoogleGenerativeAI } from '@google/generative-ai'
import { adminSupabase } from '@/utils/adminSupabase'

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export interface ServiceData {
    title: string
    description: string
    features: string[]
    category: string
    pricing_model?: string
    starting_price?: number
}

/**
 * Fetch all active services from the database
 */
export async function getServicesKnowledge(): Promise<ServiceData[]> {
    try {
        const { data, error } = await adminSupabase
            .from('services')
            .select('title, description, features, category, pricing_model, starting_price')
            .eq('is_active', true)
            .order('order_index', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Error fetching services:', error)
        return []
    }
}

/**
 * Generate system prompt with dynamic service knowledge
 */
export async function generateSystemPrompt(): Promise<string> {
    const services = await getServicesKnowledge()

    const servicesContext = services.map(s => `
**${s.title}**
- Description: ${s.description}
- Features: ${Array.isArray(s.features) ? s.features.join(', ') : s.features}
- Category: ${s.category}
${s.pricing_model ? `- Pricing: ${s.pricing_model}${s.starting_price ? ` starting at $${s.starting_price}` : ''}` : ''}
  `).join('\n')

    return `You are BigWeb Digital Agency's AI assistant.

# TOOL USAGE (TOP PRIORITY - READ THIS FIRST):

When user says "quote", "price", "cost", or "pricing" -> You MUST end your response with: {{LEAD_FORM}}
When user says "book", "schedule", "meet", or "call" -> You MUST end your response with: {{BOOKING_CALENDAR}}

Example:
User: "I want a custom quote"
You: "I'd be happy to help! Please fill out this quick form: {{LEAD_FORM}}"

User: "Can we schedule a call?"
You: "Absolutely! Choose a time that works for you: {{BOOKING_CALENDAR}}"

# YOUR ROLE:
Help potential clients understand our services and guide them toward solutions.

# OUR SERVICES:
${servicesContext || "No specific service data available. Please ask general questions about web development."}

# GUIDELINES:
- Be friendly and professional
- Keep responses to 2-3 sentences unless asked for detail
- Reference actual services from the list above
- Always suggest next steps (quote form or booking)
- For pricing: mention starting prices if available, otherwise suggest custom quote with {{LEAD_FORM}}

Remember: ALWAYS include {{LEAD_FORM}} when discussing pricing/quotes, and {{BOOKING_CALENDAR}} when discussing meetings.
`
}

/**
 * Analyze user intent and suggest quick actions
 */
export function analyzeIntent(message: string): {
    intent: 'pricing' | 'services' | 'technical' | 'consultation' | 'general'
    confidence: number
    suggestedActions: string[]
} {
    const lowerMessage = message.toLowerCase()

    // Pricing intent
    if (lowerMessage.match(/price|cost|budget|how much|pricing|quote/)) {
        return {
            intent: 'pricing',
            confidence: 0.9,
            suggestedActions: ['Request Custom Quote', 'View Pricing Guide', 'Book Consultation']
        }
    }

    // Service inquiry
    if (lowerMessage.match(/service|offer|do you|can you|help with|need/)) {
        return {
            intent: 'services',
            confidence: 0.85,
            suggestedActions: ['View All Services', 'See Portfolio', 'Book Free Audit']
        }
    }

    // Technical questions
    if (lowerMessage.match(/how does|technical|technology|stack|framework|build/)) {
        return {
            intent: 'technical',
            confidence: 0.8,
            suggestedActions: ['View Tech Stack', 'See Case Studies', 'Talk to Developer']
        }
    }

    // Consultation request
    if (lowerMessage.match(/consult|meeting|call|discuss|talk|schedule/)) {
        return {
            intent: 'consultation',
            confidence: 0.95,
            suggestedActions: ['Book Consultation', 'Schedule Call', 'Contact Sales']
        }
    }

    return {
        intent: 'general',
        confidence: 0.5,
        suggestedActions: ['View Services', 'See Portfolio', 'Contact Us']
    }
}
