// Database Types for CMS Content
export interface Capability {
    id: string
    slug: string
    number: string
    title: string
    description: string | null
    icon: string | null
    color: string | null
    route: string | null
    features: CapabilityFeature[]
    metadata: Record<string, any> | null
    order_index: number
    status: string
    created_at: string
    updated_at: string
}

export interface CapabilityFeature {
    icon: string
    text: string
}

export interface Engagement {
    id: string
    slug: string
    name: string
    tagline: string | null
    phase: string | null
    description: string | null
    price: string | null
    price_subtext: string | null
    features: string[]
    icon: string | null
    route: string | null
    highlighted: boolean
    badge_text: string | null
    color_scheme: string | null
    order_index: number
    status: string
    created_at: string
    updated_at: string
}

export interface ProcessPhase {
    id: string
    step_number: string
    phase_id: string
    title: string
    subtitle: string | null
    description: string | null
    details: string[]
    deliverable: string | null
    timeline: string | null
    price: string | null
    cta_text: string | null
    cta_link: string | null
    icon: string | null
    color: string | null
    bg_color: string | null
    border_color: string | null
    order_index: number
    status: string
    created_at: string
    updated_at: string
}

export interface PageMetadata {
    id: string
    route: string
    title: string | null
    description: string | null
    keywords: string[] | null
    og_image: string | null
    og_title: string | null
    og_description: string | null
    twitter_card: string | null
    canonical_url: string | null
    robots: string | null
    schema_markup: Record<string, any> | null
    created_at: string
    updated_at: string
}

export interface FeatureFlag {
    id: string
    flag_key: string
    flag_name: string
    description: string | null
    enabled: boolean
    config: Record<string, any> | null
    created_at: string
    updated_at: string
}

export interface GlobalContent {
    id: string
    content_key: string
    content_type: string
    title: string | null
    body: string | null
    cta_text: string | null
    cta_link: string | null
    metadata: Record<string, any> | null
    status: string
    priority: number
    expires_at: string | null
    created_at: string
    updated_at: string
}

export interface PageSection {
    id: string
    page_route: string
    section_key: string
    section_type: string
    title: string | null
    subtitle: string | null
    description: string | null
    content: Record<string, any> | null
    metadata: Record<string, any> | null
    order_index: number
    status: string
    version: number
    published_at: string | null
    created_at: string
    updated_at: string
}

export interface NavigationItem {
    id: string
    parent_id: string | null
    label: string
    url: string | null
    icon: string | null
    description: string | null
    position: string
    sort_order: number
    status: string
    metadata: Record<string, any> | null
    created_at: string
    updated_at: string
}
