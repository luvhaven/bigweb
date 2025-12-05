import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/blog/posts - Fetch blog posts with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured') === 'true'
    const sort = searchParams.get('sort') || 'date'

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { published: true }
    
    if (category && category !== 'All') {
      where.category = category
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    if (featured) {
      where.featured = true
    }

    // Build orderBy clause
    let orderBy: any = { publishedAt: 'desc' }
    if (sort === 'views') {
      orderBy = { views: 'desc' }
    } else if (sort === 'title') {
      orderBy = { title: 'asc' }
    }

    // Fetch posts
    const [posts, totalPosts] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          author: {
            select: {
              name: true,
              avatar: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      }),
      prisma.blogPost.count({ where }),
    ])

    const totalPages = Math.ceil(totalPosts / limit)

    // Format response
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author.name,
      authorAvatar: post.author.avatar,
      date: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
      readTime: post.readTime,
      image: post.image,
      featured: post.featured,
      tags: post.tags.map(t => t.tag.name),
      views: post.views,
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
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/blog/posts - Create new blog post (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      image,
      featured,
      published,
      authorId,
      tags,
      readTime,
    } = body

    // Create post
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        image,
        featured: featured || false,
        published: published || false,
        publishedAt: published ? new Date() : null,
        readTime,
        authorId,
        tags: {
          create: tags?.map((tagName: string) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName, slug: tagName.toLowerCase().replace(/\s+/g, '-') },
              },
            },
          })) || [],
        },
      },
      include: {
        author: true,
        tags: { include: { tag: true } },
      },
    })

    return NextResponse.json({
      success: true,
      data: post,
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
