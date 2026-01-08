import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET() {
  // Dev-only helper route.
  if (process.env.NODE_ENV === 'production') {
    return new Response(null, { status: 404 });
  }

  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    await prisma.$disconnect();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      testQuery: result,
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Database connection failed',
        hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      },
      { status: 500 },
    );
  }
}