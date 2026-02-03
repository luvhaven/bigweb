'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PhysicsReveal } from "@/components/ui/PhysicsReveal";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We immerse ourselves in your business, understanding your goals, challenges, and opportunities",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=90"
  },
  {
    number: "02",
    title: "Strategy",
    description: "Crafting a comprehensive roadmap that aligns design, technology, and business objectives",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=90"
  },
  {
    number: "03",
    title: "Design",
    description: "Creating pixel-perfect interfaces that balance aesthetics with exceptional user experience",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=90"
  },
  {
    number: "04",
    title: "Development",
    description: "Building robust, scalable solutions with clean code and cutting-edge technology",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=90"
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploying your project with precision, ensuring smooth delivery and ongoing support",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=90"
  },
  {
    number: "06",
    title: "Growth",
    description: "Continuous optimization and scaling to ensure your digital presence evolves with your business",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90"
  },
];

const ProcessStep = ({ step, index }: { step: typeof steps[0], index: number }) => {
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  const x = useTransform(scrollYProgress, [0, 1], [isEven ? -20 : 20, isEven ? 20 : -20]);

  return (
    <motion.div
      ref={ref}
      className={`grid md:grid-cols-2 gap-0 border-t border-zinc-900 last:border-b ${isEven ? '' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`p-12 md:p-16 flex flex-col justify-center bg-black ${isEven ? 'order-1 border-r border-zinc-900' : 'order-2 md:order-2 border-l border-zinc-900'} relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.03] pointer-events-none" />

        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] bg-zinc-950 border border-zinc-900 text-orange-600 px-3 py-1 font-mono font-bold uppercase tracking-widest">
            PHASE_0{index + 1}
          </span>
          <div className="h-[1px] flex-1 bg-zinc-900" />
        </div>

        <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6">
          {step.title}
        </h3>
        <p className="text-lg text-zinc-500 font-mono leading-relaxed max-w-md">
          {step.description}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        style={{ x }}
        className={`bg-zinc-950 relative overflow-hidden h-[400px] md:h-auto ${isEven ? 'order-2' : 'order-1'} border-zinc-900 ${isEven ? '' : 'border-r'}`}
      >
        <PhysicsReveal
          className="w-full h-full"
          revealSize={250}
          cover={
            <div className="relative w-full h-full">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px] opacity-[0.1]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 border border-zinc-500/30 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-zinc-500" />
                </div>
              </div>
            </div>
          }
        >
          <div className="relative w-full h-full">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-orange-600/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none" />
          </div>
        </PhysicsReveal>

        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between">
            <div className="w-2 h-2 border border-zinc-500" />
            <div className="w-2 h-2 border border-zinc-500" />
          </div>
          <div className="flex justify-between">
            <div className="w-2 h-2 border border-zinc-500" />
            <div className="w-2 h-2 border border-zinc-500" />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 bg-black border-t border-l border-zinc-900 p-4 z-20 pointer-events-none">
          <span className="text-6xl font-black text-white/10 font-mono tracking-tighter">
            {step.number}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const EliteProcess = () => {
  return (
    <section className="py-40 bg-black border-b border-zinc-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 mb-10">
              <span className="w-2 h-2 bg-orange-600 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">
                Operational_Framework_v4
              </span>
            </div>
            <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter uppercase italic leading-[0.8] text-white">
              System <br /> <span className="text-zinc-800">Architecture.</span>
            </h2>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="border border-zinc-900">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteProcess;
