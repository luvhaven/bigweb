import { useState, useCallback, useRef } from 'react'

export interface Message {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    createdAt?: Date
    sources?: { title: string, uri: string }[]
    metadata?: any
}

export interface UseChatOptions {
    api: string
    body?: Record<string, any>
    onResponse?: (response: Response) => void
    onFinish?: (message: Message) => void
    onError?: (error: Error) => void
}

export interface UseChatHelpers {
    messages: Message[]
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void
    handleSubmit: (e: React.FormEvent) => void
    isLoading: boolean
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    reload: () => void
    stop: () => void
}

/**
 * Custom useChat hook for streaming AI responses
 * Compatible with Gemini/OpenAI streaming formats
 */
export function useChat(options: UseChatOptions): UseChatHelpers {
    const { api, body = {}, onResponse, onFinish, onError } = options

    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
        setInput(e.target.value)
    }, [])

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        if (e) e.preventDefault()

        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            createdAt: new Date(),
        }

        // Add user message immediately
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        // Create abort controller for this request
        abortControllerRef.current = new AbortController()

        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content,
                    })),
                    ...body,
                }),
                signal: abortControllerRef.current.signal,
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Call onResponse callback
            if (onResponse) {
                onResponse(response)
            }

            // Handle streaming response
            const reader = response.body?.getReader()
            const decoder = new TextDecoder()

            if (!reader) {
                throw new Error('No response body')
            }

            let assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: '',
                createdAt: new Date(),
                sources: [],
                metadata: {}
            }

            // Add empty assistant message
            setMessages(prev => [...prev, assistantMessage])

            let done = false
            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading

                if (value) {
                    const chunk = decoder.decode(value, { stream: true })
                    const lines = chunk.split('\n')

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const dataStr = line.slice(6).trim()
                            if (dataStr === '[DONE]') continue
                            if (!dataStr) continue

                            try {
                                const parsed = JSON.parse(dataStr)

                                // Handle Sources
                                if (parsed.sources) {
                                    assistantMessage.sources = [...(assistantMessage.sources || []), ...parsed.sources]
                                        .filter((v, i, a) => a.findIndex(t => t.uri === v.uri) === i)
                                }

                                // Handle Function Calls / Form data
                                if (parsed.functionCall) {
                                    assistantMessage.metadata = {
                                        ...assistantMessage.metadata,
                                        functionCall: parsed.functionCall,
                                        booking: parsed.functionCall.args
                                    }
                                }

                                // Handle Text
                                const content = parsed.choices?.[0]?.delta?.content || parsed.content || parsed.text || ''
                                if (content) {
                                    assistantMessage.content += content
                                }

                                // Update message state
                                setMessages(prev => {
                                    const newMessages = [...prev]
                                    newMessages[newMessages.length - 1] = { ...assistantMessage }
                                    return newMessages
                                })

                            } catch (e) {
                                // Fallback for raw text
                                if (dataStr) {
                                    assistantMessage.content += dataStr
                                    setMessages(prev => {
                                        const newMessages = [...prev]
                                        newMessages[newMessages.length - 1] = { ...assistantMessage }
                                        return newMessages
                                    })
                                }
                            }
                        }
                    }
                }
            }


            // Call onFinish callback
            if (onFinish) {
                onFinish(assistantMessage)
            }

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Request aborted')
            } else {
                console.error('Chat error:', error)
                if (onError) {
                    onError(error)
                }

                // Add error message
                const errorMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again.',
                    createdAt: new Date(),
                }
                setMessages(prev => [...prev, errorMessage])
            }
        } finally {
            setIsLoading(false)
            abortControllerRef.current = null
        }
    }, [input, messages, isLoading, api, body, onResponse, onFinish, onError])

    const reload = useCallback(() => {
        if (messages.length === 0) return

        // Remove last assistant message and resend last user message
        // Find last user message using reverse iteration (ES2015 compatible)
        let lastUserMessageIndex = -1
        for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].role === 'user') {
                lastUserMessageIndex = i
                break
            }
        }

        if (lastUserMessageIndex === -1) return

        const messagesToKeep = messages.slice(0, lastUserMessageIndex + 1)
        setMessages(messagesToKeep)

        // Trigger resubmit
        const lastUserMessage = messages[lastUserMessageIndex]
        setInput(lastUserMessage.content)
        setTimeout(() => {
            const form = document.querySelector('form')
            if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            }
        }, 100)
    }, [messages])

    const stop = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            setIsLoading(false)
        }
    }, [])

    return {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        setMessages,
        setInput,
        reload,
        stop,
    }
}
