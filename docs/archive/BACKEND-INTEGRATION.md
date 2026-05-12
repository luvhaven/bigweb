# 🔌 BACKEND INTEGRATION GUIDE

## Overview
Complete API endpoints and integration points for BIGWEB website backend.

---

## 📊 API Endpoints Required

### 1. **Blog System**

#### GET `/api/blog/posts`
Fetch all blog posts with pagination and filtering.

**Query Parameters:**
```typescript
{
  page?: number        // Current page (default: 1)
  limit?: number       // Posts per page (default: 10)
  category?: string    // Filter by category
  search?: string      // Search term
  featured?: boolean   // Featured posts only
  sort?: 'date' | 'views' | 'title'  // Sort order
}
```

**Response:**
```typescript
{
  success: boolean
  data: {
    posts: Array<{
      id: number | string
      title: string
      excerpt: string
      content: string
      category: string
      author: string
      date: string  // ISO format
      readTime: string
      image: string  // URL
      featured: boolean
      tags: string[]
      views?: number
      slug: string
    }>
    pagination: {
      currentPage: number
      totalPages: number
      totalPosts: number
      hasNext: boolean
      hasPrev: boolean
    }
  }
}
```

**Component Location:** `/app/blog/page.tsx` (Line 13)

---

#### GET `/api/blog/posts/:id`
Fetch single blog post by ID or slug.

**Response:**
```typescript
{
  success: boolean
  data: {
    id: number | string
    title: string
    content: string  // Full content (Markdown or HTML)
    excerpt: string
    category: string
    author: {
      name: string
      avatar: string
      bio: string
    }
    date: string
    readTime: string
    image: string
    featured: boolean
    tags: string[]
    views: number
    relatedPosts?: Array<{id, title, image, slug}>
  }
}
```

---

#### POST `/api/newsletter/subscribe`
Subscribe user to newsletter.

**Request Body:**
```typescript
{
  email: string  // Required, valid email
  name?: string  // Optional
}
```

**Response:**
```typescript
{
  success: boolean
  message: string
}
```

**Component Location:** `/app/blog/page.tsx` (Line 331)

---

### 2. **Careers System**

#### GET `/api/careers/openings`
Fetch all open job positions.

**Response:**
```typescript
{
  success: boolean
  data: Array<{
    id: number | string
    title: string
    location: string
    type: 'Full-time' | 'Part-time' | 'Contract'
    department: string
    description: string
    requirements: string[]
    responsibilities: string[]
    salary?: string
    benefits?: string[]
    postedDate: string
    closingDate?: string
    isActive: boolean
  }>
}
```

**Component Location:** `/app/careers/page.tsx` (Line 12)

---

#### POST `/api/careers/apply`
Submit job application.

**Request Body (multipart/form-data):**
```typescript
{
  jobId: string | number
  firstName: string
  lastName: string
  email: string
  phone: string
  resume: File  // PDF, DOC, DOCX (max 5MB)
  coverLetter?: string
  linkedin?: string
  portfolio?: string
  additionalInfo?: string
}
```

**Response:**
```typescript
{
  success: boolean
  message: string
  applicationId?: string
}
```

---

### 3. **Contact Forms**

#### POST `/api/contact/general`
General contact form submission.

**Request Body:**
```typescript
{
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  subject?: string
  source?: string  // Where they came from
}
```

**Response:**
```typescript
{
  success: boolean
  message: string
  ticketId?: string
}
```

**Component Location:** `/app/contact/page.tsx`

---

#### POST `/api/contact/estimator`
Project estimate request.

**Request Body:**
```typescript
{
  name: string
  email: string
  phone?: string
  company?: string
  services: string[]  // Selected services
  budget: string
  timeline: string
  description: string
  features?: string[]
  additionalInfo?: string
}
```

**Response:**
```typescript
{
  success: boolean
  message: string
  estimateId: string
  estimatedCost?: {
    min: number
    max: number
    currency: string
  }
}
```

