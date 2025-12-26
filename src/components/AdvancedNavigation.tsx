'use client'

import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Code, Smartphone, ShoppingCart, Search, BarChart, Palette, Brain, TrendingUp, Bot, Shield, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlobalSearch from "@/components/ui/GlobalSearch";
import BrandLogo from "@/components/branding/BrandLogo";

const services = [
  {
    name: "Web Development",
    path: "/services/web-development",
    icon: Code,
    description: "Custom websites & web apps",
    color: "from-blue-500 to-cyan-500",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80"
  },
  {
    name: "Mobile Apps",
    path: "/services/mobile-apps",
    icon: Smartphone,
    description: "iOS & Android applications",
    color: "from-purple-500 to-pink-500",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80"
  },
  {
    name: "E-Commerce",
    path: "/services/ecommerce",
    icon: ShoppingCart,
    description: "Online stores that convert",
    color: "from-orange-500 to-red-500",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
  },
  {
    name: "UI/UX Design",
    path: "/services/ui-ux-design",
    icon: Palette,
    description: "Beautiful user experiences",
    color: "from-green-500 to-emerald-500",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80"
  },
  {
    name: "SEO & Growth",
    path: "/services/seo-growth",
    icon: Search,
    description: "Grow your online presence",
    color: "from-yellow-500 to-orange-500",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
  },
  {
    name: "Analytics & Performance",
    path: "/services/analytics",
    icon: BarChart,
    description: "Data-driven decisions",
    color: "from-indigo-500 to-purple-500",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
  },
  {
    name: "AI Consulting",
    path: "/services/ai-consulting",
    icon: Brain,
    description: "Intelligent automation & insights",
    color: "from-accent to-purple-500",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80"
  },
  {
    name: "Conversion Optimization",
    path: "/services/conversion-optimization",
    icon: TrendingUp,
    description: "Turn visitors into customers",
    color: "from-orange-500 to-red-500",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80"
  },
  {
    name: "GAIO (AI Optimization)",
    path: "/services/gaio",
    icon: Bot,
    description: "Optimize for ChatGPT & AI Search",
    color: "from-purple-600 to-indigo-600",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80"
  },
  {
    name: "Staff Augmentation",
    path: "/services/staff-augmentation",
    icon: Users,
    description: "Scale your team instantly",
    color: "from-blue-600 to-indigo-600",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80"
  },
  {
    name: "Website Maintenance",
    path: "/services/maintenance",
    icon: Shield,
    description: "24/7 security, speed & uptime",
    color: "from-green-600 to-emerald-600",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80"
  },
];

