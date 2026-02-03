'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { PhysicsReveal } from "@/components/ui/PhysicsReveal";

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
    <section ref={ref} className="py-40 bg-black relative overflow-hidden border-t border-b border-zinc-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 mb-10">
              <Quote className="w-4 h-4 text-orange-600" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">
                Client_Verification_Log
              </span>
            </div>
            <h2 className="text-5xl md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-12">
              Success <br />
              <span className="text-zinc-800">Protocol.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Image with Industrial Frame */}
          <div className="relative pt-12 pl-12">
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-orange-600 z-20" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-zinc-800 z-20" />

            <motion.div
              style={{ y }}
              className="relative z-10 bg-zinc-900 aspect-[3/4] overflow-hidden border border-zinc-800"
            >
              <PhysicsReveal
                className="w-full h-full"
                revealSize={250}
                cover={
                  <div className="relative w-full h-full">
                    <div className="absolute top-4 left-4 z-30 bg-black/80 backdrop-blur border border-zinc-800 px-4 py-2">
                      <span className="font-mono text-[9px] text-white uppercase tracking-widest">
                        ID: {activeTestimonial.author.split(' ')[0]}_0{activeIndex + 1}
                      </span>
                    </div>

                    <motion.img
                      key={activeIndex}
                      src={activeTestimonial.image}
                      alt={activeTestimonial.author}
                      className="w-full h-full object-cover grayscale opacity-80"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 0.8, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                }
              >
                <div className="relative w-full h-full">
                  <motion.img
                    key={`reveal-${activeIndex}`}
                    src={activeTestimonial.image}
                    alt={`${activeTestimonial.author} Revealed`}
                    className="w-full h-full object-cover contrast-125"
                  />
                  <div className="absolute inset-0 bg-orange-600/10 mix-blend-color-dodge" />
                  <div className="absolute top-4 right-4 z-30 font-mono text-[8px] text-orange-500 bg-black/50 px-2 py-1 border border-orange-500/30">
                    IDENTITY_CONFIRMED
                  </div>
                </div>
              </PhysicsReveal>

              {/* Tech Overlays */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end p-8 pointer-events-none">
                <div className="w-full h-[1px] bg-zinc-800 mb-4" />
              </div>
            </motion.div>
          </div>

          {/* Right: Content */}
          <div className="space-y-12 pt-12 self-center">
            <motion.div
              key={`content-${activeIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-4 mb-8">
                <Quote className="w-8 h-8 text-orange-600 transform flip-x" />
                <div className="h-[1px] flex-1 bg-zinc-900 mt-4" />
              </div>

              <blockquote className="text-3xl md:text-4xl font-black text-white uppercase leading-tight tracking-tight mb-10">
                "{activeTestimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-6 border-t border-zinc-900 pt-8">
                <div className="w-12 h-12 bg-zinc-950 border border-zinc-900 flex items-center justify-center text-zinc-700 font-black">
                  0{activeIndex + 1}
                </div>
                <div>
                  <div className="text-xl font-bold text-white uppercase tracking-wide">
                    {activeTestimonial.author}
                  </div>
                  <div className="text-xs text-orange-600 font-mono uppercase tracking-widest">
                    {activeTestimonial.role} // {activeTestimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center gap-px border border-zinc-900 w-fit">
              <button
                onClick={handlePrev}
                className="w-16 h-16 flex items-center justify-center bg-black hover:bg-orange-600 hover:text-white text-zinc-500 transition-all duration-300 group border-r border-zinc-900"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleNext}
                className="w-16 h-16 flex items-center justify-center bg-black hover:bg-orange-600 hover:text-white text-zinc-500 transition-all duration-300 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteTestimonials;
