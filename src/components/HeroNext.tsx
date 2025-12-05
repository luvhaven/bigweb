'use client'

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroNext = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-normal leading-tight mb-12"
          >
            A digital agency focused on web.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-foreground text-foreground letter-spacing-wide px-8 py-6"
              >
                GET TO KNOW US
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroNext;
