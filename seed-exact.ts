import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supaUrl, supaKey)

const RAW_PROJECTS = [
  {
    slug: 'velocity-engine',
    title: 'Velocity Engine',
    client_name: 'Velocity',
    category: 'Fintech · Revenue System',
    tagline: 'The fintech that moved money at the speed of thought.',
    description: 'Re-engineered the entire transaction flow for a Series B fintech — sub-second settlement, 3× throughput, and a UI that converted skeptical CFOs into champions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    year: '2025',
    accentColor: '#10b981',
    results: [
      { label: 'Transaction Speed', value: '-82%' },
      { label: 'Revenue Impact', value: '+$2.4M' },
    ],
  },
  {
    slug: 'nexus-flow',
    title: 'Nexus Flow',
    client_name: 'Nexus',
    category: 'SaaS · Conversion Strategy',
    tagline: 'A SaaS pricing page that became a growth engine.',
    description: 'Pricing architecture overhaul that turned a leaky funnel into a precision acquisition machine. 127% increase in enterprise upgrades in quarter one.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    year: '2024',
    accentColor: '#6366f1',
    results: [
      { label: 'Enterprise Upgrades', value: '+127%' },
      { label: 'Churn Reduction', value: '-34%' },
    ],
  },
  {
    slug: 'elevate-commerce',
    title: 'Elevate Commerce',
    client_name: 'Elevate',
    category: 'Luxury Retail · Ecommerce',
    tagline: 'Luxury commerce that commands premium prices.',
    description: 'Immersive commerce architecture that took a boutique brand from six figures to eight-figure annual revenue. Every interaction was designed to justify a premium.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    year: '2025',
    accentColor: '#d4a853',
    results: [
      { label: 'Conversion Rate', value: '+340%' },
      { label: 'AOV Increase', value: '+67%' },
    ],
  },
  {
    slug: 'vanguard-capital',
    title: 'Vanguard Capital',
    client_name: 'Vanguard',
    category: 'Institutional Finance · Brand',
    tagline: '$18M in institutional commitments from a digital presence.',
    description: 'High-authority digital identity that translated years of track record into an online presence commanding institutional respect — and capital allocation.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
    accentColor: '#f59e0b',
    results: [
      { label: 'Lead Quality', value: '+210%' },
      { label: 'Commitments', value: '$18M' },
    ],
  },
  {
    slug: 'meridian-health',
    title: 'Meridian Health',
    client_name: 'Meridian',
    category: 'HealthTech · Product Design',
    tagline: 'Digital trust in an industry where trust saves lives.',
    description: 'Patient-facing platform that reduced appointment no-show rates by 61% through precision UX design. Care can be beautiful and functional at the same time.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    year: '2025',
    accentColor: '#ec4899',
    results: [
      { label: 'No-show Reduction', value: '-61%' },
      { label: 'NPS Score', value: '+48pts' },
    ],
  },
]

async function seed() {
  console.log('Clearing existing projects...')
  await supabase.from('cms_projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  console.log('Inserting into exact columns...')
  for (const p of RAW_PROJECTS) {
    const projectRecord = {
      slug: p.slug,
      title: p.title,
      client_name: p.client_name,
      category: p.category,
      summary: p.tagline,
      solution: p.description, // using solution or challenge to store the paragraph
      cover_image_url: p.image,
      results: p.results,
      tech_stack: [p.accentColor] as any, // using tech_stack text array to store accent color
      is_featured: true,
      is_published: true,
      published_at: new Date(Number(p.year), 0, 1).toISOString(),
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
