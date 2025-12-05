'use client'

import { motion, useInView, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Award, Zap } from "lucide-react";

const metrics = [
  { 
    icon: TrendingUp, 
    value: 500, 
    suffix: "M+", 
    label: "Revenue Generated", 
    color: "from-green-500 to-emerald-600",
    description: "For our clients worldwide"
  },
  { 
    icon: Users, 
    value: 250, 
    suffix: "+", 
    label: "Projects Delivered", 
    color: "from-blue-500 to-cyan-600",
    description: "Across 50+ industries"
  },
  { 
    icon: Award, 
    value: 15, 
    suffix: "+", 
    label: "Design Awards", 
    color: "from-purple-500 to-pink-600",
    description: "Awwwards, FWA, CSS Design"
  },
  { 
    icon: Zap, 
    value: 98, 
    suffix: "%", 
    label: "Client Satisfaction", 
    color: "from-orange-500 to-red-600",
    description: "Average rating from clients"
  },
];

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  inView: boolean;
}

const AnimatedCounter = ({ value, suffix, inView }: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 100 };
  const spring = useSpring(count, springConfig);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (inView) {
      count.set(value);
    }
  }, [inView, count, value]);

  return (
    <span className="inline-block">
      {displayValue}
      {suffix}
    </span>
  );
};

const ImpactMetrics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Gradient Backgrounds */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          x: [-50, 50, -50],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold letter-spacing-wide mb-6">
            Impact That <span className="bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">Speaks Volumes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real numbers. Real results. Real transformation.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="relative p-8 bg-gradient-to-br from-card/80 to-card border border-border/50 rounded-3xl backdrop-blur-xl hover:border-accent/50 transition-all duration-500 overflow-hidden">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-accent/20 transition-shadow duration-500`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <metric.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Counter */}
                <div className={`text-5xl md:text-6xl font-bold letter-spacing-wide mb-3 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={isInView} />
                </div>

                {/* Label */}
                <div className="text-xl font-bold letter-spacing-wide mb-2 group-hover:text-accent transition-colors duration-300">
                  {metric.label}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {metric.description}
                </p>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-700 -z-10`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
