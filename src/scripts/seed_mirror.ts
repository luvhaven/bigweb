
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
    console.log('🌱 Starting Conversion Lab Backend Sync...');

    // 1. SERVICES/OFFERS
    console.log('Syncing Services...');
    const services = [
        {
            title: 'Conversion Diagnostic',
            slug: 'diagnostic',
            tagline: 'Know Exactly What\'s Broken',
            description: 'A forensic audit of your website with a prioritized fix list. We analyze your funnel, identify revenue blockers, and show you exactly what to fix first.',
            price_from: 399,
            pricing_model: 'fixed',
            features: ["Video walkthrough of your site", "Prioritized fix list", "Messaging & copy audit", "Competitor benchmarking", "48-hour turnaround"],
            icon_name: 'Target',
            color: 'blue',
            sort_order: 1
        },
        {
            title: 'Fix Sprint',
            slug: 'fix-sprint',
            tagline: 'Fix The Critical 20% in 7 Days',
            description: 'We implement the high-impact fixes that drive 80% of results. Perfect for sites that need surgical precision, not a complete rebuild.',
            price_from: 1000,
            pricing_model: 'from',
            features: ["1-3 pages optimized", "Copy rewrites for clarity", "CTA improvements", "Mobile responsiveness fixes", "7-day execution"],
            icon_name: 'Zap',
            color: 'orange',
            sort_order: 2
        },
        {
            title: 'Revenue System',
            slug: 'revenue-system',
            tagline: 'Complete Website Rebuild',
            description: 'A conversion-engineered website built from the ground up. Modern architecture, lightning-fast performance, and every pixel optimized for revenue.',
            price_from: 3000,
            pricing_model: 'from',
            features: ["Modern architecture", "Conversion-first design", "Sub-2-second load times", "Custom CMS", "8-week build process"],
            icon_name: 'Layers',
            color: 'orange',
            sort_order: 3
        },
        {
            title: 'Optimization Retainer',
            slug: 'retainer',
            tagline: 'Your In-House CRO Team',
            description: 'Continuous optimization, A/B testing, and refinement. We act as your dedicated conversion team, constantly improving your revenue.',
            price_from: 500,
            price_to: 2000,
            pricing_model: 'monthly',
            features: ["Monthly A/B tests", "Conversion rate optimization", "Performance monitoring", "Priority support", "Ongoing improvements"],
            icon_name: 'RefreshCw',
            color: 'green',
            sort_order: 4
        }
    ];

    for (const service of services) {
        const { error } = await supabase.from('cms_services').upsert(service, { onConflict: 'slug' });
        if (error) console.error(`Error syncing service ${service.slug}:`, error.message);
    }

    // 2. CASE STUDIES
    console.log('Syncing Case Studies...');
    const caseStudies = [
        {
            title: 'Solving the "Trial Trap": 127% Increase in SaaS Conversions',
            client_name: 'DataPulse Analytics',
            slug: 'saas-trial-conversion',
            industry: 'B2B SaaS',
            challenge: 'High traffic to pricing page but only 2% trial signups. Complex messaging and unclear value proposition were causing drop-offs.',
            solution: 'Simplified pricing page, clarified value prop, reduced form fields, added social proof above fold, implemented exit-intent offer.',
            results: { conversion_increase: "127%", trial_signups: "+450/month", revenue_impact: "$1.2M ARR" },
            image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
            is_published: true,
            sort_order: 1
        },
        {
            title: 'Surgical Recovery: 70% to 38% Checkout Abandonment',
            client_name: 'LuxeWear Global',
            slug: 'ecommerce-cart-fix',
            industry: 'Luxury E-commerce',
            challenge: '70% cart abandonment rate. Customers adding items but not completing checkout. Mobile experience was particularly poor.',
            solution: 'Redesigned checkout flow, added trust badges, implemented one-page checkout, optimized for mobile, added abandoned cart email sequence.',
            results: { conversion_increase: "85%", cart_abandonment: "70% → 38%", revenue_increase: "$2.1M annually" },
            image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200',
            is_published: true,
            sort_order: 2
        },
        {
            title: '300% Scaling: The High-Ticket Authority Funnel',
            client_name: 'Vanguard Consulting',
            slug: 'lead-gen-optimization',
            industry: 'Professional Services',
            challenge: 'Spending $15k/month on ads but only getting 30 qualified leads. Cost per lead was too high to be profitable.',
            solution: 'Rebuilt landing pages, implemented multi-step form, added video testimonials, created urgency with limited spots, optimized ad-to-page message match.',
            results: { leads_increase: "300%", cost_per_lead: "$500 → $165", monthly_leads: "30 → 120" },
            image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90',
            is_published: true,
            sort_order: 3
        }
    ];

    for (const study of caseStudies) {
        const { error } = await supabase.from('cms_case_studies').upsert(study, { onConflict: 'slug' });
        if (error) console.error(`Error syncing case study ${study.slug}:`, error.message);
    }

    // 3. FOOTER SECTIONS & LINKS
    console.log('Syncing Footer architecture...');

    // Clear existing to avoid duplicates if ID-less (in a real app we'd use consistent IDs)
    await supabase.from('cms_footer_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('cms_footer_sections').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const footerSections = [
        { title: 'Brand & Lab', description: 'Join the Conversion Lab newsletter', sort_order: 1 },
        { title: 'Our Offers', description: 'Engineered for revenue', sort_order: 2 },
        { title: 'The Evidence', description: 'Proven results only', sort_order: 3 },
        { title: 'The Lab Presence', description: 'Global Reach', sort_order: 4 }
    ];

    for (const section of footerSections) {
        const { data: sectionData, error: sError } = await supabase.from('cms_footer_sections').insert(section).select().single();
        if (sError) {
            console.error(`Error syncing footer section ${section.title}:`, sError.message);
            continue;
        }

        const sectionId = sectionData.id;
        let links: any[] = [];

        if (section.title === 'Our Offers') {
            links = [
                { label: "Conversion Diagnostic", href: "/offers/diagnostic", sort_order: 1 },
                { label: "7-Day Fix Sprint", href: "/offers/fix-sprint", sort_order: 2 },
                { label: "Revenue Website System", href: "/offers/revenue-system", sort_order: 3 },
                { label: "Optimization Retainer", href: "/offers/retainer", sort_order: 4 }
            ];
        } else if (section.title === 'The Evidence') {
            links = [
                { label: "Case Study Archive", href: "/case-studies", sort_order: 1 },
                { label: "Success Mechanics", href: "/process", sort_order: 2 },
                { label: "The Engineers", href: "/#team", sort_order: 3 },
                { label: "Impact Metrics", href: "/#stats", sort_order: 4 }
            ];
        } else if (section.title === 'The Lab Presence') {
            links = [
                { label: "North America (US & CA)", href: "#", icon: "MapPin", sort_order: 1 },
                { label: "United Kingdom & EU", href: "#", icon: "MapPin", sort_order: 2 },
                { label: "Middle East (UAE)", href: "#", icon: "MapPin", sort_order: 3 },
                { label: "Africa (NG & KE)", href: "#", icon: "MapPin", sort_order: 4 },
                { label: "hello@bigwebdigital.com", href: "mailto:hello@bigwebdigital.com", icon: "Mail", sort_order: 5 }
            ];
        }

        if (links.length > 0) {
            const linksWithSection = links.map(l => ({ ...l, section_id: sectionId }));
            const { error: lError } = await supabase.from('cms_footer_links').insert(linksWithSection);
            if (lError) console.error(`Error syncing links for ${section.title}:`, lError.message);
        }
    }

    // 4. SITE SETTINGS
    console.log('Syncing Site Settings...');
    const settings = [
        { setting_key: 'site_name', setting_value: 'BIGWEB Digital', description: 'Site name' },
        { setting_key: 'site_tagline', setting_value: 'The Conversion Lab', description: 'Site tagline' },
        { setting_key: 'contact_email', setting_value: 'hello@bigwebdigital.com', description: 'Contact email' },
        { setting_key: 'contact_phone', setting_value: '+234 (703) 057-6537', description: 'Contact phone' },
        { setting_key: 'primary_color', setting_value: '#ea580c', description: 'Primary brand color' },
        { setting_key: 'company_address', setting_value: 'Global Presence: NA, EU, Asia, Africa', description: 'Address' },
        { setting_key: 'facebook_url', setting_value: 'https://facebook.com/bigwebdigital', description: 'Facebook' },
        { setting_key: 'twitter_url', setting_value: 'https://twitter.com/bigwebdigital', description: 'Twitter' },
        { setting_key: 'instagram_url', setting_value: 'https://instagram.com/bigwebdigital', description: 'Instagram' },
        { setting_key: 'linkedin_url', setting_value: 'https://linkedin.com/company/bigweb-digital', description: 'LinkedIn' }
    ];

    // 5. HERO SLIDES
    console.log('Syncing Hero Slides...');
    const heroSlides = [
        {
            title: "Performance Engineering for Modern Revenue Systems",
            subtitle: "The Conversion Lab Protocol",
            description: "We analyze, fix, and rebuild websites with a single goal: increasing your revenue. No fluff, no buzzwords, just engineered conversion outcomes.",
            cta_text: "Request a Conversion Diagnostic",
            cta_link: "/offers/diagnostic",
            image_url: "/images/hero/revenue_system.png",
            stat_value: "+300%",
            stat_label: "Target ROI",
            sort_order: 1,
            active: true
        },
        {
            title: "Stop Losing Leads to Confusing Design",
            subtitle: "Conversion Engineers, Not Just Designers",
            description: "Pretty websites that don't sell are liabilities. We use data-driven psychology to clear bottlenecks and funnel visitors straight to your checkout or calendar.",
            cta_text: "Fix My Website Sprints",
            cta_link: "/offers/fix-sprint",
            image_url: "/images/hero/design_fix.png",
            stat_value: "1-3",
            stat_label: "Sprint Weeks",
            sort_order: 2,
            active: true
        },
        {
            title: "Your In-House Growth Team Without the Overhead",
            subtitle: "Continuous Optimization Retainers",
            description: "Launch is just the starting line. We rigorously A/B test, monitor, and refine your site effectively acting as your dedicated CRO department.",
            cta_text: "Explore Optimization",
            cta_link: "/offers/retainer",
            image_url: "/images/hero/growth_team.png",
            stat_value: "24/7",
            stat_label: "Monitoring",
            sort_order: 3,
            active: true
        }
    ];

    for (const slide of heroSlides) {
        const { error } = await supabase.from('hero_slides').upsert(slide, { onConflict: 'title' });
        if (error) console.error(`Error syncing hero slide ${slide.title}:`, error.message);
    }

    // 6. TEAM MEMBERS
    console.log('Syncing Lab Personnel...');
    const teamMembers = [
        {
            name: "Dr. Elias Thorne",
            role: "Chief Conversion Scientist",
            bio: "Ph.D. in Behavioral Psychology with 15 years experience modeling user intent and friction points. Specializes in the 'Friction Extraction' Protocol.",
            avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            linkedin_url: "#",
            twitter_url: "#",
            sort_order: 1,
            is_active: true
        },
        {
            name: "Sarah Chen",
            role: "Lead Conversion Engineer",
            bio: "Former senior dev at Stripe with a focus on high-performance checkout systems and sub-second rendering. Architect of the 'Instant-Pay' flow.",
            avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            linkedin_url: "#",
            twitter_url: "#",
            sort_order: 2,
            is_active: true
        },
        {
            name: "Marcus Rodriguez",
            role: "UX Forensic Specialist",
            bio: "Expert in heatmap analysis and eye-tracking studies. Specializes in identifying psychological bottlenecks and 'Authority Gaps'.",
            avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            linkedin_url: "#",
            twitter_url: "#",
            sort_order: 3,
            is_active: true
        },
        {
            name: "Lena Sokolov",
            role: "Data & Retention Architect",
            bio: "Algorithmic specialist focused on LTV optimization and personalized funnel architecture. Creator of the 'Diagnostic Re-modeling' framework.",
            avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            linkedin_url: "#",
            twitter_url: "#",
            sort_order: 4,
            is_active: true
        }
    ];

    for (const member of teamMembers) {
        const { error } = await supabase.from('cms_team_members').upsert(member, { onConflict: 'name' });
        if (error) console.error(`Error syncing team member ${member.name}:`, error.message);
    }

    console.log('✅ Synchronized Frontend Updates to Backend Successfully!');
}

seed().catch(console.error);
