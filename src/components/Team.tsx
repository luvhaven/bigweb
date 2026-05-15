'use client'

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Linkedin, Twitter, ArrowUpRight } from "lucide-react"
import { teamAPI, TeamMember as TeamMemberType } from "@/lib/api/team"
import KineticTypography from "./effects/KineticTypography"
import Link from "next/link"

const MOCK_TEAM: TeamMemberType[] = [
  {
    id: '1',
    name: 'Daniel Oriazowan',
    role: 'Founder & Lead Frontend Developer',
    bio: 'Precision-focused engineer treating every platform as high-stakes digital infrastructure. Ex-enterprise architect.',
    avatar_url: '/images/team/daniel.jpg',
    is_active: true,
    sort_order: 1,
    linkedin_url: '#'
  },
  {
    id: '2',
    name: 'Elena Vance',
    role: 'Director of Conversion Design',
    bio: 'Ph.D. in Cognitive Load Theory. Elena maps the hidden neurological friction points in your user journey.',
    avatar_url: '/images/team/elena.png',
    is_active: true,
    sort_order: 2,
    linkedin_url: '#'
  },
  {
    id: '3',
    name: 'Chidi Okonkwo',
    role: 'Head of Engineering',
    bio: 'Architect of every BIGWEB platform — from sub-second Next.js deployments to custom AI agents. Believes that performance is not a feature; it is the product.',
    avatar_url: '/images/team/chidi.png',
    is_active: true,
    sort_order: 3,
    linkedin_url: '#'
  },
  {
    id: '4',
    name: 'Tomiwa Lawal',
    role: 'Head of Human Resources',
    bio: 'Dedicated HR professional ensuring the team stays aligned and performing at its best.',
    avatar_url: '/images/team/tomiwa.png',
    is_active: true,
    sort_order: 4,
    linkedin_url: '#'
  },
  {
    id: '5',
    name: 'Victoria Alabi',
    role: 'Lead AI & Automation Engineer',
    bio: 'Pioneering intelligent automation and custom AI agents that scale client operations effortlessly. Believes AI is the ultimate revenue multiplier.',
    avatar_url: '/images/team/victoria.png',
    is_active: true,
    sort_order: 5,
    linkedin_url: '#'
  },
  {
    id: '6',
    name: 'James Chen',
    role: 'Head of Analytics & SEO',
    bio: 'Data scientist who builds the attribution models and search strategies that dictate exactly where your next dollar comes from.',
    avatar_url: '/images/team/james.png',
    is_active: true,
    sort_order: 6,
    linkedin_url: '#'
  }
]

const TeamMember = ({ member, index }: { member: TeamMemberType; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      {/* Avatar Frame */}
      <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#070707] rounded-3xl border border-white/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#040404] z-10 opacity-60" />

        <motion.img
          src={member.avatar_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"}
          alt={member.name}
          className="w-full h-full object-cover object-top filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-out scale-100 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            const fallback = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200";
            if (!target.getAttribute('data-fallback')) {
              target.setAttribute('data-fallback', 'true');
              target.src = fallback;
            }
          }}
        />

        {/* Social Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
          <div className="flex gap-2">
            {member.linkedin_url && (
              <Link href={member.linkedin_url} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors duration-300">
                <Linkedin className="w-4 h-4" />
              </Link>
            )}
            {member.twitter_url && (
              <Link href={member.twitter_url} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors duration-300">
                <Twitter className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-2">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-3">
          {member.role}
        </div>
        <h3 className="text-2xl font-display tracking-tight text-white mb-3 group-hover:text-zinc-300 transition-colors">
          {member.name}
        </h3>
        <p className="text-sm text-zinc-500 leading-relaxed font-light">
          {member.bio}
        </p>
      </div>
    </motion.div>
  )
}

export default function Team({ members: initialMembers }: { members?: TeamMemberType[] } = {}) {
  const [members, setMembers] = useState<TeamMemberType[]>(initialMembers || MOCK_TEAM)
  const headerRef = useRef(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  useEffect(() => {
    // Skip API call if data was passed from server
    if (initialMembers && initialMembers.length > 0) return
    async function loadTeam() {
      try {
        const data = await teamAPI.getAll()
        if (data && data.length > 0) setMembers(data)
      } catch {
        // Keep mock team
      }
    }
    loadTeam()
  }, [initialMembers])

  return (
    <section className="py-32 md:py-48 relative overflow-hidden bg-[#040404] border-t border-white/[0.04]">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-accent/[0.02] rounded-full blur-[150px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

        {/* Tech grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl">
        {/* Header Phase */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
                Leadership Team
              </span>
            </span>

            <KineticTypography
              segments={[
                { text: 'Engineers. Strategists. ' },
                { text: 'Revenue operators.', className: 'italic text-zinc-500' }
              ]}
              as="h2"
              className="font-display text-4xl md:text-5xl lg:text-7xl tracking-tighter text-white leading-[1.05]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6 max-w-xs"
          >
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              We don't hire junior designers and disguise them as seniors. You work directly with the architects who build the systems.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white hover:text-accent transition-colors group">
              Work with the team
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {members.map((member, index) => (
            <TeamMember key={member.id || index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
