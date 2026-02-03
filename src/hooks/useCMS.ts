'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Capability, Engagement, ProcessPhase } from '@/types/database'

/**
 * Hook to fetch capabilities from database (client-side)
 */
export function useCapabilities() {
    const [capabilities, setCapabilities] = useState<Capability[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchCapabilities = async () => {
            try {
                const supabase = createClient()
                const { data, error } = await supabase
                    .from('capabilities')
                    .select('*')
                    .eq('status', 'published')
                    .order('order_index', { ascending: true })

                if (error) throw error
                setCapabilities(data as Capability[])
            } catch (err: any) {
                setError(err as Error)
                console.error('[useCapabilities] error details:', {
                    message: err.message,
                    code: err.code,
                    details: err.details,
                    hint: err.hint,
                    full: err,
                    string: String(err),
                    name: err?.name || err?.constructor?.name || 'UnknownError',
                    type: typeof err,
                    stack: err?.stack
                })
            } finally {
                setLoading(false)
            }
        }

        fetchCapabilities()
    }, [])

    return { capabilities, loading, error }
}

/**
 * Hook to fetch engagements from database (client-side)
 */
export function useEngagements() {
    const [engagements, setEngagements] = useState<Engagement[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchEngagements = async () => {
            try {
                const supabase = createClient()
                const { data, error } = await supabase
                    .from('engagements')
                    .select('*')
                    .eq('status', 'published')
                    .order('order_index', { ascending: true })

                if (error) throw error
                setEngagements(data as Engagement[])
            } catch (err: any) {
                setError(err as Error)
                console.error('[useEngagements] error details:', {
                    message: err.message,
                    code: err.code,
                    details: err.details,
                    hint: err.hint,
                    full: err,
                    string: String(err),
                    name: err?.name || err?.constructor?.name || 'UnknownError',
                    type: typeof err,
                    stack: err?.stack
                })
            } finally {
                setLoading(false)
            }
        }

        fetchEngagements()
    }, [])

    return { engagements, loading, error }
}

/**
 * Hook to fetch process phases from database (client-side)
 */
export function useProcessPhases() {
    const [phases, setPhases] = useState<ProcessPhase[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchPhases = async () => {
            try {
                const supabase = createClient()
                const { data, error } = await supabase
                    .from('process_phases')
                    .select('*')
                    .eq('status', 'published')
                    .order('order_index', { ascending: true })

                if (error) throw error
                setPhases(data as ProcessPhase[])
            } catch (err: any) {
                setError(err as Error)
                console.error('[useProcessPhases] error details:', {
                    message: err.message,
                    code: err.code,
                    details: err.details,
                    hint: err.hint,
                    full: err,
                    string: String(err)
                })
            } finally {
                setLoading(false)
            }
        }

        fetchPhases()
    }, [])

    return { phases, loading, error }
}
