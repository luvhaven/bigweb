'use client'

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Starter",
    price: "$2,500",
    duration: "per project",
    description: "Perfect for small businesses and startups",
    features: [
      "Responsive Website Design",
      "Up to 5 Pages",
      "Basic SEO Optimization",
      "Contact Form Integration",
      "1 Month Support",
      "Mobile Responsive",
    ],
    color: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    name: "Professional",
    price: "$6,000",
    duration: "per project",
    description: "Ideal for growing businesses",
    features: [
      "Custom Website Design",
      "Up to 15 Pages",
      "Advanced SEO Strategy",
      "CMS Integration",
      "E-commerce Functionality",
      "3 Months Support",
      "Analytics Setup",
      "Social Media Integration",
    ],
    color: "from-accent to-orange-500",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$12,500+",
    duration: "per project",
    description: "For large-scale projects",
    features: [
      "Fully Custom Solution",
      "Unlimited Pages",
      "Enterprise SEO",
      "Custom CMS Development",
      "Advanced E-commerce",
      "6 Months Premium Support",
      "Performance Optimization",
      "Security Audit",
      "API Development",
      "Dedicated Project Manager",
    ],
    color: "from-purple-500 to-pink-500",
    popular: false,
  },
];

const PricingCard = ({ plan, index }: { plan: typeof pricingPlans[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className={`relative ${plan.popular ? "md:scale-105 z-10" : ""}`}
    >
      {plan.popular && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={`bg-gradient-to-r ${plan.color} text-white px-6 py-2 rounded-full flex items-center gap-2`}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold uppercase letter-spacing-wide">Most Popular</span>
          </div>
        </motion.div>
      )}

      <Card
        className={`group relative overflow-hidden bg-card border-2 transition-all duration-500 h-full ${plan.popular ? "border-accent shadow-2xl shadow-accent/20" : "border-border hover:border-accent"
          }`}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        <div className="relative p-8">
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold letter-spacing-wide mb-2">{plan.name}</h3>
            <p className="text-muted-foreground text-sm">{plan.description}</p>
          </div>

          {/* Price */}
          <div className="mb-8">
            <motion.div
              className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent inline-block`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {plan.price}
            </motion.div>
            <p className="text-muted-foreground text-sm mt-2">{plan.duration}</p>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.2 + i * 0.05 }}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mt-0.5`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link href="/contact">
            <Button
              className={`w-full ${plan.popular
                ? "bg-accent hover:bg-accent/90"
                : "bg-secondary hover:bg-secondary/80 border border-border hover:border-accent"
                } text-foreground letter-spacing-wide group/btn relative overflow-hidden transition-all duration-300`}
              size="lg"
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${plan.color} opacity-0 group-hover/btn:opacity-20`}
                initial={false}
              />
            </Button>
          </Link>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.color}`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
        />
      </Card>
    </motion.div>
  );
};

const Pricing = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] text-[60rem] font-bold text-muted select-none">
          $
        </div>
      </div>

      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm md:text-base uppercase letter-spacing-wider text-accent font-medium mb-6">
            Pricing Plans
          </h2>
          <p className="text-2xl md:text-4xl font-bold letter-spacing-wide max-w-3xl mx-auto">
            Choose the perfect plan for your project
          </p>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            Transparent pricing with no hidden fees. Every project is unique, let's discuss yours
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            Need a custom solution?{" "}
            <Link href="/contact" className="text-accent hover:underline font-medium">
              Let's talk about your project
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
