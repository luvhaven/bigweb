# 🔧 TROUBLESHOOTING GUIDE

## Common Errors & Solutions

---

## ❌ Error: "Oops! Something went wrong"

### Possible Causes:
1. Prisma Client not installed
2. Missing dependencies
3. Import/export errors
4. Database connection issues

### Solution 1: Install Prisma (Most Common)

```bash
# Install Prisma
npm install @prisma/client
npm install -D prisma

# Generate Prisma Client
npx prisma generate

# Restart dev server
npm run dev
```

### Solution 2: Clear Cache & Reinstall

```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install

# Restart
npm run dev
```

### Solution 3: Check Console for Specific Error

1. Open browser DevTools (F12)
2. Check Console tab for error details
3. Check Network tab for failed requests

---

## ❌ Error: Cannot find module '@prisma/client'

### Solution:

```bash
# Install Prisma Client
npm install @prisma/client

# Generate types
npx prisma generate

# Restart dev server (Ctrl+C then npm run dev)
npm run dev
```

---

## ❌ Error: Cannot find module '@/lib/prisma'

### Solution:

The app now has a fallback system. But to use the real database:

```bash
# 1. Install Prisma
npm install @prisma/client prisma

# 2. Create database (PostgreSQL)
# Use Neon.tech for free cloud database

# 3. Add to .env
DATABASE_URL="your-database-url-here"

# 4. Generate Prisma Client
npx prisma generate

# 5. Run migrations
npx prisma migrate dev --name init

# 6. Restart
npm run dev
```

---

## ❌ Error: Module not found (any other module)

### Solution:

```bash
# Install all dependencies
npm install

# If specific package missing, install it:
npm install [package-name]

# Restart dev server
npm run dev
```

---

## ❌ Error: Port 3000 already in use

### Solution:

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID [PID] /F

# Or run on different port
$env:PORT=3001; npm run dev
```

**Mac/Linux:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or run on different port
PORT=3001 npm run dev
```

---

## ❌ Error: Database connection failed

### Solution:

1. **Check .env file exists** in root directory
2. **Verify DATABASE_URL** format:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/database"
   ```
3. **Test connection:**
   ```bash
   npx prisma db push
   ```
4. **Use cloud database** (easier):
   - Neon.tech (free)
   - Supabase (free)
   - Railway (easy)

---

## ❌ Error: Hydration error / Text content mismatch

### Solution:

This is usually from server/client mismatch.

```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

## ❌ Error: TypeScript errors

### Solution:

```bash
# Regenerate types
npx prisma generate

# Check TypeScript
npm run type-check

# Or ignore during build (not recommended)
# Add to next.config.js:
typescript: {
  ignoreBuildErrors: true,
}
```

---

## ❌ Build Error: Failed to compile

### Check for:

1. **Syntax errors** in code
2. **Missing imports**
3. **Unused variables** (remove or prefix with _)
4. **Missing return statements**

### Solution:

```bash
# See detailed errors
npm run build

# Fix errors shown
# Then restart
npm run dev
```

---

## 🚀 Fresh Start (Nuclear Option)

If nothing works, start fresh:

```bash
# 1. Backup your changes (if any)

# 2. Delete everything
rm -rf node_modules
rm -rf .next
rm package-lock.json
rm -rf prisma/migrations

# 3. Reinstall
npm install

# 4. Install Prisma
npm install @prisma/client prisma

# 5. Generate Prisma
npx prisma generate

# 6. Restart
npm run dev
```

---

## 📱 Dev Mode Not Working?

### Check:

1. **Node version:** Should be 18 or higher
   ```bash
   node --version
   ```

2. **npm version:** Should be 9 or higher
   ```bash
   npm --version
   ```

3. **Port availability:** Is 3000 free?

4. **Firewall:** Allow Node.js

---

## 🔍 Debug Mode

Run with detailed logging:

```bash
# Enable debug mode
DEBUG=* npm run dev

# Or just Next.js logs
DEBUG=next:* npm run dev
```

---

## 📊 Check Logs

### Browser Console (F12):
- Red errors = Fix these first
- Yellow warnings = Can ignore for now
- Blue info = Just information

### Terminal/Command Line:
- Look for stack traces
- Check file paths in errors
- Note line numbers

---

## 🆘 Still Not Working?

### Provide These Details:

1. **Error message** (exact text)
2. **Browser console** (screenshot)
3. **Terminal output** (text)
4. **Node version** (`node --version`)
5. **What you were doing** when error occurred

### Quick Fixes to Try:

```bash
# Fix 1: Restart everything
# Close browser, stop server, restart computer

# Fix 2: Different browser
# Try Chrome, Firefox, or Edge

# Fix 3: Different port
PORT=3001 npm run dev

# Fix 4: Skip Prisma temporarily
# Delete these folders temporarily:
# - app/api (all API routes)
# - lib/prisma.ts
# Just to see if frontend works

# Fix 5: Use fallback mode
# The app now has automatic fallback
# Just restart: npm run dev
```

---

## ✅ Working Now?

Great! Here's what to do next:

1. **Install Prisma properly:**
   ```bash
   npm install @prisma/client prisma
   npx prisma generate
   ```

2. **Set up database** (see SETUP-GUIDE.md)

3. **Test admin dashboard** at /admin

4. **Start adding content**

---

## 📚 Need More Help?

- Check **SETUP-GUIDE.md** for installation
- Check **BACKEND-INTEGRATION.md** for API details
- Check **COMPLETE-SYSTEM-REPORT.md** for overview

---

## 🎯 Most Common Issue (90% of errors):

**Missing Prisma Client**

### Quick Fix:
```bash
npm install @prisma/client
npx prisma generate
npm run dev
```

That should fix it! 🎉

---

**Pro Tip:** The app now has automatic fallback mode, so it should run even without Prisma installed. You'll see a warning in console but the frontend will work!