const AdvancedNavigation = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // New state for hiding nav

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // New: Observer for estimator section
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: 0.1 }
    );

    const estimatorSection = document.getElementById('ai-estimator-section');
    if (estimatorSection) {
      observer.observe(estimatorSection);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Estimator", path: "/estimator" },
  ];

  // Handle hydration to prevent mismatches
  if (!isMounted) {
    return null; // Don't render anything until client-side hydration is complete to prevent FOUC
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background/80 backdrop-blur-md"
        } border-b border-border`}
    >
      {/* Progress bar removed - was causing hydration errors */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <Link href="/">
            <div className="relative h-10 w-48" data-easter-egg="logo">
              <AnimatePresence>
                {!scrolled && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0"
                  >
                    <BrandLogo className="h-10 w-auto text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {scrolled && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    className="absolute left-0 cursor-pointer"
                    style={{
                      filter: 'drop-shadow(0 0 8px hsl(var(--accent) / 0.5))'
                    }}
                  >
                    <BrandLogo variant="symbol" className="h-[30px] w-auto text-accent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                setServicesOpen(true);
                setHoveredItem('services');
              }}
              onMouseLeave={() => {
                setServicesOpen(false);
                setHoveredItem(null);
              }}
            >
              <motion.button
                className="text-sm uppercase letter-spacing-wide text-muted-foreground hover:text-foreground transition-smooth relative group cursor-pointer py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm px-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -2 }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services

              </motion.button>

              {/* Enhanced Dropdown Menu - MEGA MENU LAYOUT */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.98 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[900px] z-50"
                    role="menu"
                  >
                    {/* Triangle pointer */}
                    <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-zinc-800" />

                    <motion.div
                      className="bg-[#0A0A0A] backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-12"
                      style={{
                        boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {/* Column 1: Core Engineering & Design */}
                      <div className="col-span-4 p-6 border-r border-white/5 bg-zinc-900/50 flex flex-col gap-6">
                        <div>
                          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Code className="w-3 h-3" /> Engineering
                          </div>
                          <div className="space-y-1">
                            <Link href="/services/web-development" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 text-blue-500 group-hover:text-white transition-colors mt-0.5">
                                <Code className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">Web Development</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">Custom apps & SaaS platforms.</div>
                              </div>
                            </Link>

                            <Link href="/services/mobile-apps" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 text-indigo-500 group-hover:text-white transition-colors mt-0.5">
                                <Smartphone className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">Mobile Apps</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">iOS & Android native apps.</div>
                              </div>
                            </Link>

                            <Link href="/services/ecommerce" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 text-orange-500 group-hover:text-white transition-colors mt-0.5">
                                <ShoppingCart className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">E-Commerce</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">High-converting online stores.</div>
                              </div>
                            </Link>

                            <Link href="/services/staff-augmentation" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 text-emerald-500 group-hover:text-white transition-colors mt-0.5">
                                <Users className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors">Staff Augmentation</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">Scale your dev team instantly.</div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Palette className="w-3 h-3" /> Design & Maintenance
                          </div>
                          <div className="space-y-1">
                            <Link href="/services/ui-ux-design" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500 text-pink-500 group-hover:text-white transition-colors mt-0.5">
                                <Palette className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-pink-400 transition-colors">UI/UX Design</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">World-class interfaces.</div>
                              </div>
                            </Link>
                            <Link href="/services/maintenance" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-zinc-500/10 flex items-center justify-center group-hover:bg-zinc-500 text-zinc-500 group-hover:text-white transition-colors mt-0.5">
                                <Shield className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-zinc-400 transition-colors">Maintenance</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">24/7 Security & Uptime.</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Growth & AI */}
                      <div className="col-span-4 p-6 border-r border-white/5 relative flex flex-col gap-6">
                        <div>
                          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <Brain className="w-3 h-3" /> Artificial Intelligence
                          </div>
                          <div className="space-y-1">
                            <Link href="/ai-boost" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500 text-purple-500 group-hover:text-white transition-colors mt-0.5">
                                <Bot className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-purple-400 transition-colors">AI Sales Agents</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">24/7 automated sales bots.</div>
                              </div>
                            </Link>

                            <Link href="/services/ai-consulting" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500 text-violet-500 group-hover:text-white transition-colors mt-0.5">
                                <Brain className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-violet-400 transition-colors">AI Consulting</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">Strategic AI implementation.</div>
                              </div>
                            </Link>

                            <Link href="/services/gaio" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 text-indigo-500 group-hover:text-white transition-colors mt-0.5">
                                <Search className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">GAIO Optimization</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">Rank #1 on ChatGPT search.</div>
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <TrendingUp className="w-3 h-3" /> Growth & Analytics
                          </div>
                          <div className="space-y-1">
                            <Link href="/services/seo-growth" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500 text-yellow-500 group-hover:text-white transition-colors mt-0.5">
                                <TrendingUp className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors">SEO & Growth</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">Dominate search rankings.</div>
                              </div>
                            </Link>

                            <Link href="/services/analytics" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500 text-cyan-500 group-hover:text-white transition-colors mt-0.5">
                                <BarChart className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors">Analytics</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">Data-driven insights.</div>
                              </div>
                            </Link>

                            <Link href="/services/conversion-optimization" className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 text-red-500 group-hover:text-white transition-colors mt-0.5">
                                <TrendingUp className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors">CRO & Sales</div>
                                <div className="text-zinc-500 text-[10px] mt-0.5 leading-snug">Turn visitors into buyers.</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Featured / Visual */}
                      <div className="col-span-4 bg-zinc-900/80 p-6 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div>
                          <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Featured Product</div>
                          <h4 className="text-xl font-bold text-white mb-2">Revenue Website™</h4>
                          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            The ultimate high-converting website package. Includes AI integration, premium analytics, and 100 speed score guarantee.
                          </p>
                        </div>

                        <Link href="/revenue-website" className="inline-flex items-center justify-between w-full bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white border border-emerald-500/20 px-4 py-3 rounded-lg transition-all group/btn relative z-20">
                          <span className="font-bold text-sm">View Package</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Menu Items with Enhanced Interactions */}
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path || (item.path === '/portfolio' && pathname === '/case-studies');

              return (
                <Link key={item.name} href={item.path} className="magnetic-wrap">
                  <motion.div
                    className="magnetic-area"
                    whileHover={{ scale: 1.5 }}
                  />
                  <motion.div
                    className={`relative z-10 text-sm uppercase letter-spacing-wide transition-smooth group cursor-pointer px-2 py-2 rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 font-bold ${isActive ? 'text-accent' : 'text-muted-foreground hover:text-accent'
                      }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (index + 1) * 0.1 }}
                    whileHover={{ y: -2 }}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    tabIndex={0}
                  >
                    {item.name}

                  </motion.div>
                </Link>
              )
            })}

            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                type: "spring",
                stiffness: 200
              }}
              className="magnetic-wrap"
            >
              <div className="magnetic-area"></div>
              <Link href="/contact">
                <Button
                  variant="default"
                  className="bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-700 text-white letter-spacing-wide relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 hover-glow"
                >
                  <motion.span
                    className="relative z-10 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    LET&apos;S TALK
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%", skewX: -20 }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground relative z-50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Slide-Over Sidebar */}
        {/* Mobile Full-Screen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed inset-0 w-full h-full bg-[#0A0A0A] z-[60] md:hidden flex flex-col overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

              {/* Header */}
              <div className="relative z-10 p-6 flex items-center justify-between border-b border-white/10">
                <BrandLogo className="h-8 w-auto" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden">
                <div className="p-6 pb-32 space-y-12 max-w-lg mx-auto">

                  {/* Primary Navigation */}
                  <div className="space-y-6">
                    {menuItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                      >
                        <Link
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-4xl font-bold text-white hover:text-accent transition-colors tracking-tight"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <hr className="border-white/10" />

                  {/* Services Grid */}
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Code className="w-4 h-4" /> Services
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {services.map((service, i) => {
                        const Icon = service.icon
                        return (
                          <motion.div
                            key={service.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 + 0.4 }}
                          >
                            <Link
                              href={service.path}
                              onClick={() => setIsMenuOpen(false)}
                              className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent/50 transition-all"
                            >
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} opacity-80 group-hover:opacity-100 flex items-center justify-center text-white shrink-0 shadow-lg`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-white font-bold text-lg leading-tight group-hover:text-accent transition-colors">{service.name}</div>
                                <div className="text-zinc-500 text-xs leading-tight mt-1">{service.description}</div>
                              </div>
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom CTA */}
              <div className="relative z-20 p-6 border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-700 text-white font-bold py-8 text-xl rounded-2xl shadow-xl shadow-accent/20">
                    Start Your Project
                  </Button>
                </Link>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div >
    </motion.nav >
  );
};

export default AdvancedNavigation;
