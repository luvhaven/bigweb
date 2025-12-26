import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { generateSystemPrompt, analyzeIntent } from '@/lib/ai-service'
import { createClient } from '@supabase/supabase-js'

// Use Node.js runtime for stability with database and AI SDKs
export const runtime = 'nodejs'

// Initialize Service Role Client (Bypasses RLS)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export async function POST(req: NextRequest) {
    try {
        const { messages, visitorId, sessionId } = await req.json()

        if (!messages || messages.length === 0) {
            return new NextResponse('Messages required', { status: 400 })
        }

        // 1. Session Management (Simplified for Reliability)
        // If we have a sessionId, use it. If not, just proceed (stateless fallback if DB fails).
        let currentSessionId = sessionId

        // 2. Powerful Sales System Prompt
        const SYSTEM_PROMPT = `
You are the Elite Sales Agent for BigWeb (${new Date().getFullYear()}).
Your Goal: Convert visitors into booking a consultation or filling out the lead form.
Your Style: Professional, concise, confident, and slightly "exclusive".

Key Information:
- Product: "Revenue Website" (High-performance Next.js site + AI integration).
- Price: Starts at $1,997 (50% deposit).
- Speed: 10-day turnaround.
- Guarantee: "Love it or we redesign it for free".

Rules:
1. NEVER write long paragraphs. Keep responses under 50 words unless explaining a technical detail.
2. ALWAYS end with a question or a call to action.
3. If they ask about price/cost, say: "Our packages start at $1,997 for the complete Revenue System. Would you like to see the full breakdown?" and if they say yes, output {{LEAD_FORM}}.
4. If they seem interested in starting, say: "I can open a slot for you this week. Want to lock it in?" and if yes, output {{BOOKING_CALENDAR}}.
5. Be helpful but fierce about closing. Don't be a passive assistant. Drive the chat.
`;

        // 3. AI Logic with Gemini
        // We use the 'gemini-pro' model (mapped to latest stable 1.0 or 1.5 depending on API key tier)
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

        // Construct Chat History for Gemini
        // Map 'user'/'assistant' roles to 'user'/'model'
        const history = messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }))

        // Start Chat with System Instruction inserted as the first "User" message (common pattern for API)
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: `SYSTEM_INSTRUCTION:\n${SYSTEM_PROMPT}` }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am the Elite Sales Agent. I will keep responses short and drive conversions.' }]
                },
                ...history
            ],
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        })

        // 4. Send Message & Stream
        const lastUserMsg = messages[messages.length - 1].content
        const result = await chat.sendMessageStream(lastUserMsg)

        const encoder = new TextEncoder()

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    let fullResponse = ''
                    for await (const chunk of result.stream) {
                        const content = chunk.text()
                        if (content) {
                            fullResponse += content
                            // SSE Format
                            const data = JSON.stringify({
                                content,
                                choices: [{ delta: { content } }] // Mock OpenAI format for frontend compatibility
                            })
                            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
                        }
                    }
                    console.log("AI Response Complete:", fullResponse)
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                    controller.close()
                } catch (error) {
                    console.error('Streaming error:', error)
                    controller.error(error)
                }
            },
        })

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        })

    } catch (error) {
        console.error('Chat API Fatal Error:', error)
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
    }
}

/**
 * GET /api/chat - Fetch chat history
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const sessionId = searchParams.get('sessionId')

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
        }

        const { data: messages, error } = await supabaseAdmin
            .from('chat_messages')
            .select('*')
            .eq('session_id', sessionId)
            .order('created_at', { ascending: true })

        if (error) throw error

        return NextResponse.json({ messages: messages || [] })
    } catch (error) {
        console.error('Get messages error:', error)
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }
}
