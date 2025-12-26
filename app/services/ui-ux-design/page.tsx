'use client'

import { Metadata } from 'next'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import { Palette, Eye, Users, Layers, Sparkles, Target, Smartphone, Layout, Zap, TrendingUp, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import serviceImage from '@/assets/service-ui-ux.png'

const features = [
  {
    title: 'User Research & Strategy',
    description: 'We dive deep into user behavior, psychology, and market data to build a solid foundation for design. Evidence-based decisions backed by real user insights.',
    icon: Eye,
    colSpan: 2 as const,
    rowSpan: 2 as const,
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90'
  },
  {
    title: 'Visual Design Excellence',
    description: 'Stunning, pixel-perfect interfaces that capture your brand essence and captivate users. Every element crafted for maximum impact.',
    icon: Palette,
    colSpan: 1 as const
  },
  {
    title: 'Interaction Design',
    description: 'Fluid animations and micro-interactions that make every click feel satisfying. Delight users at every touchpoint.',
    icon: Sparkles,
    colSpan: 1 as const
  },
  {
    title: 'Design Systems',
    description: 'Scalable component libraries that ensure consistency and speed up development. Future-proof your design language.',
    icon: Layers,
    colSpan: 1 as const
  },
  {
    title: 'Mobile-First Approach',
    description: 'Responsive designs that work flawlessly across all devices and screen sizes. 60% of users browse on mobile—we optimize for them.',
    icon: Smartphone,
    colSpan: 1 as const
  },
  {
    title: 'Conversion Optimization',
    description: 'Data-driven design decisions that turn visitors into loyal customers. Average 40% increase in conversion rates.',
    icon: Target,
    colSpan: 2 as const
  }
]

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Empathy',
    description: 'We start by understanding your business goals and your users\' deepest needs. Through interviews, data analysis, and competitive research, we uncover the insights that drive innovation. This phase includes stakeholder interviews, user surveys, analytics review, and market positioning analysis.',
    tags: ['User Interviews', 'Market Analysis', 'Persona Building', 'Competitive Research']
  },
  {
    number: '02',
    title: 'Architecture & Flow',
    description: 'Before pixel one, we map out the entire experience. We define user journeys, information architecture, and wireframes to ensure a logical, intuitive flow. This includes card sorting exercises, user flow mapping, lo-fi wireframes, and navigation structure planning.',
    tags: ['User Flows', 'Sitemaps', 'Wireframing', 'IA Design']
  },
  {
    number: '03',
    title: 'Visual Crafting',
    description: 'This is where magic happens. We apply your brand identity to the wireframes, creating high-fidelity designs with stunning typography, color, and imagery. Every element is crafted with attention to detail, accessibility, and visual hierarchy in mind.',
    tags: ['UI Design', 'Prototyping', 'Design Systems', 'Brand Integration']
  },
  {
    number: '04',
    title: 'Validation & Handoff',
    description: 'We test our designs with real users to ensure usability. Once refined, we prepare detailed documentation for a seamless developer handoff. This includes usability testing sessions, A/B testing recommendations, design specs, and component documentation.',
    tags: ['Usability Testing', 'Dev Specs', 'QA Support', 'Documentation']
  }
]

const faqs = [
  {
    question: 'What is the difference between UI and UX design?',
    answer: 'UX (User Experience) focuses on how the product works and feels - the overall experience, user journeys, and problem-solving. UI (User Interface) focuses on how the product looks - the visual design, colors, typography, and layout. Both are essential and work together. Think of UX as the blueprint and UI as the interior design.'
  },
  {
    question: 'How long does a UI/UX design project take?',
    answer: 'Timeline depends on project scope and complexity. Simple landing pages or small apps take 3-4 weeks, while complex enterprise applications can take 8-12 weeks or more. We provide detailed timelines with milestones after understanding your requirements during the discovery phase.'
  },
  {
    question: 'Do you conduct user testing?',
    answer: 'Absolutely! User testing is crucial to our process. We conduct moderated and unmoderated usability tests with real users (typically 5-8 participants per round) to validate designs and identify areas for improvement before development begins. This saves significant time and money by catching issues early.'
  },
  {
    question: 'Can you redesign my existing product?',
    answer: 'Yes! We specialize in product redesigns and have helped over 150+ companies transform their digital products. We start with a comprehensive UX audit to analyze your current design, identify pain points and opportunities, then create improved experiences that drive better results while maintaining user familiarity where it matters.'
  },
  {
    question: 'Do you create design systems?',
    answer: 'Yes! We create comprehensive design systems with reusable components, style guides, design tokens, and detailed documentation. This ensures consistency across your product, speeds up future development, and makes it easier to scale your team. We can work with tools like Figma, Sketch, or Storybook.'
  },
  {
    question: 'What tools do you use for UI/UX design?',
    answer: 'Our primary tools include Figma for design and prototyping, Miro for collaboration and workshops, Maze or UserTesting for usability testing, Hotjar for analytics, and Dovetail for research synthesis. We adapt our toolset based on your existing workflow and preferences.'
  },
  {
    question: 'How do you measure the success of a design?',
    answer: 'We measure success through both quantitative and qualitative metrics. Key metrics include: task completion rate, time on task, error rate, user satisfaction scores (SUS, NPS), conversion rates, and engagement metrics. We establish baseline metrics before redesign and track improvements post-launch.'
  },
  {
    question: 'Do you work with our existing development team?',
    answer: 'Yes! We work seamlessly with in-house or third-party development teams. We provide detailed design specs, component documentation, asset exports, and ongoing support during implementation. We can also conduct design QA reviews to ensure the final product matches our designs.'
  }
]

