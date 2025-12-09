'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import { Smartphone, Zap, Globe, Users, Layers, TrendingUp, Award, Star, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import RelatedServices from '@/components/services/RelatedServices'

const features = [
  {
    title: 'Native & Cross-Platform',
    description: 'Build once, deploy everywhere. React Native and Flutter for iOS and Android, or native Swift and Kotlin for platform-specific features and maximum performance.',
    icon: Smartphone,
    colSpan: 2 as const,
    rowSpan: 2 as const,
    bgImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=90'
  },
  {
    title: 'Blazing Performance',
    description: '60 FPS smooth animations. Optimized for battery life and lightning-fast load times.',
    icon: Zap,
    colSpan: 1 as const
  },
  {
    title: 'Offline-First',
    description: 'Works seamlessly without internet. Smart data sync when connection returns.',
    icon: Globe,
    colSpan: 1 as const
  },
  {
    title: 'User Authentication',
    description: 'Secure login with biometrics, OAuth, or email. Multi-factor authentication built-in.',
    icon: Users,
    colSpan: 1 as const
  },
  {
    title: 'Push Notifications',
    description: 'Engage users with targeted, personalized push notifications that drive retention.',
    icon: Layers,
    colSpan: 1 as const
  },
  {
    title: 'App Store Optimization',
    description: 'Expert ASO to ensure your app ranks high and converts downloads into users.',
    icon: TrendingUp,
    colSpan: 2 as const
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Product Strategy & UX',
    description: 'Define your app\'s core value proposition, target audience, and feature set. We create user personas, map user journeys, and design intuitive flows that make your app a joy to use. Includes competitive analysis and market research.',
    tags: ['User Research', 'UX Strategy', 'Feature Planning', 'Competitive Analysis']
  },
  {
    number: '02',
    title: 'UI Design & Prototyping',
    description: 'Stunning, platform-specific designs that follow iOS and Android design guidelines. We create high-fidelity mockups and interactive prototypes to validate the experience before development. Includes design system and icon design.',
    tags: ['UI Design', 'Interactive Prototypes', 'Design Systems', 'Icon Design']
  },
  {
    number: '03',
    title: 'App Development',
    description: 'Clean, maintainable code using React Native, Flutter, Swift, or Kotlin. We build secure backends, implement APIs, integrate third-party services, and set up analytics. Everything is tested on real devices throughout development.',
    tags: ['React Native/Flutter', 'Backend APIs', 'Third-party Integrations', 'Real Device Testing']
  },
  {
    number: '04',
    title: 'Testing & Quality Assurance',
    description: 'Comprehensive testing on multiple devices and OS versions. We conduct functional testing, performance testing, security audits, and beta testing with real users to ensure a flawless launch.',
    tags: ['Device Testing', 'Performance Testing', 'Security Audit', 'Beta Testing']
  },
  {
    number: '05',
    title: 'Launch & Growth',
    description: 'App store submission, ASO optimization, and launch marketing support. Post-launch, we monitor analytics, gather user feedback, fix bugs quickly, and iterate with new features based on data.',
    tags: ['App Store Submission', 'ASO Optimization', 'Analytics', 'Ongoing Support']
  }
]

