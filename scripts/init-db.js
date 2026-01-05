// Database initialization script
// Run this with: node scripts/init-db.js

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// Use DATABASE_URL from environment so local config/CI can control the target DB
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.warn('Warning: DATABASE_URL is not set in environment. init-db will likely fail.');
}

const prisma = new PrismaClient({
  datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
});

async function initializeDatabase() {
  try {
    console.log('Connecting to database...');
    await prisma.$connect();
    
    console.log('Creating admin users...');
    const adminUsers = [
      { email: "rob@launchpadphilly.org", password: "lpuser1", name: "Rob", role: "admin" },
      { email: "sanaa@launchpadphilly.org", password: "lpuser2", name: "Sanaa", role: "admin" },
      { email: "taheera@launchpadphilly.org", password: "lpuser3", name: "Taheera", role: "admin" }
    ];

    for (const userData of adminUsers) {
      try {
        const user = await prisma.user.upsert({
          where: { email: userData.email },
          update: {},
          create: userData
        });
        console.log(`✓ User ${userData.email} ready`);
      } catch (error) {
        console.log(`User ${userData.email} already exists or error:`, error.message);
      }
    }

    console.log('✅ Database initialization complete!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

initializeDatabase();