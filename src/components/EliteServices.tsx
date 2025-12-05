'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Brand & Identity",
    description: "Comprehensive brand systems that define and elevate your market presence",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=90",
    number: "01"
  },
  {
    title: "Web Development",
    description: "High-performance websites built with cutting-edge technology and design",
    image: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=90",
    number: "02"
  },
  {
    title: "Digital Products",
    description: "User-centered applications that solve real problems and drive engagement",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90",
    number: "03"
  },
  {
    title: "E-commerce",
    description: "Conversion-optimized online stores that maximize revenue and user experience",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90",
    number: "04"
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      initial={{ y: 60 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group hover-lift"
    >
      <div className="relative overflow-hidden cursor-pointer glass rounded-2xl gradient-border">
        {/* Image */}
        <motion.div
          className="aspect-[4/5] relative overflow-hidden bg-secondary"
          style={{ y }}
        >
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />

          {/* Number */}
          <div className="absolute top-8 left-8 text-white/40 text-6xl font-bold font-mono">
            {service.number}
          </div>

          {/* Hover Arrow */}
          <motion.div
            className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowUpRight className="w-8 h-8 text-accent" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="p-8 relative z-10">
          <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors duration-300 reveal-text">
            {service.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const EliteServices = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <p className="text-sm uppercase tracking-widest text-accent mb-4">What We Master</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteServices;
