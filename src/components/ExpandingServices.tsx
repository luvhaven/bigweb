'use client'

import { motion } from "framer-motion";
import ServiceCard3D from "@/components/ui/ServiceCard3D";

const defaultServices = [
  {
    title: "Conversion Diagnostic",
    slug: "diagnostic",
    tagline: "Know Exactly What's Broken",
    description: "A forensic analysis of your current funnel, messaging, and user experience. We uncover exactly where you are losing revenue and provide a prioritized fix list.",
    features: ["Funnel Breakdown", "Messaging Audit", "Blocker Identification", "48-Hour Delivery"],
    results: "Average 15+ quick wins identified",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
  },
  {
    title: "Conversion Fix Sprint",
    slug: "fix-sprint",
    tagline: "Fix The Critical 20% in 7 Days",
    description: "We surgically fix the high-impact elements that drive the most results. Headline rewrites, CTA optimization, and mobile friction removal.",
    features: ["1-3 Page Optimization", "Copy Re-engineering", "Mobile UX Surgery", "Speed Injection"],
    results: "Immediate impact on conversion rates",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
  },
  {
    title: "Revenue Website System",
    slug: "revenue-system",
    tagline: "Complete Website Rebuild",
    description: "A conversion-engineered website built from the ground up. Modern architecture, lightning-fast performance, and every pixel optimized for revenue.",
    features: ["Elite Architecture", "Psychology-First Design", "Sub-2s Load Times", "Full Storybranding"],
    results: "Foundation for 7 and 8 figure growth",
    image: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=90",
  },
  {
    title: "Optimization Retainer",
    slug: "retainer",
    tagline: "Your In-House CRO Team",
    description: "Continuous optimization, A/B testing, and refinement. We act as your dedicated conversion team, constantly squeezing more RIO from your traffic.",
    features: ["Monthly A/B Testing", "Heatmap Forensics", "Iterative Refinement", "Revenue Monitoring"],
    results: "Compounding growth month-over-month",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90",
  }
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
