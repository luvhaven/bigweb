'use client'

import { useState } from 'react'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import PremiumBackground from '@/components/PremiumBackground'

// TODO: Replace with API call to /api/blog/posts
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: AI-Powered Design Systems',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we build design systems and create consistent user experiences at scale.',
    category: 'Development',
    author: 'Sarah Chen',
    date: '2024-10-15',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=90',
    featured: true,
    tags: ['AI', 'Design Systems', 'Web Dev']
  },
  {
    id: 2,
    title: 'Conversion Rate Optimization: A Data-Driven Approach',
    excerpt: 'Learn the proven strategies we use to increase conversion rates by 300%+ for our clients through systematic testing and optimization.',
    category: 'Marketing',
    author: 'Michael Rodriguez',
    date: '2024-10-10',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90',
    featured: true,
    tags: ['CRO', 'Marketing', 'Analytics']
  },
  {
    id: 3,
    title: 'Building Accessible Websites: Beyond WCAG Compliance',
    excerpt: 'Accessibility isn\'t just about compliance—it\'s about creating inclusive experiences that work for everyone. Here\'s our approach.',
    category: 'Design',
    author: 'Emily Watson',
    date: '2024-10-05',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=90',
    featured: false,
    tags: ['Accessibility', 'UX', 'Design']
  },
  {
    id: 4,
    title: 'Performance Optimization: Achieving Sub-Second Load Times',
    excerpt: 'Speed matters. Discover the advanced techniques we use to achieve blazing-fast load times without sacrificing functionality.',
    category: 'Development',
    author: 'David Kim',
    date: '2024-09-28',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90',
    featured: false,
    tags: ['Performance', 'Optimization', 'Web Dev']
  },
  {
    id: 5,
    title: 'The Psychology of Color in Web Design',
    excerpt: 'Color choices impact user behavior more than you think. Learn how to use color psychology to boost engagement and conversions.',
    category: 'Design',
    author: 'Sarah Chen',
    date: '2024-09-20',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=90',
    featured: false,
    tags: ['Design', 'Psychology', 'UX']
  },
  {
    id: 6,
    title: 'Headless CMS: The Future of Content Management',
    excerpt: 'Why we\'re moving away from traditional CMS platforms and embracing headless architecture for maximum flexibility.',
    category: 'Development',
    author: 'Michael Rodriguez',
    date: '2024-09-15',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=90',
    featured: false,
    tags: ['CMS', 'Headless', 'Development']
  }
]

const categories = ['All', 'Development', 'Design', 'Marketing']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <main className="min-h-screen overflow-hidden">
      <Navigation />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <PremiumBackground variant="mesh" intensity="subtle" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-3 mb-6">
              <Tag className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Latest Insights
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-luxury">
              Insights & <span className="gradient-text-luxury">Expertise</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Industry insights, trends, and strategies from the BIGWEB team
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12"
          >
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card/50 backdrop-blur-sm border border-border rounded-xl focus:border-accent transition-all outline-none"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-card/50 text-muted-foreground hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card-elite group cursor-pointer hover-lift-elegant"
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative aspect-video overflow-hidden rounded-t-xl mb-6">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{post.author}</span>
                      <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-2 transition-transform" />
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
          </h2>
          
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="card-premium group cursor-pointer hover-lift-elegant"
                  >
                    <Link href={`/blog/${post.id}`}>
                      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm font-medium">{post.author}</span>
                        <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-2 transition-transform" />
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TODO: Add Pagination Component */}
          {/* <Pagination currentPage={1} totalPages={5} /> */}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 relative overflow-hidden">
        <PremiumBackground variant="gradient" intensity="medium" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Get the latest insights delivered directly to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              {/* TODO: Connect to /api/newsletter/subscribe */}
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-card border border-border rounded-xl focus:border-accent transition-all outline-none"
                required
              />
              <Button variant="luxury" size="lg">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
