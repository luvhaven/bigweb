import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// GET /api/blog/posts - Fetch blog posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured') === 'true'

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('blog_posts')
      .select('*, author:blog_authors(name, avatar_url)', { count: 'exact' })
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(from, to)

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }
    if (featured) {
      query = query.eq('is_featured', true)
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    const { data: posts, error, count } = await query

    if (error) {
      console.error('Blog posts API error:', error)
      return NextResponse.json({ success: false, error: 'Failed to fetch blog posts' }, { status: 500 })
    }

    const totalPosts = count || 0
    const totalPages = Math.ceil(totalPosts / limit)

    const formattedPosts = (posts || []).map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author?.name || 'BIGWEB Team',
      authorAvatar: post.author?.avatar_url || null,
      date: post.published_at || post.created_at,
      readTime: post.read_time || '5 min read',
      image: post.cover_image || post.image,
      featured: post.is_featured,
      tags: post.tags || [],
      views: post.views || 0,
    }))

    return NextResponse.json({
      success: true,
      data: {
        posts: formattedPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}