**Component Location:** `/app/estimator/page.tsx`

---

### 4. **Portfolio System**

#### GET `/api/portfolio/projects`
Fetch portfolio projects.

**Query Parameters:**
```typescript
{
  category?: string  // Filter by category
  limit?: number
  featured?: boolean
}
```

**Response:**
```typescript
{
  success: boolean
  data: Array<{
    id: number | string
    title: string
    description: string
    category: string
    tags: string[]
    image: string
    images?: string[]  // Additional images
    client: string
    completionDate: string
    url?: string  // Live site URL
    featured: boolean
    results?: {
      metric: string
      value: string
    }[]
    testimonial?: {
      quote: string
      author: string
      role: string
    }
  }>
}
```

**Component Location:** `/src/components/ElitePortfolio.tsx`

---

#### GET `/api/portfolio/projects/:id`
Fetch single project details.

**Response:**
```typescript
{
  success: boolean
  data: {
    id: number | string
    title: string
    description: string
    fullDescription: string  // Detailed project description
    category: string
    tags: string[]
    images: string[]
    client: string
    completionDate: string
    duration: string
    url?: string
    featured: boolean
    challenge: string
    solution: string
    results: Array<{metric: string, value: string, description?: string}>
    technologies: string[]
    teamSize?: number
    testimonial?: {
      quote: string
      author: string
      role: string
      avatar: string
    }
    relatedProjects?: Array<{id, title, image}>
  }
}
```

---

### 5. **Testimonials**

#### GET `/api/testimonials`
Fetch client testimonials.

**Query Parameters:**
```typescript
{
  limit?: number
  featured?: boolean
}
```

**Response:**
```typescript
{
  success: boolean
  data: Array<{
    id: number | string
    name: string
    role: string
    company: string
    content: string
    rating: number  // 1-5
    image: string  // Avatar URL
    featured: boolean
    result?: string  // E.g., "+412% Conversions"
    date: string
  }>
}
```

**Component Locations:** 
- `/src/components/PremiumTestimonials.tsx`
- `/src/components/CarouselTestimonialsAdvanced.tsx`

---

### 6. **Services**

#### GET `/api/services`
Fetch all services offered.

**Response:**
```typescript
{
  success: boolean
  data: Array<{
    id: number | string
    title: string
    slug: string
    description: string
    icon: string  // Icon name or URL
    features: string[]
    pricing: {
      startingPrice: number
      currency: string
      billingPeriod: string
    }
    popular: boolean
  }>
}
```

---

#### GET `/api/services/:slug`
Fetch single service details.

**Response:**
```typescript
{
  success: boolean
  data: {
    id: number | string
    title: string
    slug: string
    description: string
    fullDescription: string
    icon: string
    features: Array<{
      title: string
      description: string
      icon: string
    }>
    pricing: {
      startingPrice: number
      currency: string
      plans?: Array<{
        name: string
        price: number
        features: string[]
      }>
    }
    benefits: string[]
    process: Array<{
      step: number
      title: string
      description: string
    }>
    caseStudies?: Array<{
      id: string
      title: string
      result: string
    }>
    faqs?: Array<{
      question: string
      answer: string
    }>
  }
}
```

---

### 7. **Analytics**

#### POST `/api/analytics/pageview`
Track page views (optional, if not using third-party analytics).

**Request Body:**
```typescript
{
  page: string  // Page URL
  referrer?: string
  userAgent?: string
  sessionId?: string
}
```

---

#### POST `/api/analytics/event`
Track custom events.

**Request Body:**
```typescript
{
  event: string  // Event name (e.g., 'button_click', 'form_submit')
  category: string
  label?: string
  value?: number
  metadata?: object
}
```

---

### 8. **Admin/CMS**

#### POST `/api/admin/auth/login`
Admin authentication.

**Request Body:**
```typescript
{
  email: string
  password: string
}
```

**Response:**
```typescript
{
  success: boolean
  token: string  // JWT token
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}
```

