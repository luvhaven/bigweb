# 🚀 BIGWEB - Complete Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- npm or yarn package manager

---

## 📦 Step 1: Install Dependencies

```bash
# Install all packages
npm install

# Install Prisma
npm install @prisma/client
npm install -D prisma

# Install additional packages
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

---

## 🗄️ Step 2: Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
```sql
CREATE DATABASE bigweb;
```

3. Create `.env` file in root:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/bigweb"
JWT_SECRET="your-super-secret-jwt-key-change-this"
ADMIN_EMAIL="admin@bigweb.com"
```

### Option B: Cloud Database (Recommended)

Use a cloud provider like:
- **Neon** (https://neon.tech) - Free tier available
- **Supabase** (https://supabase.com) - Free tier available
- **Railway** (https://railway.app) - Easy deployment

Get your connection string and add to `.env`:
```env
DATABASE_URL="your-connection-string-here"
```

---

## 🔨 Step 3: Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name init

# Seed database with sample data (optional)
npx prisma db seed
```

---

## 👤 Step 4: Create Admin User

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@bigweb.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', admin.email)

  // Create sample blog post
  const post = await prisma.blogPost.create({
    data: {
      title: 'Welcome to BIGWEB Blog',
      slug: 'welcome-to-bigweb',
      excerpt: 'Learn about our journey and what we offer',
      content: '# Welcome\n\nThis is your first blog post...',
      category: 'Company',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      featured: true,
      published: true,
      publishedAt: new Date(),
      readTime: '5 min read',
      authorId: admin.id,
    },
  })

  console.log('Sample blog post created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

Run seed:
```bash
npm install -D ts-node
npx prisma db seed
```

---

## 🔐 Step 5: Authentication Setup

Create `lib/auth.ts`:

```typescript
import { sign, verify } from 'jsonwebtoken'
import { compare, hash } from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export async function hashPassword(password: string) {
  return await hash(password, 10)
}

export async function comparePassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}

export function createToken(userId: string, email: string, role: string) {
  return sign({ userId, email, role }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET)
  } catch {
    return null
  }
}
```

---

## 🌐 Step 6: Environment Variables

Complete `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bigweb"

# Authentication
JWT_SECRET="your-jwt-secret-key"
ADMIN_EMAIL="admin@bigweb.com"

# Email (Optional - for contact forms)
EMAIL_SERVICE="sendgrid"
EMAIL_API_KEY="your-sendgrid-api-key"
EMAIL_FROM="noreply@bigweb.com"

# File Upload (Optional)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Analytics (Optional)
GA_TRACKING_ID="UA-XXXXXXXXX-X"

# Other
NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

---

## 🏃 Step 7: Run the Application

### Development Mode
```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Docs**: http://localhost:3000/api

### Production Build
```bash
npm run build
npm start
```

---

## 🔑 Step 8: Admin Login

Default credentials:
- **Email**: admin@bigweb.com
- **Password**: admin123

**⚠️ IMPORTANT: Change password immediately after first login!**

---

## 📡 Step 9: API Testing

Test endpoints with curl:

```bash
# Get blog posts
curl http://localhost:3000/api/blog/posts

# Submit contact form
curl -X POST http://localhost:3000/api/contact/general \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello"}'

# Get careers
curl http://localhost:3000/api/careers/openings
```

---

## 🎨 Step 10: Customize

### Update Site Metadata
Edit `app/layout.tsx`:
```typescript
export const metadata = {
  title: 'Your Company Name',
  description: 'Your description',
  // ... other metadata
}
```

### Update Colors
Edit `src/index.css`:
```css
:root {
  --accent: 16 85% 55%; /* Change to your brand color */
}
```

### Add Logo
Replace logo in `public/logo.svg`

---

## 🚀 Step 11: Deploy

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

```bash
npm install -g vercel
vercel
```

### Database Migration on Deploy
```bash
# Add to package.json scripts
{
  "postinstall": "prisma generate",
  "vercel-build": "prisma migrate deploy && next build"
}
```

---

## 📊 Database Management

### Prisma Studio (Visual Database Editor)
```bash
npx prisma studio
```

Opens browser at http://localhost:5555 with GUI to manage data.

### Common Commands
```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Reset database
npx prisma migrate reset

# View database
npx prisma studio

# Generate client
npx prisma generate
```

---

## 🔧 Troubleshooting

### Issue: Prisma Client errors
**Solution:**
```bash
npx prisma generate
npm run dev
```

### Issue: Database connection failed
**Solution:**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Test connection: `psql DATABASE_URL`

### Issue: Module not found errors
**Solution:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
PORT=3001 npm run dev
```

---

## 📱 Mobile Testing

Test on real devices:
```bash
# Find your local IP
ipconfig # Windows
ifconfig # Mac/Linux

# Access from phone
http://YOUR_IP:3000
```

---

## 🎯 Next Steps

1. ✅ Change admin password
2. ✅ Add your content (blog posts, projects, etc.)
3. ✅ Configure email service
4. ✅ Set up file uploads (Cloudinary)
5. ✅ Add Google Analytics
6. ✅ Configure SEO metadata
7. ✅ Test all forms
8. ✅ Deploy to production

---

## 📚 Useful Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Deployment**: https://vercel.com/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs

---

## 🆘 Need Help?

Contact: dev@bigweb.com

---

**Your BIGWEB website is now ready for production!** 🎉

Happy coding! 💻✨
