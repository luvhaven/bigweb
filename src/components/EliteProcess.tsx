'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
  const x = useTransform(scrollYProgress, [0, 1], [isEven ? -50 : 50, isEven ? 50 : -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={isMounted ? { opacity } : {}}
      className={`grid md:grid-cols-2 gap-16 items-center mb-32 last:mb-0 ${isEven ? '' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={isEven ? 'order-1' : 'order-2'}
      >
        <div className="text-8xl font-bold text-accent/20 mb-4">
          {step.number}
        </div>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {step.title}
        </h3>
        <p className="text-xl text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </motion.div>

      {/* Image */}
      <motion.div
        style={{ x }}
        className={isEven ? 'order-2' : 'order-1'}
      >
        <div className="aspect-[4/3] relative overflow-hidden group">
          <motion.img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const EliteProcess = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-accent mb-4">Our Approach</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A proven process that delivers exceptional results, every time
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteProcess;
