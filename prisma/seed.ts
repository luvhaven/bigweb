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

  // Create Portfolio Projects
  const projects = await Promise.all([
    prisma.portfolioProject.create({
      data: {
        title: 'E-Commerce Platform Redesign',
        slug: 'ecommerce-platform-redesign',
        description: 'Complete redesign of a multi-million dollar e-commerce platform',
        fullDescription: 'Our team completely transformed the user experience of a legacy e-commerce platform, resulting in significant improvements in conversion rates and customer satisfaction.',
        category: 'E-Commerce',
        client: 'RetailCorp Inc.',
        completionDate: new Date('2024-08-15'),
        duration: '6 months',
        url: 'https://example.com',
        featured: true,
        challenge: 'The existing platform had poor UX and was built on outdated technology.',
        solution: 'We implemented a modern React-based frontend with a microservices backend.',
        technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe']),
        teamSize: 8,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1557821552-17105176677c',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
        ]),
      },
    }),
    prisma.portfolioProject.create({
      data: {
        title: 'Healthcare Management System',
        slug: 'healthcare-management-system',
        description: 'HIPAA-compliant patient management platform',
        fullDescription: 'Built a comprehensive healthcare management system with patient records, appointment scheduling, and billing integration.',
        category: 'Healthcare',
        client: 'HealthFirst Medical',
        completionDate: new Date('2024-09-20'),
        duration: '8 months',
        featured: true,
        technologies: JSON.stringify(['Next.js', 'Prisma', 'PostgreSQL', 'Azure']),
        teamSize: 12,
        images: JSON.stringify([
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3'
        ]),
      },
    }),
  ])

  console.log('✅ Created', projects.length, 'portfolio projects')

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

  // Create Services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: 'Web Development',
        slug: 'web-development',
        description: 'Custom web applications built with modern technologies',
        fullDescription: 'We create high-performance web applications using the latest frameworks and best practices.',
        icon: 'Code',
        features: JSON.stringify([
          'React & Next.js Development',
          'Full-Stack Solutions',
          'API Development',
          'Database Design',
          'Cloud Deployment'
        ]),
        pricing: JSON.stringify({
          starting: 15000,
          currency: 'USD',
          type: 'project'
        }),
        popular: true,
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        title: 'UI/UX Design',
        slug: 'uiux-design',
        description: 'Beautiful and intuitive user interfaces',
        fullDescription: 'Our design team creates stunning interfaces that users love.',
        icon: 'Palette',
        features: JSON.stringify([
          'User Research',
          'Wireframing & Prototyping',
          'Visual Design',
          'Design Systems',
          'Usability Testing'
        ]),
        pricing: JSON.stringify({
          starting: 8000,
          currency: 'USD',
          type: 'project'
        }),
        popular: true,
        isActive: true,
      },
    }),
  ])

  console.log('✅ Created', services.length, 'services')

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
