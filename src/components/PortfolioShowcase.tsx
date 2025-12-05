'use client'

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Award, TrendingUp } from "lucide-react";
import karatImg from "@/assets/project-karat.jpg";
import stellarImg from "@/assets/project-stellar.jpg";
import innovateImg from "@/assets/project-innovate.jpg";
import velocityImg from "@/assets/project-velocity.jpg";

const projects = [
  {
    id: "karat",
    title: "Karat Financial",
    category: "Fintech Platform",
    description: "Revolutionary creator economy platform transforming digital entrepreneurship",
    image: karatImg,
    results: "+300% Revenue",
    metric: "$50M+ Generated",
    tags: ["Fintech", "React", "Node.js", "PostgreSQL"],
    color: "from-orange-500 to-red-600",
  },
  {
    id: "stellar",
    title: "Stellar Network",
    category: "Blockchain Infrastructure",
    description: "Next-generation payment rails powering the future of global finance",
    image: stellarImg,
    results: "$2B+ Processed",
    metric: "150+ Countries",
    tags: ["Blockchain", "Web3", "TypeScript", "GraphQL"],
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "innovate",
    title: "Innovate SaaS",
    category: "Enterprise Software",
    description: "AI-powered business intelligence platform for Fortune 500 companies",
    image: innovateImg,
    results: "45% Cost Reduction",
    metric: "500K+ Users",
    tags: ["AI/ML", "Next.js", "Python", "AWS"],
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "velocity",
    title: "Velocity Commerce",
    category: "E-commerce Platform",
    description: "Ultra-premium shopping experience with AR try-on technology",
    image: velocityImg,
    results: "+180% Conversions",
    metric: "$100M+ Sales",
    tags: ["E-commerce", "AR", "React", "Stripe"],
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "quantum",
    title: "Quantum Analytics",
    category: "Data Platform",
    description: "Real-time data visualization for enterprise decision-making",
    image: karatImg,
    results: "99.99% Uptime",
    metric: "10PB+ Data",
    tags: ["BigData", "React", "Python", "Kafka"],
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "nexus",
    title: "Nexus Health",
    category: "Healthcare Technology",
    description: "HIPAA-compliant telehealth platform serving 2M+ patients",
    image: stellarImg,
    results: "2M+ Patients",
    metric: "98% Satisfaction",
    tags: ["Healthcare", "HIPAA", "React", "WebRTC"],
    color: "from-teal-500 to-green-600",
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  variant?: "featured" | "grid";
}

const ProjectCard = ({ project, index, variant = "grid" }: ProjectCardProps) => {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Advanced parallax with varying speeds based on position
  const parallaxSpeed = variant === "featured" ? 0.4 : 0.3;
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -50 : -80, index % 2 === 0 ? 50 : 80]
  );
  const smoothY = useSpring(yParallax, { stiffness: 100, damping: 30 });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.3]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -1 : 1, 0, index % 2 === 0 ? 1 : -1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ 
        y: smoothY, 
        rotate: cardRotate,
        opacity
      }}
      className={variant === "featured" ? "mb-12" : ""}
    >
      <Link href={`/project/${project.id}`}>
        <Card className="group relative overflow-hidden bg-gradient-to-br from-card/80 to-card border border-border/50 hover:border-accent/50 transition-all duration-700 cursor-pointer backdrop-blur-xl">
          {/* Image Container */}
          <div ref={imageRef} className={`${variant === "featured" ? "aspect-[16/10]" : "aspect-[4/5]"} bg-gradient-to-br ${project.color} relative overflow-hidden`}>
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
            >
              <img
                src={project.image.src}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </motion.div>

            {/* Gradient Overlay */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-700`}
            />

            {/* Hover Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4"
              >
                <p className="text-muted-foreground text-sm md:text-base max-w-md">
                  {project.description}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-accent font-bold text-lg">View Case Study</span>
                  <ArrowUpRight className="w-5 h-5 text-accent" />
                </div>
              </motion.div>
            </div>

            {/* Results Badge */}
            <motion.div 
              className="absolute top-6 right-6 space-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <Badge className={`bg-gradient-to-r ${project.color} text-white border-none shadow-lg px-4 py-2 text-sm font-bold backdrop-blur-sm`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {project.results}
              </Badge>
              <Badge className="bg-background/90 backdrop-blur-md text-foreground border-accent/50 px-4 py-2 text-xs font-semibold block">
                <Award className="w-3 h-3 mr-1 inline" />
                {project.metric}
              </Badge>
            </motion.div>

            {/* Category Badge */}
            <Badge className="absolute top-6 left-6 bg-background/90 backdrop-blur-md text-foreground border-accent/50 px-4 py-2 text-xs uppercase letter-spacing-wider">
              {project.category}
            </Badge>
          </div>

          {/* Content */}
          <motion.div 
            className="p-8 space-y-4"
            whileHover={{ backgroundColor: "rgba(15, 85, 55, 0.02)" }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <h3 className="text-3xl font-bold letter-spacing-wide mb-2 group-hover:text-accent transition-colors duration-500 bg-gradient-to-r from-foreground to-accent bg-clip-text group-hover:text-transparent">
                {project.title}
              </h3>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="border-border/50 text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Hover Arrow */}
            <motion.div
              className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2"
            >
              <span className="text-sm font-semibold letter-spacing-wide">EXPLORE PROJECT</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Glow Effect */}
          <motion.div
            className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 -z-10`}
          />
        </Card>
      </Link>
    </motion.div>
  );
};

interface PortfolioShowcaseProps {
  variant?: "featured" | "grid";
  limit?: number;
}

const PortfolioShowcase = ({ variant = "grid", limit }: PortfolioShowcaseProps) => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] text-[60rem] font-bold text-muted select-none">
          P
        </div>
      </div>

      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <Badge className="bg-accent/10 text-accent border-accent/30 px-6 py-2 text-sm uppercase letter-spacing-wider">
              Portfolio Excellence
            </Badge>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold letter-spacing-wide max-w-4xl mx-auto mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Award-Winning Digital Experiences
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transformative projects that set industry standards and deliver exceptional ROI
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className={`grid ${variant === "featured" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"} gap-12 max-w-7xl mx-auto`}>
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
