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
import { ToastProvider } from "@/components/admin/ToastProvider";
import FluidBackground from "@/components/ui/FluidBackground";
import PageTransition from "@/components/layout/PageTransition";
import MobileCTABar from "@/components/layout/MobileCTABar";

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
  keywords: "digital agency, conversion optimization, AI sales agent, revenue growth, web design, Lagos, Nigeria",
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
      <body>
        <FluidBackground />
        <SmoothScroll>
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
            <FooterWrapper>
              <Footer />
            </FooterWrapper>
          </ToastProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
