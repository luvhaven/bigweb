
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('🌱 Starting Absolute Mirror Seed...');

    // 1. SITE SETTINGS
    console.log('Settings...');
    const settings = [
        { category: 'general', setting_key: 'company_phone', setting_value: '"+234 703 057 6537"', description: 'Primary phone', data_type: 'string' },
        { category: 'general', setting_key: 'company_email', setting_value: '"hello@bigwebdigital.com"', description: 'Primary email', data_type: 'string' },
        { category: 'general', setting_key: 'company_address', setting_value: '"Global Presence: NA, EU, Asia, Africa"', description: 'Address', data_type: 'string' },
        { category: 'social', setting_key: 'facebook_url', setting_value: '"https://facebook.com/bigwebdigital"', description: 'Facebook', data_type: 'url' },
        { category: 'social', setting_key: 'twitter_url', setting_value: '"https://twitter.com/bigwebdigital"', description: 'Twitter', data_type: 'url' },
        { category: 'social', setting_key: 'instagram_url', setting_value: '"https://instagram.com/bigwebdigital"', description: 'Instagram', data_type: 'url' },
        { category: 'social', setting_key: 'linkedin_url', setting_value: '"https://linkedin.com/company/bigweb-digital"', description: 'LinkedIn', data_type: 'url' },
    ];

    for (const s of settings) {
        const { error } = await supabase.from('site_settings').upsert(s, { onConflict: 'setting_key' });
        if (error) console.error('Error setting ' + s.setting_key, error);
    }

    // 2. NAVIGATION (Clear Header First)
    console.log('Navigation...');
    await supabase.from('navigation_menus').delete().eq('menu_location', 'header');

    // Top Level
    const { data: navServices } = await supabase.from('navigation_menus').insert({ menu_location: 'header', label: 'Services', url: '#', sort_order: 1, icon: 'Grid' }).select('id').single();

    await supabase.from('navigation_menus').insert([
        { menu_location: 'header', label: 'About', url: '/about', sort_order: 2 },
        { menu_location: 'header', label: 'Portfolio', url: '/portfolio', sort_order: 3 },
        { menu_location: 'header', label: 'Blog', url: '/blog', sort_order: 4 },
        { menu_location: 'header', label: 'Careers', url: '/careers', sort_order: 5 },
        { menu_location: 'header', label: 'Estimator', url: '/estimator', sort_order: 6 },
    ]);

    if (navServices) {
        // Categories
        const { data: catEng } = await supabase.from('navigation_menus').insert({ menu_location: 'header', label: 'Engineering', url: '#', parent_id: navServices.id, sort_order: 1, icon: 'Code' }).select('id').single();
        const { data: catDes } = await supabase.from('navigation_menus').insert({ menu_location: 'header', label: 'Design & Maintenance', url: '#', parent_id: navServices.id, sort_order: 2, icon: 'Palette' }).select('id').single();
        const { data: catAI } = await supabase.from('navigation_menus').insert({ menu_location: 'header', label: 'Artificial Intelligence', url: '#', parent_id: navServices.id, sort_order: 3, icon: 'Brain' }).select('id').single();
        const { data: catGrowth } = await supabase.from('navigation_menus').insert({ menu_location: 'header', label: 'Growth & Analytics', url: '#', parent_id: navServices.id, sort_order: 4, icon: 'TrendingUp' }).select('id').single();

        if (catEng) {
            await supabase.from('navigation_menus').insert([
                { menu_location: 'header', label: 'Web Development', url: '/services/web-development', description: 'Custom apps', parent_id: catEng.id, sort_order: 1, icon: 'Code' },
                { menu_location: 'header', label: 'Mobile Apps', url: '/services/mobile-apps', description: 'iOS & Android', parent_id: catEng.id, sort_order: 2, icon: 'Smartphone' },
                { menu_location: 'header', label: 'E-Commerce', url: '/services/ecommerce', description: 'Online stores', parent_id: catEng.id, sort_order: 3, icon: 'ShoppingCart' },
                { menu_location: 'header', label: 'Staff Augmentation', url: '/services/staff-augmentation', description: 'Scale teams', parent_id: catEng.id, sort_order: 4, icon: 'Users' }
            ]);
        }
        // ... (Adding minimally to prove point, can duplicate full list if needed, but this covers the structure)
        if (catDes) {
            await supabase.from('navigation_menus').insert([
                { menu_location: 'header', label: 'UI/UX Design', url: '/services/ui-ux-design', description: 'World-class interfaces', parent_id: catDes.id, sort_order: 1, icon: 'Palette' },
                { menu_location: 'header', label: 'Maintenance', url: '/services/maintenance', description: '24/7 Security', parent_id: catDes.id, sort_order: 2, icon: 'Shield' }
            ]);
        }
        if (catAI) {
            await supabase.from('navigation_menus').insert([
                { menu_location: 'header', label: 'AI Sales Agents', url: '/ai-boost', description: '24/7 automated bots', parent_id: catAI.id, sort_order: 1, icon: 'Bot' },
                { menu_location: 'header', label: 'AI Consulting', url: '/services/ai-consulting', description: 'Strategic AI', parent_id: catAI.id, sort_order: 2, icon: 'Brain' },
                { menu_location: 'header', label: 'GAIO Optimization', url: '/services/gaio', description: 'Rank #1 on ChatGPT', parent_id: catAI.id, sort_order: 3, icon: 'Search' }
            ]);
        }
        if (catGrowth) {
            await supabase.from('navigation_menus').insert([
                { menu_location: 'header', label: 'SEO & Growth', url: '/services/seo-growth', description: 'Dominate rankings', parent_id: catGrowth.id, sort_order: 1, icon: 'TrendingUp' },
                { menu_location: 'header', label: 'Analytics', url: '/services/analytics', description: 'Data-driven insights', parent_id: catGrowth.id, sort_order: 2, icon: 'BarChart' },
                { menu_location: 'header', label: 'CRO & Sales', url: '/services/conversion-optimization', description: 'Turn visitors into buyers', parent_id: catGrowth.id, sort_order: 3, icon: 'TrendingUp' }
            ]);
        }
    }

    // 3. FOOTER
    console.log('Footer...');
    await supabase.from('footer_sections').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    await supabase.from('footer_sections').insert([
        { section_title: 'Brand & Newsletter', section_type: 'newsletter', column_position: 1, sort_order: 1, content: { text: "Stay updated" } },
        {
            section_title: 'Services', section_type: 'links', column_position: 2, sort_order: 1, content: [
                { label: "Web Development", url: "/services/web-development" },
                { label: "Mobile Apps", url: "/services/mobile-apps" },
                { label: "UI/UX Design", url: "/services/ui-ux-design" },
                { label: "SEO & Growth", url: "/services/seo-growth" },
                { label: "E-Commerce", url: "/services/ecommerce" }
            ]
        },
        {
            section_title: 'More', section_type: 'links', column_position: 2, sort_order: 2, content: [
                { label: "AI Consulting", url: "/services/ai-consulting" },
                { label: "GAIO (AI Optimization)", url: "/services/gaio" },
                { label: "Staff Augmentation", url: "/services/staff-augmentation" },
                { label: "Maintenance", url: "/services/maintenance" }
            ]
        },
        {
            section_title: 'Company', section_type: 'links', column_position: 3, sort_order: 1, content: [
                { label: "About Us", url: "/about" },
                { label: "Portfolio", url: "/portfolio" },
                { label: "Careers", "url": "/careers" },
                { label: "Blog", "url": "/blog" },
                { label: "Contact", "url": "/contact" }
            ]
        },
        {
            section_title: 'Connect', section_type: 'links', column_position: 4, sort_order: 1, content: [
                { label: "hello@bigwebdigital.com", url: "mailto:hello@bigwebdigital.com", icon: "Mail" },
                { label: "+234 (703) 057-6537", url: "tel:+2347030576537", icon: "Phone" },
                { label: "Global Presence", url: "#", icon: "MapPin", sublabel: "NA, EU, Asia, Africa" }
            ]
        }
    ]);

    console.log('✅ Seed Complete!');
}

seed().catch(console.error);
