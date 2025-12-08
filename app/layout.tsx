
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import Providers from '@/components/Providers'
import { Toaster } from 'react-hot-toast'
import { OrganizationSchema } from '@/components/seo/JsonLd'
import '../src/index.css'
import '../src/styles/luxury-polish.css'
import '../src/styles/elite-design-system.css'
import '../src/styles/animations.css'
import '../src/styles/accessibility.css'

import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgressIndicator from '@/components/ui/ScrollProgressIndicator'
import RippleEffect from '@/components/effects/RippleEffect'
import ToastContainer from '@/components/ui/elite-toast'
import ExitIntentModal from '@/components/conversion/ExitIntentModal'
import StickyCTA from '@/components/conversion/StickyCTA'
import LiveVisitorCounter from '@/components/trust/LiveVisitorCounter'
import AnalyticsAdvanced from '@/components/analytics/AnalyticsAdvanced'
import LiveChatWidget from '@/components/LiveChatWidget'

export const viewport: Viewport = {
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://bigwebdigital.com'),
  title: {
    default: 'BIGWEB Digital - Award-Winning Digital Agency | Web Development & Design',
    template: '%s | BIGWEB Digital',
  },
  description: 'Transform your digital presence with BIGWEB Digital. Expert web development, UI/UX design, mobile apps, AI automation, and SEO services. Trusted by 500+ brands worldwide. 98% client satisfaction, 3.2x average ROI increase.',
  keywords: [
    'digital agency',
    'web development',
    'UI/UX design',
    'mobile app development',
    'AI automation',
    'SEO services',
    'digital transformation',
    'enterprise software',
    'Next.js development',
    'React development',
    'award-winning agency',
  ],
  authors: [{ name: 'BIGWEB Digital', url: 'https://bigwebdigital.com' }],
  creator: 'BIGWEB Digital',
  publisher: 'BIGWEB Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BIGWEB Digital',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bigwebdigital.com',
    siteName: 'BIGWEB Digital',
    title: 'BIGWEB Digital - Award-Winning Digital Agency',
    description: 'Transform your digital presence with expert web development, UI/UX design, mobile apps, AI automation, and SEO services. Trusted by 500+ brands worldwide.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BIGWEB Digital - Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bigwebdigital',
    creator: '@bigwebdigital',
    title: 'BIGWEB Digital - Award-Winning Digital Agency',
    description: 'Transform your digital presence with expert web development, UI/UX design, mobile apps, and AI automation. Trusted by 500+ brands.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        <CustomCursor />
        <ScrollProgressIndicator />
        <RippleEffect />
        <Providers>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <AnalyticsAdvanced />
            </Suspense>
            <div id="main-content" className="page-transition">
              {children}
            </div>
          </ErrorBoundary>
        </Providers>
        <LiveChatWidget />
        <ExitIntentModal />
        <ToastContainer />
        <Toaster position="bottom-right" />
        <StickyCTA />
        <LiveVisitorCounter />
      </body>
    </html>
  )
}
