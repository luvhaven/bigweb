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
                      {/* Column 1: Core Services */}
                      <div className="col-span-4 p-6 border-r border-white/5 bg-zinc-900/50">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Code className="w-3 h-3" /> Core Engineering
                        </div>
                        <div className="space-y-1">
                          <Link href="/revenue-website" className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 text-emerald-500 group-hover:text-white transition-colors mt-0.5">
                              <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm group-hover:text-emerald-400 transition-colors">Revenue Websites</div>
                              <div className="text-zinc-500 text-xs mt-0.5 leading-snug">High-performance Next.js sites built for conversion.</div>
                            </div>
                          </Link>

                          <Link href="/services/web-development" className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 text-blue-500 group-hover:text-white transition-colors mt-0.5">
                              <Code className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">Custom Software</div>
                              <div className="text-zinc-500 text-xs mt-0.5 leading-snug">Enterprise-grade web applications & SaaS.</div>
                            </div>
                          </Link>

                          <Link href="/services/mobile-apps" className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 text-indigo-500 group-hover:text-white transition-colors mt-0.5">
                              <Smartphone className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">Mobile Apps</div>
                              <div className="text-zinc-500 text-xs mt-0.5 leading-snug">Native iOS & Android development.</div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Column 2: Growth & AI */}
                      <div className="col-span-4 p-6 border-r border-white/5 relative">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Brain className="w-3 h-3" /> AI & Growth
                        </div>
                        <div className="space-y-1">
                          <Link href="/ai-boost" className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500 text-purple-500 group-hover:text-white transition-colors mt-0.5">
                              <Bot className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm group-hover:text-purple-400 transition-colors">AI Sales Agents</div>
                              <div className="text-zinc-500 text-xs mt-0.5 leading-snug">24/7 automated support & sales bots.</div>
                            </div>
                          </Link>

                          <Link href="/services/gaio" className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 text-orange-500 group-hover:text-white transition-colors mt-0.5">
                              <Search className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">GAIO Optimization</div>
                              <div className="text-zinc-500 text-xs mt-0.5 leading-snug">Rank #1 on ChatGPT & Perplexity.</div>
                            </div>
                          </Link>

                          <Link href="/services/seo-growth" className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500 text-yellow-500 group-hover:text-white transition-colors mt-0.5">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm group-hover:text-yellow-400 transition-colors">Growth Marketing</div>
                              <div className="text-zinc-500 text-xs mt-0.5 leading-snug">Data-driven SEO & conversion campaigns.</div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Column 3: Featured / Visual */}
                      <div className="col-span-4 bg-zinc-900/80 p-6 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div>
                          <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Featured Product</div>
                          <h4 className="text-xl font-bold text-white mb-2">Revenue Website™</h4>
                          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            The ultimate high-converting website package. Includes AI integration, premium analytics, and 100 speed score guarantee.
                          </p>
                        </div>

                        <Link href="/revenue-website" className="inline-flex items-center justify-between w-full bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white border border-emerald-500/20 px-4 py-3 rounded-lg transition-all group/btn">
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
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Checkbox Overlay (Backdrop) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              />

              {/* Sidebar Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-[300px] bg-[#0A0A0A] border-l border-white/10 z-50 md:hidden flex flex-col shadow-2xl"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Menu Items Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Section 1: Services */}
                  <div>
                    <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Services</h4>
                    <div className="space-y-4">
                      <Link href="/revenue-website" onClick={() => setIsMenuOpen(false)} className="block">
                        <div className="font-bold text-white text-lg">Revenue Websites</div>
                        <div className="text-zinc-500 text-xs mt-1">High-converting pages</div>
                      </Link>
                      <Link href="/ai-boost" onClick={() => setIsMenuOpen(false)} className="block">
                        <div className="font-bold text-white text-lg">AI Integration</div>
                        <div className="text-zinc-500 text-xs mt-1">Chatbots & Automation</div>
                      </Link>
                      <Link href="/services/gaio" onClick={() => setIsMenuOpen(false)} className="block">
                        <div className="font-bold text-white text-lg">GAIO Optimization</div>
                        <div className="text-zinc-500 text-xs mt-1">AI Search Ranking</div>
                      </Link>
                    </div>
                  </div>

                  {/* Section 2: Company */}
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Company</h4>
                    <div className="space-y-4">
                      {menuItems.map((item, i) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-zinc-300 hover:text-white transition-colors text-lg font-medium"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="p-6 border-t border-white/5 bg-zinc-900/50">
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 rounded-xl">
                      Start Project
                    </Button>
                  </Link>
                  <div className="mt-4 text-center text-xs text-zinc-600">
                    © 2025 BigWeb Digital
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div >
    </motion.nav >
  );
};

export default AdvancedNavigation;
