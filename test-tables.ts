import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supaUrl, supaKey)

async function run() {
  const { data, error } = await supabase.rpc('get_tables')
  if (error) {
     console.log('RPC get_tables failed:', error.message)
     console.log('Trying alternative...')
     
     // query from information_schema if possible (might require postgres role)
     // Actually via rest we can just check 'projects' or 'cms_projects' via simple select limit 1
  } else {
     console.log('Tables:', data)
  }

  // let's try reading 'projects'
  console.log("Testing 'projects' table...")
  const res1 = await supabase.from('projects').select('*').limit(1)
  console.log('projects table result:', res1.error ? res1.error.message : 'SUCCESS')

  // let's try reading 'cms_projects'
  console.log("Testing 'cms_projects' table...")
  const res2 = await supabase.from('cms_projects').select('*').limit(1)
  console.log('cms_projects table result:', res2.error ? res2.error.message : 'SUCCESS')
  
  // Try 'case_studies'
  console.log("Testing 'case_studies' table...")
  const res3 = await supabase.from('case_studies').select('*').limit(1)
  console.log('case_studies table result:', res3.error ? res3.error.message : 'SUCCESS')
}

run()
