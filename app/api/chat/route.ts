import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { generateSystemPrompt, aiTools } from '@/lib/ai-service'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { ratelimit } from '@/lib/rate-limit'

// Use Node.js runtime for stability with database and AI SDKs
export const runtime = 'nodejs'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export async function POST(req: NextRequest) {
    const supabaseAdmin = getSupabaseAdmin()
    try {
        // --- 1. Rate Limiting ---
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
        const { success: rateLimitSuccess } = await ratelimit.limit(`chat_${ip}`)

        if (!rateLimitSuccess) {
            return new NextResponse(JSON.stringify({ error: 'Rate limit exceeded. Try again later.' }), { status: 429 })
        }

        const { messages } = await req.json()

        if (!messages || messages.length === 0) {
            return new NextResponse('Messages required', { status: 400 })
        }

        // 1. Powerful Sales System Prompt
        const SYSTEM_PROMPT = await generateSystemPrompt()

        // 2. AI Logic with Gemini 1.5 Flash
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: SYSTEM_PROMPT,
            tools: aiTools as any
        })

        const history = messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
        }))

        const chat = model.startChat({ history })
        const lastUserMsg = messages[messages.length - 1].content
        const result = await chat.sendMessageStream(lastUserMsg)

        const encoder = new TextEncoder()
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    let fullResponse = ''
                    let functionCallFound = false
                    let functionArgs: any = null

                    for await (const chunk of result.stream) {
                        const candidates = chunk.candidates || []
                        for (const candidate of candidates) {
                            const parts = candidate.content?.parts || []

                            const functionCallPart = parts.find(p => !!p.functionCall)
                            if (functionCallPart?.functionCall) {
                                functionCallFound = true
                                functionArgs = functionCallPart.functionCall.args
                                controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                    functionCall: functionCallPart.functionCall,
                                    text: 'Strategic system executing...'
                                })}\n\n`))
                            }

                            const groundingMetadata = candidate.groundingMetadata
                            const sources = groundingMetadata?.groundingChunks?.map((c: any) => ({
                                title: c.web?.title || 'Benchmark',
                                uri: c.web?.uri || ''
                            })).filter((s: any) => s.uri !== '')

                            if (sources && sources.length > 0) {
                                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ sources })}\n\n`))
                            }

                            const text = parts.find(p => !!p.text)?.text
                            if (text) {
                                fullResponse += text
                                controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                    content: text,
                                    choices: [{ delta: { content: text } }]
                                })}\n\n`))
                            }
                        }
                    }

                    if (functionCallFound && functionArgs) {
                        try {
                            const { name, email, website, niche } = functionArgs
                            await supabaseAdmin.from('contact_submissions').insert({
                                name: name || 'AI Lead',
                                email,
                                source: 'AI_CHAT_AUDIT',
                                message: `Audit Request: ${website} (${niche})`,
                                status: 'new',
                                priority: 'high'
                            })

                            const followUp = await chat.sendMessage([{
                                functionResponse: {
                                    name: 'bookGrowthAudit',
                                    response: { status: 'success', message: 'Audit confirmed in neural system.' }
                                }
                            }])

                            const finalMsg = followUp.response.text()
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                content: finalMsg,
                                choices: [{ delta: { content: finalMsg } }]
                            })}\n\n`))
                        } catch (dbError) {
                            console.error('Lead sync failed:', dbError)
                        }
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
    const supabaseAdmin = getSupabaseAdmin()
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
