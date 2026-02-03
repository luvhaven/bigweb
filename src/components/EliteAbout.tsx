'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from 'gsap';
import { GitBranch, Binary, Globe, Activity, TrendingUp } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { MouseReveal, RevealPatterns } from '@/components/ui/MouseReveal';
import { PhysicsReveal } from '@/components/ui/PhysicsReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EliteAbout = () => {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP text reveal animation
  useEffect(() => {
    if (!headingRef.current) return;

    const words = headingRef.current.textContent?.split(' ') || [];
    headingRef.current.innerHTML = words
      .map((word) => `<span style="display: inline-block; opacity: 0; white-space: nowrap;">${word}&nbsp;</span>`)
      .join('');

    const spans = headingRef.current.querySelectorAll('span');

    gsap.to(spans, {
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, []);

  // GSAP stats counter animation
  useEffect(() => {
    if (!statsRef.current) return;

    const numbers = statsRef.current.querySelectorAll('.stat-number');

    numbers.forEach((num) => {
      const target = parseInt(num.getAttribute('data-target') || '0');
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: function () {
          num.textContent = Math.ceil(obj.value).toString();
        }
      });
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(imageProgress, [0, 1], [-50, 50]);
  const scale = useTransform(imageProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section id="about" className="relative bg-secondary/30">
      <MouseReveal
        revealContent={<RevealPatterns.Grid />}
        revealSize={400}
        className="py-32"
      >
        <div ref={ref} className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={isMounted ? { y } : {}}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-10">
                <GitBranch className="w-4 h-4" /> System_Identity_0xc1
              </div>

              <h2 ref={headingRef} className="text-6xl md:text-[8rem] font-black tracking-tighter mb-12 leading-[0.75] uppercase italic text-white">
                Engineering <br /><span className="text-zinc-800">Revenue.</span>
              </h2>

              <div className="space-y-6 text-2xl md:text-3xl text-zinc-500 font-medium leading-[1.1] max-w-2xl">
                <p>
                  <strong className="text-white italic underline underline-offset-8 decoration-zinc-800">Every line of code</strong>. Every design decision. Every pixel. Deployed to extract measurable yield.
                </p>

                <p>
                  Since 2017, we have engineered environments for cohorts ranging from <span className="text-white italic">Aggressive_Startups</span> to Fortune 500 giants.
                </p>

                <p>
                  Clinical execution logs show <span className="text-white font-bold italic">$50M+ in realized revenue</span> for our partners. No fluff. Just engineering.
                </p>
              </div>

              <motion.div
                ref={statsRef}
                className="mt-16 grid grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {[
                  { label: "OPERATIONAL_TIME", value: "8", suffix: "Y", icon: Activity },
                  { label: "ACTIVE_NODES", value: "250", suffix: "+", icon: Globe },
                  { label: "REVENUE_YIELD", value: "50", prefix: "$", suffix: "M+", icon: TrendingUp }
                ].map((stat, i) => (
                  <div key={i} className="bg-black p-8 group/stat">
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest">{stat.label}</div>
                      <stat.icon className="w-4 h-4 text-zinc-800 group-hover/stat:text-orange-600 transition-colors" />
                    </div>
                    <div className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                      {stat.prefix}<span className="stat-number" data-target={stat.value}>0</span>{stat.suffix}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              ref={imageRef}
              className="relative"
              style={isMounted ? { y: imageY, scale } : {}}
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-zinc-950 border border-zinc-900 group">
                <PhysicsReveal
                  className="w-full h-full"
                  revealSize={250}
                  cover={
                    <motion.img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=90"
                      alt="Team"
                      className="w-full h-full object-cover grayscale opacity-50 contrast-125 transition-transform duration-700 group-hover:scale-105"
                    />
                  }
                >
                  <div className="relative w-full h-full">
                    <motion.img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=90"
                      alt="Team Revealed"
                      className="w-full h-full object-cover contrast-125 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-orange-600/10 mix-blend-color-dodge pointer-events-none" />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:10px_10px] opacity-[0.2]" />
                  </div>
                </PhysicsReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-12 -left-12 bg-zinc-950 p-10 max-w-xs border border-zinc-900 hover:border-orange-600 transition-all duration-500 shadow-2xl z-20"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 text-zinc-600 text-[8px] font-mono font-bold uppercase tracking-widest mb-6">
                  <Binary className="w-3 h-3" /> Operational_Integrity
                </div>
                <div className="text-6xl font-black mb-4 text-white italic tracking-tighter leading-none">98%</div>
                <div className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                  Systemic stability and partner retention metrics.
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </MouseReveal>
    </section>
  );
};

export default EliteAbout;
