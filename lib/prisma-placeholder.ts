// Temporary placeholder until Prisma is installed
// This prevents TypeScript errors during development

// Mock Prisma Client for development without database
export const prisma = {
  blogPost: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => ({ id: 'mock-id', ...data }),
    update: async (data: any) => ({ id: 'mock-id', ...data }),
    delete: async () => ({ id: 'mock-id' }),
    count: async () => 0,
  },
  contactSubmission: {
    create: async (data: any) => ({ id: 'mock-id', ...data }),
  },
  // Add other models as needed
}

// Note: Replace this with actual Prisma client after running:
// npm install @prisma/client
// npx prisma generate
