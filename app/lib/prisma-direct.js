import { PrismaClient } from '@prisma/client'

// Test database connection with explicit connection string
const DATABASE_URL = 'postgresql://neondb_owner:npg_s61xXEDavnBJ@ep-snowy-field-ah765zfm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma