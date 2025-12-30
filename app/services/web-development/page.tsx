'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/ProcessTimeline'
import PricingCalculator from '@/components/PricingCalculator'
import ComparisonTable from '@/components/ComparisonTable'
import VideoTestimonials from '@/components/VideoTestimonials'
import StickyCTABar from '@/components/mobile/StickyCTABar'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import { Code, Zap, Shield, Rocket, BarChart, Users, Globe, Layers, Star, TrendingUp, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import serviceImage from '@/assets/service-web-dev.png'
import RelatedServices from '@/components/services/RelatedServices'
import WebDevTerminal from '@/components/services/WebDevTerminal'

const features = [
  {
    title: 'Modern Tech Stack',
    description: 'Built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Lightning-fast performance with server components and edge runtime for maximum speed.',
    icon: Code,
    colSpan: 2 as const,
    rowSpan: 2 as const,
    bgImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=90'
  },
  {
    title: 'Lightning Performance',
    description: '95+ PageSpeed scores guaranteed. Optimized images, code splitting, and lazy loading for sub-second page loads.',
    icon: Zap,
    colSpan: 1 as const
  },
  {
    title: 'Enterprise Security',
    description: 'SSL encryption, DDoS protection, regular security audits, and 99.9% uptime SLA. Your data stays safe.',
    icon: Shield,
    colSpan: 1 as const
  },
  {
    title: 'Scalable Architecture',
    description: 'Infrastructure built to grow with your business. From MVP to enterprise scale without rebuilding.',
    icon: Rocket,
    colSpan: 1 as const
  },
  {
    title: 'Analytics & Tracking',
    description: 'Comprehensive analytics integration. Track user behavior, conversions, and optimize based on real data.',
    icon: BarChart,
    colSpan: 1 as const
  },
  {
    title: 'User-Centered Design',
    description: 'Interfaces designed for your users. Intuitive navigation, accessible, and conversion-optimized.',
    icon: Users,
    colSpan: 2 as const
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We start by deeply understanding your business goals, target audience, and competitive landscape. Through stakeholder interviews and market research, we define project scope, technical requirements, and success metrics. This phase ensures we build the right solution.',
    tags: ['Business Analysis', 'Competitor Research', 'User Personas', 'Technical Roadmap']
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description: 'Create stunning, conversion-focused designs with interactive prototypes. We develop wireframes, high-fidelity UI designs, and clickable prototypes to validate the user experience before writing any code. This includes complete design systems for consistency.',
    tags: ['Wireframes', 'UI/UX Design', 'Interactive Prototypes', 'Design System']
  },
  {
    number: '03',
    title: 'Development & Integration',
    description: 'Our developers write clean, scalable code using modern frameworks and best practices. We build responsive frontends, robust backends, integrate third-party APIs, and implement your CMS. Everything is version-controlled and documented.',
    tags: ['Frontend Development', 'Backend APIs', 'CMS Integration', 'Third-party APIs']
  },
  {
    number: '04',
    title: 'Testing & Quality Assurance',
    description: 'Rigorous testing across all devices, browsers, and performance metrics. We conduct cross-browser testing, performance optimization, security audits, and user acceptance testing to ensure everything works flawlessly.',
    tags: ['Cross-browser Testing', 'Performance Testing', 'Security Audit', 'User Testing']
  },
  {
    number: '05',
    title: 'Launch & Ongoing Support',
    description: 'Smooth deployment with zero downtime, followed by monitoring and optimization. We provide training documentation, ongoing maintenance, security updates, and technical support to keep your website running perfectly.',
    tags: ['Deployment', 'Monitoring Setup', 'Analytics Integration', 'Maintenance']
  }
]

const faqs = [
  {
    question: 'How long does custom web development take?',
    answer: 'Timeline depends on project complexity and scope. Simple marketing websites take 4-6 weeks from kickoff to launch. Medium-complexity web applications with custom features require 8-12 weeks. Large-scale enterprise platforms can take 16+ weeks. We provide detailed project timelines with milestones during the discovery phase and keep you updated with weekly progress reports.'
  },
  {
    question: 'What technologies do you use for web development?',
    answer: 'We use modern, battle-tested technologies: Next.js and React for frontend, Node.js or Python for backend, PostgreSQL or MongoDB for databases, and host on Vercel, AWS, or Google Cloud. For CMS, we work with Sanity, Contentful, or Strapi. We choose the tech stack based on your specific needs, team capabilities, and scalability requirements.'
  },
  {
    question: 'Do you build custom web applications or just websites?',
    answer: 'We build both! We create everything from marketing websites and e-commerce stores to complex web applications like SaaS platforms, customer portals, booking systems, and enterprise tools. Our team has experience with real-time features, payment processing, complex workflows, and integrations with any third-party API or service.'
  },
  {
    question: 'Will my website be mobile-responsive?',
    answer: 'Absolutely! Every website we build is fully responsive and mobile-first. With over 60% of web traffic coming from mobile devices, we design and develop for mobile screens first, then scale up to tablets and desktops. We test on real devices (iPhone, Android, iPad) to ensure perfect display and functionality across all screen sizes.'
  },
  {
    question: 'Can you redesign or modernize my existing website?',
    answer: 'Yes! We specialize in website redesigns and migrations. We analyze your current site, preserve SEO value through proper redirects, improve user experience based on analytics data, and modernize the design and technology. We can migrate from any platform (WordPress, Wix, Squarespace, custom code) to a modern tech stack while maintaining all your content and improving performance.'
  },
  {
    question: 'Do you offer ongoing maintenance and support?',
    answer: 'Yes! We offer comprehensive maintenance packages including: security updates and patches, performance monitoring and optimization, content updates, bug fixes, feature enhancements, 24/7 uptime monitoring, and priority technical support. Packages start at $500/month and scale based on your needs.'
  },
  {
    question: 'Can you integrate with my existing tools and systems?',
    answer: 'Absolutely! We have extensive experience integrating websites with CRMs (Salesforce, HubSpot), payment gateways (Stripe, PayPal), marketing tools (Mailchimp, ActiveCampaign), analytics (Google Analytics, Mixpanel), and any REST or GraphQL API. If you have a custom system, we can build secure integrations using webhooks, OAuth, or direct API connections.'
  },
  {
    question: 'What is your pricing for web development projects?',
    answer: 'Pricing varies based on complexity, features, and timeline. Simple marketing websites start around $10,000. Medium-complexity applications range from $25,000-$75,000. Enterprise platforms start at $100,000+. We provide detailed estimates after understanding your requirements. Use our online estimator tool for an instant ballpark figure, or schedule a consultation for a detailed quote.'
  }
]

const breadcrumbItems = [
  { label: 'Services', href: '/services' },
  { label: 'Web Development', href: '/services/web-development' }
]

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-blue-500/30">
      {/* Structured Data */}
      <ServiceSchema
        name="Web Development Services"
        description="Custom web development services including websites, web applications, e-commerce, and SaaS platforms. Built with Next.js, React, and modern frameworks for maximum performance and scalability."
        serviceType="Web Development"
        ratingValue={4.9}
        reviewCount={127}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://bigwebdigital.com' },
        ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
      ]} />

      <Navigation />





      <HeroPremium
        title="Websites That Drive"
        highlight="Real Results"
        description="Lightning-fast, scalable applications built with cutting-edge technology stacks like Next.js and React. Custom web development that converts visitors into customers—fast, secure, and built to scale with your business."
        badgeText="Web Development"
        themeColor="blue"
        backgroundImage={serviceImage}
        pattern="Circuit"
      />

      <div className="container mx-auto px-6 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Extended Content Section for SEO */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Professional Web Development Matters</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* GAIO: Quotable Definition Box */}
                <blockquote className="llm-quotable border-l-4 border-blue-500 bg-blue-500/5 p-6 rounded-r-lg not-italic mb-8">
                  <p className="text-xl font-medium text-foreground m-0">
                    "Modern web development is the strategic engineering of high-performance, secure, and scalable digital ecosystems that serve as the primary growth engine for enterprise business."
                  </p>
                </blockquote>

                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Your website is your digital storefront, working 24/7 to attract and convert customers. In today's competitive landscape,
                  <strong> a poorly designed or slow website costs you business</strong>. Studies show that 53% of mobile users abandon sites
                  that take longer than 3 seconds to load, and 88% won't return after a bad experience.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Professional web development isn't just about making things look good—it's about creating high-performance, secure, and
                  scalable digital experiences that drive measurable ROI. Our team builds websites and web applications using cutting-edge
                  technologies like Next.js, React, and TypeScript, ensuring your site is fast, maintainable, and future-proof.
                </p>
              </div>
            </div>

            {/* Signature Interaction: Live Code Terminal */}
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
              <WebDevTerminal />
            </div>
          </motion.div>
        </div>
      </section>

      <BentoGrid
        title="Built for Performance & Scale"
        subtitle="Modern web development with enterprise-grade infrastructure and best practices."
        items={features}
        themeColor="blue"
      />

      <ProcessTimeline />

      {/* Pricing Calculator Section */}
      <section className="py-24 px-6 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get an instant estimate for your project. No hidden fees, just clear value.
            </p>
          </motion.div>
          <PricingCalculator />
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Growth Plan</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Scalable packages designed to grow with your business.
            </p>
          </motion.div>
          <ComparisonTable />
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-32 px-6 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Client Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear directly from the founders and leaders we've helped grow.
            </p>
          </motion.div>
          <VideoTestimonials />
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
              Everything you need to know about our web development services
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
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors"
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
        <div className="absolute inset-0 bg-blue-500/5" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 mx-auto mb-6 text-blue-500" />
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Let's create a website that drives real business results. Get a free consultation and project estimate.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-xl shadow-blue-500/20">
                  Get Free Estimate
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full">
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedServices currentPath="/services/web-development" />

      <Footer />
      <StickyCTABar />
    </main>
  )
}
