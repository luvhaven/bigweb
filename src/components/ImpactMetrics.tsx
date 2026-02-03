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
    <section className="py-40 relative overflow-hidden bg-black border-t border-b border-zinc-900">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 mb-10">
            <Zap className="w-4 h-4 text-orange-600" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">
              Impact_Velocity_v3
            </span>
          </div>
          <h2 className="text-5xl md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-10">
            Impact <br />
            <span className="text-zinc-800">Vector.</span>
          </h2>
          <p className="text-xl text-zinc-500 font-medium max-w-2xl mx-auto uppercase tracking-wide">
            Real-world performance metrics across deployed systems.
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group h-full"
            >
              <div className="relative p-10 bg-black border border-zinc-900 h-full hover:bg-zinc-950 transition-all duration-500 group-hover:border-orange-600">
                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-700 group-hover:border-orange-600 transition-colors" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-700 group-hover:border-orange-600 transition-colors" />

                {/* Icon */}
                <div className="mb-8 p-4 bg-zinc-950 border border-zinc-900 inline-block">
                  <metric.icon className="w-6 h-6 text-zinc-600 group-hover:text-orange-600 transition-colors duration-300" />
                </div>

                {/* Counter */}
                <div className="text-5xl md:text-6xl font-black mb-4 text-white italic tracking-tighter group-hover:translate-x-2 transition-transform duration-500">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={isInView} />
                </div>

                {/* Label */}
                <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-[0.3em] mb-4">
                  {metric.label}
                </div>

                {/* Description */}
                <p className="text-sm font-mono text-zinc-600 uppercase tracking-wide leading-relaxed group-hover:text-zinc-400 transition-colors">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
