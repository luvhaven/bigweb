'use client'

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Linkedin, Twitter, Github } from "lucide-react";

export interface TeamMemberProfile {
  id?: string
  name: string
  role: string
  bio: string
  photo_url: string
  linkedin_url?: string
  twitter_url?: string
}

const defaultTeam: TeamMemberProfile[] = [
  {
    name: "Sarah Chen",
    role: "Creative Director",
    bio: "Visionary designer with 10+ years shaping digital experiences",
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    linkedin_url: "#",
    twitter_url: "#"
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack architect building scalable web solutions",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin_url: "#",
    twitter_url: "#"
  },
  {
    name: "Emily Watson",
    role: "UX Strategist",
    bio: "Human-centered designer crafting intuitive interfaces",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    linkedin_url: "#",
    twitter_url: "#"
  },
  {
    name: "David Kim",
    role: "Technical Lead",
    bio: "Innovation expert driving cutting-edge solutions",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkedin_url: "#",
    twitter_url: "#"
  },
];

interface TeamProps {
  members?: TeamMemberProfile[]
}

const TeamMember = ({ member, index }: { member: TeamMemberProfile; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ y }}
    >
      <Card className="group relative overflow-hidden bg-card border-border hover:border-accent transition-all duration-500 cursor-pointer">
        <div className="aspect-square relative overflow-hidden">
          <motion.img
            src={member.photo_url}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            style={{ rotate }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

          {/* Social Links Overlay */}
          <motion.div
            className="absolute inset-0 bg-accent/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          >
            {member.linkedin_url && (
              <motion.a
                href={member.linkedin_url}
                className="text-primary-foreground hover:text-background transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            )}
            {member.twitter_url && (
              <motion.a
                href={member.twitter_url}
                className="text-primary-foreground hover:text-background transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <Twitter className="w-6 h-6" />
              </motion.a>
            )}
          </motion.div>
        </div>

        <motion.div
          className="p-6"
          whileHover={{ backgroundColor: "rgba(15, 85, 55, 0.05)" }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold letter-spacing-wide mb-1 group-hover:text-accent transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-sm uppercase letter-spacing-wide text-accent mb-3">
            {member.role}
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {member.bio}
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
};

const Team = ({ members = defaultTeam }: TeamProps) => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const displayMembers = members.length > 0 ? members : defaultTeam

  return (
    <section id="team" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] text-[60rem] font-bold text-muted select-none">
          T
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
            Our Team
          </h2>
          <p className="text-2xl md:text-4xl font-bold letter-spacing-wide max-w-3xl mx-auto">
            Meet the creative minds behind BIGWEB
          </p>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            A diverse team of designers, developers, and strategists united by passion for excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {displayMembers.map((member, index) => (
            <TeamMember key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
