import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@bigweb.com' },
    update: {},
    create: {
      email: 'admin@bigweb.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
      bio: 'Lead administrator and content manager at BIGWEB',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create Blog Posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: 'The Future of Web Development in 2025',
        slug: 'future-of-web-development-2025',
        excerpt: 'Explore the cutting-edge technologies shaping the web development landscape.',
        content: `# The Future of Web Development in 2025

Web development is evolving at an unprecedented pace. Here are the key trends shaping our industry:

## AI-Powered Development
Artificial intelligence is revolutionizing how we build applications...

## Progressive Web Apps
PWAs continue to bridge the gap between web and native applications...

## WebAssembly
Performance-critical applications are being built with WebAssembly...`,
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        featured: true,
        published: true,
        publishedAt: new Date('2024-10-20'),
        readTime: '8 min read',
        views: 1247,
        authorId: admin.id,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Building Scalable SaaS Applications',
        slug: 'building-scalable-saas-applications',
        excerpt: 'Best practices for architecting multi-tenant SaaS platforms.',
        content: `# Building Scalable SaaS Applications

Creating a SaaS platform requires careful planning and robust architecture...`,
        category: 'SaaS',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        featured: true,
        published: true,
        publishedAt: new Date('2024-10-15'),
        readTime: '12 min read',
        views: 892,
        authorId: admin.id,
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'UI/UX Trends That Convert',
        slug: 'uiux-trends-that-convert',
        excerpt: 'Design principles that increase user engagement and conversion rates.',
        content: `# UI/UX Trends That Convert

Great design is more than aesthetics - it drives business results...`,
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
        featured: false,
        published: true,
        publishedAt: new Date('2024-10-10'),
        readTime: '6 min read',
        views: 634,
        authorId: admin.id,
      },
    }),
  ])

  console.log('✅ Created', blogPosts.length, 'blog posts')

  // Create Career Openings
  const careers = await Promise.all([
    prisma.careerOpening.create({
      data: {
        title: 'Senior Full Stack Developer',
        location: 'Remote / New York, NY',
        type: 'FULL_TIME',
        department: 'Engineering',
        description: 'We are seeking an experienced Full Stack Developer to join our growing team...',
        requirements: JSON.stringify([
          '5+ years of experience with React and Node.js',
          'Strong understanding of TypeScript',
          'Experience with cloud platforms (AWS/Azure)',
          'Excellent problem-solving skills'
        ]),
        responsibilities: JSON.stringify([
          'Design and develop scalable web applications',
          'Collaborate with cross-functional teams',
          'Mentor junior developers',
          'Participate in code reviews'
        ]),
        salaryRange: '$120,000 - $180,000',
        isActive: true,
      },
    }),
    prisma.careerOpening.create({
      data: {
        title: 'UI/UX Designer',
        location: 'Remote',
        type: 'FULL_TIME',
        department: 'Design',
        description: 'Join our design team to create beautiful and intuitive user experiences...',
        requirements: JSON.stringify([
          '3+ years of UI/UX design experience',
          'Proficiency in Figma and Adobe Creative Suite',
          'Strong portfolio demonstrating web/mobile design',
          'Understanding of design systems'
        ]),
        responsibilities: JSON.stringify([
          'Create wireframes and prototypes',
          'Conduct user research and testing',
          'Collaborate with developers',
          'Maintain design systems'
        ]),
        salaryRange: '$90,000 - $130,000',
        isActive: true,
      },
    }),
  ])

  console.log('✅ Created', careers.length, 'career openings')

  // Create Portfolio Projects (Elite Edition)
  console.log('🌱 Seeding Elite Portfolio...')

  const projects = await Promise.all([
    prisma.portfolioProject.create({
      data: {
        title: 'Nexus FinTech Platform',
        slug: 'nexus-fintech',
        category: 'FinTech',
        client: 'Nexus Global',
        description: 'High-frequency trading interface with sub-millisecond data visualization.',
        fullDescription: 'We engineered a complete overhaul of the Nexus trading terminal, reducing latency by 40% and increasing daily active volume by $2.4B. The interface uses WebGL for real-time data rendering without DOM overhead.',
        completionDate: new Date('2025-11-15'),
        duration: '8 months',
        url: 'https://nexus.example.com',
        featured: true,
        challenge: 'Legacy infrastructure could not handle the 100x spike in websocket events during market volatility.',
        solution: 'Migrated to a Rust-based websocket server with a heavily optimized React/Three.js frontend.',
        technologies: JSON.stringify(['Rust', 'WebAssembly', 'WebGL', 'React', 'TimescaleDB']),
        teamSize: 12,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1642104704074-907c0698cbd9',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
        ]),
      },
    }),
    prisma.portfolioProject.create({
      data: {
        title: 'Aura Wear Global',
        slug: 'aura-wear',
        category: 'E-Commerce',
        client: 'Aura Inc.',
        description: 'Headless commerce architecture processing 600+ transactions per minute.',
        fullDescription: 'Aura needed a storefront that felt like a native app. We built a headless Shopify Hydrogen solution that delivers 0.9s load times globally, resulting in a 127% conversion lift.',
        completionDate: new Date('2025-09-01'),
        duration: '6 months',
        url: 'https://aura.example.com',
        featured: true,
        challenge: 'Mobile conversion rates were stagnant at 0.8% due to slow page transitions.',
        solution: 'Implemented view transitions and optimistic UI updates to remove all perceived latency.',
        technologies: JSON.stringify(['Shopify Hydrogen', 'React Server Components', 'Sanity CMS', 'Redis']),
        teamSize: 8,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
          'https://images.unsplash.com/photo-1445205170230-053b83016050'
        ]),
      },
    }),
    prisma.portfolioProject.create({
      data: {
        title: 'Orbital Logistics',
        slug: 'orbital-logistics',
        category: 'SaaS',
        client: 'Orbital Group',
        description: 'AI-powered fleet management dashboard for autonomous supply chains.',
        fullDescription: 'The central command for a fleet of 500+ autonomous delivery vehicles. Features real-time telemetry, predictive maintenance alerts, and route optimization via custom LLM agents.',
        completionDate: new Date('2025-12-20'),
        duration: '14 months',
        url: 'https://orbital.example.com',
        featured: true,
        challenge: 'Operators were overwhelmed by raw data streams from vehicle sensors.',
        solution: 'Built an "Action First" UI that uses AI to filter noise and only surface critical intervention requests.',
        technologies: JSON.stringify(['Python', 'TensorFlow', 'Mapbox GL', 'Next.js', 'PostgreSQL']),
        teamSize: 18,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1580674285054-bed31e145f59',
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c'
        ]),
      },
    }),
    prisma.portfolioProject.create({
      data: {
        title: 'Vanguard Architecture',
        slug: 'vanguard-arch',
        category: 'Corporate',
        client: 'Vanguard Partners',
        description: 'Immersive 3D portfolio for a Pritzker-winning architecture firm.',
        fullDescription: 'We translated physical space into digital experience. The site uses scroll-linked WebGL animations to deconstruct building plans as users explore the portfolio.',
        completionDate: new Date('2025-06-10'),
        duration: '4 months',
        url: 'https://vanguard.example.com',
        featured: true,
        challenge: 'Standard image galleries failed to capture the spatial complexity of their work.',
        solution: 'Created a "Digital Twin" viewer that allows prospective clients to walk through unbuilt projects.',
        technologies: JSON.stringify(['Three.js', 'React Three Fiber', 'GSAP', 'Vercel']),
        teamSize: 5,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
          'https://images.unsplash.com/photo-1487958449943-2429e8be8625'
        ]),
      },
    }),
  ])

  console.log('✅ Created', projects.length, 'expert projects')

  // Create Testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: 'Sarah Johnson',
        role: 'CEO',
        company: 'TechStart Inc.',
        content: 'BIGWEB transformed our digital presence. Their attention to detail and technical expertise is unmatched. Our conversion rates increased by 340% after the redesign.',
        rating: 5,
        image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
        featured: true,
        result: '340% increase in conversions',
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Michael Chen',
        role: 'CTO',
        company: 'DataFlow Solutions',
        content: 'The team at BIGWEB delivered beyond our expectations. They built a scalable platform that handles millions of requests daily.',
        rating: 5,
        image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=4F46E5&color=fff',
        featured: true,
        result: '10M+ requests daily',
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Emily Rodriguez',
        role: 'Product Manager',
        company: 'FinTech Pro',
        content: 'Professional, efficient, and innovative. BIGWEB helped us launch our product 2 months ahead of schedule.',
        rating: 5,
        image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=EC4899&color=fff',
        featured: false,
      },
    }),
  ])

  console.log('✅ Created', testimonials.length, 'testimonials')

  // Create Services (Forensic Edition)
  console.log('🌱 Seeding Forensic Services...')

  const categories = [
    {
      title: "Engineering",
      subtitle: "Industrial Scale Infrastructure",
      icon: "Cpu",
      color: "text-blue-500",
      products: [
        {
          title: "The Revenue Engine™",
          slug: "web-development",
          tagline: "High-fidelity web architecture.",
          description: "We do not build websites. We build revenue engines. Custom, high-performance web architecture designed to capture and convert market demand with focused precision.",
          fullDescription: "In an era of commodity templates, custom engineering is the only competitive advantage left. Our web development method focuses exclusively on speed, security, and conversion velocity.",
          icon: "Code",
          features: ["Next.js Architecture", "Global CDN Distribution", "Sub-millisecond TBT", "Forensic SEO Structure", "Conversion-First UX"],
          pricing: { starting: 25000, model: "project" }
        },
        {
          title: "The Pocket Empire™",
          slug: "mobile-apps",
          tagline: "Native dominance on every screen.",
          description: "Your market lives on their phones. We engineer native mobile experiences that claim and monetize that territory.",
          fullDescription: "Cross-platform dominance using React Native or pure native implementation when raw metal performance is required.",
          icon: "Smartphone",
          features: ["iOS & Android", "Offline-First Architecture", "Biometric Security", "Real-time Sync", "Haptic Feedback Engines"],
          pricing: { starting: 35000, model: "project" }
        },
        {
          title: "The Transaction Machine™",
          slug: "ecommerce",
          tagline: "Frictionless capital flow.",
          description: "Optimized payment rails and product discovered engines. We reduce friction to zero.",
          fullDescription: "headless commerce architectures that decouple the frontend experience from the inventory backend for maximum speed and design freedom.",
          icon: "ShoppingCart",
          features: ["Headless Shopify/BigCommerce", "1-Click Checkout", "AI Recommendations", "Inventory Sync", "Global Tax/Compliance"],
          pricing: { starting: 40000, model: "project" }
        },
        {
          title: "The Elite Squad™",
          slug: "staff-augmentation",
          tagline: "Senior engineering node deployment.",
          description: "Deploy senior engineering talent directly into your workflow. No ramp-up, just output.",
          fullDescription: "We provide vetted, senior-level engineers who integrate seamlessly into your existing team structure to accelerate delivery.",
          icon: "Users",
          features: ["Top 1% Talent", "Timezone Aligned", "Full Stack Capable", "Architecture Leadership", "Day 1 Impact"],
          pricing: { starting: 8000, model: "monthly" }
        },
      ]
    },
    {
      title: "Intelligence",
      subtitle: "Data Analysis & AI Insights",
      icon: "Brain",
      color: "text-violet-500",
      products: [
        {
          title: "The Profit Autopilot™",
          slug: "ai-automation",
          tagline: "Automated AI agent workflows.",
          description: "Replacing human friction with autonomous agentic workflows. Scale without headcount.",
          fullDescription: "We engineer custom AI agents that handle customer support, lead qualification, and data processing 24/7/365.",
          icon: "Bot",
          features: ["Autonomous Agents", "LLM Integration", "Workflow Automation", "Self-Healing Pipelines", "24/7 Operation"],
          pricing: { starting: 15000, model: "project" }
        },
        {
          title: "The Neural Strategy™",
          slug: "ai-consulting",
          tagline: "Strategic AI implementation roadmap.",
          description: "Don't guess at AI. We provide a detailed roadmap for implementing machine intelligence in your specific vertical.",
          fullDescription: "A deep-dive audit and strategy phase to identify high-leverage opportunities for AI integration within your enterprise.",
          icon: "Brain",
          features: ["Opportunity Audit", "Tech Stack Selection", "ROI Modeling", "Implementation Roadmap", "Risk Assessment"],
          pricing: { starting: 10000, model: "fixed" }
        },
        {
          title: "The Answer Vault™",
          slug: "gaio",
          tagline: "GAIO & search system dominance.",
          description: "Ranking in Google is old news. We engineer your brand to be the direct answer in LLM queries (ChatGPT, Perplexity, Gemini).",
          fullDescription: "Generative AI Optimization (GAIO) is the new SEO. We structure your data so AI models cite you as the authority.",
          icon: "Search",
          features: ["LLM Corpus Optimization", "Structured Data Injection", "Citation Architecture", "Knowledge Graph Authority", "Brand Entity Protection"],
          pricing: { starting: 5000, model: "monthly" }
        },
        {
          title: "The Intelligence Dashboard™",
          slug: "analytics",
          tagline: "Detailed data visualization.",
          description: "Stop looking at vanity metrics. We build dashboards that show you exactly where money is being made or lost.",
          fullDescription: "Custom analytics dashboards that aggregate data from all your sources into actionable intelligence.",
          icon: "BarChart3",
          features: ["Real-time Reporting", "Cross-Platform Unified", "Conversion Attribution", "Custom Reporting", "Predictive Modeling"],
          pricing: { starting: 12000, model: "project" }
        },
      ]
    },
    {
      title: "Experience",
      subtitle: "Performance & Conversion Mechanics",
      icon: "Zap",
      color: "text-emerald-500",
      products: [
        {
          title: "The Experience Engine™",
          slug: "ui-ux-design",
          tagline: "High-fidelity UX primitives.",
          description: "Design that converts. We use behavioral psychology and user data to engineer interfaces that drive action.",
          fullDescription: "A complete design system overhaul focused on aesthetic excellence and conversion performance.",
          icon: "Palette",
          features: ["Design Systems", "High-Fidelity Prototyping", "Motion Design", "Behavioral UX", "Accessibility Compliance"],
          pricing: { starting: 20000, model: "project" }
        },
        {
          title: "The Authority System™",
          slug: "seo",
          tagline: "Organic market share growth.",
          description: "Dominance is not an accident. We engineer your content architecture to own the most profitable keywords in your industry.",
          fullDescription: "Enterprise-grade SEO strategy that combines technical perfection with high-authority content modeling.",
          icon: "TrendingUp",
          features: ["Technical SEO Audit", "Content Strategy", "Backlink Acquisition", "Local Dominance", "Competitor Analysis"],
          pricing: { starting: 4000, model: "monthly" }
        },
        {
          title: "The Zero-Downtime Mesh™",
          slug: "maintenance",
          tagline: "24/7 forensic surveillance.",
          description: "Sleep soundly. Our automated sentinels watch your infrastructure 24/7, resolving issues before they impact revenue.",
          fullDescription: "Proactive maintenance and security monitoring package for mission-critical web infrastructure.",
          icon: "Shield",
          features: ["24/7 Uptime Monitoring", "Security Patching", "Daily Backups", "Performance Tuning", "Emergency Response"],
          pricing: { starting: 2000, model: "monthly" }
        },
        {
          title: "The Efficiency Engine™",
          slug: "optimization",
          tagline: "Sub-millisecond logic acceleration.",
          description: "Speed is revenue. We optimize every byte of your application to ensure instant load times globally.",
          fullDescription: "A comprehensive performance audit and remediation sprint to achieve 100/100 Core Web Vitals.",
          icon: "Zap",
          features: ["Core Web Vitals 100", "Code Splitting", "Asset Compression", "Database Optimization", "Serverless Edge Functions"],
          pricing: { starting: 8000, model: "fixed" }
        },
      ]
    }
  ]

  for (const category of categories) {
    for (const product of category.products) {
      await prisma.service.upsert({
        where: { slug: product.slug },
        update: {
          title: product.title,
          description: product.tagline,
          fullDescription: product.fullDescription,
          icon: product.icon,
          features: JSON.stringify(product.features),
          pricing: JSON.stringify(product.pricing),
          isActive: true
        },
        create: {
          title: product.title,
          slug: product.slug,
          description: product.tagline,
          fullDescription: product.fullDescription,
          icon: product.icon,
          features: JSON.stringify(product.features),
          pricing: JSON.stringify(product.pricing),
          popular: ["web-development", "ai-automation", "gaio"].includes(product.slug),
          isActive: true
        }
      })
    }
  }

  console.log('✅ Seeds Planted: Strategic Services Active')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
