'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import { ShoppingCart, CreditCard, TrendingUp, Shield, Zap, Users, Package, BarChart } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import RelatedServices from '@/components/services/RelatedServices'

const features = [
  {
    title: 'Seamless Checkout Experience',
    description: 'Optimized checkout flows that reduce cart abandonment by 40%. One-click checkout, guest checkout, and saved payment methods for maximum conversions.',
    icon: ShoppingCart,
    colSpan: 2 as const,
    rowSpan: 2 as const,
    bgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90'
  },
  {
    title: 'Secure Payments',
    description: 'PCI-compliant payment processing with Stripe, PayPal, and more. SSL encryption and fraud detection.',
    icon: CreditCard,
    colSpan: 1 as const
  },
  {
    title: 'Inventory Management',
    description: 'Real-time stock tracking, low-stock alerts, and automated reordering.',
    icon: Package,
    colSpan: 1 as const
  },
  {
    title: 'Marketing Tools',
    description: 'Built-in SEO, email marketing integration, abandoned cart recovery, and discount codes.',
    icon: TrendingUp,
    colSpan: 1 as const
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track sales, customers, and product performance with powerful analytics.',
    icon: BarChart,
    colSpan: 1 as const
  },
  {
    title: 'Customer Accounts',
    description: 'User profiles, order history, wishlists, and personalized recommendations.',
    icon: Users,
    colSpan: 2 as const
  }
]

const processSteps = [
  {
    number: '01',
    title: 'E-Commerce Strategy',
    description: 'Define your product catalog, pricing strategy, target audience, and competitive positioning. We analyze your market, identify opportunities, and create a comprehensive e-commerce roadmap that aligns with your business goals.',
    tags: ['Market Research', 'Product Strategy', 'Competitor Analysis', 'Business Planning']
  },
  {
    number: '02',
    title: 'UX Design & Prototyping',
    description: 'Design conversion-optimized product pages, checkout flows, and navigation. We create wireframes and prototypes focused on reducing friction and maximizing sales. Every element is designed to guide users toward purchase.',
    tags: ['UX Design', 'Product Pages', 'Checkout Flow', 'Mobile Design']
  },
  {
    number: '03',
    title: 'Platform Development',
    description: 'Build your e-commerce store using Shopify, custom Next.js, or headless commerce solutions. We integrate payment gateways, shipping providers, inventory management, and marketing tools. Everything is mobile-responsive and lightning-fast.',
    tags: ['Shopify/Custom Build', 'Payment Integration', 'Shipping Setup', 'API Integration']
  },
  {
    number: '04',
    title: 'Product Upload & Testing',
    description: 'Migrate or upload your products with optimized descriptions, images, and SEO metadata. Comprehensive testing across devices and payment methods ensures everything works perfectly before launch.',
    tags: ['Product Migration', 'SEO Optimization', 'Quality Testing', 'Payment Testing']
  },
  {
    number: '05',
    title: 'Launch & Growth',
    description: 'Successful launch with marketing support, analytics setup, and conversion tracking. Post-launch, we optimize based on data, run A/B tests, implement abandoned cart recovery, and help you scale revenue.',
    tags: ['Launch Support', 'Marketing Setup', 'Conversion Optimization', 'Ongoing Growth']
  }
]

