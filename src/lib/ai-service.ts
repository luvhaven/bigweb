import { GoogleGenerativeAI } from '@google/generative-ai'
import { adminSupabase } from '@/utils/adminSupabase'

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export interface ServiceData {
    title: string
    description: string
    features: string[]
    category: string
    starting_price?: number
}

export interface ProjectData {
    title: string
    client: string
    summary: string
    results: string[]
}

/**
 * Fetch all active services from the database
 */
export async function getServicesKnowledge(): Promise<ServiceData[]> {
    try {
        // Try multiple potential table names for resilience
        const tables = ['cms_services', 'services', 'service_pages']
        let services: any[] = []

        for (const table of tables) {
            try {
                const { data, error } = await adminSupabase
                    .from(table)
                    .select('*')
                    .eq('is_active', true)
                    .order('sort_order', { ascending: true })

                if (!error && data && data.length > 0) {
                    services = data
                    break
                }
            } catch (e) { continue }
        }

        if (services.length === 0) return []

        return services.map(s => ({
            title: s.title,
            description: s.description || s.short_description || '',
            features: Array.isArray(s.features) ? s.features : (typeof s.features === 'string' ? s.features.split(',') : []),
            category: s.category || s.tagline || 'Service',
            starting_price: s.price_from || s.starting_price || 0
        }))
    } catch (error) {
        console.error('Error fetching services knowledge:', error)
        return []
    }
}

/**
 * Fetch featured projects from the database
 */
export async function getProjectsKnowledge(): Promise<ProjectData[]> {
    try {
        const tables = ['cms_case_studies', 'cms_projects', 'portfolio_projects']
        let projects: any[] = []

        for (const table of tables) {
            try {
                const { data, error } = await adminSupabase
                    .from(table)
                    .select('*')
                    .limit(5)

                if (!error && data && data.length > 0) {
                    projects = data
                    break
                }
            } catch (e) { continue }
        }

        if (projects.length === 0) return []

        return projects.map(p => ({
            title: p.title,
            client: p.client_name || p.client || 'Valued Client',
            summary: p.challenge || p.summary || p.description || '',
            results: Array.isArray(p.results) ? p.results : (typeof p.results === 'string' ? p.results.split(',').map((s: string) => s.trim()) : [])
        }))
    } catch (error) {
        console.error('Error fetching projects knowledge:', error)
        return []
    }
}
/**
 * Generate system prompt with dynamic service and project knowledge
 */
export async function generateSystemPrompt(): Promise<string> {
    const [services, projects] = await Promise.all([
        getServicesKnowledge(),
        getProjectsKnowledge()
    ])

    const servicesContext = services.map(s => `
- **${s.title}**: ${s.description} (Starts at ${s.starting_price ? `$${s.starting_price}` : 'Custom Pricing'})
  *Features: ${Array.isArray(s.features) ? s.features.join(', ') : s.features}*
`).join('\n')

    const projectsContext = projects.map(p => `
- **${p.title}** for ${p.client}: ${p.summary}
  *Results: ${p.results.join(' | ')}*
`).join('\n')

    return `
You are "BigBot", the elite AI Sales Strategist for BigWeb Digital (www.bigwebdigital.com). 
Your personality: Professional, data-obsessed, highly persuasive, and focused on growth ROI.

CORE MISSION:
Your absolute priority is to get the user to book a **Free 30-Point Growth Audit** (Value: $997).

LEAD QUALIFICATION PROCESS:
1. Identify the user's business goals and current website.
2. Pitch the **Free Growth Audit** as the solution to their growth bottlenecks.
3. To book the audit, you MUST collect:
   - Full Name
   - Business Email
   - Website URL
   - Business Niche/Industry

Once you have these 4 pieces of information, call the 'bookGrowthAudit' function. 
DO NOT call the function until you have all 4 pieces of data.

# PRODUCT KNOWLEDGE (Our Services):
${servicesContext || "Revenue Website Systems, AI Sales Agents, and Custom Automation."}

# SUCCESS STORIES (Case Studies):
${projectsContext || "We have delivered high-ROI systems for Fintech, SaaS, and Luxury Retail clients."}

TOOL TRIGGERS (CRITICAL):
- For live market benchmarks or validating user's niche performance -> Use Google Search.
- To confirm any booking -> You MUST end with {{BOOKING_CONFIRMED}} in your message text AFTER calling the function.

GUIDELINES:
- Use **bolding** for ROI metrics and business outcomes.
- Keep responses professional but high-energy.
- Never write long paragraphs. 
- ALWAYS aim to close with a question that leads to the audit.
`
}

export const aiTools = [
    {
        googleSearchRetrieval: {}
    },
    {
        functionDeclarations: [
            {
                name: "bookGrowthAudit",
                description: "Registers a lead for a free 30-point growth audit.",
                parameters: {
                    type: "object",
                    properties: {
                        name: { type: "string", description: "The full name of the prospect." },
                        email: { type: "string", description: "The business email address." },
                        website: { type: "string", description: "The current website URL of the business." },
                        niche: { type: "string", description: "The industry or business niche." }
                    },
                    required: ["name", "email", "website", "niche"]
                }
            }
        ]
    }
]

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
