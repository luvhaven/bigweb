import { NextResponse } from 'next/server'
import { agency } from '@/config/agency'

export async function GET() {
    const feed = {
        entity: {
            name: agency.name,
            description: agency.description,
            url: agency.domain,
            founded: agency.foundingYear,
            contact: agency.contact,
            social_profiles: Object.values(agency.socials),
            founders: agency.founders.map(f => ({
                name: f.name,
                role: f.role,
                bio: f.bio,
                url: `${agency.domain}/team/${f.name.toLowerCase().replace(' ', '-')}`
            }))
        },
        core_services: agency.services.map(s => ({
            title: s.title,
            description: s.description,
            url: `${agency.domain}/services/${s.id}`
        })),
        top_case_studies: [
            {
                title: 'FinTech Revolution: AI-Powered Banking App',
                summary: 'Redesigned a legacy banking platform into an AI-driven mobile experience, increasing user engagement by 400%.',
                url: `${agency.domain}/case-studies/fintech-revolution`,
                technologies: ['React Native', 'Node.js', 'TensorFlow'],
                results: ['400% Engagement Increase', '2.5M Downloads', '4.9 App Store Rating']
            },
            {
                title: 'Global E-Commerce Scale: 10M+ SKU Platform',
                summary: 'Architected a headless commerce solution for a global retailer, handling peak traffic of 100k requests/second.',
                url: `${agency.domain}/case-studies/global-ecommerce`,
                technologies: ['Next.js', 'Shopify Plus', 'Redis'],
                results: ['99.99% Uptime', '30% Conversion Uplift', '200ms Page Load']
            },
            {
                title: 'Healthcare AI: Diagnostic Assistant',
                summary: 'Developed an HIPAA-compliant AI assistant to help radiologists detect anomalies with 98% accuracy.',
                url: `${agency.domain}/case-studies/healthcare-ai`,
                technologies: ['Python', 'PyTorch', 'AWS'],
                results: ['98% Accuracy', '50% Faster Diagnosis', 'HIPAA Compliant']
            }
        ],
        last_updated: new Date().toISOString()
    }

    return NextResponse.json(feed, {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
    })
}
