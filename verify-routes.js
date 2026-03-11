const { readFileSync, existsSync } = require('fs')
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
  if (!existsSync(f)) { console.log(f, '| MISSING'); continue }
  const c = readFileSync(f, 'utf8')
  const hasModuleLevel = /^const supabaseAdmin = createClient/m.test(c)
  const hasBadImport = c.includes("import { createClient } from '@supabase/supabase-js'")
  const hasFactory = c.includes('getSupabaseAdmin')
  const issues = []
  if (hasModuleLevel) issues.push('MODULE-LEVEL-CONST')
  if (hasBadImport) issues.push('BAD-IMPORT')
  if (!hasFactory) issues.push('MISSING-FACTORY')
  console.log(f.split('/').pop(), '|', issues.length === 0 ? 'OK' : issues.join(', '))
}
