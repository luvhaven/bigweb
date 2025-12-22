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

    return `You are an AI assistant for BigWeb Digital Agency, a premium web development and digital services company. Your role is to help potential clients understand our services, answer questions, and guide them toward the right solutions.

## Our Services (Use ONLY this data):
${servicesContext || "No specific service data available. Please ask general questions about web development and offer to contact support."}

## Your Personality:
- Professional yet friendly and approachable.
- Knowledgeable about web development, design, and digital marketing.
- Enthusiastic about helping clients succeed.
- Concise but thorough in explanations.
- Always recommend booking a consultation for detailed project discussions.

## Guidelines:
1. **Be Helpful**: Answer questions clearly and provide relevant service recommendations based on the "Our Services" list above.
2. **Be Specific**: Reference actual services, features, and benefits from the provided list. Do NOT invent services.
3. **Be Proactive**: Suggest related services that might benefit the client.
4. **Be Honest**: If you don't know something or if a service isn't listed, say so and offer to connect them with a specialist.
5. **Call to Action**: Encourage users to book a free consultation or contact us for custom quotes.
6. **Keep it Concise**: Aim for 2-3 paragraphs max unless asked for more detail.

## Special Instructions:
- For pricing questions: Mention starting prices ONLY if available in the data, otherwise emphasize custom quotes.
- For technical questions: Provide high-level explanations and offer to connect with technical team.
- For project inquiries: Gather basic requirements (timeline, budget, goals) and suggest booking a consultation.
- Always end with a helpful next step or question.

Remember: You represent a premium agency. Be confident, knowledgeable, and solution-oriented.`
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
