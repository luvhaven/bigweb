
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import Providers from '@/components/Providers'
import { OrganizationSchema } from '@/components/seo/JsonLd'
import '../src/index.css'
import '../src/styles/luxury-polish.css'
import '../src/styles/elite-design-system.css'
import '../src/styles/animations.css'
import '../src/styles/accessibility.css'

import AnalyticsAdvanced from '@/components/analytics/AnalyticsAdvanced'
import ClientLayoutEnhancements from '@/components/ClientLayoutEnhancements'
import SmoothScroll from '@/components/ui/SmoothScroll'
import ClinicalCursor from '@/components/ui/ClinicalCursor'

export const viewport: Viewport = {
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

import { fetchGlobalContent } from '@/lib/globalContent'
import { GlobalContentProvider } from '@/context/GlobalContentContext'

export async function generateMetadata() {
  const global = await fetchGlobalContent()
  const { settings } = global

  return {
    metadataBase: new URL('https://bigwebdigital.com'),
    title: {
      default: settings?.site_name ? `${settings.site_name} - Award-Winning Digital Agency` : 'BIGWEB Digital - Award-Winning Digital Agency | Web Development & Design',
      template: settings?.site_name ? `%s | ${settings.site_name}` : '%s | BIGWEB Digital',
    },
    description: settings?.site_description || 'Transform your digital presence with BIGWEB Digital. Expert web development, UI/UX design, mobile apps, AI automation, and SEO services.',
    icons: {
      icon: [
        { url: '/logo_pulse.svg' },
      ],
      apple: '/logo_pulse.svg',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const globalContent = await fetchGlobalContent()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Viewport and theme-color are handled by export const viewport */}
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <OrganizationSchema />
        <script
          dangerouslySetInnerHTML={{
            __html: `
// Initialize accessibility features
if (typeof window !== 'undefined') {
  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduce-motion');
  }
}
`,
          }}
        />

        <GlobalContentProvider {...globalContent}>
          <div className="cinematic-grain" />
          <ClientLayoutEnhancements />
          <ClinicalCursor />
          <Providers>
            <Suspense fallback={null}>
              <AnalyticsAdvanced />
            </Suspense>
            <SmoothScroll>
              <div id="main-content" className="page-transition">
                {children}
              </div>
            </SmoothScroll>
          </Providers>
        </GlobalContentProvider>
      </body>
    </html>
  )
}
