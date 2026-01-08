import { NextResponse } from 'next/server';

// Fallback user data for when database is unavailable
const fallbackUsers = [
  { id: 1, email: 'rob@launchpadphilly.org', password: 'lpuser1', name: 'Rob', role: 'admin' },
  { id: 2, email: 'sanaa@launchpadphilly.org', password: 'lpuser2', name: 'Sanaa', role: 'admin' },
  { id: 3, email: 'taheera@launchpadphilly.org', password: 'lpuser3', name: 'Taheera', role: 'admin' }
];

export async function POST(request) {
  try {
    const { email, password, name, registeredUsers } = await request.json();

    // Try database first
    try {
      const { prisma } = await import('../../lib/prisma');
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        // Login attempt - check password
        if (existingUser.password === password) {
          const { password: _, ...userWithoutPassword } = existingUser;
          return NextResponse.json({ 
            success: true, 
            user: userWithoutPassword 
          });
        } else {
          return NextResponse.json({ 
            success: false, 
            error: 'Invalid credentials' 
          }, { status: 401 });
        }
      } else {
        // Registration attempt
        if (!name) {
          return NextResponse.json({ 
            success: false, 
            error: 'Name is required for registration' 
          }, { status: 400 });
        }

        // Determine role based on email
        const isAdmin = [
          'rob@launchpadphilly.org',
          'sanaa@launchpadphilly.org', 
          'taheera@launchpadphilly.org'
        ].includes(email);

        const newUser = await prisma.user.create({
          data: {
            email,
            password, // In production, hash this!
            name,
            role: isAdmin ? 'admin' : 'user'
          }
        });

        const { password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json({ 
          success: true, 
          user: userWithoutPassword 
        });
      }
    } catch (dbError) {
      console.log('Database operation failed, using fallback:', dbError.message);
      
      // Combine fallback users with any registered users from localStorage
      const allUsers = [...fallbackUsers, ...(registeredUsers || [])];
      const existingUser = allUsers.find(user => user.email === email);
      
      if (existingUser) {
        // Login attempt - check password
        if (existingUser.password === password) {
          const { password: _, ...userWithoutPassword } = existingUser;
          return NextResponse.json({ 
            success: true, 
            user: userWithoutPassword 
          });
        } else {
          return NextResponse.json({ 
            success: false, 
            error: 'Invalid credentials' 
          }, { status: 401 });
        }
      } else {
        // Allow new user registration in fallback mode
        if (!name) {
          return NextResponse.json({ 
            success: false, 
            error: 'Name is required for registration' 
          }, { status: 400 });
        }

        // Determine role based on email (admin for specific emails, user for others)
        const isAdmin = [
          'rob@launchpadphilly.org',
          'sanaa@launchpadphilly.org', 
          'taheera@launchpadphilly.org'
        ].includes(email);

        // Create new user object
        const newUser = {
          id: Date.now(), // Simple ID generation
          email,
          name,
          role: isAdmin ? 'admin' : 'user'
        };

        // Return success - client will handle localStorage storage
        const { password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json({ 
          success: true, 
          user: userWithoutPassword,
          shouldStore: true // Flag to tell client to store this user
        });
      }
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Authentication failed' 
    }, { status: 500 });
  }
}