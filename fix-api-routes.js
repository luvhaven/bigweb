const { readFileSync, writeFileSync, existsSync } = require('fs')

const files = [
  'app/api/portfolio/projects/route.ts',
  'app/api/leads/route.ts',
  'app/api/contact/route.ts',
  'app/api/contact/general/route.ts',
  'app/api/chat/route.ts',
  'app/api/careers/openings/route.ts',
  'app/api/careers/apply/route.ts',
  'app/api/blog/posts/route.ts',
  'app/api/analytics/track/route.ts',
  'app/api/blueprint/route.ts',
]

for (const f of files) {
  if (!existsSync(f)) { console.log('SKIP:', f); continue }
  let c = readFileSync(f, 'utf8')
  const original = c

  // 1. Remove leftover manual createClient block with comment
  c = c.replace(
    /\s*\/\/ Instantiate inside handler[\s\S]*?const supabaseAdmin = createClient\([\s\S]*?\)\n/,
    '\n'
  )

  // 2. Remove any bare remaining createClient(...) blocks that replaced bad import
  c = c.replace(
    /const supabaseAdmin = createClient\([\s\S]*?\n\)\n(\n)?/g,
    ''
  )

  // 3. Ensure import is the factory
  c = c.replace(
    /import \{ createClient \} from '@supabase\/supabase-js'\r?\n/g,
    "import { getSupabaseAdmin } from '@/lib/supabase-admin'\n"
  )

  // 4. Deduplicate getSupabaseAdmin() — only keep one occurrence at the top of POST/GET/PUT/DELETE
  //    Remove extra ones that might have been injected twice
  const getSupabaseLine = '  const supabaseAdmin = getSupabaseAdmin()'
  const parts = c.split(getSupabaseLine)
  if (parts.length > 2) {
    // More than one injection — collapse to just one
    c = parts[0] + getSupabaseLine + parts.slice(1).join('')
    console.log('DEDUPED:', f)
  }

  if (c !== original) {
    writeFileSync(f, c, 'utf8')
    console.log('SAVED:', f)
  } else {
    console.log('CLEAN:', f)
  }
}
console.log('Done.')
