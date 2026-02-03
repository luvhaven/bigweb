
import { createClient } from '@supabase/supabase-js';

// Server-side client creation (avoids caching issues if needed, but simple is best)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // or SERVICE_ROLE for private data
// Using ANON for public content is safer/correct for layout.

const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchGlobalContent() {
    try {
        // 1. Fetch all data in parallel
        const [settingsRes, navRes, footerSectionsRes, footerLinksRes] = await Promise.all([
            supabase.from('cms_settings').select('*').single(),
            supabase.from('navigation_items').select('*').eq('status', 'active').order('sort_order', { ascending: true }),
            supabase.from('cms_footer_sections').select('*').eq('is_active', true).order('sort_order', { ascending: true }),
            supabase.from('cms_footer_links').select('*').eq('is_active', true).order('sort_order', { ascending: true })
        ]);

        // Check for errors
        if (settingsRes.error) console.error('Settings Fetch Error:', settingsRes.error);

        // 2. Process Settings (Single row object)
        const settings = settingsRes.data || {};

        // 3. Process Navigation (Build Tree)
        const navigation: any[] = [];
        if (navRes.data) {
            const rawNav = navRes.data;
            const idMap: Record<string, any> = {};

            rawNav.forEach(item => {
                idMap[item.id] = {
                    ...item,
                    url: item.href || item.url, // Handle both for safety
                    children: []
                };
            });

            rawNav.forEach(item => {
                if (item.parent_id && idMap[item.parent_id]) {
                    idMap[item.parent_id].children.push(idMap[item.id]);
                } else {
                    navigation.push(idMap[item.id]);
                }
            });
        }

        // 4. Process Footer
        const footer: any[] = [];
        if (footerSectionsRes.data) {
            footerSectionsRes.data.forEach(section => {
                const sectionLinks = footerLinksRes.data?.filter(l => l.section_id === section.id) || [];
                footer.push({
                    ...section,
                    links: sectionLinks
                });
            });
        }

        return {
            settings,
            navigation,
            footer
        };
    } catch (error) {
        console.error('Fatal Global Content Error:', error);
        return {
            settings: {},
            navigation: [],
            footer: []
        };
    }
}
