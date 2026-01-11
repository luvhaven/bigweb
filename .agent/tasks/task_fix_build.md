---
description: Fix Next.js 15 build errors and ensure full Supabase integration
---

1.  **Fix `app/services/[slug]/page.tsx`**: Update page props to handle async `params` required by Next.js 15.
2.  **Verify/Create Backend Tables**:
    *   Check for `career_openings`, `job_applications` tables.
    *   Create them if missing using `mcp_supabase_execute_sql` with robust schema.
    *   Ensure `contact_submissions` table is correct.
3.  **Implement Real API Routes**:
    *   Refactor `app/api/careers/apply/route.ts` to use Supabase (remove mock).
    *   Refactor `app/api/careers/openings/route.ts` to use Supabase (remove mock).
4.  **Admin & Management**:
    *   Ensure all data tables have RLS policies allowing admin access (covered by migration script usually, will verify).
    *   Create a simple `sql` migration to guarantee all tables exist and have correct schemas.
5.  **Final Build & Run**:
    *   Run `npm run build` to confirm zero errors.
    *   Run `npm run dev` to start the server.
