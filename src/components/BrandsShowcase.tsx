'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const brands = [
  { name: "Fortune 500", category: "Enterprise" },
  { name: "Y Combinator", category: "Startups" },
  { name: "Forbes 100", category: "Media" },
  { name: "TechCrunch", category: "Technology" },
  { name: "Sequoia", category: "VC Firms" },
  { name: "Andreessen", category: "Investment" },
  { name: "Goldman Sachs", category: "Finance" },
  { name: "McKinsey", category: "Consulting" },
];

const BrandsShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-accent/10 text-accent border-accent/30 px-6 py-2 text-sm uppercase letter-spacing-wider mb-6">
            Trusted by Industry Leaders
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold letter-spacing-wide mb-6">
            Powering the World's Most <span className="text-accent">Ambitious Brands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From Fortune 500 enterprises to Y Combinator startups, we partner with visionaries
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center justify-center p-8 bg-card/50 border border-border/50 rounded-2xl backdrop-blur-sm hover:border-accent/50 transition-all duration-500 cursor-pointer group"
            >
              <div className="text-2xl font-bold letter-spacing-wide mb-2 group-hover:text-accent transition-colors duration-300">
                {brand.name}
              </div>
              <div className="text-xs uppercase letter-spacing-wider text-muted-foreground">
                {brand.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
