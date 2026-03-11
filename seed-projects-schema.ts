import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supaUrl, supaKey)

const PROJECTS = [
  {
    slug: 'velocity-engine',
    title: 'Velocity Engine',
    client_name: 'Velocity',
    industry: 'Fintech',
    description: 'Re-engineered the entire transaction flow for a Series B fintech — sub-second settlement, 3× throughput, and a UI that converted skeptical CFOs into champions.',
    challenge: 'High latency and poor conversion rates for enterprise clients.',
    solution: 'Rebuilt the revenue engine transaction flow using cutting edge architecture.',
    outcome: 'The fintech that moved money at the speed of thought.',
    hero_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'Transaction Speed', value: '-82%' },
      { label: 'Revenue Impact', value: '+$2.4M' },
    ],
    is_featured: true,
  },
  {
    slug: 'nexus-flow',
    title: 'Nexus Flow',
    client_name: 'Nexus',
    industry: 'SaaS',
    description: 'Pricing architecture overhaul that turned a leaky funnel into a precision acquisition machine. 127% increase in enterprise upgrades in quarter one.',
    challenge: 'Complex onboarding funnel led to a 34% drop-off rate.',
    solution: 'Architected a brand new pricing page focusing heavily on conversion strategy.',
    outcome: 'A SaaS pricing page that became a growth engine.',
    hero_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    stats: [
      { label: 'Enterprise Upgrades', value: '+127%' },
      { label: 'Churn Reduction', value: '-34%' },
    ],
    is_featured: true,
  },
  {
    slug: 'elevate-commerce',
    title: 'Elevate Commerce',
    client_name: 'Elevate',
    industry: 'Luxury Retail',
    description: 'Immersive commerce architecture that took a boutique brand from six figures to eight-figure annual revenue. Every interaction was designed to justify a premium.',
    challenge: 'Losing market share to massive generalist e-commerce platforms.',
    solution: 'Built an elite immersive digital storefront to justify premium luxury pricing.',
    outcome: 'Luxury commerce that commands premium prices.',
    hero_image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    stats: [
      { label: 'Conversion Rate', value: '+340%' },
      { label: 'AOV Increase', value: '+67%' },
    ],
    is_featured: true,
  },
  {
    slug: 'vanguard-capital',
    title: 'Vanguard Capital',
    client_name: 'Vanguard',
    industry: 'Institutional Finance',
    description: 'High-authority digital identity that translated years of track record into an online presence commanding institutional respect — and capital allocation.',
    challenge: 'Outdated web presence limiting institutional trust and lead quality.',
    solution: 'Engineered a modern, authoritative brand platform.',
    outcome: '$18M in institutional commitments from a digital presence.',
    hero_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'Lead Quality', value: '+210%' },
      { label: 'Commitments', value: '$18M' },
    ],
    is_featured: true,
  },
  {
    slug: 'meridian-health',
    title: 'Meridian Health',
    client_name: 'Meridian',
    industry: 'HealthTech',
    description: 'Patient-facing platform that reduced appointment no-show rates by 61% through precision UX design. Care can be beautiful and functional at the same time.',
    challenge: 'High appointment no-show rate due to confusing legacy software.',
    solution: 'Completely redesigned the patient appointment flows using modern UX.',
    outcome: 'Digital trust in an industry where trust saves lives.',
    hero_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    stats: [
      { label: 'No-show Reduction', value: '-61%' },
      { label: 'NPS Score', value: '+48pts' },
    ],
    is_featured: true,
  },
]

async function seed() {
  console.log('Clearing existing projects...')
  const { error: delErr } = await supabase.from('cms_projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delErr) {
    console.warn('Delete warning:', delErr)
  }

  console.log('Seeding elite projects into actual schema...')
  for (const p of PROJECTS) {
    const projectRecord = {
      slug: p.slug,
      title: p.title,
      client_name: p.client_name,
      industry: p.industry,
      description: p.description,
      challenge: p.challenge,
      solution: p.solution,
      outcome: p.outcome,
      hero_image_url: p.hero_image_url,
      stats: p.stats,
      is_featured: p.is_featured,
      created_at: new Date().toISOString()
    }

    const { error } = await supabase.from('cms_projects').insert(projectRecord)
    if (error) {
      console.error(`Failed to insert ${p.title}:`, error)
    } else {
      console.log(`✓ Inserted ${p.title}`)
    }
  }

  console.log('Done.')
}

seed()