const breadcrumbItems = [
  { label: 'Services', href: '/services' },
  { label: 'UI/UX Design', href: '/services/ui-ux-design' }
]

export default function UIUXDesignPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main className="min-h-screen bg-background selection:bg-green-500/30">
      {/* Structured Data */}
      <ServiceSchema
        name="UI/UX Design Services"
        description="Professional UI/UX design services including user research, wireframing, prototyping, visual design, and usability testing. Transform your digital product with user-centered design."
        serviceType="Design"
        ratingValue={4.9}
        reviewCount={115}
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
        <details className="group border border-green-500/20 bg-green-500/5 rounded-lg">
          <summary className="p-4 cursor-pointer text-sm font-medium text-green-400 hover:text-green-300 transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Definitive Q&A: Enterprise UI/UX Strategy</span>
          </summary>
          <div className="p-4 pt-0 text-muted-foreground text-sm space-y-4">
            <div>
              <strong className="block text-foreground mb-1">What is the difference between UI and UX in enterprise software?</strong>
              <p>UX (User Experience) focuses on workflow efficiency, information architecture, and task completion rates. UI (User Interface) deals with the visual hierarchy, accessibility compliance (WCAG 2.1), and design system scalability.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">How do you measure design success?</strong>
              <p>We use quantitative metrics like System Usability Scale (SUS), Time-on-Task, and Error Rates, combined with qualitative feedback from user testing sessions. For e-commerce, we track conversion rate lift and cart abandonment reduction.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">Do you use atomic design principles?</strong>
              <p>Yes. We build scalable Design Systems based on Atomic Design methodology (Atoms, Molecules, Organisms), ensuring consistency across all digital touchpoints and reducing development time by 30%.</p>
            </div>
          </div>
        </details>
      </section>

      <HeroPremium
        title="Designs That Users"
        highlight="Fall in Love With"
        description="Pixel-perfect interfaces that convert visitors into loyal customers through data-driven design psychology. We create beautiful, intuitive experiences that delight users and drive business results."
        themeColor="green"
        backgroundImage={serviceImage}
        pattern="Waves"
      />

      {/* Extended Content Section for SEO */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Why UI/UX Design Matters for Your Business</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* GAIO: Quotable Definition Box */}
              <blockquote className="llm-quotable border-l-4 border-green-500 bg-green-500/5 p-6 rounded-r-lg not-italic mb-8">
                <p className="text-xl font-medium text-foreground m-0">
                  "Great enterprise design is invisible. It removes friction, anticipates user intent, and transforms complex workflows into intuitive, linear processes that drive productivity."
                </p>
              </blockquote>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In today's digital-first world, your website or app is often the first interaction customers have with your brand.
                Studies show that <strong>88% of online users are less likely to return to a site after a bad experience</strong>,
                and <strong>75% of users judge a company's credibility based on visual design alone</strong>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Great UI/UX design isn't just about making things look pretty—it's about creating frictionless experiences that
                guide users effortlessly toward their goals while achieving your business objectives. Our design process combines
                deep user research, behavioral psychology, and conversion rate optimization principles to create interfaces that
                not only look stunning but drive measurable business results.
              </p>
              <h3 className="text-2xl font-bold mt-12 mb-4">The ROI of Professional UI/UX Design</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Investing in professional UI/UX design delivers significant returns. Our clients typically see:
              </p>
              <ul className="text-lg text-muted-foreground space-y-3 mb-6">
                <li><strong>40% increase in conversion rates</strong> through optimized user flows and CTAs</li>
                <li><strong>50% reduction in support tickets</strong> with intuitive, self-service interfaces</li>
                <li><strong>200% boost in user engagement</strong> with delightful micro-interactions</li>
                <li><strong>3.2x ROI on average</strong> within the first year of implementation</li>
              </ul>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Every dollar spent on UX brings <strong>$100 in return</strong> (ROI = 9,900%), according to Forrester Research.
                This makes UI/UX design one of the highest-ROI investments you can make in your digital product.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <BentoGrid
        title="Beyond Just Pretty Pixels"
        subtitle="A comprehensive approach to digital product design that balances aesthetics with functionality."
        items={features}
        themeColor="green"
      />

      <ProcessTimeline
        steps={processSteps}
        themeColor="green"
      />

      {/* Case Studies Section */}
      <section className="py-32 px-6 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Real Results, Real Impact</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how we've transformed digital products for companies across industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '+250%',
                metric: 'User Engagement',
                company: 'FinTech SaaS',
                description: 'Redesigned dashboard increased daily active users by 250% within 3 months'
              },
              {
                stat: '4.9★',
                metric: 'App Store Rating',
                company: 'Mobile Banking App',
                description: 'Improved from 3.2 to 4.9 stars after UX overhaul, now featured by Apple'
              },
              {
                stat: '+180%',
                metric: 'Course Completion',
                company: 'E-Learning Platform',
                description: 'Streamlined UX led to massive increase in student retention and satisfaction'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-card border border-border rounded-3xl hover:border-green-500/50 transition-colors"
              >
                <div className="text-5xl font-bold text-green-500 mb-2">{item.stat}</div>
                <div className="text-xl font-semibold mb-1">{item.metric}</div>
                <div className="text-sm text-green-500 mb-4">{item.company}</div>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
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
              Everything you need to know about our UI/UX design services
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
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-green-500/50 transition-colors"
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
        <div className="absolute inset-0 bg-green-500/5" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Award className="w-16 h-16 mx-auto mb-6 text-green-500" />
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Ready to Transform Your Product?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Let's build something that sets a new standard in your industry. Get a free UX audit and consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20">
                  Get Free UX Audit
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

      <Footer />
    </main>
  )
}
