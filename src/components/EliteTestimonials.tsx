'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Baunfire transformed our entire digital presence. The attention to detail and creative thinking exceeded all expectations. They're true partners in every sense.",
    author: "Sarah Chen",
    role: "CEO",
    company: "Karat Financial",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=90",
    logo: "/assets/logo-karat.png"
  },
  {
    quote: "Working with this team was transformative. They brought our vision to life with technical excellence and design brilliance. The results speak for themselves.",
    author: "Michael Torres",
    role: "VP of Product",
    company: "Stellar Networks",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=90",
    logo: "/assets/logo-stellar.png"
  },
  {
    quote: "The best agency we've worked with. They understand both business and technology, creating solutions that drive real value. Highly recommended.",
    author: "Emily Rodriguez",
    role: "Director of Marketing",
    company: "Innovate SaaS",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=90",
    logo: "/assets/logo-innovate.png"
  },
];

const EliteTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={ref} className="py-32 bg-secondary/20 relative overflow-hidden">
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
            <p className="text-sm uppercase tracking-widest text-accent mb-4">Testimonials</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Client Stories
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Hear from the companies we've helped transform
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            style={{ y }}
            className="relative"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <motion.img
                key={activeIndex}
                src={activeTestimonial.image}
                alt={activeTestimonial.author}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Quote Icon Overlay */}
              <div className="absolute top-8 left-8">
                <Quote className="w-16 h-16 text-white/20" fill="currentColor" />
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-8">
            <motion.div
              key={`content-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-foreground">
                "{activeTestimonial.quote}"
              </blockquote>

              <div className="space-y-2">
                <div className="text-xl font-bold">
                  {activeTestimonial.author}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {activeTestimonial.role}, {activeTestimonial.company}
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center gap-4 pt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 flex items-center justify-center border border-border hover:border-accent hover:text-accent transition-all duration-300 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 transition-all duration-300 ${
                      index === activeIndex ? 'w-12 bg-accent' : 'w-6 bg-border hover:bg-accent/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 flex items-center justify-center border border-border hover:border-accent hover:text-accent transition-all duration-300 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteTestimonials;
