# The Conversion Lab - BIGWEB Digital

A conversion-focused website built with Next.js 15, TypeScript, and Supabase. This is a complete rebranding from a traditional digital agency to "The Conversion Lab" - a team of conversion engineers focused on revenue optimization.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (recommended)
- **Icons**: Lucide React

## 📁 Project Structure

```
bigweb-ff2/
├── app/                          # Next.js App Router pages
│   ├── about/                    # About page
│   ├── blog/                     # Blog listing and posts
│   ├── case-studies/             # Portfolio/case studies
│   ├── contact/                  # Contact page
│   ├── offers/                   # Service offer pages
│   │   ├── diagnostic/           # $399 Diagnostic offer
│   │   ├── fix-sprint/           # $1k+ Fix Sprint
│   │   ├── revenue-system/       # $3k+ Full rebuild
│   │   └── retainer/             # $500-2k/mo Retainer
│   ├── process/                  # How it works
│   └── page.tsx                  # Homepage
├── src/
│   ├── components/               # React components
│   │   ├── forms/                # Form components
│   │   ├── ui/                   # UI primitives
│   │   └── ...                   # Feature components
│   ├── lib/                      # Utilities and API
│   │   └── api/                  # Supabase API functions
│   ├── styles/                   # Global styles
│   └── utils/                    # Helper functions
├── supabase/
│   └── migrations/               # Database migrations
└── public/                       # Static assets
```

## 🎨 Design System

### Color Palette
- **Background**: `hsl(0 0% 7%)` - Deep black
- **Foreground**: `hsl(0 0% 98%)` - Off-white
- **Accent**: `hsl(15 85% 55%)` - Vibrant orange
- **Card**: `hsl(0 0% 10%)` - Slightly lighter black
- **Muted**: `hsl(0 0% 60%)` - Gray text

### Offer-Specific Colors
- **Diagnostic**: Blue (`#3b82f6`)
- **Fix Sprint**: Orange/Red (accent)
- **Revenue System**: Purple (`#a855f7`)
- **Retainer**: Green (`#22c55e`)

### Typography
- **Font**: Space Grotesk
- **Headings**: Bold, tight tracking
- **Body**: 17px base, 1.7 line-height

### Effects
- Glass morphism backgrounds
- Gradient text
- Smooth animations (Framer Motion)
- Custom scrollbar
- Hover effects with lift and glow

## 🗄️ Database Schema

### Tables
1. **cms_services** - Service offerings
2. **cms_projects** - Portfolio/case studies
3. **cms_leads** - Form submissions
4. **cms_blog_posts** - Blog content
5. **cms_blog_categories** - Blog categories
6. **cms_faqs** - FAQ content
7. **cms_testimonials** - Client testimonials
8. **cms_team_members** - Team profiles

### RLS Policies
- Public read access for content tables
- Public insert access for leads
- Authenticated access for admin operations

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bigweb-ff2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run database migrations**
   - Go to your Supabase project
   - Navigate to SQL Editor
   - Run migrations from `supabase/migrations/` in order:
     - `20260109_conversion_lab_schema.sql`
     - `20260109_blog_schema.sql`
     - `20260109_faqs_testimonials.sql`
     - `20260109_fix_leads_rls.sql`

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to `http://localhost:3000`

## 📝 Content Management

### Adding New Services
1. Insert into `cms_services` table in Supabase
2. Set `is_active = true` and `sort_order`
3. Homepage will automatically display new services

### Adding Blog Posts
1. Insert into `cms_blog_posts` table
2. Set `is_published = true` and `published_at`
3. Blog listing will automatically show new posts

### Managing Leads
1. View submissions in `cms_leads` table
2. Filter by `type` (diagnostic, contact, fix_sprint, etc.)
3. Update `status` to track progress

## 🎯 Key Features

### Forms
- **DiagnosticWizard**: Multi-step form with validation
- **ContactForm**: Reusable contact form component
- All forms submit to Supabase `cms_leads` table

### Dynamic Content
- Services fetched from `cms_services`
- Blog posts from `cms_blog_posts`
- Testimonials from `cms_testimonials`
- Team members from `cms_team_members`
- FAQs from `cms_faqs`

### Navigation
- Responsive mega menu
- Mobile hamburger menu
- Smooth scroll to sections
- Active state indicators

### Animations
- Page transitions
- Scroll-triggered animations
- Hover effects
- Loading states

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## 📊 Analytics Setup (Optional)

### Google Analytics
Add to `app/layout.tsx`:
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

### Plausible (Privacy-friendly)
Add script tag to `app/layout.tsx`

## 🔒 Security

- RLS policies on all tables
- CORS configured for Supabase
- Environment variables for sensitive data
- Input validation on all forms
- XSS protection via React

## 🐛 Troubleshooting

### Form Submissions Not Working
1. Check Supabase RLS policies
2. Verify `anon` role has INSERT permission
3. Check browser console for errors
4. Verify `.env.local` variables are correct

### Build Errors
1. Clear `.next` folder: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run build`

### Styling Issues
1. Check Tailwind config
2. Verify CSS imports in `app/layout.tsx`
3. Clear browser cache

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Proprietary - All rights reserved

## 👥 Team

Built by The Conversion Lab team at BIGWEB Digital

---

**Last Updated**: 2026-01-09
**Version**: 1.0.0
**Status**: Production Ready