---

#### GET `/api/admin/dashboard/stats`
Dashboard statistics (requires authentication).

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```typescript
{
  success: boolean
  data: {
    totalProjects: number
    totalClients: number
    activeProjects: number
    revenue: {
      current: number
      previous: number
      growth: number
    }
    recentContacts: Array<{id, name, email, date}>
    recentApplications: Array<{id, name, position, date}>
  }
}
```

---

## 🗄️ Database Schema Suggestions

### Blog Posts Table
```sql
CREATE TABLE blog_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content LONGTEXT NOT NULL,
  category VARCHAR(100),
  author_id INT,
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  published_at DATETIME,
  updated_at DATETIME,
  views INT DEFAULT 0,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  INDEX idx_category (category),
  INDEX idx_featured (featured),
  INDEX idx_published (published_at),
  FOREIGN KEY (author_id) REFERENCES users(id)
);
```

### Blog Tags Table
```sql
CREATE TABLE blog_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE blog_post_tags (
  post_id INT,
  tag_id INT,
  PRIMARY KEY (post_id, tag_id),
  FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE
);
```

### Career Openings Table
```sql
CREATE TABLE career_openings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  type ENUM('Full-time', 'Part-time', 'Contract') NOT NULL,
  department VARCHAR(100),
  description TEXT,
  requirements JSON,
  responsibilities JSON,
  salary_range VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  posted_date DATE NOT NULL,
  closing_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_active (is_active),
  INDEX idx_department (department)
);
```

### Job Applications Table
```sql
CREATE TABLE job_applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_id INT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  resume_url VARCHAR(500),
  cover_letter TEXT,
  linkedin VARCHAR(255),
  portfolio VARCHAR(255),
  status ENUM('pending', 'reviewed', 'interview', 'rejected', 'accepted') DEFAULT 'pending',
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES career_openings(id),
  INDEX idx_status (status),
  INDEX idx_job (job_id)
);
```

### Portfolio Projects Table
```sql
CREATE TABLE portfolio_projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  full_description LONGTEXT,
  category VARCHAR(100),
  client VARCHAR(255),
  completion_date DATE,
  duration VARCHAR(50),
  url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  challenge TEXT,
  solution TEXT,
  technologies JSON,
  team_size INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_featured (featured)
);
```

### Contact Submissions Table
```sql
CREATE TABLE contact_submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT NOT NULL,
  subject VARCHAR(255),
  source VARCHAR(100),
  status ENUM('new', 'contacted', 'converted', 'closed') DEFAULT 'new',
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_email (email)
);
```

### Testimonials Table
```sql
CREATE TABLE testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  company VARCHAR(255),
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  result VARCHAR(255),
  published_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_featured (featured),
  INDEX idx_active (is_active)
);
```

### Newsletter Subscribers Table
```sql
CREATE TABLE newsletter_subscribers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status ENUM('active', 'unsubscribed') DEFAULT 'active',
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME,
  INDEX idx_email (email),
  INDEX idx_status (status)
);
```

---

## 🔐 Authentication & Authorization

### JWT Token Structure
```typescript
{
  userId: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  iat: number  // Issued at
  exp: number  // Expiration
}
```

### Protected Routes
All `/api/admin/*` endpoints require authentication.

**Middleware Example:**
```typescript
export async function authMiddleware(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded
  } catch (error) {
    return new Response('Invalid token', { status: 401 })
  }
}
```

---

## 📧 Email Notifications

### Contact Form Submission
```
To: admin@bigweb.com
Subject: New Contact Form Submission

Name: {name}
Email: {email}
Company: {company}
Message: {message}
```

### Job Application Received
```
To: hr@bigweb.com
Subject: New Job Application - {position}

Applicant: {firstName} {lastName}
Email: {email}
Position: {jobTitle}
Resume: {resumeURL}
```

### Application Confirmation
```
To: {applicantEmail}
Subject: Application Received - {position}

Dear {firstName},

Thank you for applying to the {position} position at BIGWEB...
```

