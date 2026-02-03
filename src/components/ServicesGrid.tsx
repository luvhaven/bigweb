'use client'

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Palette, Code, Search, Smartphone, ShoppingCart, BarChart,
  Zap, Shield, Globe, Rocket, Cpu, Cloud, Lock, TrendingUp
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Pixel-perfect interfaces that convert visitors into loyal customers through data-driven design psychology",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    metric: "200% Engagement Lift",
    color: "from-pink-500 to-rose-600",
    size: "large" // spans 2 columns
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Lightning-fast, scalable applications built with cutting-edge technology stacks",
    features: ["Next.js/React", "Node.js/Python", "API Development", "Database Design"],
    metric: "3x Faster Performance",
    color: "from-blue-500 to-indigo-600",
    size: "medium"
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native iOS & Android experiences that users can't stop engaging with",
    features: ["Native Development", "Cross-Platform", "App Store Optimization", "Push Notifications"],
    metric: "4.8★ Average Rating",
    color: "from-purple-500 to-violet-600",
    size: "medium"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Conversion-optimized shopping experiences with advanced payment integrations",
    features: ["Shopify/WooCommerce", "Payment Gateways", "Inventory Management", "Analytics"],
    metric: "+180% Conversion Rate",
    color: "from-green-500 to-emerald-600",
    size: "large"
  },
  {
    icon: Search,
    title: "SEO & Growth",
    description: "Dominate search rankings and drive qualified organic traffic at scale",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"],
    metric: "Top 3 in 6 Months",
    color: "from-orange-500 to-amber-600",
    size: "medium"
  },
  {
    icon: BarChart,
    title: "Analytics & CRO",
    description: "Data-driven optimization that continuously improves conversion rates",
    features: ["A/B Testing", "Heatmaps", "User Flows", "Conversion Funnels"],
    metric: "30-50% CRO Improvement",
    color: "from-cyan-500 to-teal-600",
    size: "medium"
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Blazing-fast load times that reduce bounce rates and increase engagement",
    features: ["Core Web Vitals", "CDN Setup", "Image Optimization", "Code Splitting"],
    metric: "99+ Lighthouse Score",
    color: "from-yellow-500 to-orange-500",
    size: "small"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security protocols protecting your digital assets",
    features: ["SSL/TLS", "GDPR Compliance", "Penetration Testing", "Data Encryption"],
    metric: "Zero Breaches",
    color: "from-red-500 to-pink-600",
    size: "small"
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable, reliable cloud solutions on AWS, Google Cloud, and Azure",
    features: ["AWS/GCP/Azure", "DevOps", "CI/CD Pipelines", "Monitoring"],
    metric: "99.99% Uptime SLA",
    color: "from-sky-500 to-blue-600",
    size: "medium"
  },
  {
    icon: Globe,
    title: "Internationalization",
    description: "Multi-language, multi-currency solutions for global market domination",
    features: ["i18n Implementation", "Currency Conversion", "Geo-Targeting", "RTL Support"],
    metric: "50+ Languages",
    color: "from-indigo-500 to-purple-600",
    size: "small"
  },
  {
    icon: Cpu,
    title: "AI/ML Integration",
    description: "Cutting-edge artificial intelligence features that set you apart",
    features: ["ChatGPT Integration", "Recommendation Engines", "Image Recognition", "Predictive Analytics"],
    metric: "AI-Powered Insights",
    color: "from-violet-500 to-fuchsia-600",
    size: "medium"
  },
  {
    icon: Rocket,
    title: "MVP Development",
    description: "Rapid prototyping and launch for startups ready to disrupt their industry",
    features: ["Fast Turnaround", "Agile Methodology", "Market Validation", "Investor-Ready"],
    metric: "8-12 Week Launch",
    color: "from-rose-500 to-red-600",
    size: "large"
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  const getGridSpan = () => {
    switch (service.size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-2';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      style={{ y, opacity }}
      className={getGridSpan()}
    >
      <div className="h-full group relative overflow-hidden bg-black border border-zinc-900 transition-all duration-700 cursor-crosshair">


        <div className={`p-10 h-full flex flex-col ${service.size === 'large' ? 'justify-between' : 'justify-start'}`}>
          {/* Icon & Badge */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 bg-zinc-950 border border-zinc-900 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 text-zinc-600">
                <service.icon className="w-8 h-8" />
              </div>

              <div className="px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[9px] font-mono font-bold uppercase tracking-[0.4em]">
                {service.metric}
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-bold text-zinc-800 uppercase tracking-[0.5em]">
                CAPABILITY_0{index + 1}
              </h4>
              <h3 className={`font-black text-white hover:text-orange-600 transition-colors duration-500 uppercase tracking-tighter italic leading-none ${service.size === 'large' ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                {service.title}
              </h3>
              <p className="text-zinc-500 text-lg font-medium leading-[1.1] tracking-tight">
                {service.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-800">
                  <div className="w-2 h-2 bg-zinc-950 border border-zinc-900 group-hover:bg-orange-600 transition-colors" />
                  {feature}
                </div>
              ))}
            </div>
          </div>


        </div>

      </div>
    </motion.div>
  );
};

const ServicesGrid = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mb-40 border-l-4 border-orange-600 pl-12 relative overflow-hidden text-left"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-12">
            Development_Arsenal_v1.0
          </div>

          <h2 className="text-6xl md:text-[11rem] font-black text-white tracking-tighter uppercase italic leading-[0.75] mb-16">
            Clinical <br /><span className="text-zinc-800">Capability.</span>
          </h2>
          <p className="text-2xl md:text-5xl text-zinc-500 font-medium leading-none tracking-tight max-w-5xl">
            End-to-end solutions engineered for <span className="text-white italic underline underline-offset-8 decoration-orange-600">Pure_Performance</span>.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto auto-rows-fr">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