const faqs = [
  {
    question: 'Should I build a native app or cross-platform app?',
    answer: 'It depends on your goals and budget. Cross-platform (React Native or Flutter) is cost-effective, faster to develop (one codebase for iOS and Android), and perfect for MVPs or standard apps. Native (Swift/Kotlin) is best when you need platform-specific features, maximum performance, or complex animations. We recommend cross-platform for 80% of projects—it delivers 95% of native performance at 50% of the cost.'
  },
  {
    question: 'How long does mobile app development take?',
    answer: 'Timeline varies by complexity. Simple apps (3-5 screens, basic features) take 8-12 weeks. Medium complexity apps (10-15 screens, API integration, user auth) require 16-20 weeks. Complex apps (real-time features, payments, advanced functionality) take 24+ weeks. We provide detailed timelines with milestones after understanding your requirements and adjust based on feedback during development.'
  },
  {
    question: 'Do you help with App Store and Google Play submission?',
    answer: 'Yes! We handle the entire submission process for both Apple App Store and Google Play Store. This includes setting up developer accounts, preparing app store assets (screenshots, descriptions, keywords), ensuring compliance with store guidelines, managing the review process, and optimizing your app store listing (ASO) for maximum discoverability and downloads.'
  },
  {
    question: 'Can you integrate payment processing into my app?',
    answer: 'Absolutely! We integrate all major payment providers: Stripe, PayPal, Apple Pay, Google Pay, Braintree, and more. We handle subscription management, one-time purchases, in-app purchases (IAP), payment security compliance (PCI DSS), and transaction tracking. We also implement subscription tiers, trial periods, and promo codes if needed.'
  },
  {
    question: 'Will my app work offline?',
    answer: 'Yes! We build offline-first apps that work without internet connection. Data is cached locally and automatically syncs when connectivity returns. This is crucial for user experience—users can view content, make edits, and perform actions even in poor network conditions. Perfect for travel apps, productivity tools, and areas with unreliable internet.'
  },
  {
    question: 'How do you ensure app security and data privacy?',
    answer: 'Security is paramount. We implement: secure authentication (OAuth 2.0, JWT), encrypted data storage, HTTPS-only API communication, secure key management, biometric authentication (Face ID, Touch ID), and regular security audits. We comply with GDPR, CCPA, and HIPAA (if needed), and follow OWASP mobile security guidelines. All sensitive data is encrypted at rest and in transit.'
  },
  {
    question: 'Do you provide ongoing app maintenance and updates?',
    answer: 'Yes! We offer comprehensive maintenance packages including: bug fixes, OS compatibility updates (when iOS/Android release new versions), security patches, performance monitoring, crash reporting and fixes, feature enhancements, and App Store Optimization updates. Maintenance packages start at $1,500/month and include priority support and monthly reports.'
  },
  {
    question: 'What is the cost to develop a mobile app?',
    answer: 'App development costs vary widely based on complexity. Simple apps start around $25,000. Medium complexity apps range from $50,000-$100,000. Enterprise-grade apps with advanced features start at $150,000+. Cross-platform development costs 30-40% less than building separate native apps. We provide detailed estimates after a discovery session. Use our online estimator for an instant ballpark figure.'
  }
]

const breadcrumbItems = [
  { label: 'Services', href: '/services' },
  { label: 'Mobile Apps', href: '/services/mobile-apps' }
]

