'use client'

import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Baunfire transformed our digital presence completely. Their attention to detail and creative approach exceeded our expectations.",
    author: "Sarah Johnson",
    role: "CEO, Karat Financial",
    company: "Karat",
  },
  {
    quote: "Working with Baunfire was a game-changer. They delivered a stunning website that perfectly captures our brand essence.",
    author: "Michael Chen",
    role: "VP of Marketing, Stellar",
    company: "Stellar",
  },
  {
    quote: "The team's expertise in modern web technologies and design thinking is unmatched. Highly recommend their services.",
    author: "Emily Rodriguez",
    role: "Product Director, Innovate",
    company: "Innovate",
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 opacity-5 pointer-events-none"
      >
        <div className="absolute top-1/2 right-1/4 w-[40rem] h-[40rem] text-[40rem] font-bold text-muted select-none">
          "
        </div>
      </motion.div>

      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[120px] animate-glow" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm md:text-base uppercase letter-spacing-wider text-accent font-medium mb-6">
            Testimonials
          </h2>
          <p className="text-2xl md:text-4xl font-bold letter-spacing-wide max-w-3xl mx-auto">
            What our clients say about us
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Card className="group p-8 bg-card border-border hover:border-accent transition-all duration-500 h-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ scale: 0, rotate: 45 }}
          whileHover={{ scale: 1.5, rotate: 0 }}
          transition={{ duration: 0.6 }}
        />

        <div className="relative z-10">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <Quote className="w-10 h-10 text-accent mb-6 opacity-50" />
          </motion.div>

          <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
            "{testimonial.quote}"
          </p>

          <div>
            <p className="font-bold letter-spacing-wide text-foreground">
              {testimonial.author}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {testimonial.role}
            </p>
            <p className="text-sm text-accent mt-1 uppercase letter-spacing-wide">
              {testimonial.company}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default Testimonials;
