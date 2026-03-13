
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { Inter, Playfair_Display } from 'next/font/google'
import ErrorBoundary from '@/components/ErrorBoundary'
import Providers from '@/components/Providers'
import { OrganizationSchema } from '@/components/seo/JsonLd'
import '../src/index.css'
import '../src/styles/accessibility.css'
import SmoothScroll from '@/components/SmoothScroll'

import AnalyticsAdvanced from '@/components/analytics/AnalyticsAdvanced'
import ClientLayoutEnhancements from '@/components/ClientLayoutEnhancements'

/* ─── Self-hosted fonts (zero layout shift, no external request) ─── */
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false, // secondary font — load after paint
})

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
        { url: settings?.favicon_url || '/favicon-bar-b.svg' },
      ],
      apple: settings?.favicon_url || '/favicon-bar-b.svg',
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Viewport and theme-color are handled by export const viewport */}
      </head>
      <body className={`antialiased ${inter.className}`} suppressHydrationWarning>
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
              <SmoothScroll>
                {children}
              </SmoothScroll>
            </div>
          </Providers>
        </GlobalContentProvider>
      </body>
    </html>
  )
}