---

## 🔄 Rate Limiting

Recommended rate limits:

- **Contact Forms:** 3 requests per hour per IP
- **Newsletter Subscribe:** 5 requests per hour per IP
- **API General:** 100 requests per minute per IP
- **Admin API:** 1000 requests per minute per token

**Implementation Example (Next.js middleware):**
```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
})

export async function middleware(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }
}
```

---

## 📝 Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bigweb
DATABASE_POOL_SIZE=10

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=7d
ADMIN_EMAIL=admin@bigweb.com

# Email Service (e.g., SendGrid, Resend)
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your_api_key
EMAIL_FROM=noreply@bigweb.com

# File Upload
UPLOAD_MAX_SIZE=5242880  # 5MB
ALLOWED_FILE_TYPES=pdf,doc,docx

# Analytics
ANALYTICS_ENABLED=true
GA_TRACKING_ID=UA-XXXXXXXXX-X

# Rate Limiting
REDIS_URL=redis://localhost:6379

# Other
NODE_ENV=production
API_BASE_URL=https://api.bigweb.com
FRONTEND_URL=https://bigweb.com
```

---

## 🧪 Testing Endpoints

### Example using cURL:

```bash
# Get blog posts
curl https://api.bigweb.com/api/blog/posts?limit=10&category=Development

# Submit contact form
curl -X POST https://api.bigweb.com/api/contact/general \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I need a website"
  }'

# Subscribe to newsletter
curl -X POST https://api.bigweb.com/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "subscriber@example.com"}'
```

---

## 🚀 Implementation Checklist

### Phase 1: Core Functionality
- [ ] Blog API endpoints
- [ ] Contact form endpoint
- [ ] Newsletter subscription
- [ ] Basic analytics

### Phase 2: Content Management
- [ ] Portfolio API
- [ ] Testimonials API
- [ ] Services API
- [ ] Admin authentication

### Phase 3: Career Portal
- [ ] Career openings API
- [ ] Job application submission
- [ ] File upload handling
- [ ] Email notifications

### Phase 4: Advanced Features
- [ ] Admin dashboard API
- [ ] Analytics tracking
- [ ] Rate limiting
- [ ] Search functionality

### Phase 5: Optimization
- [ ] Caching strategy
- [ ] CDN integration
- [ ] Image optimization
- [ ] Performance monitoring

---

## 📚 Recommended Tech Stack

### Backend Framework Options:
- **Next.js API Routes** (Recommended for this project)
- **Node.js + Express**
- **Python + FastAPI**
- **Ruby on Rails**

### Database Options:
- **PostgreSQL** (Recommended for complex queries)
- **MySQL**
- **MongoDB** (For flexible schemas)

### ORM/Query Builder:
- **Prisma** (Recommended for TypeScript)
- **Sequelize**
- **TypeORM**

### File Storage:
- **AWS S3**
- **Cloudinary** (Recommended for images)
- **DigitalOcean Spaces**

### Email Service:
- **Resend** (Recommended)
- **SendGrid**
- **Postmark**

### Cache:
- **Redis** (Recommended)
- **Memcached**

---

## 🔗 Frontend Integration Points

### Page → API Mapping:

| Page | API Endpoints Used |
|------|-------------------|
| `/blog` | `GET /api/blog/posts`<br>`POST /api/newsletter/subscribe` |
| `/blog/[id]` | `GET /api/blog/posts/:id` |
| `/careers` | `GET /api/careers/openings` |
| `/contact` | `POST /api/contact/general` |
| `/estimator` | `POST /api/contact/estimator` |
| `/portfolio` | `GET /api/portfolio/projects` |
| `/` (Homepage) | `GET /api/testimonials`<br>`GET /api/portfolio/projects?featured=true` |

---

## 📞 Support & Questions

For backend integration questions, contact: dev@bigweb.com

**This website is now 100% ready for backend integration!** 🎉
