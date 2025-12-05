'use client'

import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import {
  TrendingUp, Target, Zap, DollarSign, BarChart3, Users,
  Eye, MousePointer, ShoppingCart, ArrowRight, Check, Sparkles,
  LineChart, Gauge, RefreshCw, Rocket, Crown, Award, Star
} from 'lucide-react'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

const breadcrumbItems = [
  { label: 'Services', href: '/services' },
  { label: 'Conversion Optimization', href: '/services/conversion-optimization' }
]

const faqs = [
  {
    question: 'What is a good conversion rate?',
    answer: 'It varies by industry, but generally 2-5% is average for e-commerce. However, we don\'t aim for "average". Our goal is to double or triple your current baseline through systematic testing and optimization.'
  },
  {
    question: 'How long does a CRO program take?',
    answer: 'CRO is an ongoing process, but we typically run tests in 2-4 week cycles. Most clients see significant revenue impact within the first 30-60 days as we identify and fix low-hanging fruit.'
  },
  {
    question: 'Will testing slow down my website?',
    answer: 'No. We use lightweight, asynchronous testing scripts that load after your core content. We also monitor site performance to ensure no negative impact on user experience or Core Web Vitals.'
  },
  {
    question: 'Do I need a lot of traffic to run tests?',
    answer: 'Ideally, yes. For statistical significance, we recommend at least 5,000 monthly visitors. However, for lower traffic sites, we focus on heuristic analysis, user testing, and best-practice implementation which don\'t require large sample sizes.'
  }
]

const heroStats = [
  { value: '387%', label: 'Avg Revenue Increase', icon: TrendingUp },
  { value: '2.8x', label: 'Conversion Rate Boost', icon: Target },
  { value: '< 30', label: 'Days to ROI', icon: Zap }
]

