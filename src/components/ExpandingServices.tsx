'use client'

import { motion } from "framer-motion";
import ServiceCard3D from "@/components/ui/ServiceCard3D";

const defaultServices = [
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
    slug: "ai-consulting",
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
  {
    title: "Websites That Never Break, Always Perform",
    slug: "maintenance",
    tagline: "Sleep easy while we keep your site secure, fast, and growing",
    description: "Protect your revenue with 24/7 monitoring and proactive maintenance. While you focus on your business, we ensure your website stays secure, lightning-fast, and optimized for both search engines and AI. Zero downtime, maximum performance, guaranteed.",
    features: ["24/7 Security Monitoring", "Performance Optimization", "AI Search Optimization (GAOI)", "Priority Support"],
    results: "99.9% uptime, zero security breaches, 40% faster sites",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=90",
  },
];

interface ExpandingServicesProps {
  services?: any[]
}

const ExpandingServices = ({ services }: ExpandingServicesProps) => {
  const displayServices = services && services.length > 0 ? services : defaultServices;

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto perspective-2000">
          {displayServices.map((service, index) => (
            <ServiceCard3D key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpandingServices;
