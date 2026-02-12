'use client'

import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Code, Smartphone, ShoppingCart, Search, BarChart3, Palette, Brain, TrendingUp, Bot, Shield, Users, ChevronDown, Sparkles, Zap, Layers, RefreshCw, Rocket, Terminal, GitBranch, Microscope, ShieldCheck, Cpu, FlaskConical, Target, Globe, Lock, CheckCircle2, AlertCircle, MessageSquare, Fingerprint, Network, Database, Beaker } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/branding/BrandLogo";
import MobileMenuOverlay from "@/components/layout/MobileMenuOverlay";
import { useGlobalContent } from "@/context/GlobalContentContext";
import TextScramble from "@/components/ui/TextScramble";

const AdvancedNavigation = () => {
  const pathname = usePathname();
  const { settings, navigation } = useGlobalContent() || { settings: {}, navigation: [] };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse tracking for target effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const springConfig = { damping: 20, stiffness: 300 };
  const targetX = useSpring(mouseX, springConfig);
  const targetY = useSpring(mouseY, springConfig);

  // Icon mapping for dynamic Lucide icons
  const iconMap: Record<string, any> = {
    Terminal, GitBranch, ShieldCheck, Cpu, Microscope, Search, Zap, Rocket, FlaskConical, Code, Smartphone, ShoppingCart, BarChart3, Palette, Brain, TrendingUp, Bot, Shield, Users, Sparkles, Layers, RefreshCw, Target, Globe, Lock, CheckCircle2, AlertCircle, MessageSquare, Fingerprint, Network, Database, Beaker
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string | null | undefined) => {
    if (!href) return;

    if (href.startsWith('/#')) {
      if (pathname === '/') {
        e.preventDefault();
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsMenuOpen(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hardcoded structure based on UI screenshots
  const hardcodedNav = [
    {
      id: 'capabilities',
      label: 'Capabilities',
      url: '/services',
      children: [
        {
          id: 'cap1',
          label: 'Conversion-First Website Engineering',
          description: 'We design and build websites engineered to guide decisions, remove friction, and...',
          icon: 'Code',
          url: '/services/web-development',
          tags: ['UI/UX DESIGN', 'FRONTEND/BACKEND', 'SPEED OPTIMIZATION', 'MOBILE ARCHITECTURE', 'CONVERSION LAYOUTS']
        },
        {
          id: 'cap2',
          label: 'Revenue System Engineering',
          description: 'We connect websites to real sales infrastructure that captures, qualifies, a...',
          icon: 'Cpu',
          url: '/services/crm-automation',
          tags: ['CRM SETUP', 'AUTOMATION', 'EMAIL SEQUENCES', 'LEAD SCORING', 'ANALYTICS']
        },
        {
          id: 'cap3',
          label: 'Funnel & Journey Architecture',
          description: 'We architect user journeys that move prospects from curiosity to commitment...',
          icon: 'GitBranch',
          url: '/services/funnels',
          tags: ['LANDING PAGES', 'LEAD FUNNELS', 'BOOKING FLOWS', 'SALES FUNNELS', 'DROP-OFF REDUCTION']
        },
        {
          id: 'cap4',
          label: 'Conversion Science (The Lab™)',
          description: 'We run continuous experiments to improve performance using data, testin...',
          icon: 'Microscope',
          url: '/services/conversion-optimization',
          tags: ['A/B TESTING', 'UX EXPERIMENTS', 'CONVERSION ANALYSIS', 'CONTINUOUS OPTIMIZATION']
        },
        {
          id: 'cap5',
          label: 'Performance & Trust Optimization',
          description: 'We optimize the invisible factors that determine whether users trust and act.',
          icon: 'ShieldCheck',
          url: '/services/performance-trust',
          tags: ['SPEED', 'SEO FOUNDATIONS', 'ACCESSIBILITY', 'CREDIBILITY SIGNALS']
        }
      ]
    },
    {
      id: 'engagements',
      label: 'Engagements',
      url: '/#offers',
      children: [
        {
          id: 'eng1',
          label: 'Revenue Roadmap',
          subtitle: 'Expert Strategy & Audit',
          icon: 'Search',
          url: '/offers/revenue-roadmap'
        },
        {
          id: 'eng2',
          label: 'Fix Sprint',
          subtitle: 'Quick Performance Gains',
          icon: 'Zap',
          url: '/offers/fix-sprint'
        },
        {
          id: 'eng3',
          label: 'Revenue System',
          subtitle: 'End-to-End Growth System',
          icon: 'Rocket',
          url: '/offers/revenue-system'
        },
        {
          id: 'eng4',
          label: 'The Conversion Lab™',
          subtitle: 'Performance Optimization',
          icon: 'Beaker',
          url: '/offers/conversion-lab'
        }
      ]
    },
    { id: 'process', label: 'Process', url: '/process' },
    { id: 'evidence', label: 'Evidence', url: '/case-studies' },
    { id: 'contact', label: 'Contact', url: '/contact' }
  ];

  if (!isMounted) return null;

  return (
    <header
      onMouseMove={handleMouseMove}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border-b border-white/5 ${scrolled
        ? "py-3 bg-black/80 backdrop-blur-3xl shadow-2xl"
        : "py-5 bg-black/40 backdrop-blur-xl"
        }`}
    >
      {/* Target Crosshair Effect */}
      {/* Target Crosshair Effect - Minimalist Revision */}
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference hidden xl:block"
        style={{ x: targetX, y: targetY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: isHoveringLink ? 0.3 : 0, scale: isHoveringLink ? 0.8 : 0.5 }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 border border-orange-500 rounded-full opacity-30" />
          <div className="w-0.5 h-0.5 bg-orange-500 rounded-full" />
        </div>
      </motion.div>

      <div className="max-w-screen-2xl mx-auto px-8 md:px-12 flex items-center justify-between">
        {/* Brand Logo Section */}
        <Link href="/" className="relative z-50 group flex items-center shrink-0">
          <BrandLogo
            variant="full"
            showIcon={true}
            logoUrl={settings?.logo_url}
            className="transition-transform duration-300"
          />
        </Link>

        {/* Main Navigation Links */}
        <div className="hidden xl:flex items-center gap-1.5">
          {hardcodedNav.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const labelLower = (item.label || '').toLowerCase();
            const isMega = labelLower === 'capabilities';
            const isDropdown = labelLower === 'engagements';

            return (
              <div
                key={item.id}
                onMouseEnter={() => { handleMouseEnter(item.id); setIsHoveringLink(true); setHoveredId(item.id); }}
                onMouseLeave={() => { handleMouseLeave(); setIsHoveringLink(false); setHoveredId(null); }}
                className="relative"
              >
                <Link
                  href={item.url || '#'}
                  onClick={(e) => handleLinkClick(e, item.url)}
                  className={`relative flex items-center gap-1 px-4 py-2 rounded-lg text-[13px] font-black tracking-tight transition-all duration-300 z-10 ${activeDropdown === item.id || hoveredId === item.id ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  {item.label}
                  {(isMega || isDropdown) && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${activeDropdown === item.id ? 'rotate-180 text-orange-500' : 'opacity-40'}`} />
                  )}
                </Link>

                {hoveredId === item.id && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-white/[0.08] backdrop-blur-sm rounded-xl z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <AnimatePresence>
                  {activeDropdown === item.id && isMega && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute top-full -left-48 pt-6 w-[900px] z-[101]"
                    >
                      <div className="bg-[#050505]/90 backdrop-blur-[64px] border border-white/10 rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
                        <div className="grid grid-cols-12 gap-10">
                          {/* Column 1: Core Engineering */}
                          <div className="col-span-6 space-y-7">
                            {item.children?.slice(0, 3).map((child) => {
                              const IconName = child.icon || 'Code';
                              const Icon = iconMap[IconName] || Code;
                              return (
                                <Link
                                  key={child.id}
                                  href={child.url || '#'}
                                  className="group/item flex gap-5 items-start"
                                >
                                  <div className="w-11 h-11 shrink-0 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover/item:bg-white/[0.12] group-hover/item:border-white/20 group-hover/item:scale-105 transition-all duration-300">
                                    <Icon className="w-5 h-5 text-zinc-300 group-hover/item:text-orange-400 transition-colors" />
                                  </div>
                                  <div>
                                    <h3 className="text-base font-bold text-white group-hover/item:text-orange-400 transition-colors leading-tight mb-2.5">{child.label}</h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{child.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {child.tags?.map((tag: string, i: number) => (
                                        <span key={i} className="text-[9px] font-mono font-semibold text-zinc-500 hover:text-zinc-300 transition-colors">{tag}{i < child.tags!.length - 1 ? ',' : ''}</span>
                                      ))}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Column 2: Specific Science */}
                          <div className="col-span-6 space-y-7">
                            {item.children?.slice(3).map((child) => {
                              const IconName = child.icon || 'Code';
                              const Icon = iconMap[IconName] || Code;
                              return (
                                <Link
                                  key={child.id}
                                  href={child.url || '#'}
                                  className="group/item flex gap-5 items-start"
                                >
                                  <div className="w-11 h-11 shrink-0 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover/item:bg-white/[0.12] group-hover/item:border-white/20 group-hover/item:scale-105 transition-all duration-300">
                                    <Icon className="w-5 h-5 text-zinc-300 group-hover/item:text-orange-400 transition-colors" />
                                  </div>
                                  <div>
                                    <h3 className="text-base font-bold text-white group-hover/item:text-orange-400 transition-colors leading-tight mb-2.5">{child.label}</h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{child.description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {child.tags?.map((tag: string, i: number) => (
                                        <span key={i} className="text-[9px] font-mono font-semibold text-zinc-500 hover:text-zinc-300 transition-colors">{tag}{i < child.tags!.length - 1 ? ',' : ''}</span>
                                      ))}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}

                            {/* Enterprise Card */}
                            <div className="p-7 rounded-2xl bg-white/[0.04] border border-white/[0.08] relative overflow-hidden group/ent hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl -mr-16 -mt-16 group-hover/ent:bg-orange-500/15 transition-all" />
                              <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.15em] mb-3 leading-tight relative z-10">Custom Enterprise Solutions</h4>
                              <p className="text-xs text-zinc-400 mb-6 leading-relaxed relative z-10">We deploy bespoke engineering teams for high-scale architectural challenges.</p>
                              <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-wide group-hover/ent:gap-3 group-hover/ent:text-orange-300 transition-all relative z-10"
                              >
                                Contact Our Team <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeDropdown === item.id && isDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute top-full -left-20 pt-6 w-[550px] z-[101]"
                    >
                      <div className="bg-[#050505]/90 backdrop-blur-[64px] border border-white/10 rounded-3xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
                        <div className="grid grid-cols-2 gap-8">
                          {item.children?.map((child) => {
                            const IconName = child.icon || 'Zap';
                            const Icon = iconMap[IconName] || Zap;
                            return (
                              <Link
                                key={child.id}
                                href={child.url || '#'}
                                className="group/item flex flex-col items-start gap-5"
                              >
                                <div className="w-12 h-12 rounded-xl bg-orange-500/[0.08] border border-orange-500/20 flex items-center justify-center group-hover/item:bg-orange-500 group-hover/item:border-orange-500 group-hover/item:scale-105 transition-all duration-300">
                                  <Icon className="w-5 h-5 text-orange-400 group-hover/item:text-white transition-colors" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-white group-hover/item:text-orange-400 transition-colors leading-tight mb-2">{child.label}</h3>
                                  <p className="text-xs font-medium text-zinc-400 group-hover/item:text-zinc-300 transition-colors">{child.subtitle}</p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA Action - Reverted to former UX */}
        <div className="flex items-center gap-4">
          <Button
            className="hidden md:flex rounded-xl bg-[#FF4D00] hover:bg-[#FF6600] text-white hover:text-white px-6 py-2.5 h-auto text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.02] border-none shadow-xl shadow-orange-600/20 active:scale-[0.98] group"
            asChild
          >
            <Link href="/offers/revenue-roadmap" className="flex items-center gap-3 !text-white hover:!text-white transition-colors">
              REVENUE ROADMAP
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform !text-white" />
            </Link>
          </Button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-3 rounded-full bg-white/5 text-white hover:bg-orange-600 transition-all border border-white/5"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default AdvancedNavigation;
