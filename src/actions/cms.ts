'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath, unstable_noStore } from 'next/cache'

function logCmsError(context: string, error: any) {
    // Check for common "table not found" errors from Supabase/PostgREST
    if (
        error.message?.includes('Could not find the table') ||
        error.code === '42P01' ||
        error.message?.includes('relation')
    ) {
        console.warn(`[CMS] Table missing for ${context}. Using fallback data. (Run migration to enable)`)
    } else {
        console.error(`[CMS] Error fetching ${context}:`, error.message)
    }
}

// =====================================================
// HERO SECTIONS
// =====================================================

export async function getHeroByPage(slug: string) {
    unstable_noStore()
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('cms_hero_sections')
            .select('*')
            .eq('page_slug', slug)
            .eq('is_active', true)
            .single()

        if (error) throw error
        return data
    } catch (error: any) {
        logCmsError(`hero for ${slug}`, error)
        return null
    }
}

export async function getAllHeroSections() {
    unstable_noStore()
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('cms_hero_sections')
            .select('*')
            .order('page_slug', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error: any) {
        logCmsError('hero sections', error)
        return []
    }
}

export async function saveHero(data: any) {
    try {
        const supabase = await createClient()

        const heroData = {
            page_slug: data.page_slug,
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            cta_primary_text: data.cta_primary_text,
            cta_primary_url: data.cta_primary_url,
            cta_secondary_text: data.cta_secondary_text,
            cta_secondary_url: data.cta_secondary_url,
            background_image: data.background_image,
            background_video: data.background_video,
            stats: data.stats || [],
            badges: data.badges || [],
            is_active: data.is_active ?? true
        }

        let result
        if (data.id) {
            result = await supabase
                .from('cms_hero_sections')
                .update(heroData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('cms_hero_sections')
                .insert([heroData])
        }

        if (result.error) throw result.error

        // Revalidate the page
        revalidatePath(data.page_slug)
        revalidatePath('/admin/cms/hero')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save hero:', error.message)
        return { success: false, error: error.message }
    }
}

export async function deleteHero(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('cms_hero_sections')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/admin/cms/hero')
        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete hero:', error.message)
        return { success: false, error: error.message }
    }
}

// =====================================================
// NAVIGATION
// =====================================================

export async function getNavigation() {
    unstable_noStore()
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('cms_navigation')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error: any) {
        logCmsError('navigation', error)
        return []
    }
}

export async function saveNavItem(data: any) {
    try {
        const supabase = await createClient()

        const navData = {
            label: data.label,
            href: data.href,
            parent_id: data.parent_id || null,
            sort_order: data.sort_order || 0,
            icon: data.icon,
            description: data.description,
            is_active: data.is_active ?? true
        }

        let result
        if (data.id) {
            result = await supabase
                .from('cms_navigation')
                .update(navData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('cms_navigation')
                .insert([navData])
        }

        if (result.error) throw result.error

        revalidatePath('/')
        revalidatePath('/admin/cms/navigation')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save nav item:', error.message)
        return { success: false, error: error.message }
    }
}

export async function deleteNavItem(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('cms_navigation')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/')
        revalidatePath('/admin/cms/navigation')
        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete nav item:', error.message)
        return { success: false, error: error.message }
    }
}

// =====================================================
// FOOTER
// =====================================================

export async function getFooter() {
    unstable_noStore()
    try {
        const supabase = await createClient()

        // Get sections
        const { data: sections, error: sectionsError } = await supabase
            .from('cms_footer_sections')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (sectionsError) throw sectionsError

        // Get links
        const { data: links, error: linksError } = await supabase
            .from('cms_footer_links')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (linksError) throw linksError

        // Group links by section
        const sectionsWithLinks = (sections || []).map(section => ({
            ...section,
            links: (links || []).filter(link => link.section_id === section.id)
        }))

        return sectionsWithLinks
    } catch (error: any) {
        logCmsError('footer', error)
        return []
    }
}