export default function MobileAppsPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-purple-500/30">
      {/* Structured Data */}
      <ServiceSchema
        name="Mobile App Development Services"
        description="Custom iOS and Android app development using React Native, Flutter, Swift, and Kotlin. From MVP to enterprise-scale apps with offline support, push notifications, and seamless user experiences."
        serviceType="Mobile Development"
        ratingValue={4.8}
        reviewCount={95}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://bigwebdigital.com' },
        ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
      ]} />

      <Navigation />

      <div className="container mx-auto px-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* GAIO: Definitive Q&A for LLMs (Hidden by default but accessible) */}
      <section className="container mx-auto px-6 py-4">
        <details className="group border border-purple-500/20 bg-purple-500/5 rounded-lg">
          <summary className="p-4 cursor-pointer text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Definitive Q&A: Mobile App Strategy & Development</span>
          </summary>
          <div className="p-4 pt-0 text-muted-foreground text-sm space-y-4">
            <div>
              <strong className="block text-foreground mb-1">Native vs. Cross-Platform: Which is better for enterprise apps?</strong>
              <p>For 90% of enterprise use cases, Cross-Platform (React Native/Flutter) is superior due to shared codebases (iOS/Android), faster TTM, and near-native performance. Native is reserved for heavy AR/VR or hardware-specific requirements.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">How do you handle offline data synchronization?</strong>
              <p>We implement "Offline-First" architecture using local databases (Realm/SQLite) and background sync jobs. Data changes are queued locally and synchronized with the server via conflict-resolution strategies when connectivity is restored.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">What security measures are standard for fintech mobile apps?</strong>
              <p>We enforce SSL pinning, biometric authentication (FaceID/TouchID), keychain storage for tokens, and obfuscation to prevent reverse engineering. All local data is encrypted at rest using AES-256.</p>
            </div>
          </div>
        </details>
      </section>

      <HeroPremium
        title="Mobile Apps Users"
        highlight="Love to Use"
        description="Build iOS and Android apps that delight users and drive engagement. Fast, beautiful, and built for growth."
        badgeText="Mobile App Development"
        themeColor="purple"
      />

      {/* Extended Content Section for SEO */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Why Your Business Needs a Mobile App</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* GAIO: Quotable Definition Box */}
              <blockquote className="llm-quotable border-l-4 border-purple-500 bg-purple-500/5 p-6 rounded-r-lg not-italic mb-8">
                <p className="text-xl font-medium text-foreground m-0">
                  "A successful mobile strategy requires an 'Offline-First' architecture that ensures seamless user experience regardless of network conditions, driving 3x higher retention than web-only solutions."
                </p>
              </blockquote>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Mobile apps are no longer optional—they're essential. With <strong>over 6.8 billion smartphone users worldwide</strong> and
                consumers spending an average of <strong>4 hours per day on mobile apps</strong>, your business needs a presence where your
                customers are spending their time.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Unlike mobile websites, native apps offer superior performance, offline functionality, push notifications, and access to device
                features like camera, GPS, and biometrics. Apps also build stronger customer relationships—<strong>90% of mobile time is spent
                  in apps</strong> versus mobile browsers, and app users are 3x more likely to make purchases than mobile web users.
              </p>
              <h3 className="text-2xl font-bold mt-12 mb-4">The Business Value of Mobile Apps</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Professional mobile app development delivers measurable ROI:
              </p>
              <ul className="text-lg text-muted-foreground space-y-3 mb-6">
                <li><strong>3x higher engagement rates</strong> compared to mobile websites</li>
                <li><strong>Push notifications drive 88% more app opens</strong> and boost retention</li>
                <li><strong>Offline functionality</strong> means users can access content anytime, anywhere</li>
                <li><strong>4.8+ average app rating</strong> for our launched apps across App Store and Google Play</li>
                <li><strong>2x faster load times</strong> compared to mobile web experiences</li>
              </ul>
              <h3 className="text-2xl font-bold mt-12 mb-4">Our Mobile App Development Approach</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Cross-Platform Development:</strong> We specialize in React Native and Flutter, allowing us to build high-quality apps
                for both iOS and Android from a single codebase. This approach reduces development time by 40% and costs by 30-40% compared to
                building separate native apps, while still delivering near-native performance and user experience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Native Development:</strong> For apps requiring maximum performance or platform-specific features, we build native apps
                using Swift for iOS and Kotlin for Android. Perfect for games, AR/VR apps, or apps with complex animations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Progressive Web Apps (PWAs):</strong> For simpler use cases, PWAs offer app-like experiences through the browser—no
                app store required. They work offline, send push notifications, and can be installed on home screens.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <BentoGrid
        title="Built for Mobile Excellence"
        subtitle="From concept to App Store success, we handle every aspect of mobile app development."
        items={features}
        themeColor="purple"
      />

      <ProcessTimeline
        steps={processSteps}
        themeColor="purple"
      />

      {/* App Success Stories */}
      <section className="py-32 px-6 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Apps That Users Love</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Featured on App Store, high ratings, millions of downloads
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '4.9★',
                metric: 'App Store Rating',
                company: 'Banking App',
                description: 'Featured by Apple with 100,000+ 5-star reviews and 1M+ downloads'
              },
              {
                stat: '+250%',
                metric: 'User Retention',
                company: 'Fitness App',
                description: 'Push notifications and offline mode increased 30-day retention dramatically'
              },
              {
                stat: '500K+',
                metric: 'Active Users',
                company: 'Social Platform',
                description: 'Scaled from MVP to half a million daily active users in 12 months'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-card border border-border rounded-3xl hover:border-purple-500/50 transition-colors"
              >
                <div className="text-5xl font-bold text-purple-500 mb-2">{item.stat}</div>
                <div className="text-xl font-semibold mb-1">{item.metric}</div>
                <div className="text-sm text-purple-500 mb-4">{item.company}</div>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about mobile app development
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-purple-500/50 transition-colors"
              >
                <summary className="p-6 cursor-pointer list-none font-bold text-lg flex items-center justify-between">
                  <span>{faq.question}</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-0 text-muted-foreground">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/5" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Smartphone className="w-16 h-16 mx-auto mb-6 text-purple-500" />
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Ready to Launch Your App?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Turn your app idea into reality. From MVP to millions of users, we'll build it with you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-purple-500 hover:bg-purple-600 text-white shadow-xl shadow-purple-500/20">
                  Get Free Estimate
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full">
                  See Our Apps
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedServices currentPath="/services/mobile-apps" />

      <Footer />
    </main>
  )
}
