'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const EliteCTA = () => {
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      {/* Premium Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={isMounted ? { scale } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-10" />
        <motion.img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90"
          alt="CTA Background"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {/* Gradient overlay mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-orange-500/10 z-10" />
      </motion.div>

      <motion.div
        className="container mx-auto px-6 relative z-20"
        style={isMounted ? { y } : {}}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-widest text-accent mb-6">
              Let's Work Together
            </p>

            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
              Stop Losing Money to Bad UX
            </h2>

            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
              Your website should be your best salesperson. Join Fortune 500 companies and fast-growing startups who trust us to <strong className="text-white">turn traffic into revenue.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div className="magnetic-wrap" whileHover={{ scale: 1.05 }}>
                <div className="magnetic-area"></div>
                <motion.a
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-accent via-accent-light to-accent text-white rounded-xl hover:shadow-2xl hover:shadow-accent/40 transition-all duration-500 text-sm uppercase tracking-widest font-semibold overflow-hidden hover-glow"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
                  />
                  <span className="relative z-10">Get Free Growth Audit</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.a>
              </motion.div>

              <motion.div className="magnetic-wrap" whileHover={{ scale: 1.05 }}>
                <div className="magnetic-area"></div>
                <motion.a
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-12 py-6 rounded-xl glass-strong border-2 border-white/30 text-white hover:bg-white/10 hover:border-white hover:shadow-xl transition-all duration-500 text-sm uppercase tracking-widest font-semibold"
                  whileTap={{ scale: 0.98 }}
                >
                  See Our Results
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default EliteCTA;
