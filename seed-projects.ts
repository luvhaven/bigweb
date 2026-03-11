import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supaUrl, supaKey)

const PROJECTS = [
  {
    slug: 'velocity-engine',
    title: 'Velocity Engine',
    summary: 'The fintech that moved money at the speed of thought.',
    category: 'Fintech · Revenue System',
    description: 'Re-engineered the entire transaction flow for a Series B fintech — sub-second settlement, 3× throughput, and a UI that converted skeptical CFOs into champions.',
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    year: '2025',
    accent_color: '#10b981',
    results: [
      { label: 'Transaction Speed', value: '-82%' },
      { label: 'Revenue Impact', value: '+$2.4M' },
    ],
    is_featured: true,
    is_published: true,
    client_name: 'Velocity',
  },
  {
    slug: 'nexus-flow',
    title: 'Nexus Flow',
    summary: 'A SaaS pricing page that became a growth engine.',
    category: 'SaaS · Conversion Strategy',
    description: 'Pricing architecture overhaul that turned a leaky funnel into a precision acquisition machine. 127% increase in enterprise upgrades in quarter one.',
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    year: '2024',
    accent_color: '#6366f1',
    results: [
      { label: 'Enterprise Upgrades', value: '+127%' },
      { label: 'Churn Reduction', value: '-34%' },
    ],
    is_featured: true,
    is_published: true,
    client_name: 'Nexus',
  },
  {
    slug: 'elevate-commerce',
    title: 'Elevate Commerce',
    summary: 'Luxury commerce that commands premium prices.',
    category: 'Luxury Retail · Ecommerce',
    description: 'Immersive commerce architecture that took a boutique brand from six figures to eight-figure annual revenue. Every interaction was designed to justify a premium.',
    cover_image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    year: '2025',
    accent_color: '#d4a853',
    results: [
      { label: 'Conversion Rate', value: '+340%' },
      { label: 'AOV Increase', value: '+67%' },
    ],
    is_featured: true,
    is_published: true,
    client_name: 'Elevate',
  },
  {
    slug: 'vanguard-capital',
    title: 'Vanguard Capital',
    summary: '$18M in institutional commitments from a digital presence.',
    category: 'Institutional Finance · Brand',
    description: 'High-authority digital identity that translated years of track record into an online presence commanding institutional respect — and capital allocation.',
    cover_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
    accent_color: '#f59e0b',
    results: [
      { label: 'Lead Quality', value: '+210%' },
      { label: 'Commitments', value: '$18M' },
    ],
    is_featured: true,
    is_published: true,
    client_name: 'Vanguard',
  },
  {
    slug: 'meridian-health',
    title: 'Meridian Health',
    summary: 'Digital trust in an industry where trust saves lives.',
    category: 'HealthTech · Product Design',
    description: 'Patient-facing platform that reduced appointment no-show rates by 61% through precision UX design. Care can be beautiful and functional at the same time.',
    cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    year: '2025',
    accent_color: '#ec4899',
    results: [
      { label: 'No-show Reduction', value: '-61%' },
      { label: 'NPS Score', value: '+48pts' },
    ],
    is_featured: true,
    is_published: true,
    client_name: 'Meridian',
  },
]

async function seed() {
  console.log('Clearing existing projects...')
  const { error: delErr } = await supabase.from('cms_projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delErr) {
    console.warn('Delete warning:', delErr)
  }

  console.log('Seeding elite projects...')
  for (const p of PROJECTS) {
    // Map to the likely columns. 'results' might be JSON or we can store it in metadata if 'results' doesn't exist.
    // I'll put it in content/metadata to be safe if the column drops.
    const projectRecord = {
      slug: p.slug,
      title: p.title,
      client_name: p.client_name,
      summary: p.summary,
      description: p.description,
      cover_image_url: p.cover_image_url,
      // mapping category and tags into existing string arrays, if not present we just pass it to metadata
      metadata: {
        category: p.category,
        year: p.year,
        accentColor: p.accent_color,
        results: p.results,
        tagline: p.summary
      },
      is_featured: p.is_featured,
      is_published: p.is_published,
    }

    const { error } = await supabase.from('cms_projects').insert(projectRecord)
    if (error) {
      console.error(`Failed to insert ${p.title}:`, error)
      
      // Attempt fallback if metadata string/json type issue
      const fallback = { ...projectRecord, metadata: JSON.stringify(projectRecord.metadata) }
      const fb = await supabase.from('cms_projects').insert(fallback)
      if (fb.error) console.error(`Fallback failed too:`, fb.error)
    } else {
      console.log(`✓ Inserted ${p.title}`)
    }
  }

  console.log('Done.')
}

seed()
