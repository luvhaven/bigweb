# BIGWEB Digital - The Conversion Lab

A premium, cinematic agency website built with Next.js 16, React 19, and Supabase. Optimized for high-conversion and "Dark Luxury" aesthetics.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion + GSAP + Lenis (Smooth Scroll)
- **3D/Graphics**: React Three Fiber + Three.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 📁 Project Structure

```
bigweb/
├── src/
│   ├── app/                # Next.js App Router (Pages & API)
│   ├── components/         # React Components
│   │   ├── layout/         # Navigation, Footer, Layout wrappers
│   │   ├── sections/       # Major landing page sections
│   │   ├── ui/             # Reusable UI primitives & animations
│   │   └── admin/          # Admin dashboard components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Shared utilities & configurations
│   └── styles/             # Global CSS
├── public/                 # Static assets
└── supabase/               # Database migrations & seeds
```

## 🎨 Design Philosophy: "Dark Luxury"
The project uses a curated color palette and sophisticated typography to create an elite, high-end feel:
- **Background**: Deep Onyx (#111111)
- **Foreground**: Pure White (#FFFFFF)
- **Accent**: Luxury Accents & Gradients
- **Typography**: Modern, tight-tracked headings with high readability body text.

## 🔧 Setup Instructions

1. **Clone & Install**
   ```bash
   git clone https://github.com/luvhaven/bigweb.git
   cd bigweb
   npm install --legacy-peer-deps
   ```

2. **Environment Variables**
   Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

## 🚢 Deployment
Deploys automatically to Vercel on push to `main`.
Note: Use `npm install --legacy-peer-deps` or set the `legacy-peer-deps=true` in `.npmrc` if you encounter dependency resolution issues.

## 📄 License
Proprietary - All rights reserved.
Built by luvhaven for BIGWEB Digital.
