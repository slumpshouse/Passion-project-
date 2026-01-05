import { prisma } from '../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create the authorized admin users if they don't exist
    const adminUsers = [
      { email: "rob@launchpadphilly.org", password: "lpuser1", name: "Rob", role: "admin" },
      { email: "sanaa@launchpadphilly.org", password: "lpuser2", name: "Sanaa", role: "admin" },
      { email: "taheera@launchpadphilly.org", password: "lpuser3", name: "Taheera", role: "admin" }
    ];

    for (const userData of adminUsers) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      });

      if (!existingUser) {
        await prisma.user.create({
          data: userData
        });
        console.log(`Created admin user: ${userData.email}`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully' 
    });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}