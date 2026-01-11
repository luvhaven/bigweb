'use client';

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Linkedin, Twitter, Github, Loader2 } from "lucide-react";
import { teamAPI, TeamMember as TeamMemberType } from "@/lib/api/team";

const TeamMember = ({ member, index }: { member: TeamMemberType; index: number }) => {
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
            src={member.avatar_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"}
            alt={member.name}
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
            style={{ rotate }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200";
            }}
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

const MOCK_TEAM: TeamMemberType[] = [
  {
    id: '1',
    name: 'Daniel Oriazowan',
    role: 'Lead Conversion Engineer',
    bio: 'Precision-focused engineer who treats every landing page as a high-stakes clinical trial. Daniel specializes in forensic funnel re-engineering and architecture.',
    avatar_url: '/images/team/daniel.jpg',
    is_active: true,
    sort_order: 1,
    linkedin_url: '#'
  },
  {
    id: '2',
    name: 'Dr. Elena Vance',
    role: 'Behavioral Psychologist',
    bio: 'Ph.D. in Cognitive Load Theory. Elena maps the hidden neurological friction points in your user journey to maximize conversion intent.',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800',
    is_active: true,
    sort_order: 2,
    linkedin_url: '#'
  },
  {
    id: '3',
    name: 'Julian Reed',
    role: 'UI/UX Architect',
    bio: 'Julian doesn\'t draw; he structures. He builds high-performance interfaces that reduce decision fatigue through technical hierarchy.',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800',
    is_active: true,
    sort_order: 3,
    linkedin_url: '#'
  },
  {
    id: '4',
    name: 'Sarah Jenkins',
    role: 'Load Speed Specialist',
    bio: 'Performance engineer obsessed with milliseconds. Sarah optimizes the technical stack to ensure sub-second response times across the laboratory ecosystem.',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800',
    is_active: true,
    sort_order: 4,
    linkedin_url: '#'
  }
];

export default function Team() {
  const [members, setMembers] = useState<TeamMemberType[]>(MOCK_TEAM);
  const [loading, setLoading] = useState(true);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await teamAPI.getAll();
        if (data && data.length > 0) {
          setMembers(data);
        }
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  return (
    <section id="team" className="py-32 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] text-[40rem] font-bold text-accent">
          LAB
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
          <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-accent font-bold mb-4">
            The Lab Personnel
          </h2>
          <p className="text-3xl md:text-5xl font-black tracking-tighter mb-6 uppercase leading-tight">
            Engineers, Not Artists. <br />
            <span className="text-accent">Outcome-Obsessed.</span>
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mb-8" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg italic border-l-2 border-accent/30 pl-6 text-left">
            "We don't build projects. We engineer revenue systems. Every pixel is a calculated variable in your growth equation."
          </p>
        </motion.div>

        {loading && members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
            <p className="text-accent font-mono text-sm animate-pulse">Scanning Personnel Records...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {members.map((member, index) => (
              <TeamMember key={member.id || index} member={member} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
