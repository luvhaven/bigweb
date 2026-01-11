'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 250, suffix: "+", label: "Audits Completed", color: "from-accent to-orange-400" },
  { value: 98, suffix: "%", label: "Conversion Lift", color: "from-orange-500 to-red-500" },
  { value: 120, suffix: "M+", label: "Client Revenue", color: "from-blue-500 to-cyan-500" },
  { value: 15, suffix: "+", label: "Strategy Experts", color: "from-green-500 to-emerald-500" },
];

const AnimatedCounter = ({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) => {
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
    <motion.span className="inline-block">
      {displayValue}
      {suffix}
    </motion.span>
  );
};

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-background"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm md:text-base uppercase letter-spacing-wider text-accent font-medium mb-6">
            By The Numbers
          </h2>
          <p className="text-2xl md:text-4xl font-bold letter-spacing-wide max-w-3xl mx-auto">
            Results that speak for themselves
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${stat.color.split(" ")[0]}, ${stat.color.split(" ")[1]})`,
                }}
              />

              <div className="relative p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm group-hover:border-accent transition-all duration-500">
                <motion.div
                  className={`text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                </motion.div>
                <p className="text-muted-foreground letter-spacing-wide uppercase text-sm group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Decorative element */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} origin-left`}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
