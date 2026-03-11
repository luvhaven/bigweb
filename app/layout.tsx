
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import Providers from '@/components/Providers'
import { OrganizationSchema } from '@/components/seo/JsonLd'
import '../src/index.css'
import '../src/styles/accessibility.css'

import AnalyticsAdvanced from '@/components/analytics/AnalyticsAdvanced'
import ClientLayoutEnhancements from '@/components/ClientLayoutEnhancements'

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
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
      default: settings?.site_name ? `${settings.site_name} — Premium Digital Agency` : 'BIGWEB Digital — Premium Digital Agency',
      template: settings?.site_name ? `%s | ${settings.site_name}` : '%s | BIGWEB Digital',
    },
    description: settings?.site_description || 'We engineer high-performance websites and growth systems for ambitious brands. Strategy, design, and development under one roof.',
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
if (typeof window !== 'undefined') {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduce-motion');
  }
}
`,
          }}
        />

        <GlobalContentProvider {...globalContent}>
          <ClientLayoutEnhancements />
          <Providers>
            <Suspense fallback={null}>
              <AnalyticsAdvanced />
            </Suspense>
            <div id="main-content" className="page-transition">
              {children}
            </div>
          </Providers>
        </GlobalContentProvider>
      </body>
    </html>
  )
}