export async function saveFooterSection(data: any) {
    try {
        const supabase = await createClient()

        const sectionData = {
            title: data.title,
            description: data.description,
            sort_order: data.sort_order || 0,
            is_active: data.is_active ?? true
        }

        let result
        if (data.id) {
            result = await supabase
                .from('cms_footer_sections')
                .update(sectionData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('cms_footer_sections')
                .insert([sectionData])
        }

        if (result.error) throw result.error

        revalidatePath('/')
        revalidatePath('/admin/cms/footer')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save footer section:', error.message)
        return { success: false, error: error.message }
    }
}

export async function saveFooterLink(data: any) {
    try {
        const supabase = await createClient()

        const linkData = {
            section_id: data.section_id,
            label: data.label,
            href: data.href,
            icon: data.icon,
            sort_order: data.sort_order || 0,
            is_active: data.is_active ?? true
        }

        let result
        if (data.id) {
            result = await supabase
                .from('cms_footer_links')
                .update(linkData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('cms_footer_links')
                .insert([linkData])
        }

        if (result.error) throw result.error

        revalidatePath('/')
        revalidatePath('/admin/cms/footer')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save footer link:', error.message)
        return { success: false, error: error.message }
    }
}

// =====================================================
// SITE SETTINGS
// =====================================================

export async function getSettings() {
    unstable_noStore()
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('cms_site_settings')
            .select('*')
            .order('category', { ascending: true })

        if (error) throw error

        // Convert to key-value object
        const settings: Record<string, any> = {}
            ; (data || []).forEach(setting => {
                settings[setting.key] = setting.value
            })

        return settings
    } catch (error: any) {
        logCmsError('settings', error)
        return {}
    }
}

export async function getSetting(key: string) {
    unstable_noStore()
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('cms_site_settings')
            .select('*')
            .eq('key', key)
            .single()

        if (error) throw error
        return data?.value
    } catch (error: any) {
        logCmsError(`setting ${key}`, error)
        return null
    }
}

export async function saveSetting(key: string, value: any, category?: string, description?: string) {
    try {
        const supabase = await createClient()

        const settingData = {
            key,
            value,
            category: category || 'general',
            description: description || ''
        }

        const { error } = await supabase
            .from('cms_site_settings')
            .upsert([settingData], { onConflict: 'key' })

        if (error) throw error

        revalidatePath('/')
        revalidatePath('/admin/cms/settings')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save setting:', error.message)
        return { success: false, error: error.message }
    }
}

export async function deleteSetting(key: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('cms_site_settings')
            .delete()
            .eq('key', key)

        if (error) throw error

        revalidatePath('/')
        revalidatePath('/admin/cms/settings')
        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete setting:', error.message)
        return { success: false, error: error.message }
    }
}

// =====================================================
// TEAM MEMBERS
// =====================================================

export async function getTeamMembers() {
    unstable_noStore()
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('cms_team_members')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data || []
    } catch (error: any) {
        logCmsError('team members', error)
        return []
    }
}

export async function saveTeamMember(data: any) {
    try {
        const supabase = await createClient()

        const memberData = {
            name: data.name,
            role: data.role,
            department: data.department,
            bio: data.bio,
            quote: data.quote,
            avatar_url: data.avatar_url,
            linkedin_url: data.linkedin_url,
            twitter_url: data.twitter_url,
            github_url: data.github_url,
            website_url: data.website_url,
            expertise: data.expertise || [],
            skills: data.skills || [],
            is_leadership: data.is_leadership ?? false,
            is_active: data.is_active ?? true,
            sort_order: data.sort_order || 0
        }

        let result
        if (data.id) {
            result = await supabase
                .from('cms_team_members')
                .update(memberData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('cms_team_members')
                .insert([memberData])
        }

        if (result.error) throw result.error

        revalidatePath('/about')
        revalidatePath('/team')
        revalidatePath('/admin/cms/team')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save team member:', error.message)
        return { success: false, error: error.message }
    }
}

export async function deleteTeamMember(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('cms_team_members')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/about')
        revalidatePath('/team')
        revalidatePath('/admin/cms/team')
        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete team member:', error.message)
        return { success: false, error: error.message }
    }
}

// =====================================================
// FAQS
// =====================================================

export async function getFAQs(category?: string) {
    unstable_noStore()
    try {
        const supabase = await createClient()
        let query = supabase
            .from('cms_faqs')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })

        if (category) {
            query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) throw error
        return data || []
    } catch (error: any) {
        logCmsError('FAQs', error)
        return []
    }
}

export async function saveFAQ(data: any) {
    try {
        const supabase = await createClient()

        const faqData = {
            question: data.question,
            answer: data.answer,
            category: data.category,
            service_id: data.service_id || null,
            sort_order: data.sort_order || 0,
            is_active: data.is_active ?? true
        }

        let result
        if (data.id) {
            result = await supabase
                .from('cms_faqs')
                .update(faqData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('cms_faqs')
                .insert([faqData])
        }

        if (result.error) throw result.error

        revalidatePath('/')
        revalidatePath('/admin/cms/faqs')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save FAQ:', error.message)
        return { success: false, error: error.message }
    }
}

export async function deleteFAQ(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('cms_faqs')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/')
        revalidatePath('/admin/cms/faqs')
        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete FAQ:', error.message)
        return { success: false, error: error.message }
    }
}
