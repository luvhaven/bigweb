'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Discovery",
    description: "We dive deep into understanding your business goals, target audience, and competitive landscape.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Design",
    description: "Our designers craft beautiful, intuitive interfaces that align with your brand and engage users.",
  },
  {
    icon: Code,
    number: "03",
    title: "Development",
    description: "We build with cutting-edge technologies, ensuring performance, scalability, and maintainability.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    description: "We deploy your project with precision and provide ongoing support to ensure continued success.",
  },
];

const Process = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-secondary/20">
      {/* Parallax decorative elements */}
      <motion.div
        style={{ y, rotate }}
        className="absolute top-1/4 right-1/4 w-96 h-96 border-2 border-accent/10 rounded-full"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-1/4 left-1/4 w-64 h-64 border-2 border-accent/10 rounded-full"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-sm md:text-base uppercase letter-spacing-wider text-accent font-medium mb-6">
            Our Process
          </h2>
          <p className="text-2xl md:text-4xl font-bold letter-spacing-wide max-w-3xl mx-auto">
            How we bring your vision to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessStep = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Connection line - only show on desktop for steps that aren't last */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
          className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-accent/20 origin-left"
        />
      )}

      <div className="relative">
        {/* Number */}
        <motion.div
          className="text-7xl font-bold text-accent/10 absolute -top-4 -left-4 group-hover:text-accent/20 transition-colors duration-500"
          whileHover={{ scale: 1.1 }}
        >
          {step.number}
        </motion.div>

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-20 h-20 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-all duration-500 flex items-center justify-center mb-6"
        >
          <Icon className="w-10 h-10 text-accent" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold letter-spacing-wide mb-4 group-hover:text-accent transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

export default Process;
