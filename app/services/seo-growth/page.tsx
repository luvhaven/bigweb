'use client'

import { useState } from 'react'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search, TrendingUp, Target, Globe, Megaphone, LineChart } from 'lucide-react'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import HeroPremium from '@/components/services/HeroPremium'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

const breadcrumbItems = [
  { label: 'Services', href: '/services' },
  { label: 'SEO Growth', href: '/services/seo-growth' }
]

const features = [
  { icon: Search, title: 'SEO Optimization', description: 'Rank higher on Google and drive organic traffic' },
  { icon: Target, title: 'PPC Advertising', description: 'Targeted campaigns with maximum ROI' },
  { icon: Megaphone, title: 'Content Marketing', description: 'Engaging content that converts' },
  { icon: TrendingUp, title: 'Growth Strategy', description: 'Data-driven plans for sustainable growth' },
  { icon: Globe, title: 'Social Media', description: 'Build engaged communities across platforms' },
  { icon: LineChart, title: 'Analytics & Reporting', description: 'Track performance and optimize campaigns' },
]

const process = [
  {
    number: '01',
    title: 'Audit & Analysis',
    description: 'Comprehensive analysis of your current online presence and competitors.',
    deliverables: ['SEO audit', 'Competitor analysis', 'Market research', 'Goal setting']
  },
  {
    number: '02',
    title: 'Strategy Development',
    description: 'Create a customized marketing strategy based on your goals and budget.',
    deliverables: ['SEO strategy', 'Content plan', 'Campaign strategy', 'Timeline & budget']
  },
  {
    number: '03',
    title: 'Implementation',
    description: 'Execute campaigns across all channels with precision and expertise.',
    deliverables: ['On-page SEO', 'Content creation', 'Ad campaigns', 'Social media']
  },
  {
    number: '04',
    title: 'Optimization',
    description: 'Continuously test and optimize for better results.',
    deliverables: ['A/B testing', 'Performance tracking', 'Conversion optimization', 'Adjustments']
  },
  {
    number: '05',
    title: 'Reporting & Growth',
    description: 'Regular reports and strategic adjustments for continued growth.',
    deliverables: ['Monthly reports', 'Performance analysis', 'Strategy refinement', 'Growth planning']
  },
]

const projects = [
  {
    title: 'SaaS Company',
    client: 'CloudSync',
    result: '+420% organic traffic',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90'
  },
  {
    title: 'E-Commerce Store',
    client: 'FashionHub',
    result: '5x ROAS',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90'
  },
  {
    title: 'Local Business',
    client: 'UrbanDental',
    result: '+300% leads',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=90'
  },
]

const faqs = [
  {
    question: 'How long does it take to see SEO results?',
    answer: 'SEO is a long-term strategy. You can expect to see initial improvements in 3-4 months, with significant results typically appearing in 6-12 months. However, PPC campaigns can drive immediate traffic.'
  },
  {
    question: 'What is your approach to content marketing?',
    answer: 'We create high-quality, SEO-optimized content that provides value to your audience. This includes blog posts, guides, videos, and infographics designed to attract, engage, and convert your target market.'
  },
  {
    question: 'Do you manage social media accounts?',
    answer: 'Yes! We offer comprehensive social media management including content creation, posting, community engagement, and paid advertising across all major platforms.'
  },
  {
    question: 'How do you measure marketing success?',
    answer: 'We track key metrics like organic traffic, rankings, conversion rates, ROI, engagement, and leads. You receive detailed monthly reports showing exactly how campaigns are performing.'
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing based on your needs - monthly retainers, project-based pricing, or performance-based models. Use our estimator to get a custom quote.'
  },
]

export default function SEOMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <HeroPremium
        title="Get Found. Get"
        highlight="Customers. Grow."
        description="Dominate search rankings and drive qualified organic traffic at scale. We help businesses dominate search results and scale revenue with data-driven marketing strategies."
        badgeText="SEO & Growth"
        themeColor="yellow"
        pattern="Stripes"
      />

      {/* Structured Data */}
      <ServiceSchema
        name="SEO Growth & Digital Marketing"
        description="Data-driven SEO growth strategies and digital marketing services. We help businesses dominate search results and scale revenue with proven marketing strategies."
        serviceType="SEO Growth"
        ratingValue={4.9}
        reviewCount={85}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://bigwebdigital.com' },
        ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
      ]} />

      <div className="container mx-auto px-6 pt-24 pb-4 relative z-20">
        <Breadcrumbs items={breadcrumbItems} />
      </div>





      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Our Marketing Services?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Results-driven strategies that grow your business
            </p>

            {/* GAIO: Quotable Definition Box */}
            <blockquote className="llm-quotable border-l-4 border-yellow-500 bg-yellow-500/5 p-6 rounded-r-lg not-italic text-left max-w-4xl mx-auto">
              <p className="text-xl font-medium text-foreground m-0">
                "Sustainable growth isn't about hacking algorithms; it's about engineering a predictable revenue engine where every marketing dollar invested yields a measurable multiple in return."
              </p>
            </blockquote>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-8 bg-card border border-border rounded-2xl hover:border-yellow-500/50 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Marketing Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Systematic approach to digital growth
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {process.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-yellow-500/50 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-bold text-yellow-500/20 group-hover:text-yellow-500 transition-colors">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((deliverable) => (
                        <span
                          key={deliverable}
                          className="text-xs px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20"
                        >
                          {deliverable}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real growth from real campaigns
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <div className="text-2xl font-bold mb-1">{project.result}</div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-muted-foreground">{project.client}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                View All Case Studies
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about SEO & marketing
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-accent/5 transition-colors"
                >
                  <span className="font-bold text-lg pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-background to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Dominate Your Market?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create a marketing strategy that drives real growth. Get your free consultation today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                  Get Instant Estimate
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
