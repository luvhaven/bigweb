# Implementation Plan - Backend Integration & Build Fix

## Goal
Fix Next.js 15 build errors and ensure full integration with Supabase for all forms (Contact, Careers, etc.) to meet "enterprise" standards.

## Steps

### 1. Fix `app/services/[slug]/page.tsx`
- **Issue**: `params` is now a Promise in Next.js 15.
- **Fix**: async/await the `params` object in both `generateMetadata` and `ServicePage` component.

### 2. Database Schema Enforcement
- **Action**: Execute a comprehensive SQL migration to ensure all necessary tables exist correctly.
- **Tables to Check/Create**:
    - `career_openings` (for job listings)
    - `job_applications` (for resumes/applications)
    - `contact_submissions` (already checked, but verify columns)
- **Method**: Use `mcp_supabase_apply_migration` or `mcp_supabase_execute_sql`.

### 3. API Route Real Implementation
- **Files**:
    - `app/api/careers/openings/route.ts` -> Connect to `career_openings`.
    - `app/api/careers/apply/route.ts` -> Connect to `job_applications`.
- **Logic**: Remove current mock data. Use `createClient` to fetch/insert data.

### 4. Admin Management Access
- **Strategy**: Ensure RLS policies exist that allow an "admin" (authenticated user with role) to read/write all these tables. 
- **Verification**: The SQL migration should include these policies.

### 5. Final Verification
- Run `npm run build`.
- Fix any remaining type errors from the build log.
