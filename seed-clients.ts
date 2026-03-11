import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // need service key to bypass RLS, or simple insert since we can use anon key if RLS allows. Actually, use ANON key if auth isn't heavily restricted, but we can also use OPEN client. Let's use service key if available, else anon key.
const supabase = createClient(supaUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const newClients = [
    {
        name: 'OVERMIND',
        industry: 'Artificial Intelligence',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><text x="10" y="40" font-family="sans-serif" font-weight="900" font-size="28" letter-spacing="-2" fill="white">OVERMIND</text><circle cx="180" cy="30" r="10" fill="transparent" stroke="white" stroke-width="4"/><circle cx="180" cy="30" r="3" fill="white"/></svg>`,
        sort_order: 1,
        is_active: true
    },
    {
        name: 'NUON',
        industry: 'Quantum Computing',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60"><text x="10" y="40" font-family="sans-serif" font-weight="300" font-size="30" letter-spacing="4" fill="white">NUON</text><text x="120" y="38" font-family="sans-serif" font-weight="600" font-size="20" fill="gray">ニュオン</text></svg>`,
        sort_order: 2,
        is_active: true
    },
    {
        name: 'AÉRO',
        industry: 'Aerospace Logistics',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60"><path d="M10 50 L30 15 L50 50 Z" fill="transparent" stroke="white" stroke-width="3"/><text x="60" y="42" font-family="sans-serif" font-weight="800" font-size="32" fill="white">AÉRO</text></svg>`,
        sort_order: 3,
        is_active: true
    },
    {
        name: 'SYNTHTIK',
        industry: 'Biotechnology',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60"><rect x="10" y="20" width="20" height="20" fill="white" transform="rotate(45 20 30)"/><text x="50" y="42" font-family="monospace" font-weight="700" font-size="26" letter-spacing="2" fill="white">SYNTHTIK</text></svg>`,
        sort_order: 4,
        is_active: true
    },
    {
        name: 'VALØR',
        industry: 'Investment Banking',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 60"><text x="10" y="40" font-family="serif" font-weight="400" font-size="30" letter-spacing="3" fill="white">VALØR</text></svg>`,
        sort_order: 5,
        is_active: true
    },
    {
        name: 'KAIZEN',
        industry: 'Global Consulting',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60"><text x="10" y="40" font-family="sans-serif" font-weight="900" font-size="28" fill="white">KAIZEN</text><text x="140" y="40" font-family="sans-serif" font-weight="100" font-size="28" fill="white">改善</text></svg>`,
        sort_order: 6,
        is_active: true
    },
    {
        name: 'NEBBIA',
        industry: 'Luxury Architecture',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60"><line x1="10" y1="30" x2="40" y2="30" stroke="white" stroke-width="2"/><text x="50" y="38" font-family="sans-serif" font-weight="200" font-size="24" letter-spacing="6" fill="white">NEBBIA</text></svg>`,
        sort_order: 7,
        is_active: true
    },
    {
        name: 'QLUSTER',
        industry: 'Data Infrastructure',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><circle cx="20" cy="20" r="5" fill="white"/><circle cx="35" cy="40" r="5" fill="white"/><circle cx="10" cy="35" r="5" fill="white"/><text x="50" y="38" font-family="sans-serif" font-weight="800" font-size="26" fill="white">QLUSTER</text></svg>`,
        sort_order: 8,
        is_active: true
    },
    {
        name: 'T E R R A C E',
        industry: 'Commercial Real Estate',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60"><text x="10" y="38" font-family="sans-serif" font-weight="500" font-size="18" letter-spacing="8" fill="white">TERRACE</text></svg>`,
        sort_order: 9,
        is_active: true
    },
    {
        name: 'BØND',
        industry: 'Decentralized Finance',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60"><rect x="10" y="15" width="20" height="20" fill="transparent" stroke="white" stroke-width="4"/><text x="45" y="38" font-family="sans-serif" font-weight="900" font-size="30" fill="white">BØND</text></svg>`,
        sort_order: 10,
        is_active: true
    },
    {
        name: 'AEON',
        industry: 'Enterprise Software',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 60"><text x="10" y="42" font-family="serif" font-weight="bold" font-size="32" letter-spacing="1" fill="white">A E O N</text></svg>`,
        sort_order: 11,
        is_active: true
    },
    {
        name: 'RE_FORM',
        industry: 'Advanced Manufacturing',
        logo_url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 60"><text x="10" y="38" font-family="monospace" font-weight="600" font-size="24" fill="white">RE_FORM</text><rect x="130" y="18" width="8" height="24" fill="orange"/></svg>`,
        sort_order: 12,
        is_active: true
    }
]

async function seed() {
    console.log('Clearing existing cms_clients...')
    const { error: delErr } = await supabase.from('cms_clients').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (delErr) {
        console.error('Error clearing:', delErr)
    }

    console.log('Inserting new premium SVG logos...')
    for (const client of newClients) {
        const { error } = await supabase.from('cms_clients').insert(client)
        if (error) {
            console.error('Error inserting', client.name, error)
        } else {
            console.log('Inserted:', client.name)
        }
    }
    console.log('Seeding Complete.')
}

seed()
