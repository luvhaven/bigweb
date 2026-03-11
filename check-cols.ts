import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supaUrl, supaKey)

async function check() {
  const { data } = await supabase.from('cms_projects').select('*').limit(1)
  if (data && data.length > 0) {
    console.log("Columns:", Object.keys(data[0]))
  } else {
    // try to insert an empty one to force an error to reveal columns
    const { error } = await supabase.from('cms_projects').insert({ slug: 'test-2', title: 'test-2' }).select()
    console.log("Insert result:", error || "success")
    const { data: d2 } = await supabase.from('cms_projects').select('*').limit(1)
    if (d2 && d2.length > 0) {
      console.log("Columns:", Object.keys(d2[0]))
    }
  }
}
check()
