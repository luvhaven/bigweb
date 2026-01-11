'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Hash, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image_url: string
  reading_time_minutes: number
  published_at: string
  category: {
    name: string
    slug: string
  }
}

type Category = {
  id: string
  name: string
  slug: string
}

export default function BlogListingPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      // Fetch Categories
      const { data: cats } = await supabase
        .from('cms_blog_categories')
        .select('*')
        .order('sort_order')

      if (cats) setCategories(cats)

      // Fetch Posts
      const { data: bPosts, error } = await supabase
        .from('cms_blog_posts')
        .select(`
            id, title, slug, excerpt, cover_image_url, reading_time_minutes, published_at,
            category:cms_blog_categories(name, slug)
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false })

      if (bPosts) {
        // Type casting for join result
        const formattedPosts = bPosts.map((p: any) => ({
          ...p,
          category: p.category // Should come as object due to single relation
        }))
        setPosts(formattedPosts)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || post.category?.slug === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-background selection:bg-accent/30">
      <ConversionNavigation />

      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            The Conversion <span className="text-accent">Knowledge Base</span>
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-12">
            Insights, protocols, and experiments from the lab. We share what works so you can stop guessing.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10 h-12 bg-secondary/50 border-white/10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full no-scrollbar">
              <Button
                variant={activeCategory === 'All' ? 'default' : 'outline'}
                onClick={() => setActiveCategory('All')}
                className={`rounded-full ${activeCategory === 'All' ? 'bg-accent hover:bg-accent-dark' : 'bg-transparent border-white/10'}`}
              >
                All
              </Button>
              {categories.map(cat => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.slug ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`rounded-full whitespace-nowrap ${activeCategory === cat.slug ? 'bg-accent hover:bg-accent-dark' : 'bg-transparent border-white/10'}`}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-secondary/30 animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5"
                >
                  <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                    {post.cover_image_url ? (
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                        <Hash className="w-12 h-12 text-muted-foreground/20" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                        {post.category?.name || 'Article'}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Clock className="w-3 h-3" />
                      <span>{post.reading_time_minutes} min read</span>
                      <span>•</span>
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-accent hover:underline text-sm font-bold"
                    >
                      Read Protocol <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
