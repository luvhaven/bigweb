# Database Migrations Guide

## Overview
This folder contains SQL migration scripts for the BIGWEB admin system. These scripts set up a comprehensive, enterprise-grade database schema.

## Migration Files

Execute these in order:

### 0. Cleanup (Optional - DESTRUCTIVE!)
**File**: `000_cleanup.sql`
- **WARNING**: This will DELETE all existing data!
- Only run this if you want to completely reset your database
- Drops all tables and storage buckets

### 1. Core Schema
**File**: `001_core_schema.sql`
- Admin users with role-based access
- Site settings management
- Media library
- Audit logging
- Activity feed

### 2. Content Management
**File**: `002_content_schema.sql`
- Services management
- Portfolio projects
- Testimonials
- Blog system (posts, categories, tags)
- Dynamic page builder

### 3. Communication & CRM
**File**: `003_communication_schema.sql`
- Contact form submissions
- Live chat system
- Email campaigns
- Newsletter subscribers
- Client/customer management
- Project tracking

### 4. Analytics & Tracking
**File**: `004_analytics_schema.sql`
- Page view tracking
- Custom event tracking
- Conversion tracking
- Visitor analytics
- UTM campaign performance
- SEO audits
- A/B testing

### 5. Storage Configuration
**File**: `005_storage_config.sql`
- Supabase Storage buckets
- Storage security policies
- Public and private file management

## How to Run Migrations

### Option 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste each migration file content (in order)
5. Run the query

### Option 2: Supabase CLI
```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
supabase db push

# Or apply individually
supabase db execute -f supabase/migrations/000_cleanup.sql
supabase db execute -f supabase/migrations/001_core_schema.sql
supabase db execute -f supabase/migrations/002_content_schema.sql
supabase db execute -f supabase/migrations/003_communication_schema.sql
supabase db execute -f supabase/migrations/004_analytics_schema.sql
supabase db execute -f supabase/migrations/005_storage_config.sql
```

### Option 3: Direct SQL (Advanced)
```bash
# Using psql
psql -h YOUR_DB_HOST -U postgres -d postgres -f supabase/migrations/001_core_schema.sql
```

## Post-Migration Steps

### 1. Create Admin User in Supabase Auth
After running migrations, create your admin user:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter email: `bigwebdaniel@outlook.com` (or your email)
4. Set a password
5. The email should match what's in `001_core_schema.sql`

### 2. Verify Tables
Run this query to check all tables were created:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see:
- ab_test_results
- ab_tests
- activity_feed
- admin_users
- audit_logs
- blog_categories
- blog_post_tags
- blog_posts
- blog_tags
- chat_messages
- chat_sessions
- clients
- contact_submissions
- conversions
- email_campaigns
- events
- media_library
- newsletter_subscribers
- page_views
- pages
- portfolio_projects
- projects
- seo_audits
- services
- site_settings
- testimonials
- utm_campaigns
- visitors

### 3. Test RLS Policies
```sql
-- Test as admin user
SELECT current_user, current_setting('request.jwt.claim.sub', true);

-- Should return data
SELECT * FROM services LIMIT 5;
SELECT * FROM portfolio_projects LIMIT 5;
```

### 4. Upload Sample Data (Optional)
You can create sample data for testing:

```sql
-- Sample service
INSERT INTO services (title, slug, description, is_active) VALUES
('Web Development', 'web-development', 'Custom website development', true);

-- Sample blog post
INSERT INTO blog_posts (title, slug, content, author_id, status) VALUES
('Getting Started', 'getting-started', 'Welcome to our blog!', (SELECT id FROM admin_users LIMIT 1), 'published');
```

## Schema Features

### Security
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Role-based access control (Super Admin, Admin, Editor, Viewer)
- ✅ Audit logging for all admin actions
- ✅ Secure file upload with storage policies

### Performance
- ✅ Indexes on frequently queried columns
- ✅ Materialized views for analytics
- ✅ Optimized for real-time queries

### Data Integrity
- ✅ Foreign key constraints
- ✅ Check constraints for data validation
- ✅ Automatic timestamp updates
- ✅ Cascading deletes where appropriate

## Troubleshooting

### Error: "relation already exists"
- Tables already exist, either skip or run cleanup first
- Be careful with `000_cleanup.sql` - it deletes everything!

### Error: "permission denied"
- Make sure you're authenticated as a Supabase admin
- Check your RLS policies

### Error: "function does not exist"
- Run migrations in order
- Extensions might not be enabled

### Storage bucket errors
- Check that storage is enabled in your Supabase project
- Verify bucket permissions in dashboard

## Environment Variables

Update your `.env.local` with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Next Steps

After migrations:
1. ✅ Build admin authentication
2. ✅ Create admin dashboard
3. ✅ Build CMS interfaces
4. ✅ Set up real-time subscriptions
5. ✅ Configure backups

---

**Questions?** Check the implementation plan in the artifacts folder.
