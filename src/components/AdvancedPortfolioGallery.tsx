'use client'

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getVisibleProjects, initializeDataStore, type Project } from "@/lib/dataStore";

interface ProjectCardProps {
  project: Project;
  index: number;
  column: 'left' | 'right';
}

const ProjectCard = ({ project, index, column }: ProjectCardProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax with more varied speeds
  // Create unique speed for each project based on index
  const speedMultipliers = [0.3, 0.5, 0.4, 0.6, 0.35, 0.55, 0.45, 0.5, 0.4, 0.6];
  const baseSpeed = column === 'left' ? 100 : 140;
  const speed = baseSpeed * speedMultipliers[index % speedMultipliers.length];
  const parallaxRange = [-speed, speed];
  const yRaw = useTransform(scrollYProgress, [0, 1], parallaxRange);
  const y = useSpring(yRaw, { stiffness: 80, damping: 25 });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="group mb-48"
    >
      <Link href={`/project/${project.id}`}>
        <div className="relative overflow-hidden cursor-pointer">
          {/* Image Container - Large and spacious */}
          <div className="aspect-[4/5] relative overflow-hidden bg-secondary/20">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Subtle overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm uppercase tracking-widest">View Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>

            {/* Year badge */}
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 text-white text-xs font-medium uppercase tracking-wider">
              {project.year}
            </div>
          </div>

          {/* Content - Clean and spacious */}
          <div className="pt-6">
            <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              {project.category}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const AdvancedPortfolioGallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    initializeDataStore();
    setProjects(getVisibleProjects());
    
    // Listen for data changes
    const handleStorageChange = () => {
      setProjects(getVisibleProjects());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const leftColumn = projects.filter((_, index) => index % 2 === 0);
  const rightColumn = projects.filter((_, index) => index % 2 === 1);

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header with generous spacing */}
        <div className="mb-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-widest text-accent mb-6">Portfolio</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-none">
              Our Work
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A collection of projects that showcase our expertise in digital design and development
            </p>
          </motion.div>
        </div>

        {/* Two Column Gallery with Differential Parallax */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Slower parallax */}
          <div>
            {leftColumn.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                column="left"
              />
            ))}
          </div>

          {/* Right Column - Faster parallax, offset start */}
          <div className="md:mt-48">
            {rightColumn.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                column="right"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedPortfolioGallery;
