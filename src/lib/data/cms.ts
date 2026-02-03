import { createClient } from '@/lib/supabase/server'
import type { Capability, Engagement, ProcessPhase, PageMetadata, FeatureFlag, PageSection } from '@/types/database'

/**
 * Fetch all published capabilities
 */
export async function getCapabilities(): Promise<Capability[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('capabilities')
        .select('*')
        .eq('status', 'published')
        .order('order_index', { ascending: true })

    if (error) {
        console.error('[getCapabilities] Error fetching capabilities:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        })
        return []
    }

    return data as Capability[]
}

/**
 * Fetch single capability by slug
 */
export async function getCapabilityBySlug(slug: string): Promise<Capability | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('capabilities')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error) {
        console.error(`[getCapabilityBySlug] Error fetching capability ${slug}:`, {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        })
        return null
    }

    return data as Capability
}

/**
 * Fetch all published engagements
 */
export async function getEngagements(): Promise<Engagement[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('engagements')
        .select('*')
        .eq('status', 'published')
        .order('order_index', { ascending: true })

    if (error) {
        console.error('[getEngagements] Error fetching engagements:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        })
        return []
    }

    return data as Engagement[]
}

/**
 * Fetch single engagement by slug
 */
export async function getEngagementBySlug(slug: string): Promise<Engagement | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('engagements')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error) {
        console.error(`[getEngagementBySlug] Error fetching engagement ${slug}:`, {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        })
        return null
    }

    return data as Engagement
}

/**
 * Fetch all published process phases
 */
export async function getProcessPhases(): Promise<ProcessPhase[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('process_phases')
        .select('*')
        .eq('status', 'published')
        .order('order_index', { ascending: true })

    if (error) {
        console.error('[getProcessPhases] Error fetching process phases:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        })
        return []
    }

    return data as ProcessPhase[]
}

/**
 * Fetch page metadata by route
 */
export async function getPageMetadata(route: string): Promise<PageMetadata | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('page_metadata')
        .select('*')
        .eq('route', route)
        .single()

    if (error) {
        console.error(`[getPageMetadata] Error fetching metadata for ${route}:`, {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        })
        return null
    }

    return data as PageMetadata
}

/**
 * Fetch all enabled feature flags
 */
export async function getFeatureFlags(): Promise<FeatureFlag[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('feature_flags')
        .select('*')
        .eq('enabled', true)

    if (error) {
        console.error('Error fetching feature flags:', error)
        return []
    }

    return data as FeatureFlag[]
}

export async function getPageSections(route: string): Promise<PageSection[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('page_sections')
        .select('*')
        .eq('page_route', route)
        .eq('status', 'published')
        .order('order_index', { ascending: true })

    if (error) {
        console.error(`[getPageSections] Error fetching sections for route ${route}:`, {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
        })
        return []
    }

    return data || []
}

export async function getPageMetadataByRoute(route: string): Promise<PageMetadata | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('page_metadata')
        .select('*')
        .eq('route', route)
        .single()

    if (error) {
        console.error('Error fetching page metadata by route:', error)
        return null
    }

    return data as PageMetadata
}

/**
 * Check if a specific feature flag is enabled
 */
export async function isFeatureEnabled(flagKey: string): Promise<boolean> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('feature_flags')
        .select('enabled')
        .eq('flag_key', flagKey)
        .single()

    if (error || !data) {
        return false
    }

    return data.enabled
}
