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

        // 1. Session Management
        let currentSessionId = sessionId
        if (!currentSessionId && visitorId) {
            // Try to find existing open session for this visitor
            const { data: existingSession } = await supabaseAdmin
                .from('chat_sessions')
                .select('id')
                .eq('visitor_id', visitorId)
                .eq('status', 'open')
                .single()

            if (existingSession) {
                currentSessionId = existingSession.id
            } else {
                // Create new session
                const { data: newSession, error: sessionError } = await supabaseAdmin
                    .from('chat_sessions')
                    .insert({
                        visitor_id: visitorId,
                        status: 'open',
                        last_message_at: new Date().toISOString(),
                    })
                    .select()
                    .single()

                if (sessionError) {
                    console.error('Session creation error:', sessionError)
                    // Continue without session if DB fails (fallback to stateless chat)
                } else {
                    currentSessionId = newSession.id
                }
            }
        }

        // 2. Store User Message
        const userMessage = messages[messages.length - 1]
        if (currentSessionId && userMessage.role === 'user') {
            await supabaseAdmin.from('chat_messages').insert({
                session_id: currentSessionId,
                content: userMessage.content,
                sender_type: 'visitor',
                is_read: false,
            })
        }

        // 3. AI Logic
        const intent = analyzeIntent(userMessage.content)
        const systemPrompt = await generateSystemPrompt() // This might fail if DB is locked, but we'll try
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

        // --- DETERMINISTIC SYSTEM STEERING ---
        // Force the model to comply by injecting instructions into the immediate context
        let contentToSend = userMessage.content
        const lowerMsg = contentToSend.toLowerCase()

        if (lowerMsg.includes('quote') || lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('estimate')) {
            contentToSend += `\n\n[SYSTEM_INSTRUCTION: automatic_override]
The user is asking for pricing/quote. You MUST end your response with: {{LEAD_FORM}}
Do NOT ask for name/email. Just introduce the form.`
        } else if (lowerMsg.includes('book') || lowerMsg.includes('schedule') || lowerMsg.includes('call') || lowerMsg.includes('meet')) {
            contentToSend += `\n\n[SYSTEM_INSTRUCTION: automatic_override]
The user wants to book/schedule. You MUST end your response with: {{BOOKING_CALENDAR}}
Do NOT ask for times. Just introduce the calendar.`
        }
        // -------------------------------------

        const history = messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }))

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: `System Instructions:\n${systemPrompt}` }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I will strictly follow the tool usage rules.' }]
                },
                ...history
            ],
            generationConfig: {
                maxOutputTokens: 800, // Increased for tools
                temperature: 0.7,
            },
        })

        // 4. Streaming Response
        const result = await chat.sendMessageStream(contentToSend)
        const encoder = new TextEncoder()
        let fullResponse = ''

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const content = chunk.text()
                        if (content) {
                            fullResponse += content
                            // SSE Format
                            const data = JSON.stringify({
                                content,
                                choices: [{ delta: { content } }]
                            })
                            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
                        }
                    }

                    // Store AI Response asynchronously
                    if (currentSessionId && fullResponse) {
                        await supabaseAdmin.from('chat_messages').insert({
                            session_id: currentSessionId,
                            content: fullResponse,
                            sender_type: 'agent', // 'agent' or 'system' usually, 'agent' for AI
                            is_read: true,
                        })
                    }

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
                'X-Session-Id': currentSessionId || '',
                'X-Intent': intent.intent,
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

        const { data: messages, error } = await adminSupabase
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
