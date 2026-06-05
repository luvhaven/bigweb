import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
    const result = await prisma.$queryRaw`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'affiliates';
  `;
    console.log(result);
}

check().catch(console.error).finally(() => prisma.$disconnect());
