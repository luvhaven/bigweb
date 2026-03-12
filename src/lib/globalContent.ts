import { createClient } from '@supabase/supabase-js';
import { unstable_noStore as noStore } from 'next/cache';

// Server-side client creation (avoids caching issues if needed, but simple is best)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // or SERVICE_ROLE for private data
// Using ANON for public content is safer/correct for layout.

const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchGlobalContent() {
    noStore();
    try {
        // 1. Fetch all data with adaptive fallback for schema variations
        let settingsRes: any;
        let navRes: any;
        let footerSectionsRes: any;
        let footerLinksRes: any;

        // Try primary table names first (Elite CMS 2026)
        settingsRes = await supabase.from('cms_settings').select('*');
        if (settingsRes.error) {
            // Fallback to legacy naming
            settingsRes = await supabase.from('site_settings').select('*');
        }

        navRes = await supabase.from('cms_navigation').select('*').eq('is_active', true).order('sort_order', { ascending: true });
        if (navRes.error) {
            navRes = await supabase.from('navigation_menus').select('*').eq('enabled', true).order('sort_order', { ascending: true });
        }

        footerSectionsRes = await supabase.from('cms_footer_sections').select('*').eq('is_active', true).order('sort_order', { ascending: true });
        if (footerSectionsRes.error) {
            footerSectionsRes = await supabase.from('footer_sections').select('*').eq('active', true).order('sort_order', { ascending: true });
        }

        footerLinksRes = await supabase.from('cms_footer_links').select('*').eq('is_active', true).order('sort_order', { ascending: true });
        if (footerLinksRes.error) {
            footerLinksRes = await supabase.from('footer_links').select('*').eq('is_active', true).order('sort_order', { ascending: true });
        }

        // Check for specific stream errors (log but don't crash)
        const logCmsError = (name: string, error: any) => {
            if (error && !error.message?.includes('Could not find the table')) {
                console.warn(`${name} Fetch Warning:`, error.message || error);
            }
        };

        logCmsError('Settings', settingsRes.error);
        logCmsError('Navigation', navRes.error);
        logCmsError('Footer Sections', footerSectionsRes.error);
        logCmsError('Footer Links', footerLinksRes.error);

        // 2. Process Settings (Columnar or KV support)
        let settings: Record<string, any> = {};
        if (settingsRes.data && settingsRes.data.length > 0) {
            const firstRow = settingsRes.data[0];
            if (firstRow.site_name !== undefined || firstRow.favicon_url !== undefined) {
                // It's the new columnar schema (cms_settings)
                settings = { ...firstRow };
            } else {
                // Fallback to old KV schema
                settingsRes.data.forEach((row: any) => {
                    const key = row.setting_key || row.key;
                    const value = row.setting_value !== undefined ? row.setting_value : row.value;
                    if (key) settings[key] = value;
                });
            }
        }

        // 3. Process Navigation (Build Tree)
        const navigation: any[] = [];
        if (navRes.data) {
            const rawNav = navRes.data;
            const idMap: Record<string, any> = {};

            rawNav.forEach(item => {
                // Label Normalization for Consistency & UI logic
                let label = item.label || '';
                const lowerLabel = label.toLowerCase();

                if (lowerLabel.includes('service') || lowerLabel.includes('capability')) label = 'Capabilities';
                else if (lowerLabel.includes('offer') || lowerLabel.includes('engagement') || lowerLabel.includes('package')) label = 'Engagements';
                else if (lowerLabel.includes('work') || lowerLabel.includes('portfolio') || lowerLabel.includes('case') || lowerLabel.includes('evidence')) label = 'Evidence';
                else if (lowerLabel.includes('about') || lowerLabel.includes('process') || lowerLabel.includes('company') || lowerLabel.includes('method')) label = 'Process';

                idMap[item.id] = {
                    ...item,
                    label,
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
