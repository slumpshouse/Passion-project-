import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Import Prisma client
    const { PrismaClient } = await import('@prisma/client');
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: 'postgresql://neondb_owner:npg_s61xXEDavnBJ@ep-snowy-field-ah765zfm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
        },
      },
    });

    // Test the connection
    await prisma.$connect();
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    await prisma.$disconnect();

    return NextResponse.json({ 
      success: true,
      message: 'Database connection successful',
      testQuery: result
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.stack
    }, { status: 500 });
  }
}