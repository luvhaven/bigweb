'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Interfaces That Turn Browsers Into Buyers",
    slug: "ui-ux-design",
    tagline: "Double your conversion rate with UX that sells",
    description: "Your visitors are already interested—now convert them. We design interfaces backed by behavioral psychology that guide users toward purchase. Every element tested, every interaction optimized for maximum conversions.",
    features: ["Conversion-Focused Design", "A/B Tested Layouts", "Psychology-Driven UX", "Mobile-First Optimization"],
    results: "Average 200% conversion increase",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=90",
  },
  {
    title: "Websites That Rank #1 & Convert Like Crazy",
    slug: "web-development",
    tagline: "Dominate Google and turn traffic into revenue",
    description: "Get found on Google's first page and convert that traffic into customers. Built with Next.js 15 for blazing speed, perfect SEO, and conversion optimization baked into every line of code.",
    features: ["Next.js 15 & React 19", "Sub-1s Load Times", "Technical SEO Built-In", "Conversion Optimization"],
    results: "3x faster sites, top 3 Google rankings",
    image: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=90",
  },
  {
    title: "Apps Your Users Open Daily",
    slug: "mobile-apps",
    tagline: "Build habit-forming mobile experiences",
    description: "Create apps people can't stop using. We combine stunning design with addictive UX and smooth performance that keeps users engaged and coming back every day.",
    features: ["Native iOS & Android", "React Native", "Push Notifications", "Offline-First Design"],
    results: "4.8+ app store ratings, 80% daily active users",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=90",
  },
  {
    title: "Online Stores That Maximize Every Sale",
    slug: "ecommerce",
    tagline: "Increase revenue without more traffic",
    description: "Turn browsers into buyers and buyers into repeat customers. Every element optimized to reduce cart abandonment, increase order value, and maximize lifetime customer value.",
    features: ["Smart Product Recommendations", "One-Click Checkout", "Cart Recovery Systems", "Revenue Optimization"],
    results: "180% average revenue increase",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90",
  },
  {
    title: "AI-Powered Automation That Saves 20+ Hours Weekly",
    slug: "ai-automation",
    tagline: "Let AI handle the repetitive work",
    description: "Free your team from manual tasks with intelligent automation. From customer support chatbots to workflow automation, we implement AI that actually works and delivers ROI from day one.",
    features: ["Custom AI Chatbots", "Workflow Automation", "Predictive Analytics", "Smart Document Processing"],
    results: "10x efficiency gains, $50K+ annual savings",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=90",
  },
  {
    title: "SEO That Gets You Found First",
    slug: "seo",
    tagline: "Own the top of Google search results",
    description: "Stop paying for ads. Dominate organic search and get qualified leads on autopilot. We implement proven strategies that get you to page 1 and delivering steady traffic that converts.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO Domination"],
    results: "Top 3 rankings in 90 days guaranteed",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90",
  },
  {
    title: "Data That Predicts What Customers Want",
    slug: "analytics",
    tagline: "Know your customers better than they know themselves",
    description: "Stop guessing, start knowing. Advanced analytics and AI-powered insights reveal exactly what your customers want, when they'll buy, and how to maximize every interaction.",
    features: ["Predictive AI Models", "Behavior Analytics", "Custom Dashboards", "Real-Time Insights"],
    results: "30-50% conversion rate improvements",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90",
  },
  {
    title: "Optimization That Multiplies Your Revenue",
    slug: "optimization",
    tagline: "Turn the same traffic into 3x more sales",
    description: "Your traffic is already expensive—squeeze every dollar from it. Scientific testing and conversion optimization that systematically improves every touchpoint in your customer journey.",
    features: ["Scientific A/B Testing", "Heatmap Analysis", "Funnel Optimization", "Checkout Flow Mastery"],
    results: "Average 387% revenue increase",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90",
  },
];

const ExpandingServices = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-accent mb-4">What We Deliver</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Solutions That Grow Your Business
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Real results, not just pretty websites. Everything we build is designed to increase your revenue.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.slug}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative overflow-hidden cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="relative bg-card border border-border hover:border-accent transition-colors duration-300 card-hover-premium texture-noise"
                  animate={{
                    height: hoveredIndex === index ? 'auto' : '400px',
                    y: hoveredIndex === index ? -8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Title overlay on image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-accent text-sm font-semibold mb-3 uppercase tracking-wider">
                      {service.tagline}
                    </p>

                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {service.description}
                          </p>

                          {/* Features */}
                          <div className="space-y-2 mb-6">
                            {service.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2 text-sm"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <span>{feature}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Results */}
                          <div className="pt-4 border-t border-border">
                            <p className="text-sm font-semibold text-accent">
                              {service.results}
                            </p>
                          </div>

                          {/* CTA */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 flex items-center gap-2 text-accent text-sm font-medium"
                          >
                            <span>Learn More</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Collapsed state hint */}
                    {hoveredIndex !== index && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        Hover to explore →
                      </div>
                    )}
                  </div>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute -inset-0.5 bg-accent opacity-0 blur-2xl -z-10"
                    animate={{
                      opacity: hoveredIndex === index ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpandingServices;