const croServices = [
  {
    icon: Eye,
    title: 'Heatmap & Session Analysis',
    description: 'Deep dive into user behavior with advanced tracking and analysis.',
    features: ['Click Tracking', 'Scroll Depth Analysis', 'Session Recordings', 'User Flow Mapping'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Target,
    title: 'A/B & Multivariate Testing',
    description: 'Data-driven experiments that eliminate guesswork from optimization.',
    features: ['Split Testing', 'Multi-variant Tests', 'Statistical Analysis', 'Winner Identification'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: MousePointer,
    title: 'Landing Page Optimization',
    description: 'Transform visitors into customers with high-converting pages.',
    features: ['Copy Optimization', 'CTA Design', 'Form Optimization', 'Trust Elements'],
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: ShoppingCart,
    title: 'Checkout Flow Enhancement',
    description: 'Reduce cart abandonment and maximize order completion rates.',
    features: ['Cart Recovery', 'One-click Checkout', 'Payment Options', 'Progress Indicators'],
    color: 'from-green-500 to-emerald-500'
  }
]

const caseStudies = [
  {
    industry: 'E-Commerce',
    client: 'Fashion Retailer',
    challenge: '73% cart abandonment rate',
    solution: 'Simplified checkout + trust badges',
    result: '+412% revenue',
    metric: '412%',
    time: '21 days'
  },
  {
    industry: 'SaaS',
    client: 'Analytics Platform',
    challenge: 'Low trial-to-paid conversion',
    solution: 'Onboarding optimization',
    result: '+89% conversions',
    metric: '89%',
    time: '14 days'
  },
  {
    industry: 'B2B Services',
    client: 'Consulting Firm',
    challenge: 'High bounce rate on landing',
    solution: 'Value prop testing',
    result: '+234% leads',
    metric: '234%',
    time: '28 days'
  },
  {
    industry: 'FinTech',
    client: 'Investment App',
    challenge: 'Complex signup process',
    solution: 'Multi-step form redesign',
    result: '+156% signups',
    metric: '156%',
    time: '18 days'
  }
]

const methodology = [
  {
    step: '01',
    title: 'Audit & Analysis',
    description: 'Deep-dive analytics review and user behavior analysis',
    icon: BarChart3
  },
  {
    step: '02',
    title: 'Hypothesis Creation',
    description: 'Data-backed hypotheses for maximum impact improvements',
    icon: Sparkles
  },
  {
    step: '03',
    title: 'Test Design',
    description: 'Strategic A/B tests with statistical significance',
    icon: RefreshCw
  },
  {
    step: '04',
    title: 'Implementation',
    description: 'Rapid deployment of winning variations',
    icon: Zap
  },
  {
    step: '05',
    title: 'Optimization',
    description: 'Continuous improvement and iteration cycles',
    icon: LineChart
  },
  {
    step: '06',
    title: 'Scale & Repeat',
    description: 'Compound gains through systematic testing',
    icon: TrendingUp
  }
]

export default function ConversionOptimizationPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeCase, setActiveCase] = useState(0)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Auto-cycle case studies
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((prev) => (prev + 1) % caseStudies.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Navigation />

      {/* Structured Data */}
      <ServiceSchema
        name="Conversion Rate Optimization (CRO)"
        description="Data-driven conversion rate optimization services. A/B testing, heatmap analysis, and user behavior tracking to increase revenue without increasing ad spend."
        serviceType="Conversion Optimization"
        ratingValue={4.9}
        reviewCount={42}
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
        <details className="group border border-accent/20 bg-accent/5 rounded-lg">
          <summary className="p-4 cursor-pointer text-sm font-medium text-accent hover:text-orange-400 transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Definitive Q&A: Enterprise CRO Strategy</span>
          </summary>
          <div className="p-4 pt-0 text-muted-foreground text-sm space-y-4">
            <div>
              <strong className="block text-foreground mb-1">What is the difference between CRO and SEO?</strong>
              <p>SEO focuses on driving traffic *to* your site, while CRO focuses on maximizing the value of that traffic *once it arrives*. CRO turns visitors into customers, effectively lowering your Customer Acquisition Cost (CAC).</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">How do you determine statistical significance?</strong>
              <p>We use a Bayesian statistical model to determine test winners, requiring a minimum 95% confidence interval before declaring a variation successful. This ensures that revenue uplifts are due to our changes, not random chance.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">Can you optimize for metrics other than revenue?</strong>
              <p>Yes. While revenue is the primary goal, we also optimize for micro-conversions like email signups, demo requests, account creations, and engagement metrics (time on site, pages per session) that lead to long-term value.</p>
            </div>
          </div>
        </details>
      </section>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background" />

          {/* Animated Grid */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(245, 85, 39, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 85, 39, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent/10 blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-purple-500/10 blur-[100px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 mb-8"
          >
            <DollarSign className="w-5 h-5 text-accent" />
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Revenue Acceleration Engine
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Turn More Visitors Into
            <br />
            <span className="bg-gradient-to-r from-accent via-orange-500 to-accent bg-clip-text text-transparent">
              Paying Customers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Data-driven conversion rate optimization that multiplies your revenue without spending
            more on ads. Average clients see 2.8x conversion increase in under 30 days.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8 py-6 group">
                Get Free CRO Audit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link href="/estimator">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Calculate Your Potential
              </Button>
            </Link>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {heroStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-3">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-accent rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* CRO Services Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our CRO <span className="text-accent">Arsenal</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Comprehensive optimization strategies that deliver measurable results
            </p>

            {/* GAIO: Quotable Definition Box */}
            <blockquote className="llm-quotable border-l-4 border-accent bg-accent/5 p-6 rounded-r-lg not-italic text-left max-w-4xl mx-auto mb-12">
              <p className="text-xl font-medium text-foreground m-0">
                "Conversion Rate Optimization is the highest-ROI activity in digital marketing. It acts as a force multiplier for every other channel, permanently increasing the efficiency of your entire marketing stack."
              </p>
            </blockquote>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {croServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all group"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Real Results, <span className="text-accent">Real Revenue</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how we've transformed businesses like yours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`p-6 rounded-xl border transition-all ${index === activeCase
                    ? 'bg-accent/10 border-accent/50 shadow-2xl shadow-accent/20'
                    : 'bg-card/80 border-border hover:border-accent/30'
                  }`}
              >
                <div className="text-xs text-accent font-medium mb-2 uppercase">{study.industry}</div>
                <h4 className="font-bold mb-2">{study.client}</h4>
                <div className="text-sm text-muted-foreground mb-4">
                  <div className="mb-1"><strong>Challenge:</strong> {study.challenge}</div>
                  <div><strong>Solution:</strong> {study.solution}</div>
                </div>
                <div className="text-4xl font-bold text-accent mb-2">{study.metric}</div>
                <div className="text-sm font-medium">{study.result}</div>
                <div className="text-xs text-muted-foreground mt-2">Achieved in {study.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Our Proven <span className="text-accent">6-Step Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A systematic approach that delivers predictable revenue growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {methodology.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent text-white font-bold flex items-center justify-center text-lg">
                  {step.step}
                </div>
                <div className="mt-4">
                  <step.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive ROI Calculator Preview */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 mb-6">
              <Rocket className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Revenue Potential
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Calculate Your <span className="text-accent">Hidden Revenue</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how much revenue you're losing to poor conversion rates
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Calculator Input */}
              <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6">Your Current Numbers</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Monthly Visitors', value: '50,000', color: 'from-blue-500 to-cyan-500' },
                    { label: 'Current Conversion Rate', value: '2.1%', color: 'from-orange-500 to-red-500' },
                    { label: 'Average Order Value', value: '$87', color: 'from-green-500 to-emerald-500' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-bold">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${item.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: '70%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Results Output */}
              <div className="p-8 rounded-2xl border-2 border-accent/50 bg-gradient-to-br from-accent/10 to-orange-500/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Crown className="w-6 h-6 text-accent" />
                    After Optimization
                  </h3>
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-accent/20"
                    >
                      <div className="text-accent text-sm font-medium mb-2">New Conversion Rate</div>
                      <div className="text-5xl font-bold text-accent">5.9%</div>
                      <div className="text-sm text-muted-foreground mt-2">+181% improvement</div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-accent/20"
                    >
                      <div className="text-accent text-sm font-medium mb-2">Additional Monthly Revenue</div>
                      <div className="text-5xl font-bold text-accent">$165K</div>
                      <div className="text-sm text-muted-foreground mt-2">$1.98M annually</div>
                    </motion.div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span>Conservative 2.8x industry average estimate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <Link href="/contact">
                <Button size="lg" className="text-lg px-10 py-6 group shadow-2xl shadow-accent/20">
                  Get Your Custom Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Testimonials */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 mb-6">
              <Award className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Client Success Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted by <span className="text-accent">Industry Leaders</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "BIGWEB's CRO transformed our business. We saw a 412% revenue increase in just 3 weeks. Their data-driven approach is unmatched.",
                author: "Sarah Chen",
                role: "CEO, Fashion Retailer",
                metric: "+412%",
                avatar: "https://i.pravatar.cc/150?img=1"
              },
              {
                quote: "The ROI was immediate. Our conversion rate more than doubled, and the additional revenue paid for the project 10x over.",
                author: "Michael Torres",
                role: "VP Growth, SaaS Company",
                metric: "+89%",
                avatar: "https://i.pravatar.cc/150?img=3"
              },
              {
                quote: "Finally, a team that speaks in numbers, not vanity metrics. Every change was backed by data and delivered measurable results.",
                author: "Emily Roberts",
                role: "CMO, B2B Services",
                metric: "+234%",
                avatar: "https://i.pravatar.cc/150?img=5"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl font-bold text-accent/20">"</div>
                    <div className="flex-1">
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">{testimonial.quote}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full border-2 border-accent/20"
                      />
                      <div>
                        <div className="font-bold">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-accent">{testimonial.metric}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-orange-500/10 to-background" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(245, 85, 39, 0.05) 10px, rgba(245, 85, 39, 0.05) 20px)
            `,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-accent">10x Your Revenue?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Get a free conversion audit and discover how much revenue you're leaving on the table.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="text-lg px-10 py-6 group">
                  Get Free CRO Audit
                  <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="text-lg px-10 py-6">
                  See Our Results
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
