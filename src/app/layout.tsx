import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FooterWrapper from "@/components/layout/FooterWrapper";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CommandMenu from "@/components/layout/CommandMenu";
import ExitIntent from "@/components/ui/ExitIntent";
import TrustTicker from "@/components/ui/TrustTicker";
import { AudioProvider } from "@/components/ui/AudioProvider";
import { ToastProvider } from "@/components/admin/ToastProvider";
import { OrganizationSchema } from "@/components/seo/JsonLd";
import FluidBackground from "@/components/ui/FluidBackground";
import PageTransition from "@/components/layout/PageTransition";
import MobileCTABar from "@/components/layout/MobileCTABar";
import CookieConsent from "@/components/ui/CookieConsent";
import AIQualifier from "@/components/ui/AIQualifier";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BIGWEB Digital — We Don't Build Websites. We Build Revenue.",
  description:
    "BIGWEB Digital is a revenue-focused digital agency. We find where your website is losing money — and we fix it. Conversion audits, AI sales agents, revenue funnel systems, and more.",
  keywords: "global digital agency, conversion optimization, AI sales agent, revenue growth, web design, enterprise ecommerce",
  openGraph: {
    title: "BIGWEB Digital — We Don't Build Websites. We Build Revenue.",
    description: "Most businesses have traffic. Most are bleeding revenue at the conversion layer. We fix that.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <head>
        {/* Core Web Vitals: Preload critical fonts to avoid Layout Shift */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" as="style" />
        <OrganizationSchema />
      </head>
      <body>
        <FluidBackground />
        <SmoothScroll>
          <AudioProvider>
            <ToastProvider>
              <CommandMenu />
              <ScrollProgress />
              <CustomCursor />
              <Navigation />
              <PageTransition>
                {/* Global Structural Grid Anchors */}
                <div className="grid-anchor" style={{ position: 'fixed', top: 'var(--space-8)', left: 'var(--space-8)', opacity: 0.3 }} />
                <div className="grid-anchor" style={{ position: 'fixed', top: 'var(--space-8)', right: 'var(--space-8)', opacity: 0.3 }} />
                <div className="grid-anchor" style={{ position: 'fixed', bottom: 'var(--space-8)', left: 'var(--space-8)', opacity: 0.3 }} />
                <div className="grid-anchor" style={{ position: 'fixed', bottom: 'var(--space-8)', right: 'var(--space-8)', opacity: 0.3 }} />
                <main>{children}</main>
              </PageTransition>
              <ExitIntent />
              <MobileCTABar />
              <CookieConsent />
              <AIQualifier />
              <TrustTicker />
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
            </ToastProvider>
          </AudioProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
