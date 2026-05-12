# 🧪 API Testing Guide

## Quick API Tests

Your backend is running at: **http://localhost:3000**

---

## 1. Test Blog Posts API

### Get All Posts
```bash
curl http://localhost:3000/api/blog/posts
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "...",
        "title": "The Future of Web Development in 2025",
        "category": "Development",
        "views": 1247,
        ...
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalPosts": 3
    }
  }
}
```

### Filter by Category
```bash
curl "http://localhost:3000/api/blog/posts?category=Development"
```

### Search Posts
```bash
curl "http://localhost:3000/api/blog/posts?search=web"
```

---

## 2. Test Authentication API

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@bigweb.com\",\"password\":\"admin123\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "email": "admin@bigweb.com",
      "name": "Admin User",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 3. Test Careers API

### Get All Job Openings
```bash
curl http://localhost:3000/api/careers/openings
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "Senior Full Stack Developer",
      "location": "Remote / New York, NY",
      "type": "FULL_TIME",
      "department": "Engineering",
      "salaryRange": "$120,000 - $180,000",
      "applicants": 0
    }
  ]
}
```

### Filter by Department
```bash
curl "http://localhost:3000/api/careers/openings?department=Engineering"
```

---

## 4. Test Portfolio API

### Get All Projects
```bash
curl http://localhost:3000/api/portfolio/projects
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "title": "E-Commerce Platform Redesign",
      "category": "E-Commerce",
      "client": "RetailCorp Inc.",
      "technologies": ["React", "Node.js", "PostgreSQL", "AWS"],
      "featured": true
    }
  ]
}
```

---

## 5. Test Contact Form API

### Submit Contact Form
```bash
curl -X POST http://localhost:3000/api/contact/general \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"message\":\"Test message\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon.",
  "ticketId": "..."
}
```

---

## 6. Test Job Application API

### Submit Job Application
```bash
# First get a job ID from /api/careers/openings
# Then submit application:

curl -X POST http://localhost:3000/api/careers/apply \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@example.com\",\"resumeUrl\":\"https://example.com/resume.pdf\",\"jobId\":\"YOUR_JOB_ID\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "applicationId": "..."
}
```

---

## 🌐 Browser Tests

### Test in Browser

1. **Blog Posts:**
   Visit: http://localhost:3000/api/blog/posts

2. **Career Openings:**
   Visit: http://localhost:3000/api/careers/openings

3. **Portfolio Projects:**
   Visit: http://localhost:3000/api/portfolio/projects

---

## 🔍 Verify Data in Database

```bash
# Open Prisma Studio
npm run db:studio
```

Then visit: **http://localhost:5555**

You can:
- ✅ See all blog posts
- ✅ See career openings
- ✅ See portfolio projects
- ✅ See testimonials
- ✅ See contact submissions (after submitting form)

---

## ✅ All Tests Should Pass!

If all endpoints return data, your backend is **fully operational**! 🎉

---

## 🐛 Troubleshooting

### API returns 404
- Check server is running: http://localhost:3000
- Verify URL spelling
- Check route file exists

### API returns 500
- Check terminal for error logs
- Verify database exists: `prisma/dev.db`
- Run: `npx prisma generate`

### No data returned
- Run: `npm run db:seed`
- Check Prisma Studio: `npm run db:studio`

---

**All systems operational!** ✅🚀