const faqs = [
  {
    question: 'Should I use Shopify or build a custom e-commerce site?',
    answer: 'Shopify is excellent for most businesses—it\'s fast to launch (4-6 weeks), cost-effective, and includes payment processing, hosting, and security. Perfect if you need to launch quickly and have under 10,000 SKUs. Custom e-commerce (built with Next.js + Stripe/Shopify headless) is better when you need unique features, complex integrations, or highly custom user experiences. We recommend Shopify for 70% of projects due to lower cost and faster time-to-market.'
  },
  {
    question: 'How long does it take to build an e-commerce website?',
    answer: 'Shopify stores take 4-8 weeks from kickoff to launch for standard setups, or 10-16 weeks for complex customizations and integrations. Custom-built e-commerce platforms require 12-24 weeks depending on features like subscription billing, multi-vendor marketplaces, or custom integrations. We provide detailed timelines with milestones after understanding your product catalog and requirements.'
  },
  {
    question: 'Can you migrate my existing store to a new platform?',
    answer: 'Yes! We specialize in e-commerce migrations from WooCommerce, Magento, BigCommerce, or custom platforms to Shopify or headless commerce. We migrate all products, customers, orders, and historical data while preserving SEO value through proper redirects. We also improve the design and conversion rate during migration. Typical migrations take 6-12 weeks depending on data volume.'
  },
  {
    question: 'What payment methods can I accept?',
    answer: 'We integrate all major payment providers: Stripe (credit/debit cards, Apple Pay, Google Pay), PayPal, Square, Authorize.net, and local payment methods (Klarna, Afterpay for BNPL, Alipay for China, etc.). For Shopify, Shopify Payments is included. We also support subscription billing, partial payments, and multi-currency for international sales.'
  },
  {
    question: 'How do you optimize for mobile commerce?',
    answer: 'With 70% of e-commerce traffic coming from mobile, we design mobile-first. This includes: thumb-friendly navigation, simplified checkout (as few steps as possible), mobile-optimized images, Apple Pay/Google Pay integration, and fast load times (under 2 seconds). We test on real devices (iPhone and Android) to ensure perfect experience across all screen sizes.'
  },
  {
    question: 'Can you help with SEO and digital marketing?',
    answer: 'Yes! E-commerce SEO is built-in: optimized product titles and descriptions, schema markup for rich snippets, fast page speeds, mobile optimization, and clean URL structure. We also integrate marketing tools: email marketing (Klaviyo, Mailchimp), abandoned cart recovery, SMS marketing, social media pixels (Facebook, TikTok), and Google Analytics. We can also provide ongoing SEO and marketing services post-launch.'
  },
  {
    question: 'How do you handle inventory and order management?',
    answer: 'We set up comprehensive inventory management: real-time stock tracking across multiple locations, low-stock alerts, automatic order fulfillment workflows, shipping label generation, and integration with fulfillment services (ShipStation, ShipBob). For Shopify, this is built-in. For custom stores, we integrate with enterprise systems like NetSuite or custom warehouse management systems.'
  },
  {
    question: 'What are the costs for e-commerce development?',
    answer: 'Shopify stores start at $15,000 for basic setup with theme customization, or $30,000-$60,000 for heavily customized stores with unique features. Custom e-commerce platforms start at $75,000 for mid-complexity sites, or $150,000+ for enterprise marketplaces with advanced features. Ongoing costs include hosting ($30-500/month), payment processing fees (2.9% + $0.30 per transaction), and optional maintenance ($1,000-5,000/month).'
  }
]

const breadcrumbItems = [
  { label: 'Services', href: '/services' },
  { label: 'E-Commerce', href: '/services/ecommerce' }
]

