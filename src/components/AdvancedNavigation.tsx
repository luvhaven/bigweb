'use client'

import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Code, Smartphone, ShoppingCart, Search, BarChart, Palette, Brain, TrendingUp, Bot, Shield, Users, ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/branding/BrandLogo";
import MobileMenuOverlay from "@/components/layout/MobileMenuOverlay";
import { useGlobalContent } from "@/context/GlobalContentContext";

// Helper to map DB icon names to Lucide icons
const IconMap: Record<string, any> = {
  Code, Smartphone, ShoppingCart, Palette, Search, BarChart, Brain, TrendingUp, Bot, Shield, Users, Grid: Menu
};

const AdvancedNavigation = () => {
  const pathname = usePathname();
  const { navigation } = useGlobalContent(); // Fetch dynamic nav
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  // Group Dynamic items into Buckets
  // New Schema: Navigation is a tree. servicesItem is the Mega Menu.
  const servicesItem = navigation.find((item: any) => item.label === 'Services');

  // Work is a top-level link
  const workItems = []; // Work is now a direct link typically, but if we need a dropdown we'd look for children.
  // In seed, Work is a link. So we don't need workItems array for dropdown unless we change it.

  // Company is a top-level dropdown
  const companyParent = navigation.find((item: any) => item.label === 'Company');
  const companyItems = companyParent?.children || [];

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

  if (!isMounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-7xl rounded-full border border-white/10 overflow-visible ${scrolled ? "bg-black/80 backdrop-blur-xl shadow-2xl py-2 px-6" : "bg-transparent border-transparent py-4 px-6"
        }`}
    >
      <div className="flex items-center relative z-50">
        {/* Logo */}
        <Link href="/" className="relative z-50 shrink-0">
          <BrandLogo variant={scrolled ? "symbol" : "full"} className={`transition-all duration-300 ${scrolled ? "h-8" : "h-8"}`} />
        </Link>

        {/* Desktop Neural Island - Positioned next to Logo with controlled spacing */}
        <div className={`hidden md:flex items-center gap-1 p-1 pr-2 rounded-full transition-all duration-300 ml-8 lg:ml-12 ${scrolled ? "" : "bg-black/40 backdrop-blur-md border border-white/10"}`}>

          {/* 1. Capabilities (Mega Menu) */}
          <div onMouseEnter={() => handleMouseEnter('capabilities')} onMouseLeave={handleMouseLeave} className="relative">
            <button className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeDropdown === 'capabilities' ? 'bg-white text-black' : 'text-zinc-300 hover:text-white hover:bg-white/10'}`}>
              Capabilities <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'capabilities' ? 'rotate-180' : ''}`} />
            </button>


          </div>

          {/* 2. Work (Direct Link) */}
          <Link href="/portfolio" className="px-5 py-2.5 rounded-full text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all">
            Work
          </Link>

          {/* 3. Company (Dropdown) */}
          <div onMouseEnter={() => handleMouseEnter('company')} onMouseLeave={handleMouseLeave} className="relative">
            <button className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${activeDropdown === 'company' ? 'bg-white text-black' : 'text-zinc-300 hover:text-white hover:bg-white/10'}`}>
              Company <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 z-50"
                >
                  <div className="bg-[#0A0A0A] border border-white/10 rounded-xl shadow-xl overflow-hidden p-1 flex flex-col gap-0.5">
                    {companyItems.map((item: any) => (
                      <Link key={item.id} href={item.url || '#'} className="px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between group">
                        {item.label}
                        <ChevronDown className="-rotate-90 w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* CTA - Pushed to right */}
        <div className="hidden md:block ml-auto">
          <Link href="/contact">
            <Button className="rounded-full bg-white text-black hover:bg-zinc-200 px-6 font-semibold">
              Start Project
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2 ml-auto">
          <Menu className="w-6 h-6" />
        </button>

      </div>

      {/* Mega Menu - Capabilities (Centered Full Width - Outside Flex) */}
      <AnimatePresence>
        {activeDropdown === 'capabilities' && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => handleMouseEnter('capabilities')}
            onMouseLeave={handleMouseLeave}
            className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl z-50 origin-top pt-2"
          >
            {/* Invisible Bridge for seamless hover */}
            <div className="absolute -top-10 left-0 w-full h-10 bg-transparent" />

            <div className="bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-12 p-1 ring-1 ring-white/5">
              <div className="col-span-8 grid grid-cols-2 gap-2 p-6">
                {(servicesItem?.children || []).slice(0, 4).map((category: any) => (
                  <div key={category.id} className="space-y-4 mb-2">
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                      {category.label}
                    </div>
                    <div className="space-y-1">
                      {category.children?.map((link: any) => (
                        <Link key={link.id} href={link.url || '#'} className="block px-3 py-2 rounded-lg hover:bg-white/5 text-zinc-300 hover:text-white text-sm transition-colors group">
                          <div className="flex items-center justify-between">
                            {link.label}
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-500" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                {(!servicesItem || !servicesItem.children || servicesItem.children.length === 0) && (
                  <div className="col-span-2 text-zinc-500 text-sm p-4">Loading services...</div>
                )}
              </div>
              <div className="hidden md:flex col-span-4 bg-zinc-900/50 rounded-xl p-6 m-1 flex-col relative overflow-hidden group border-l border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-50" />

                <div className="relative z-10">
                  <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" /> Growth Editions
                  </h4>

                  <div className="space-y-1">
                    {/* 1. Revenue Website */}
                    <Link href="/revenue-website" className="block p-3 rounded-lg hover:bg-white/5 transition-colors group/item">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white group-hover/item:text-emerald-400 transition-colors">Revenue Website™</span>
                        <ArrowRight className="w-3 h-3 text-zinc-500 -translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all" />
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-1">High-performance architecture for scale.</p>
                    </Link>

                    {/* 2. AI-Boost */}
                    <Link href="/ai-boost" className="block p-3 rounded-lg hover:bg-white/5 transition-colors group/item">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white group-hover/item:text-purple-400 transition-colors">AI-Boost Add-on</span>
                        <ArrowRight className="w-3 h-3 text-zinc-500 -translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all" />
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-1">Smart automation for your existing site.</p>
                    </Link>

                    {/* 3. New Year Specials */}
                    <Link href="/newyear" className="block p-3 rounded-lg hover:bg-white/5 transition-colors group/item">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white group-hover/item:text-amber-400 transition-colors">2026 Strategy Suite</span>
                        <ArrowRight className="w-3 h-3 text-zinc-500 -translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all" />
                      </div>
                      <p className="text-xs text-zinc-500 line-clamp-1">Limited-time strategic growth bundles.</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </motion.nav>
  );
}; // End of Component

export default AdvancedNavigation;
