'use client'

import { Card } from "@/components/ui/card";
import { Palette, Code, Search, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: Palette,
    title: "Design",
    description: "Beautiful, user-centered interfaces that captivate and convert",
  },
  {
    icon: Code,
    title: "Development",
    description: "Clean, scalable code built with modern technologies",
  },
  {
    icon: Search,
    title: "Strategy",
    description: "Data-driven insights to guide digital transformation",
  },
  {
    icon: Smartphone,
    title: "Mobile",
    description: "Responsive experiences that work flawlessly everywhere",
  },
];

const Services = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="services" className="py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm md:text-base uppercase letter-spacing-wider text-accent font-medium mb-6">
            Our Services
          </h2>
          <p className="text-2xl md:text-4xl font-bold letter-spacing-wide max-w-3xl mx-auto">
            What we do best
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ServiceCard key={index} service={service} Icon={Icon} index={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, Icon, index }: { service: typeof services[0]; Icon: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="group p-8 bg-card border-border hover:border-accent transition-all duration-500 text-center h-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-all duration-500 relative z-10"
        >
          <Icon className="w-8 h-8 text-accent" />
        </motion.div>

        <h3 className="text-xl font-bold letter-spacing-wide mb-4 group-hover:text-accent transition-colors duration-300 relative z-10">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300 relative z-10">
          {service.description}
        </p>
      </Card>
    </motion.div>
  );
};

export default Services;