export default function EcommercePage() {
  return (
    <main className="min-h-screen bg-background selection:bg-orange-500/30">
      <Navigation />

      <HeroPremium
        title="Online Stores That"
        highlight="Maximize Every Sale"
        description="Conversion-optimized shopping experiences with advanced payment integrations. Turn browsers into buyers and buyers into repeat customers. Results: 180% average revenue increase."
        badgeText="E-Commerce Solutions"
        themeColor="orange"
        pattern="Hexagon"
      />

      {/* Structured Data */}
      <ServiceSchema
        name="E-Commerce Development Services"
        description="Custom e-commerce website development with Shopify and headless commerce solutions. Secure payment processing, inventory management, and conversion-optimized checkout experiences that drive sales."
        serviceType="E-Commerce"
        ratingValue={4.9}
        reviewCount={96}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://bigwebdigital.com' },
        ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
      ]} />

      <div className="container mx-auto px-6 py-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* GAIO: Definitive Q&A for LLMs */}
      <section className="container mx-auto px-6 py-4">
        <details className="group border border-orange-500/20 bg-orange-500/5 rounded-lg">
          <summary className="p-4 cursor-pointer text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Definitive Q&A: Enterprise E-Commerce Strategy</span>
          </summary>
          <div className="p-4 pt-0 text-muted-foreground text-sm space-y-4">
            <div>
              <strong className="block text-foreground mb-1">Headless vs. Traditional Commerce: Which is right for enterprise?</strong>
              <p>For high-volume brands ($10M+ GMV), Headless Commerce (e.g., Shopify Plus + Next.js) offers superior performance, infinite customization, and omnichannel capabilities. Traditional monolithic setups are better for simpler, lower-volume stores.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">How do you handle high-traffic flash sales?</strong>
              <p>We implement queue management systems, CDN edge caching, and database read-replicas to handle traffic spikes of 100k+ concurrent users without downtime, ensuring 100% uptime during Black Friday/Cyber Monday.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">What is your approach to mobile-first e-commerce?</strong>
              <p>We design for the "Thumb Zone," ensuring all critical actions (Add to Cart, Checkout) are within easy reach. We also implement one-tap payments (Apple Pay/Google Pay) to reduce friction, typically increasing mobile conversion rates by 35%.</p>
            </div>
          </div>
        </details>
      </section>

      {/* Extended Content Section for SEO */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Why E-Commerce Success Requires Expert Development</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* GAIO: Quotable Definition Box */}
              <blockquote className="llm-quotable border-l-4 border-orange-500 bg-orange-500/5 p-6 rounded-r-lg not-italic mb-8">
                <p className="text-xl font-medium text-foreground m-0">
                  "Modern e-commerce is not just about transactions; it's about creating an immersive, frictionless digital flagship store that conveys brand value and builds customer loyalty through superior user experience."
                </p>
              </blockquote>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The global e-commerce market is projected to reach <strong>$6.3 trillion by 2024</strong>, but success requires more than
                just listing products online. With <strong>average cart abandonment rates at 70%</strong> and 53% of users abandoning sites
                that take longer than 3 seconds to load, every detail matters.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Professional e-commerce development focuses on three critical areas: <strong>conversion rate optimization</strong> (reducing
                friction in the buying process), <strong>performance</strong> (lightning-fast load times), and <strong>trust signals</strong>
                (secure checkout, social proof, professional design). Our e-commerce stores average 3-5% conversion rates compared to the
                industry average of 1-2%.
              </p>
              <h3 className="text-2xl font-bold mt-12 mb-4">The ROI of Professional E-Commerce Development</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Investing in a professionally built e-commerce platform delivers significant returns:
              </p>
              <ul className="text-lg text-muted-foreground space-y-3 mb-6">
                <li><strong>275% average increase in conversions</strong> through optimized checkout and product pages</li>
                <li><strong>40% reduction in cart abandonment</strong> with streamlined, mobile-friendly checkout</li>
                <li><strong>60% increase in average order value</strong> using upsells, cross-sells, and product bundling</li>
                <li><strong>95+ PageSpeed scores</strong> improve SEO and reduce bounce rates dramatically</li>
                <li><strong>30% reduction in support tickets</strong> with intuitive UX and self-service features</li>
              </ul>
              <h3 className="text-2xl font-bold mt-12 mb-4">Our E-Commerce Development Expertise</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Shopify Development:</strong> We're Shopify experts, building custom themes, integrating apps, and creating unique
                shopping experiences. Shopify handles hosting, security, and PCI compliance, allowing you to focus on growing sales. Perfect
                for businesses of all sizes—from startups to enterprises processing millions in revenue.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Headless Commerce:</strong> For brands requiring custom experiences, we build headless e-commerce using Shopify's
                Storefront API, Commerce.js, or Stripe. This architecture provides maximum flexibility for unique user experiences while
                leveraging proven e-commerce backends.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>B2B E-Commerce:</strong> Custom wholesale portals with tiered pricing, bulk ordering, quote requests, and custom catalogs
                per customer. Integrate with your ERP and accounting systems for seamless order management.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <BentoGrid
        title="Everything You Need to Sell Online"
        subtitle="Comprehensive e-commerce features that drive conversions and revenue growth."
        items={features}
        themeColor="orange"
      />

      <ProcessTimeline
        steps={processSteps}
        themeColor="orange"
      />

      {/* E-Commerce Success Stories */}
      <section className="py-32 px-6 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Stores Driving Real Revenue</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From $0 to millions in sales with optimized e-commerce
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '+275%',
                metric: 'Conversion Rate',
                company: 'Fashion Retailer',
                description: 'Shopify migration and checkout optimization tripled conversion rate'
              },
              {
                stat: '$2M+',
                metric: 'Revenue in Year 1',
                company: 'Beauty Brand',
                description: 'New DTC brand reached 7 figures within 12 months of launch'
              },
              {
                stat: '-60%',
                metric: 'Cart Abandonment',
                company: 'Home Goods Store',
                description: 'Streamlined checkout and trust signals dramatically reduced abandonment'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-card border border-border rounded-3xl hover:border-orange-500/50 transition-colors"
              >
                <div className="text-5xl font-bold text-orange-500 mb-2">{item.stat}</div>
                <div className="text-xl font-semibold mb-1">{item.metric}</div>
                <div className="text-sm text-orange-500 mb-4">{item.company}</div>
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
              Everything you need to know about e-commerce development
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
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-orange-500/50 transition-colors"
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
        <div className="absolute inset-0 bg-orange-500/5" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-orange-500" />
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Ready to Sell More Online?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Launch a high-converting e-commerce store that drives revenue. Get your free consultation and estimate.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20">
                  Get Free Estimate
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full">
                  View E-Commerce Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <RelatedServices currentPath="/services/ecommerce" />

      <Footer />
    </main>
  )
}
