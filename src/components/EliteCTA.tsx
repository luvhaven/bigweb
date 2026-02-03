'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <section ref={ref} className="py-48 relative overflow-hidden bg-black border-t border-zinc-900 border-b">
      {/* Premium Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 bg-black"
        style={isMounted ? { scale } : {}}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
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
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-12">
              Secure_The_Model
            </div>

            <h2 className="text-6xl md:text-[9.5rem] font-black text-white tracking-tighter mb-16 leading-[0.75] uppercase italic">
              Stop <span className="text-zinc-800">Bleeding.</span>
            </h2>

            <p className="text-2xl md:text-5xl text-zinc-500 font-medium leading-none tracking-tight max-w-5xl mx-auto mb-20">
              Your digital infrastructure is hemorrhaging capital. Deploy our <span className="text-white italic underline underline-offset-8 decoration-orange-600">Clinical_Diagnostic</span> to remediate today.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/offers/revenue-roadmap" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-80 h-24 rounded-none bg-orange-600 text-white hover:bg-orange-500 font-black text-[12px] uppercase tracking-[0.5em] transition-all duration-300"
                >
                  INITIALIZE_AUDIT_v1
                  <ArrowRight className="ml-4 w-5 h-5" />
                </Button>
              </Link>

              <Link href="/case-studies" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-80 h-24 rounded-none bg-zinc-950 text-white border border-zinc-900 hover:bg-white hover:text-black font-black text-[12px] uppercase tracking-[0.5em] transition-all duration-300"
                >
                  VIEW_LOGS
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default EliteCTA;
