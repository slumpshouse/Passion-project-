import { PrismaClient } from '@prisma/client'

// Optional direct/override connection string for debugging.
// Prefer setting DATABASE_URL (used by `app/lib/prisma.js`) unless you explicitly need a second connection.
const DIRECT_DATABASE_URL = process.env.DIRECT_DATABASE_URL;

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prismaDirect ??
  new PrismaClient({
    datasources: DIRECT_DATABASE_URL
      ? {
          db: {
            url: DIRECT_DATABASE_URL,
          },
        }
      : undefined,
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaDirect = prisma