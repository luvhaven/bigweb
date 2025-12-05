'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import PremiumBackground from '@/components/PremiumBackground'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Clock, Briefcase, Users, TrendingUp } from 'lucide-react'
import Link from 'next/link'

// TODO: Replace with API call to /api/careers/openings
const openings = [
  {
    title: "Senior Full-Stack Developer",
    location: "Lagos, Nigeria / Remote",
    type: "Full-time",
    department: "Engineering",
    description: "We're looking for an experienced full-stack developer to build cutting-edge web applications."
  },
  {
    title: "UI/UX Designer",
    location: "Remote",
    type: "Full-time",
    department: "Design",
    description: "Join our design team to create beautiful, user-centric experiences for global clients."
  },
  {
    title: "Digital Marketing Specialist",
    location: "Lagos, Nigeria",
    type: "Full-time",
    department: "Marketing",
    description: "Drive growth for our clients through strategic SEO, PPC, and content marketing campaigns."
  },
  {
    title: "Mobile App Developer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description: "Build innovative iOS and Android applications that delight users worldwide."
  },
]

const benefits = [
  "Competitive salary and equity options",
  "Flexible remote work policy",
  "Health insurance coverage",
  "Professional development budget",
  "Latest tech and equipment",
  "Generous vacation policy",
  "Regular team events",
  "Collaborative culture"
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navigation />
      <Breadcrumbs />
      
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <PremiumBackground variant="mesh" intensity="subtle" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Build the Future <span className="text-accent">With Us</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join a talented team creating world-class digital experiences for ambitious businesses worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Why BIGWEB Digital?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're building something special. Here's what makes us different.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Great Team", desc: "Work with talented, passionate people" },
              { icon: Briefcase, title: "Impactful Work", desc: "Build products used by thousands" },
              { icon: MapPin, title: "Remote-First", desc: "Work from anywhere in the world" },
              { icon: Clock, title: "Work-Life Balance", desc: "Flexible hours and generous PTO" }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-xl text-muted-foreground">Find your next opportunity</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{job.title}</h3>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button className="bg-accent hover:bg-accent/90">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Benefits & Perks</h2>
            <p className="text-xl text-muted-foreground">We take care of our team</p>
          </motion.div>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-4"
              >
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-accent/10 border border-accent/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're always looking for talented people. Send us your resume and let's talk about future opportunities.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
