import { useEffect, useState, useCallback } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { RealtimeChannel } from '@supabase/supabase-js'

interface UseRealtimeOptions {
    table: string
    event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
    filter?: string
    enabled?: boolean
}

interface RealtimePayload<T = any> {
    eventType: 'INSERT' | 'UPDATE' | 'DELETE'
    new: T
    old: T
    errors: any
}

export function useRealtime<T = any>({
    table,
    event = '*',
    filter,
    enabled = true
}: UseRealtimeOptions) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [channel, setChannel] = useState<RealtimeChannel | null>(null)

    const handlePayload = useCallback((payload: RealtimePayload<T>) => {
        setData(payload.new || payload.old)
        if (payload.errors) {
            setError(new Error(payload.errors))
        }
    }, [])

    useEffect(() => {
        if (!enabled || !supabase) return

        // Create channel
        const channelName = `realtime:${table}${filter ? `:${filter}` : ''}`
        const realtimeChannel = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                {
                    event,
                    schema: 'public',
                    table,
                    filter
                },
                handlePayload
            )
            .subscribe((status) => {
                setIsConnected(status === 'SUBSCRIBED')
            })

        setChannel(realtimeChannel)

        return () => {
            realtimeChannel.unsubscribe()
        }
    }, [table, event, filter, enabled, handlePayload])

    return {
        data,
        error,
        isConnected,
        channel
    }
}

// Hook for presence (online users)
export function usePresence(channelName: string) {
    const [onlineUsers, setOnlineUsers] = useState<any[]>([])
    const [channel, setChannel] = useState<RealtimeChannel | null>(null)

    useEffect(() => {
        if (typeof window === 'undefined' || !supabase) return

        const presenceChannel = supabase.channel(channelName)

        presenceChannel
            .on('presence', { event: 'sync' }, () => {
                const state = presenceChannel.presenceState()
                const users = Object.values(state).flat()
                setOnlineUsers(users)
            })
            .on('presence', { event: 'join' }, ({ newPresences }) => {
                console.log('User joined:', newPresences)
            })
            .on('presence', { event: 'leave' }, ({ leftPresences }) => {
                console.log('User left:', leftPresences)
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    // Track this user
                    await presenceChannel.track({
                        online_at: new Date().toISOString(),
                        user_agent: navigator.userAgent
                    })
                }
            })

        setChannel(presenceChannel)

        return () => {
            presenceChannel.unsubscribe()
        }
    }, [channelName])

    return {
        onlineUsers,
        count: onlineUsers.length,
        channel
    }
}

// Hook for broadcast messages
export function useBroadcast(channelName: string) {
    const [messages, setMessages] = useState<any[]>([])
    const [channel, setChannel] = useState<RealtimeChannel | null>(null)

    useEffect(() => {
        if (typeof window === 'undefined' || !supabase) return

        const broadcastChannel = supabase.channel(channelName)

        broadcastChannel
            .on('broadcast', { event: 'message' }, ({ payload }) => {
                setMessages(prev => [...prev, payload])
            })
            .subscribe()

        setChannel(broadcastChannel)

        return () => {
            broadcastChannel.unsubscribe()
        }
    }, [channelName])

    const sendMessage = useCallback(async (payload: any) => {
        if (!channel) return

        await channel.send({
            type: 'broadcast',
            event: 'message',
            payload
        })
    }, [channel])

    return {
        messages,
        sendMessage,
        channel
    }
}
