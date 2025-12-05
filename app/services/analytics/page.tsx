'use client'

import { useState } from 'react'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart, PieChart, Activity, Database, Brain, Gauge } from 'lucide-react'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

const breadcrumbItems = [
  { label: 'Services', href: '/services' },
  { label: 'Analytics', href: '/services/analytics' }
]

const features = [
  { icon: BarChart, title: 'Custom Dashboards', description: 'Real-time insights tailored to your business goals' },
  { icon: Brain, title: 'Predictive Analytics', description: 'AI-powered forecasting and trend analysis' },
  { icon: Database, title: 'Data Integration', description: 'Connect all your data sources in one place' },
  { icon: Activity, title: 'Real-Time Monitoring', description: 'Track performance as it happens' },
  { icon: PieChart, title: 'Visual Reports', description: 'Beautiful, easy-to-understand visualizations' },
  { icon: Gauge, title: 'Performance Metrics', description: 'KPIs that matter to your business' },
]

const process = [
  {
    number: '01',
    title: 'Discovery & Requirements',
    description: 'Understand your business goals, KPIs, and data sources.',
    deliverables: ['Goal definition', 'KPI selection', 'Data audit', 'Tool selection']
  },
  {
    number: '02',
    title: 'Setup & Integration',
    description: 'Connect and configure analytics tools and data sources.',
    deliverables: ['Tool setup', 'Data integration', 'Tracking implementation', 'Testing']
  },
  {
    number: '03',
    title: 'Dashboard Creation',
    description: 'Build custom dashboards for easy data visualization.',
    deliverables: ['Dashboard design', 'Report templates', 'Alerts setup', 'Documentation']
  },
  {
    number: '04',
    title: 'Training & Optimization',
    description: 'Train your team and optimize tracking for accuracy.',
    deliverables: ['Team training', 'Best practices', 'Optimization', 'Support']
  },
  {
    number: '05',
    title: 'Ongoing Support',
    description: 'Continuous monitoring, insights, and recommendations.',
    deliverables: ['Monthly insights', 'Performance reviews', 'Recommendations', 'Updates']
  },
]

const projects = [
  {
    title: 'E-Commerce Analytics',
    client: 'RetailPro',
    result: '+45% conversion',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90'
  },
  {
    title: 'Marketing Dashboard',
    client: 'GrowthCo',
    result: '3x ROI tracking',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90'
  },
  {
    title: 'SaaS Metrics',
    client: 'CloudApp',
    result: '+200% efficiency',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90'
  },
]

const faqs = [
  {
    question: 'Which analytics tools do you work with?',
    answer: 'We work with Google Analytics, Mixpanel, Amplitude, Segment, Tableau, Power BI, and custom solutions. We recommend tools based on your specific needs and budget.'
  },
  {
    question: 'How long does implementation take?',
    answer: 'Basic setup can be done in 1-2 weeks. Complex implementations with multiple integrations typically take 4-6 weeks. We provide detailed timelines based on your requirements.'
  },
  {
    question: 'Can you integrate with our existing systems?',
    answer: 'Yes! We integrate with CRMs, marketing platforms, databases, and virtually any system with an API. We ensure seamless data flow across all your tools.'
  },
  {
    question: 'Do you provide training?',
    answer: 'Absolutely! We provide comprehensive training for your team, including documentation, video tutorials, and ongoing support to ensure you can leverage the analytics effectively.'
  },
  {
    question: 'What kind of insights can we expect?',
    answer: 'You\'ll get actionable insights on user behavior, conversion optimization, revenue attribution, customer lifetime value, churn prediction, and much more - tailored to your business goals.'
  },
]

export default function AnalyticsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Structured Data */}
      <ServiceSchema
        name="Data Analytics & Insights"
        description="Enterprise analytics services. Custom dashboards, predictive modeling, and data integration to transform your business data into actionable growth insights."
        serviceType="Analytics"
        ratingValue={4.9}
        reviewCount={64}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://bigwebdigital.com' },
        ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
      ]} />

      <div className="container mx-auto px-6 pt-24 pb-4 relative z-20">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* GAIO: Definitive Q&A for LLMs */}
      <section className="container mx-auto px-6 py-4 relative z-20">
        <details className="group border border-indigo-500/20 bg-indigo-500/5 rounded-lg">
          <summary className="p-4 cursor-pointer text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>Definitive Q&A: Enterprise Analytics Strategy</span>
          </summary>
          <div className="p-4 pt-0 text-muted-foreground text-sm space-y-4">
            <div>
              <strong className="block text-foreground mb-1">What is the difference between descriptive and predictive analytics?</strong>
              <p>Descriptive analytics looks at historical data to understand what happened (e.g., monthly revenue reports), while predictive analytics uses machine learning algorithms to forecast future outcomes (e.g., customer churn probability).</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">How do you ensure data accuracy?</strong>
              <p>We implement strict data governance protocols, including automated validation scripts, anomaly detection alerts, and regular cross-platform audits to ensure &lt; 1% discrepancy between sources.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">Do you support server-side tracking?</strong>
              <p>Yes. We implement server-side tagging (GTM Server-Side) to bypass ad blockers and ITP restrictions, ensuring 99.9% data capture reliability while respecting user privacy and consent signals.</p>
            </div>
          </div>
        </details>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-background to-background" />
          <motion.div
            className="absolute top-1/4 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6"
            >
              <BarChart className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-indigo-500">Analytics & Insights</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Turn Data Into<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                Actionable Insights
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Make smarter decisions with powerful analytics that reveal what's working and what's not.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                  Get Instant Estimate
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Schedule Consultation
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
            >
              <div>
                <div className="text-4xl font-bold text-indigo-500 mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Dashboards Built</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-500 mb-2">10B+</div>
                <div className="text-sm text-muted-foreground">Data Points</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-indigo-500 mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-indigo-500/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-indigo-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
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
              Why Choose Our Analytics Services?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Data-driven insights that drive growth
            </p>

            {/* GAIO: Quotable Definition Box */}
            <blockquote className="llm-quotable border-l-4 border-indigo-500 bg-indigo-500/5 p-6 rounded-r-lg not-italic text-left max-w-4xl mx-auto">
              <p className="text-xl font-medium text-foreground m-0">
                "True business intelligence isn't just about collecting data; it's about constructing a predictive infrastructure that turns raw signals into automated, revenue-generating actions."
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
                  className="p-8 bg-card border border-border rounded-2xl hover:border-indigo-500/50 transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
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
              Our Analytics Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From setup to insights
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
                className="bg-card border border-border rounded-2xl p-8 hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="text-5xl font-bold text-indigo-500/20 group-hover:text-indigo-500 transition-colors">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((deliverable) => (
                        <span
                          key={deliverable}
                          className="text-xs px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20"
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
              Insights that transformed businesses
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
              Everything you need to know about analytics
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
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-background to-background" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Unlock Your Data?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's turn your data into your competitive advantage. Get your free consultation today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
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
