'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { PhysicsReveal } from "@/components/ui/PhysicsReveal";

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group h-full"
    >
      <PhysicsReveal
        className="h-full bg-black border-l border-zinc-900"
        revealSize={300}
        dampening={20}
        cover={
          <div className="relative h-full flex flex-col bg-black hover:bg-zinc-950 transition-colors duration-500">
            {/* Top Border Indicator */}
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900 group-hover:bg-orange-600 transition-colors duration-500" />

            {/* Number & Tech Header */}
            <div className="flex justify-between items-start p-8 border-b border-zinc-900">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-700 to-zinc-900 font-mono tracking-tighter">
                {service.number}
              </span>
              <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                SYS_MOD_{service.number}
              </span>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex-1 flex flex-col justify-between relative overflow-hidden">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.05]" />

              <div className="relative z-10 mb-20">
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-6 group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
                <p className="text-sm font-mono text-zinc-500 uppercase tracking-wide leading-relaxed max-w-sm">
                  // {service.description}
                </p>
              </div>

              {/* Bottom Tech */}
              <div className="relative z-10 flex justify-between items-end border-t border-zinc-900 pt-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 h-3 ${i < 3 ? 'bg-orange-600' : 'bg-zinc-800'}`} />
                  ))}
                </div>

                <div className="p-3 bg-zinc-900 text-zinc-500 md:group-hover:bg-orange-600 md:group-hover:text-white transition-colors duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        }
      >
        {/* REVEALED CONTENT (Tech Blueprint Mode) */}
        <div className="relative h-full flex flex-col bg-zinc-950">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:20px_20px] opacity-[0.15] border-l border-orange-600/30" />
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />

          {/* Header */}
          <div className="flex justify-between items-start p-8 border-b border-orange-900/30 relative z-10">
            <span className="text-4xl font-black text-orange-600 font-mono tracking-tighter mix-blend-screen">
              {service.number}
            </span>
            <span className="px-2 py-1 bg-orange-600/20 text-orange-500 text-[10px] font-mono font-bold uppercase tracking-widest border border-orange-600/30">
              ACTIVE_NODE
            </span>
          </div>

          {/* Body */}
          <div className="p-8 md:p-12 flex-1 flex flex-col justify-between relative z-10">
            <div className="mb-20">
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-6 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
                {service.title}
              </h3>
              <div className="space-y-2">
                <div className="h-2 w-full bg-orange-600/20 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-600 w-2/3 animate-progress" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-orange-400 uppercase">
                  <span>Capacity</span>
                  <span>98%</span>
                </div>
              </div>
            </div>

            {/* Bottom Tech */}
            <div className="flex justify-between items-end border-t border-orange-900/30 pt-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)] animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <div className="p-3 bg-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </PhysicsReveal>
    </motion.div>
  );
};

const EliteServices = () => {
  return (
    <section className="py-20 md:py-40 bg-black border-b border-zinc-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 mb-10">
              <span className="w-2 h-2 bg-orange-600 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">
                Core_Capabilities_v2
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-[8rem] font-black tracking-tighter uppercase italic leading-[0.8] text-white">
              Tactical <br /> <span className="text-zinc-800">Deployment.</span>
            </h2>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteServices;
