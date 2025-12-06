'use client'

import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Code, Smartphone, ShoppingCart, Search, BarChart, Palette, Brain, TrendingUp, Bot } from "lucide-react";
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
    name: "Website Maintenance",
    path: "/services/maintenance",
    icon: Bot,
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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
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

  // Show simple nav during SSR/hydration to prevent scroll errors
  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-bold gradient-text-luxury">
              <BrandLogo className="h-8 w-auto text-foreground" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link key={item.path} href={item.path} className="text-sm hover:text-accent transition-colors">
                  {item.name}
                </Link>
              ))}
              <GlobalSearch />
              <Link href="/contact">
                <Button variant="luxury" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
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
              {/* Full Logo with Enhanced Animation */}
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

              {/* Compact Logo with Magnetic Effect */}
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

              {/* Enhanced Dropdown Menu - TWO COLUMN LAYOUT */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px]"
                    role="menu"
                    aria-label="Services menu"
                  >
                    <motion.div
                      className="bg-card backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden"
                      style={{
                        boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px hsl(var(--accent) / 0.2)',
                        backgroundColor: 'hsl(var(--card))'
                      }}
                    >
                      {/* TWO COLUMN GRID */}
                      <div className="p-2 grid grid-cols-2 gap-2">
                        {services.map((service, index) => {
                          return (
                            <Link
                              key={service.path}
                              href={service.path}
                              onMouseEnter={() => setActiveServiceIndex(index)}
                            >
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: index * 0.05,
                                  type: "spring",
                                  stiffness: 200
                                }}
                                whileHover={{
                                  x: 6,
                                  scale: 1.02,
                                  backgroundColor: 'hsl(var(--accent) / 0.05)'
                                }}
                                className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 cursor-pointer group ${activeServiceIndex === index
                                  ? 'bg-accent/10 border border-accent/30 shadow-md'
                                  : 'hover:bg-muted/50 border border-transparent'
                                  }`}
                                role="menuitem"
                              >
                                {/* Small Thumbnail */}
                                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                  <img
                                    src={service.thumbnail}
                                    alt={service.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-background/20" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm mb-0.5 group-hover:text-accent transition-colors">
                                    {service.name}
                                  </h4>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {service.description}
                                  </p>
                                </div>

                                {/* Arrow */}
                                <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${activeServiceIndex === index
                                  ? 'opacity-100 text-accent'
                                  : 'opacity-0 text-muted-foreground'
                                  }`} />
                              </motion.div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* View All Services */}
                      <Link href="/services">
                        <motion.div
                          whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                          className="p-3 border-t border-border/50 text-center group cursor-pointer transition-colors"
                        >
                          <span className="text-sm font-semibold text-accent flex items-center justify-center gap-2">
                            View All Services
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </motion.div>
                      </Link>
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
                    className={`text-sm uppercase letter-spacing-wide transition-smooth relative group cursor-pointer px-2 py-2 rounded-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
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
                    LET'S TALK
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

        {/* Full-Screen Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background z-40 md:hidden overflow-y-auto"
            >
              {/* Navbar Header (fixed) */}
              <div className="sticky top-0 z-50 bg-background border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo */}
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      className="text-2xl font-bold text-foreground"
                      whileTap={{ scale: 0.95 }}
                    >
                      <BrandLogo className="h-8 w-auto text-foreground" />
                    </motion.div>
                  </Link>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Animated Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"
                  animate={{
                    scale: [1, 1.5, 1],
                    x: [0, 100, 0],
                    y: [0, -50, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"
                  animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -80, 0],
                    y: [0, 50, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>

              {/* Menu Content */}
              <div className="relative flex flex-col items-center justify-center px-6 py-12 min-h-[calc(100vh-80px)]">
                <nav className="space-y-2 w-full max-w-sm">
                  {/* Services Link */}
                  <Link href="/services" onClick={() => setIsMenuOpen(false)}>
                    <motion.div
                      initial={{ opacity: 0, x: -100, rotate: -10 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      exit={{ opacity: 0, x: 100, rotate: 10 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{
                        scale: 1.1,
                        x: 20,
                        color: "hsl(var(--accent))",
                        textShadow: "0 0 20px rgba(249, 115, 22, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="block text-4xl font-bold text-center py-4 cursor-pointer relative overflow-hidden group"
                    >
                      <span className="relative z-10">SERVICES</span>
                      <motion.div
                        className="absolute inset-0 bg-accent/10 rounded-lg"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>

                  {/* Other Menu Items */}
                  {menuItems.map((item, index) => (
                    <Link key={item.name} href={item.path} onClick={() => setIsMenuOpen(false)}>
                      <motion.div
                        initial={{ opacity: 0, x: -100, rotate: -10 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: 100, rotate: 10 }}
                        transition={{
                          duration: 0.6,
                          delay: (index + 1) * 0.1,
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        }}
                        whileHover={{
                          scale: 1.1,
                          x: 20,
                          color: "hsl(var(--accent))",
                          textShadow: "0 0 20px rgba(249, 115, 22, 0.5)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="block text-4xl font-bold text-center py-4 cursor-pointer relative overflow-hidden group"
                      >
                        <span className="relative z-10">{item.name.toUpperCase()}</span>
                        <motion.div
                          className="absolute inset-0 bg-accent/10 rounded-lg"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </Link>
                  ))}

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="pt-8"
                  >
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 30px rgba(249, 115, 22, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="lg"
                          className="w-full bg-accent hover:bg-accent/90 text-white text-xl py-8 letter-spacing-wide font-bold"
                        >
                          LET'S TALK
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </nav>

                {/* Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-8 text-center w-full"
                >
                  <p className="text-sm text-muted-foreground">Tap any link to explore</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default AdvancedNavigation;
