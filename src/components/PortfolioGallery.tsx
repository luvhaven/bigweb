'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "TechVision Platform",
    category: "Web Application",
    tags: ["React", "Node.js", "AI"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Luxe Fashion",
    category: "E-commerce",
    tags: ["Next.js", "Stripe", "Commerce"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 3,
    title: "HealthHub Mobile",
    category: "Mobile App",
    tags: ["React Native", "Healthcare", "API"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "FinanceFlow Dashboard",
    category: "SaaS Platform",
    tags: ["Vue.js", "Charts", "Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 5,
    title: "EduLearn Platform",
    category: "Education",
    tags: ["Angular", "Video", "LMS"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 6,
    title: "FoodieDelight",
    category: "Restaurant",
    tags: ["WordPress", "Booking", "Menu"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    color: "from-red-500 to-orange-500",
  },
];

const PortfolioItem = ({ item, index }: { item: typeof portfolioItems[0]; index: number }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ opacity, scale }}
      className="relative"
    >
      <Card
        className="group relative overflow-hidden bg-card border-border hover:border-accent transition-all duration-500 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <motion.div
            className="w-full h-full"
            style={{ y: y }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient overlay */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
            initial={false}
          />

          {/* Content overlay */}
          <motion.div
            className="absolute inset-0 bg-background/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-between"
            initial={false}
          >
            <div>
              <motion.h3
                className="text-2xl font-bold letter-spacing-wide mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="text-accent uppercase text-sm letter-spacing-wide mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {item.category}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {item.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-accent/20 text-accent border-accent/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="flex items-center gap-2 text-accent group-hover:text-foreground transition-colors duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <span className="text-sm uppercase letter-spacing-wide font-medium">View Project</span>
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

const PortfolioGallery = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden bg-secondary/30">
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(var(--accent), 0.03) 50px, rgba(var(--accent), 0.03) 51px),
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(var(--accent), 0.03) 50px, rgba(var(--accent), 0.03) 51px)
          `,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm md:text-base uppercase letter-spacing-wider text-accent font-medium mb-6">
            Portfolio Gallery
          </h2>
          <p className="text-2xl md:text-4xl font-bold letter-spacing-wide max-w-3xl mx-auto">
            A showcase of our finest work
          </p>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            Discover how we transform ideas into exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {portfolioItems.map((item, index) => (
            <PortfolioItem key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
