'use client'

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const techCategories = [
  {
    category: "Frontend",
    color: "from-blue-500 to-cyan-500",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    category: "Backend",
    color: "from-green-500 to-emerald-500",
    tools: ["Node.js", "Python", "GraphQL", "PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "Cloud & DevOps",
    color: "from-purple-500 to-pink-500",
    tools: ["AWS", "Vercel", "Docker", "Kubernetes", "GitHub Actions", "Terraform"]
  },
  {
    category: "AI & Analytics",
    color: "from-orange-500 to-red-500",
    tools: ["OpenAI", "TensorFlow", "Google Analytics", "Mixpanel", "Segment", "Hotjar"]
  },
];

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Badge className="bg-accent/10 text-accent border-accent/30 px-6 py-2 text-sm uppercase letter-spacing-wider mb-6">
            Technology Stack
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold letter-spacing-wide mb-6">
            Built with <span className="text-accent">Cutting-Edge</span> Technology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We leverage the latest tools and frameworks to deliver exceptional performance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {techCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: catIndex * 0.15 }}
              className="relative group"
            >
              <div className="p-8 bg-gradient-to-br from-card/80 to-card border border-border/50 rounded-3xl backdrop-blur-xl hover:border-accent/50 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <div className="w-6 h-6 bg-white rounded-md" />
                  </div>
                  <h3 className="text-2xl font-bold letter-spacing-wide">{category.category}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.tools.map((tool, toolIndex) => (
                    <motion.div
                      key={toolIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, delay: catIndex * 0.15 + toolIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <Badge 
                        className={`bg-gradient-to-r ${category.color} text-white border-none px-4 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-shadow duration-300`}
                      >
                        {tool}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700 -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
