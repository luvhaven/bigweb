'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    <section ref={ref} className="py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={isMounted ? { y } : {}}
          >
            <p className="text-sm uppercase tracking-widest text-accent mb-6">About Us</p>

            <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight max-w-xl">
              We Build Revenue Engines, Not Just Websites
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              <p>
                <strong className="text-foreground">Every line of code. Every design decision. Every pixel.</strong> Engineered to convert visitors into customers and drive measurable business results. We're not your typical agency—we're your growth partner with skin in the game.
              </p>

              <p>
                Since 2010, we've helped 250+ companies—from ambitious startups to Fortune 500 giants—dominate their markets. Using Next.js 15, React 19, and AI-powered optimization, we build experiences that don't just look amazing—they perform even better.
              </p>

              <p>
                Our secret? We obsess over data, test relentlessly, and optimize continuously. <strong className="text-foreground">The result? Websites that generate over $50M in client revenue and counting.</strong>
              </p>
            </div>

            <motion.div
              ref={statsRef}
              className="mt-12 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div>
                <div className="text-5xl font-bold text-accent mb-2">
                  <span className="stat-number" data-target="15">15</span>+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Years</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent mb-2">
                  <span className="stat-number" data-target="250">250</span>+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Clients</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-accent mb-2">
                  $<span className="stat-number" data-target="50">50</span>M+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Revenue</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            ref={imageRef}
            className="relative"
            style={isMounted ? { y: imageY, scale } : {}}
          >
            <div className="aspect-[3/4] relative overflow-hidden rounded-3xl">
              <motion.img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=90"
                alt="Team"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            {/* Floating Card */}
            <motion.div
              className="absolute -bottom-8 -left-8 glass-strong rounded-2xl p-8 max-w-xs border border-white/20 hover:border-accent/40 transition-colors duration-300"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-accent to-accent-light bg-clip-text text-transparent">98%</div>
              <div className="text-sm text-foreground/80">
                Client satisfaction rate across all projects
              </div>
              {/* Subtle glow */}
              <div className="absolute inset-0 -z-10 bg-accent/10 blur-xl rounded-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EliteAbout;
