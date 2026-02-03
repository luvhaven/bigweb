'use client'

import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Code, Smartphone, ShoppingCart, Search, BarChart3, Palette, Brain, TrendingUp, Bot, Shield, Users, ChevronDown, Sparkles, Zap, Layers, RefreshCw, Rocket, Terminal, GitBranch, Microscope, ShieldCheck, Cpu, FlaskConical, Target, Globe, Lock, CheckCircle2, AlertCircle, MessageSquare, Fingerprint, Network, Database } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/branding/BrandLogo";
import MobileMenuOverlay from "@/components/layout/MobileMenuOverlay";
import { useGlobalContent } from "@/context/GlobalContentContext";

const AdvancedNavigation = () => {
  const pathname = usePathname();
  const { settings, navigation } = useGlobalContent() || { settings: {}, navigation: [] };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Icon mapping for dynamic Lucide icons
  const iconMap: Record<string, any> = {
    Terminal, GitBranch, ShieldCheck, Cpu, Microscope, Search, Zap, Rocket, FlaskConical, Code, Smartphone, ShoppingCart, BarChart3, Palette, Brain, TrendingUp, Bot, Shield, Users, Sparkles, Layers, RefreshCw, Target, Globe, Lock, CheckCircle2, AlertCircle, MessageSquare, Fingerprint, Network, Database
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

  if (!isMounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] border-b border-white/5 ${scrolled
        ? "py-3 bg-black/80 backdrop-blur-3xl shadow-2xl"
        : "py-5 bg-black/40 backdrop-blur-xl"
        }`}
    >
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
        <div className="hidden xl:flex items-center gap-6">


          {navigation?.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const labelLower = (item.label || '').toLowerCase();
            const isMega = labelLower === 'capabilities';
            const isDropdown = labelLower === 'engagements';

            if (isMega) {
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <Link
                    href={item.url || '/services'}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold tracking-tighter transition-all duration-300 ${activeDropdown === item.id ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {item.label} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 text-white ${activeDropdown === item.id ? 'rotate-180' : 'opacity-40'}`} />
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full -left-20 pt-4 w-[850px] z-[101]"
                      >
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl">
                          <div className="grid grid-cols-2 gap-8">
                            <div className="col-span-1 space-y-6">
                              {item.children?.slice(0, 3).map((child) => {
                                const IconName = child.icon || 'Code';
                                const Icon = iconMap[IconName] || Code;
                                const includes = child.metadata?.includes || [];
                                return (
                                  <Link
                                    key={child.id}
                                    href={child.url || '#'}
                                    onClick={(e) => handleLinkClick(e, child.url)}
                                    className="group/item flex gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 items-start"
                                  >
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-orange-600 transition-all duration-500 mt-1">
                                      <Icon className="w-5 h-5 text-white transition-transform group-hover/item:scale-110" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-bold text-white group-hover/item:text-orange-500 transition-colors leading-tight mb-2">{child.label}</div>
                                      <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{child.description}</p>
                                      <div className="flex flex-wrap gap-x-2 gap-y-1">
                                        {includes.map((inc: string, i: number) => (
                                          <span key={i} className="text-[9px] font-mono text-zinc-500 uppercase tracking-tight hover:text-white transition-colors">{inc}{i < includes.length - 1 ? ',' : ''}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="col-span-1 space-y-6">
                              {item.children?.slice(3).map((child) => {
                                const IconName = child.icon || 'Code';
                                const Icon = iconMap[IconName] || Code;
                                const includes = child.metadata?.includes || [];
                                return (
                                  <Link
                                    key={child.id}
                                    href={child.url || '#'}
                                    onClick={(e) => handleLinkClick(e, child.url)}
                                    className="group/item flex gap-4 p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 items-start"
                                  >
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-orange-600 transition-all duration-500 mt-1">
                                      <Icon className="w-5 h-5 text-white transition-transform group-hover/item:scale-110" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-bold text-white group-hover/item:text-orange-500 transition-colors leading-tight mb-2">{child.label}</div>
                                      <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">{child.description}</p>
                                      <div className="flex flex-wrap gap-x-2 gap-y-1">
                                        {includes.map((inc: string, i: number) => (
                                          <span key={i} className="text-[9px] font-mono text-zinc-500 uppercase tracking-tight hover:text-white transition-colors">{inc}{i < includes.length - 1 ? ',' : ''}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </Link>
                                );
                              })}
                              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800">
                                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Enterprise Needs?</h4>
                                <p className="text-xs text-zinc-400 mb-4">We deploy bespoke engineering teams for high-scale architectural challenges.</p>
                                <Link href="/contact" className="text-[10px] font-black text-orange-500 uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                                  Contact Engineering <ArrowRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Integrated Conversion Solutions</div>
                            <Link href="/services" className="text-[9px] font-black text-orange-500 hover:text-orange-400 uppercase tracking-[0.4em] flex items-center gap-2 transition-colors">View All Capabilities <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (isDropdown) {
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <Link
                    href={item.url || '/#offers'}
                    onClick={(e) => handleLinkClick(e, item.url || '/#offers')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold tracking-tighter transition-all duration-300 ${activeDropdown === item.id ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {item.label} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 text-white ${activeDropdown === item.id ? 'rotate-180' : 'opacity-40'}`} />
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 pt-4 w-[500px] z-[101]"
                      >
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden backdrop-blur-2xl">
                          <div className="grid grid-cols-2 gap-2">
                            {item.children?.map((child) => {
                              const IconName = child.icon || 'Zap';
                              const Icon = iconMap[IconName] || Zap;
                              return (
                                <Link
                                  key={child.id}
                                  href={child.url || '#'}
                                  onClick={(e) => handleLinkClick(e, child.url)}
                                  className="flex flex-col p-4 rounded-xl hover:bg-white/5 border border-transparent transition-all duration-300 group/item"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-orange-600/10 text-[#FF4D00] flex items-center justify-center mb-3 group-hover/item:bg-[#FF4D00] group-hover/item:text-white transition-all duration-300">
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <h4 className="text-white text-sm font-bold mb-1">{child.label}</h4>
                                  <p className="text-[11px] text-zinc-500 leading-tight">{child.description}</p>
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
            }

            return (
              <Link
                key={item.id}
                href={item.url === "/case-studies" && pathname === "/" ? "/#evidence" : (item.url || '/')}
                onClick={(e) => {
                  if (item.url === "/case-studies" && pathname === "/") {
                    handleLinkClick(e, "/#evidence");
                  }
                }}
                className="px-4 py-2 rounded-lg text-sm font-bold tracking-tighter text-zinc-400 hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Action */}
        <div className="flex items-center gap-4">
          <Button
            className="hidden md:flex rounded-xl bg-[#FF4D00] hover:bg-[#FF6600] text-white hover:text-white px-6 py-2.5 h-auto text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.02] border-none shadow-xl shadow-orange-600/20 active:scale-[0.98] group"
            asChild
          >
            <Link href="/offers/revenue-roadmap" className="flex items-center gap-2 !text-white hover:!text-white transition-colors">
              REVENUE ROADMAP
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform !text-white" />
            </Link>
          </Button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header >
  );
};

export default AdvancedNavigation;
