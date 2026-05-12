'use client'

import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import { createClient } from "@/lib/supabase/client";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { y: parallaxY } = useParallax(imageRef, { speed: 0.3, reverse: index % 2 === 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{ rotate: cardRotate }}
    >
      <Link href={`/project/${project.slug}`}>
        <Card className="group relative overflow-hidden bg-card border-border hover:border-accent transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-accent/20">
          <div ref={imageRef} className="aspect-[4/5] bg-secondary relative overflow-hidden">
            <motion.div
              className="w-full h-full"
              style={{ y: parallaxY, scale: imageScale }}
            >
              <img
                src={project.cover_image_url || 'https://images.unsplash.com/photo-1558002038-1091a1661116'}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
              whileHover={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.8 }}
            />
            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
              <motion.span
                className="text-foreground text-lg font-bold letter-spacing-wide"
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                VIEW CASE STUDY
              </motion.span>
            </div>
            {/* Results badge - using client_name or category as fallback if results not in DB */}
            <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              {project.client_name || 'Latest Work'}
            </div>
          </div>
          <motion.div
            className="p-8 transition-all duration-500"
            whileHover={{ backgroundColor: "rgba(15, 85, 55, 0.02)" }}
          >
            <h3 className="text-2xl font-bold letter-spacing-wide mb-2 group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm uppercase letter-spacing-wide text-muted-foreground mb-3">
              {project.category}
            </p>
            <p className="text-muted-foreground leading-relaxed transform transition-all duration-500 group-hover:text-foreground">
              {project.summary}
            </p>
          </motion.div>
        </Card>
      </Link>
    </motion.div>
  );
};

const FeaturedWorkNext = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [projects, setProjects] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      // Fetch ALL published projects without limit (or large limit like 100)
      const { data } = await supabase
        .from('cms_projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
      if (data) setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] text-[60rem] font-bold text-muted select-none">
          W
        </div>
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
            Featured Work
          </h2>
          <p className="text-2xl md:text-4xl font-bold letter-spacing-wide max-w-3xl mx-auto mb-4">
            Projects that drive real business results
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our latest work showing full database integration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkNext;
