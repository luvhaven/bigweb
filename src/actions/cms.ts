'use server'

import { createClient } from '@/lib/supabase/server'
import { publicClient } from '@/lib/supabase/public'
import { revalidatePath } from 'next/cache'

export async function getCmsServiceBySlug(slug: string) {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('cms_services').select('*').eq('slug', slug).limit(1).single()
        return data || null
    } catch { return null }
}

// ─────────────────────────────────────────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────────────────────────────────────────
export async function getSiteSettings() {
    const supabase = publicClient
    const { data } = await supabase.from('cms_settings').select('*').limit(1).single()
    return data || {}
}

export async function updateSiteSettings(settings: Record<string, any>) {
    const supabase = await createClient()
    const { error } = await supabase.from('cms_settings').update(settings).eq('id', settings.id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/', 'layout')
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// HERO SECTIONS
// ─────────────────────────────────────────────────────────────────────
export async function getCmsHero(slug = 'homepage') {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('cms_heroes').select('*').eq('slug', slug).limit(1)
        return data?.[0] || null
    } catch { return null }
}

export async function getAllHeroSections() {
    const supabase = publicClient
    const { data } = await supabase.from('cms_heroes').select('*').order('created_at', { ascending: false })
    return data || []
}

export async function saveHero(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id && id !== 'new') {
        const res = await supabase.from('cms_heroes').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('cms_heroes').insert({ ...fields })
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/', 'layout')
    return { success: true }
}

export async function deleteHero(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('cms_heroes').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/', 'layout')
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// VIDEO SHOWROOM
// ─────────────────────────────────────────────────────────────────────
export async function getVideoShowroom() {
    try {
        const supabase = publicClient
        const { data } = await supabase
            .from('cms_video_showroom')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })
        return data || []
    } catch { return [] }
}

export async function saveVideo(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('cms_video_showroom').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('cms_video_showroom').insert({ ...fields })
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/', 'layout')
    return { success: true }
}

export async function deleteVideo(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('cms_video_showroom').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/', 'layout')
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────
export async function getCmsServices() {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('cms_services').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        return data || []
    } catch { return [] }
}

export async function getAllServices() {
    const supabase = publicClient
    const { data } = await supabase.from('cms_services').select('*').order('sort_order', { ascending: true })
    return data || []
}

export async function saveService(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('cms_services').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('cms_services').insert({ ...fields })
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/services', 'layout')
    return { success: true }
}

