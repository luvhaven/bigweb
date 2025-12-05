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
      <Card className="h-full group relative overflow-hidden bg-gradient-to-br from-card/50 to-card border border-border/50 hover:border-accent/50 transition-all duration-700 cursor-pointer backdrop-blur-xl">
        {/* Gradient Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
        />

        <div className={`p-8 h-full flex flex-col ${service.size === 'large' ? 'justify-between' : 'justify-start'}`}>
          {/* Icon & Badge */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-accent/20 transition-shadow duration-500`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </motion.div>

              <Badge className="bg-accent/10 text-accent border-accent/30 text-xs font-bold px-3 py-1">
                {service.metric}
              </Badge>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h3 className={`font-bold letter-spacing-wide group-hover:text-accent transition-colors duration-500 ${service.size === 'large' ? 'text-3xl' : 'text-2xl'}`}>
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-2">
              {service.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.08 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hover Indicator */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span className="text-sm font-semibold letter-spacing-wide">LEARN MORE</span>
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700 -z-10`}
        />
      </Card>
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
          className="text-center mb-20"
        >
          <Badge className="bg-accent/10 text-accent border-accent/30 px-6 py-2 text-sm uppercase letter-spacing-wider mb-6">
            Our Expertise
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold letter-spacing-wide max-w-4xl mx-auto mb-6">
            Full-Stack Digital Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            End-to-end solutions powered by cutting-edge technology and creative innovation
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
