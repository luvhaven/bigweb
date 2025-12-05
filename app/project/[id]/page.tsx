'use client'

import { useState } from 'react'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Users, DollarSign, Clock, Award, ExternalLink, ChevronRight } from 'lucide-react'

// Case study data
const caseStudies: Record<string, any> = {
  'ecommerce-redesign': {
    title: 'E-Commerce Platform Redesign',
    client: 'TechMart',
    industry: 'Retail Technology',
    year: '2024',
    duration: '3 months',
    hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=90',
    tagline: 'Transforming online retail with a conversion-focused redesign',
    challenge: 'TechMart was experiencing a 68% cart abandonment rate and struggling with mobile conversions. Their outdated platform couldn\'t handle peak traffic, leading to lost sales and customer frustration.',
    solution: 'We rebuilt their entire e-commerce platform with a mobile-first approach, implementing advanced filtering, one-click checkout, and real-time inventory management. The new design focused on reducing friction at every step of the customer journey.',
    results: [
      { label: 'Conversion Rate', value: '+245%', icon: TrendingUp },
      { label: 'Mobile Sales', value: '+380%', icon: Users },
      { label: 'Revenue Growth', value: '+$2.4M', icon: DollarSign },
      { label: 'Page Load Time', value: '-65%', icon: Clock },
    ],
    testimonial: {
      quote: 'The new platform exceeded all our expectations. We saw immediate results, and our customers love the seamless experience.',
      author: 'Sarah Chen',
      role: 'CEO, TechMart',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=90',
    },
    process: [
      {
        phase: '01. Discovery & Research',
        description: 'Deep dive into user behavior, competitor analysis, and stakeholder interviews',
        deliverables: ['User personas', 'Journey maps', 'Technical audit'],
      },
      {
        phase: '02. Strategy & Planning',
        description: 'Defined conversion goals, technical architecture, and design system',
        deliverables: ['Product roadmap', 'Design system', 'Performance benchmarks'],
      },
      {
        phase: '03. Design & Prototyping',
        description: 'Created high-fidelity designs and interactive prototypes for user testing',
        deliverables: ['Wireframes', 'UI designs', 'Interactive prototypes'],
      },
      {
        phase: '04. Development & Integration',
        description: 'Built the platform with cutting-edge tech stack and integrated all systems',
        deliverables: ['Frontend build', 'API integration', 'Payment gateway'],
      },
      {
        phase: '05. Testing & Launch',
        description: 'Rigorous QA, performance optimization, and successful launch',
        deliverables: ['Test reports', 'Performance optimization', 'Launch support'],
      },
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Shopify API', 'Vercel'],
    images: [
      { url: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1920&q=90', caption: 'Homepage Design' },
      { url: 'https://images.unsplash.com/photo-1661956602926-db6b25f75947?w=1920&q=90', caption: 'Product Catalog' },
      { url: 'https://images.unsplash.com/photo-1661956602153-23384936a1d3?w=1920&q=90', caption: 'Checkout Flow' },
    ],
  },
  'saas-dashboard': {
    title: 'SaaS Analytics Dashboard',
    client: 'DataFlow Pro',
    industry: 'Data Analytics',
    year: '2024',
    duration: '4 months',
    hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=90',
    tagline: 'Turning complex data into actionable insights',
    challenge: 'DataFlow Pro needed a dashboard that could handle millions of data points while remaining intuitive for non-technical users. Their legacy system was slow and overwhelming.',
    solution: 'We designed and developed a modern, real-time analytics dashboard with customizable widgets, AI-powered insights, and advanced filtering. The interface prioritizes data visualization and quick decision-making.',
    results: [
      { label: 'User Engagement', value: '+420%', icon: TrendingUp },
      { label: 'Daily Active Users', value: '+15K', icon: Users },
      { label: 'Customer Retention', value: '+89%', icon: Award },
      { label: 'Load Time', value: '-78%', icon: Clock },
    ],
    testimonial: {
      quote: 'This dashboard transformed how our clients interact with their data. It\'s both powerful and beautiful.',
      author: 'Michael Rodriguez',
      role: 'CTO, DataFlow Pro',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=90',
    },
    process: [
      {
        phase: '01. Discovery & Research',
        description: 'User research, data flow analysis, and competitive benchmarking',
        deliverables: ['User research report', 'Data architecture', 'Competitive analysis'],
      },
      {
        phase: '02. UX & Information Architecture',
        description: 'Structured complex data into digestible views and workflows',
        deliverables: ['Information architecture', 'User flows', 'Wireframes'],
      },
      {
        phase: '03. Visual Design',
        description: 'Created a beautiful, data-first design system',
        deliverables: ['Design system', 'Component library', 'Style guide'],
      },
      {
        phase: '04. Development',
        description: 'Built with performance and scalability as top priorities',
        deliverables: ['Frontend application', 'Real-time features', 'API integration'],
      },
      {
        phase: '05. Launch & Optimization',
        description: 'Deployed with monitoring and continuous improvements',
        deliverables: ['Production deployment', 'Performance monitoring', 'User feedback integration'],
      },
    ],
    tech: ['React', 'D3.js', 'WebSocket', 'Node.js', 'PostgreSQL', 'Redis'],
    images: [
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=90', caption: 'Dashboard Overview' },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=90', caption: 'Data Visualization' },
      { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=90', caption: 'Custom Reports' },
    ],
  },
  'fintech-app': {
    title: 'FinTech Mobile Application',
    client: 'PayFlow',
    industry: 'Financial Technology',
    year: '2024',
    duration: '5 months',
    hero: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1920&q=90',
    tagline: 'Making financial management effortless and secure',
    challenge: 'PayFlow wanted to compete with established players by offering a superior mobile experience. Security, speed, and user trust were paramount.',
    solution: 'We built a native-quality mobile app with biometric authentication, real-time transactions, and intuitive money management tools. Every interaction was designed for speed and security.',
    results: [
      { label: 'Downloads', value: '500K+', icon: Users },
      { label: 'Transaction Volume', value: '+$50M', icon: DollarSign },
      { label: 'App Store Rating', value: '4.9/5', icon: Award },
      { label: 'User Retention', value: '94%', icon: TrendingUp },
    ],
    testimonial: {
      quote: 'The app is exactly what we envisioned and more. Our users can\'t stop raving about how easy it is to use.',
      author: 'Emily Thompson',
      role: 'Product Director, PayFlow',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=90',
    },
    process: [
      {
        phase: '01. Market Research',
        description: 'Analyzed user needs, regulatory requirements, and market opportunities',
        deliverables: ['Market analysis', 'User surveys', 'Compliance checklist'],
      },
      {
        phase: '02. Security Architecture',
        description: 'Designed robust security framework meeting industry standards',
        deliverables: ['Security architecture', 'Encryption protocols', 'Audit trails'],
      },
      {
        phase: '03. UI/UX Design',
        description: 'Created intuitive, trust-building interface',
        deliverables: ['User flows', 'Visual design', 'Prototypes'],
      },
      {
        phase: '04. Development & Testing',
        description: 'Built with security-first approach and extensive testing',
        deliverables: ['iOS & Android apps', 'Backend services', 'Security testing'],
      },
      {
        phase: '05. Launch & Growth',
        description: 'Successful launch with ongoing feature releases',
        deliverables: ['App store launch', 'Marketing support', 'Feature updates'],
      },
    ],
    tech: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Plaid API'],
    images: [
      { url: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1920&q=90', caption: 'App Interface' },
      { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&q=90', caption: 'Transaction Flow' },
      { url: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?w=1920&q=90', caption: 'Security Features' },
    ],
  },
};

export default function ProjectPage() {
  const params = useParams()
  const id = params.id as string
  const project = caseStudies[id]

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  if (!project) {
    return (
      <main className="min-h-screen">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Case Study Not Found
              </h1>
              <Link href="/portfolio">
                <Button>View All Projects</Button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: headerOpacity, scale: headerScale }}
        >
          <img
            src={project.hero}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.p 
            className="text-accent text-sm uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Case Study
          </motion.p>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {project.title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {project.tagline}
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div><span className="text-white font-semibold">Client:</span> {project.client}</div>
            <div><span className="text-white font-semibold">Industry:</span> {project.industry}</div>
            <div><span className="text-white font-semibold">Year:</span> {project.year}</div>
            <div><span className="text-white font-semibold">Duration:</span> {project.duration}</div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Impact</h2>
            <p className="text-xl text-muted-foreground">Measurable results that matter</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.results.map((result: any, index: number) => {
              const Icon = result.icon
              return (
                <motion.div
                  key={result.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-background border border-border rounded-2xl p-8 text-center hover:border-accent transition-all"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-4xl font-bold text-accent mb-2">{result.value}</div>
                  <div className="text-muted-foreground">{result.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-6">The Challenge</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-6">Our Solution</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground">From concept to launch</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {project.process.map((step: any, index: number) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-border rounded-2xl p-8 hover:border-accent transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="text-4xl font-bold text-accent/20 group-hover:text-accent transition-colors">
                    {step.phase.split('.')[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-3">{step.phase}</h4>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((deliverable: string) => (
                        <span
                          key={deliverable}
                          className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full"
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

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Technology Stack</h2>
            <p className="text-xl text-muted-foreground">Built with cutting-edge tools</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
          >
            {project.tech.map((tech: string, index: number) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 bg-card border border-border rounded-full font-medium hover:border-accent hover:text-accent transition-all cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Visual Showcase</h2>
            <p className="text-xl text-muted-foreground">A closer look at the design</p>
          </motion.div>

          <div className="space-y-16">
            {project.images.map((image: any, index: number) => (
              <motion.div
                key={image.caption}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border hover:border-accent transition-all">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <p className="text-white text-lg font-semibold">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card border border-border rounded-3xl p-12 md:p-16">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <img
                  src={project.testimonial.image}
                  alt={project.testimonial.author}
                  className="w-24 h-24 rounded-full object-cover border-4 border-accent"
                />
                <div className="flex-1">
                  <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-6">
                    "{project.testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-lg">{project.testimonial.author}</p>
                    <p className="text-muted-foreground">{project.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-accent text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let's build something extraordinary together. Get your free consultation today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/estimator">
                <Button size="lg" variant="outline" className="bg-white text-accent hover:bg-white/90 border-white">
                  Get Instant Estimate
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-accent">
                  View More Projects
                  <ChevronRight className="ml-2 w-5 h-5" />
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
