'use client'

import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Code, Smartphone, ShoppingCart, Search, BarChart, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const services = [
  { 
    name: "Web Development", 
    path: "/services/web-development",
    icon: Code,
    description: "Custom websites & web apps",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    name: "Mobile Apps", 
    path: "/services/mobile-apps",
    icon: Smartphone,
    description: "iOS & Android applications",
    color: "from-purple-500 to-pink-500"
  },
  { 
    name: "E-Commerce", 
    path: "/services/ecommerce",
    icon: ShoppingCart,
    description: "Online stores that convert",
    color: "from-orange-500 to-red-500"
  },
  { 
    name: "UI/UX Design", 
    path: "/services/ui-ux-design",
    icon: Palette,
    description: "Beautiful user experiences",
    color: "from-green-500 to-emerald-500"
  },
  { 
    name: "SEO & Growth", 
    path: "/services/seo-growth",
    icon: Search,
    description: "Grow your online presence",
    color: "from-yellow-500 to-orange-500"
  },
  { 
    name: "Analytics & Insights", 
    path: "/services/analytics",
    icon: BarChart,
    description: "Data-driven decisions",
    color: "from-indigo-500 to-purple-500"
  },
];

const NavigationNext = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { scrollY } = useScroll();
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.7]);
  const logoOpacity = useTransform(scrollY, [0, 50], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Services", path: "/services", hasDropdown: true },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Estimator", path: "/estimator" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background/80 backdrop-blur-md"
      } border-b border-border`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="relative">
              {/* Full Logo (shows at top) */}
              <motion.div
                style={{ opacity: logoOpacity, scale: logoScale }}
                className="text-2xl font-bold letter-spacing-wide text-foreground hover:text-accent transition-smooth relative group cursor-pointer overflow-hidden"
              >
                {scrollY.get() < 50 ? (
                  <motion.div className="flex">
                    {"BIGWEB".split("").map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: scrolled ? 0 : 1, x: scrolled ? -20 : 0 }}
                        transition={{ duration: 0.2, delay: i * 0.03 }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.div>
                ) : null}
              </motion.div>
              
              {/* Compact Logo (shows when scrolled) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: scrolled ? 1 : 0,
                  scale: scrolled ? 1 : 0.8 
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 text-2xl font-black text-accent"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.05em'
                }}
              >
                BW
              </motion.div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              item.path.startsWith("/#") && isHomePage ? (
                <motion.a
                  key={item.name}
                  href={item.path}
                  className="text-sm uppercase letter-spacing-wide text-muted-foreground hover:text-foreground transition-smooth relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-accent origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ) : (
                <Link key={item.name} href={item.path}>
                  <motion.div
                    className="text-sm uppercase letter-spacing-wide text-muted-foreground hover:text-foreground transition-smooth relative group cursor-pointer"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-accent origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              )
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Link href="/contact">
                <Button
                  variant="default"
                  className="bg-accent hover:bg-accent/90 text-primary-foreground letter-spacing-wide relative overflow-hidden group"
                >
                  <span className="relative z-10">LET'S TALK</span>
                  <motion.div
                    className="absolute inset-0 bg-accent/50"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </div>

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

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 space-y-4">
                {menuItems.map((item, index) => (
                  item.path.startsWith("/#") && isHomePage ? (
                    <motion.a
                      key={item.name}
                      href={item.path}
                      className="block text-sm uppercase letter-spacing-wide text-muted-foreground hover:text-foreground transition-smooth"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ) : (
                    <Link key={item.name} href={item.path} onClick={() => setIsMenuOpen(false)}>
                      <motion.div
                        className="block text-sm uppercase letter-spacing-wide text-muted-foreground hover:text-foreground transition-smooth"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  )
                ))}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="default"
                      className="w-full bg-accent hover:bg-accent/90 text-primary-foreground letter-spacing-wide"
                    >
                      LET'S TALK
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavigationNext;
