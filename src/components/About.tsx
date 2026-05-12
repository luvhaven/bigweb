'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "15+", label: "Team Members" },
  { value: "8+", label: "Years Experience" },
];

const About = () => {
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const areStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] border border-muted/20 rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-sm md:text-base uppercase letter-spacing-wider text-accent font-medium mb-6">
                Who We Are
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold letter-spacing-wide mb-8">
                Building digital experiences that matter
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-muted-foreground leading-relaxed text-lg">
                We combine strategic thinking with creative execution to deliver
                websites that not only look beautiful but drive real business results.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our team brings together expertise in design, development, and
                digital strategy to create memorable online experiences.
              </p>
              <a href="#services">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-primary-foreground letter-spacing-wide group mt-4 transition-all duration-300"
                >
                  VIEW OUR APPROACH
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div
            ref={statsRef}
            className="grid md:grid-cols-3 gap-8 mt-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={areStatsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl font-bold text-accent mb-4 transition-all duration-300 group-hover:text-accent/80"
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground letter-spacing-wide transition-colors duration-300 group-hover:text-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
