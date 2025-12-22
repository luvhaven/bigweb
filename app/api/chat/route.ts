import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { generateSystemPrompt, analyzeIntent } from '@/lib/ai-service'
import { adminSupabase } from '@/utils/adminSupabase'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

// Use edge runtime for better streaming performance
export const runtime = 'edge'

/**
 * POST /api/chat - AI Chat with Gemini Streaming Support
 */
export async function POST(req: NextRequest) {
    try {
        const { messages, visitorId, sessionId } = await req.json()

        if (!messages || messages.length === 0) {
            return new NextResponse('Messages required', { status: 400 })
        }

        // Get or create session
        let currentSessionId = sessionId
        if (!currentSessionId && visitorId) {
            const { data: session, error } = await adminSupabase
                .from('chat_sessions')
                .insert({
                    visitor_id: visitorId,
                    status: 'open',
                    last_message_at: new Date().toISOString(),
                })
                .select()
                .single()

            if (!error && session) {
                currentSessionId = session.id
            }
        }

        // Store user message
        const userMessage = messages[messages.length - 1]
        if (currentSessionId && userMessage.role === 'user') {
            await adminSupabase.from('chat_messages').insert({
                session_id: currentSessionId,
                content: userMessage.content,
                sender_type: 'visitor',
                read: false,
            })

            // Update session
            await adminSupabase
                .from('chat_sessions')
                .update({
                    last_message_at: new Date().toISOString(),
                })
                .eq('id', currentSessionId)
        }

        // Analyze intent for better responses
        const intent = analyzeIntent(userMessage.content)

        // Generate system prompt with service knowledge
        const systemPrompt = await generateSystemPrompt()

        // Initialize Gemini model
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

        // Prepare chat history (excluding system prompt, Gemini handles system prompt differently or via context in first message)
        // Map roles: 'user' -> 'user', 'assistant' -> 'model'
        const history = messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }))

        // Start chat with history
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: `System Instructions:\n${systemPrompt}` }]
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am ready to assist as the BigWeb Digital Agency AI assistant.' }]
                },
                ...history
            ],
            generationConfig: {
                maxOutputTokens: 600,
                temperature: 0.7,
            },
            safetySettings: [], // Add safety settings if needed
        })

        // Generate streaming response
        const result = await chat.sendMessageStream(userMessage.content)

        // Create a readable stream for the response
        const encoder = new TextEncoder()
        let fullResponse = ''

        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const content = chunk.text()
                        if (content) {
                            fullResponse += content

                            // Send as SSE format compatible with our custom useChat hook
                            const data = JSON.stringify({
                                content,
                                choices: [{ delta: { content } }]
                            })
                            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
                        }
                    }

                    // Store AI response after streaming completes
                    if (currentSessionId && fullResponse) {
                        await adminSupabase.from('chat_messages').insert({
                            session_id: currentSessionId,
                            content: fullResponse,
                            sender_type: 'agent',
                            read: true,
                        })
                    }

                    // Send done signal
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                    controller.close()
                } catch (error) {
                    console.error('Streaming error:', error)
                    controller.error(error)
                }
            },
        })

        // Return streaming response with session metadata
        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'X-Session-Id': currentSessionId || '',
                'X-Intent': intent.intent,
                'X-Suggested-Actions': JSON.stringify(intent.suggestedActions),
            },
        })
    } catch (error) {
        console.error('Chat API Error:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
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