export async function deleteService(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('cms_services').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/services')
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// PORTFOLIO / PROJECTS
// ─────────────────────────────────────────────────────────────────────
export async function getCmsProjects(featuredOnly = false) {
    try {
        const supabase = publicClient
        let q = supabase.from('cms_projects').select('*').eq('is_published', true).order('created_at', { ascending: false })
        if (featuredOnly) q = q.eq('is_featured', true)
        const { data } = await q
        return data || []
    } catch { return [] }
}

export async function getAllProjects() {
    const supabase = publicClient
    const { data } = await supabase.from('cms_projects').select('*').order('created_at', { ascending: false })
    return data || []
}

export async function saveProject(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('cms_projects').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('cms_projects').insert({ ...fields })
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/case-studies')
    revalidatePath('/work')
    return { success: true }
}

export async function deleteProject(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('cms_projects').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/case-studies')
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────
export async function getCmsTestimonials(featuredOnly = false) {
    try {
        const supabase = publicClient
        let q = supabase.from('cms_testimonials').select('*').order('created_at', { ascending: false })
        if (featuredOnly) q = q.eq('is_featured', true)
        const { data } = await q
        return (data || []).map((t: any) => ({
            id: t.id,
            author: t.client_name,
            name: t.client_name,
            client_name: t.client_name,
            role: t.client_role,
            client_role: t.client_role,
            company: t.client_company,
            client_company: t.client_company,
            content: t.quote,
            quote: t.quote,
            image: t.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.client_name)}&background=C9A55A&color=000&size=200`,
            avatar_url: t.avatar_url,
            rating: t.rating || 5,
            logo: t.client_company_logo,
            is_featured: t.is_featured,
        }))
    } catch { return [] }
}

export async function saveTestimonial(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('cms_testimonials').update(fields).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('cms_testimonials').insert(fields)
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
}

export async function deleteTestimonial(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('cms_testimonials').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// TEAM
// ─────────────────────────────────────────────────────────────────────
export async function getCmsTeam() {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('cms_team_members').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        return data || []
    } catch { return [] }
}

export async function saveTeamMember(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('cms_team_members').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('cms_team_members').insert(fields)
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/about')
    return { success: true }
}

export async function deleteTeamMember(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('cms_team_members').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/about')
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// ENGAGEMENTS / PRICING
// ─────────────────────────────────────────────────────────────────────
export async function getEngagements() {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('engagements').select('*').eq('status', 'published').order('order_index', { ascending: true })
        return data || []
    } catch { return [] }
}

export async function getEngagementBySlug(slug: string) {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('engagements').select('*').eq('slug', slug).eq('status', 'published').limit(1).single()
        return data || null
    } catch { return null }
}


export async function saveEngagement(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('engagements').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('engagements').insert(fields)
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/pricing')
    revalidatePath('/')
    return { success: true }
}

export async function deleteEngagement(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('engagements').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    revalidatePath('/pricing')
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// GROWTH PACKAGES
// ─────────────────────────────────────────────────────────────────────
export async function getCmsGrowthPackages() {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('cms_growth_packages').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        return data || []
    } catch { return [] }
}

// ─────────────────────────────────────────────────────────────────────
// STATISTICS
// ─────────────────────────────────────────────────────────────────────
export async function getStatistics(displayLocation?: string) {
    try {
        const supabase = publicClient
        let q = supabase.from('statistics').select('*').eq('active', true).order('sort_order', { ascending: true })
        if (displayLocation) q = q.eq('display_location', displayLocation)
        const { data } = await q
        return (data || []).map((s: any) => ({
            value: `${s.value || ''}${s.suffix || ''}`,
            label: s.label,
            description: s.description,
            rawValue: parseFloat(s.value) || 0,
            prefix: s.value?.startsWith('$') ? '$' : '',
            suffix: s.suffix || '',
        }))
    } catch { return [] }
}

export async function saveStatistic(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('statistics').update(fields).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('statistics').insert(fields)
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
}

export async function deleteStatistic(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('statistics').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// PROCESS PHASES
// ─────────────────────────────────────────────────────────────────────
export async function getProcessPhases() {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('process_phases').select('*').eq('status', 'published').order('order_index', { ascending: true })
        return data || []
    } catch { return [] }
}

export async function saveProcessPhase(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('process_phases').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('process_phases').insert(fields)
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
}

export async function deleteProcessPhase(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('process_phases').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// CLIENTS / LOGO MARQUEE
// ─────────────────────────────────────────────────────────────────────
export async function getCmsClients() {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('cms_clients').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        return (data || []).map((c: any) => ({
            name: c.name,
            logo_url: c.logo_url,
        }))
    } catch { return [] }
}

// ─────────────────────────────────────────────────────────────────────
// FAQS
// ─────────────────────────────────────────────────────────────────────
export async function getCmsFaqs(category?: string) {
    try {
        const supabase = publicClient
        let q = supabase.from('cms_faqs').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        if (category) q = q.eq('category', category)
        const { data } = await q
        return data || []
    } catch { return [] }
}

export async function saveFaq(formData: Record<string, any>) {
    const supabase = await createClient()
    const { id, ...fields } = formData
    let error
    if (id) {
        const res = await supabase.from('cms_faqs').update(fields).eq('id', id)
        error = res.error
    } else {
        const res = await supabase.from('cms_faqs').insert(fields)
        error = res.error
    }
    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
}

export async function deleteFaq(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('cms_faqs').delete().eq('id', id)
    if (error) return { success: false, error: error.message }
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────
export async function getCmsNavigation() {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('cms_navigation').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        return data || []
    } catch { return [] }
}

// ─────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────
export async function getCmsFooterData() {
    try {
        const supabase = publicClient
        const [settingsRes, sectionsRes] = await Promise.all([
            supabase.from('cms_settings').select('*').limit(1),
            supabase.from('cms_footer_sections').select('*, links:cms_footer_links(*)').eq('is_active', true).order('sort_order', { ascending: true })
        ])
        return {
            settings: settingsRes.data?.[0] || null,
            sections: sectionsRes.data || []
        }
    } catch { return { settings: null, sections: [] } }
}

// ─────────────────────────────────────────────────────────────────────
// PAGE METADATA
// ─────────────────────────────────────────────────────────────────────
export async function getPageMeta(slug: string) {
    try {
        const supabase = publicClient
        const { data } = await supabase.from('cms_pages').select('*').eq('slug', slug).eq('is_published', true).limit(1)
        return data?.[0] || null
    } catch { return null }
}

export async function getPageSection(pageSlug: string, sectionType: string) {
    try {
        const supabase = publicClient
        const pageRes = await supabase.from('cms_pages').select('id').eq('slug', pageSlug).limit(1)
        if (!pageRes.data?.[0]) return null
        const { data } = await supabase.from('cms_page_sections')
            .select('*')
            .eq('page_id', pageRes.data[0].id)
            .eq('section_type', sectionType)
            .eq('is_active', true)
            .limit(1)
        return data?.[0]?.section_data || null
    } catch { return null }
}
