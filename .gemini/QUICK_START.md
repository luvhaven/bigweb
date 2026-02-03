# 🚀 BIGWEB Backend - Quick Start Guide

## ⚡ INSTANT STATUS CHECK

**Database**: ✅ LIVE & SEEDED  
**Tables**: 8 created, 23 records  
**Security**: RLS policies active  
**Frontend**: Ready to integrate  

---

## 📊 WHAT'S IN THE DATABASE NOW

### ✅ 5 Capabilities
1. Conversion-First Website Engineering
2. Funnel & Journey Architecture
3. Revenue System Engineering
4. Conversion Science (The Lab™)
5. Performance & Trust Optimization

### ✅ 4 Engagements
1. Revenue Roadmap - $500
2. Fix Sprint - $1,500
3. Growth Retainer - $2,500/mo
4. Revenue System - $25,000+

### ✅ 4 Process Phases
1. Revenue Roadmap (Diagnostic)
2. Fix Sprint (Execution)
3. Growth Retainer (Scale)
4. Revenue System (Dominance)

### ✅ 5 SEO Pages
- / (Homepage)
- /services
- /how-it-works
- /case-studies
- /contact

---

## 🎯 NEXT: FRONTEND INTEGRATION

### Option 1: Quick Test (Recommended First)
Create a test component to verify database connection:

```typescript
// app/test-db/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function TestDB() {
  const supabase = createClient()
  const { data } = await supabase
    .from('capabilities')
    .select('*')
    .order('order_index')
  
  return (
    <div className="p-8">
      <h1>Database Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

### Option 2: Full Services Page Integration
Update `app/services/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function ServicesPage() {
  const supabase = createClient()
  
  // Fetch from database instead of hardcoded array
  const { data: capabilities } = await supabase
    .from('capabilities')
    .select('*')
    .eq('status', 'published')
    .order('order_index')
  
  // Rest of component uses 'capabilities' data
  return (/* existing JSX using capabilities */)
}
```

### Option 3: Pricing Component Integration
Update `src/components/SimplePricing.tsx`:

```typescript
'use client'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function SimplePricing() {
  const [packages, setPackages] = useState([])
  
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('engagements')
      .select('*')
      .eq('status', 'published')
      .order('order_index')
      .then(({ data }) => setPackages(data || []))
  }, [])
  
  // Rest of component uses 'packages' state
}
```

---

## 🔧 COMMON QUERIES

### Fetch All Published Capabilities
```typescript
const { data } = await supabase
  .from('capabilities')
  .select('*')
  .eq('status', 'published')
  .order('order_index')
```

### Fetch Single Engagement by Slug
```typescript
const { data } = await supabase
  .from('engagements')
  .select('*')
  .eq('slug', 'revenue-roadmap')
  .single()
```

### Fetch Process Phases
```typescript
const { data } = await supabase
  .from('process_phases')
  .select('*')
  .eq('status', 'published')
  .order('order_index')
```

### Update Content (Admin Only)
```typescript
const { data } = await supabase
  .from('engagements')
  .update({ price: '$600' })
  .eq('slug', 'revenue-roadmap')
```

---

## 🎨 ADMIN DASHBOARD STRUCTURE

When built, the admin will be located at:

```
/admin
├── /capabilities - Manage 5 core services
├── /engagements - Manage 4 offers/pricing
├── /process - Manage How It Works phases
├── /content - Manage page sections
├── /seo - Manage metadata
└── /settings - Feature flags & config
```

---

## 📝 TYPE DEFINITIONS

Add to your TypeScript types:

```typescript
// types/database.ts
export interface Capability {
  id: string
  slug: string
  number: string
  title: string
  description: string | null
  icon: string | null
  color: string | null
  route: string | null
  features: any[] // JSONB
  metadata: any // JSONB
  order_index: number
  status: string
  created_at: string
  updated_at: string
}

export interface Engagement {
  id: string
  slug: string
  name: string
  tagline: string | null
  phase: string | null
  description: string | null
  price: string | null
  price_subtext: string | null
  features: string[] // JSONB
  icon: string | null
  route: string | null
  highlighted: boolean
  badge_text: string | null
  color_scheme: string | null
  order_index: number
  status: string
  created_at: string
  updated_at: string
}
```

---

## ⚠️ IMPORTANT NOTES

1. **Server Components**: Use `createClient` from `@/lib/supabase/server` for server components
2. **Client Components**: Use `createClient` from `@/lib/supabase/client` for client components
3. **RLS is Active**: Public can only see `status = 'published'` content
4. **Auth Required**: Content editing requires authenticated user
5. **Icons**: Icon names are strings (e.g., 'Terminal', 'Search') - map to Lucide icons in component

---

## 🚨 TROUBLESHOOTING

### "relation does not exist"
- Tables are created, check if migration was applied
- Verify project ID: `krstrtqdnvxzvmiphhwm`

### "RLS policy violation"
- Check if content has `status = 'published'`
- Verify user is authenticated for admin actions

### "No data returned"
- Check `.env.local` has correct Supabase credentials
- Verify project is `ACTIVE_HEALTHY`

---

## ✅ VERIFICATION CHECKLIST

Before integrating frontend:
- [x] Database tables created
- [x] Seed data inserted
- [x] RLS policies active
- [x] Supabase client configured
- [ ] Test query successful
- [ ] Frontend component fetches data
- [ ] Admin can update data
- [ ] Frontend shows updated data

---

**Need Help?** Check `.gemini/BACKEND_ARCHITECTURE.md` for full details.  
**Ready to proceed?** Start with Option 1 (Quick Test) above.
