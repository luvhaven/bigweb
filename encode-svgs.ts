import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabase = createClient(supaUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function encode() {
    const { data } = await supabase.from('cms_clients').select('*')
    if(data) {
        for(const c of data) {
            if(c.logo_url && c.logo_url.startsWith('data:image/svg+xml;utf8,')) {
                const svgString = c.logo_url.replace('data:image/svg+xml;utf8,', '')
                const encoded = 'data:image/svg+xml,' + encodeURIComponent(svgString)
                await supabase.from('cms_clients').update({ logo_url: encoded }).eq('id', c.id)
                console.log('Encoded:', c.name)
            }
        }
    }
}
encode()
