import { prisma } from '../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID is required' 
      }, { status: 400 });
    }

    // Try database first
    if (prisma) {
      try {
        const transactions = await prisma.transaction.findMany({
          where: { userId },
          orderBy: { timestamp: 'desc' }
        });

        return NextResponse.json({ 
          success: true, 
          transactions 
        });
      } catch (dbError) {
        console.log('Database unavailable for GET, using fallback:', dbError.message);
      }
    }

    // Fallback: return empty array (transactions will be loaded from localStorage on client)
    return NextResponse.json({ 
      success: true, 
      transactions: [],
      fallbackMode: true
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch transactions' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId, amount, description, category, type, date } = await request.json();

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID is required' 
      }, { status: 400 });
    }

    // Try database first
    if (prisma) {
      try {
        const transaction = await prisma.transaction.create({
          data: {
            userId,
            amount: parseFloat(amount),
            description,
            category,
            type,
            date: new Date(date),
          }
        });

        return NextResponse.json({ 
          success: true, 
          transaction 
        });
      } catch (dbError) {
        console.log('Database unavailable for POST, using fallback:', dbError.message);
      }
    }

    // Fallback: return success (client will handle localStorage)
    const mockTransaction = {
      id: Date.now().toString(),
      userId,
      amount: parseFloat(amount),
      description,
      category,
      type,
      date: new Date(date),
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ 
      success: true, 
      transaction: mockTransaction,
      fallbackMode: true
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create transaction' 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, amount, description, category, type, date } = await request.json();

    // Try database first
    if (prisma) {
      try {
        const transaction = await prisma.transaction.update({
          where: { id },
          data: {
            amount: parseFloat(amount),
            description,
            category,
            type,
            date: new Date(date),
          }
        });

        return NextResponse.json({ 
          success: true, 
          transaction 
        });
      } catch (dbError) {
        console.log('Database unavailable for PUT, using fallback:', dbError.message);
      }
    }

    // Fallback: return success (client will handle localStorage)
    const mockTransaction = {
      id,
      amount: parseFloat(amount),
      description,
      category,
      type,
      date: new Date(date),
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ 
      success: true, 
      transaction: mockTransaction,
      fallbackMode: true
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update transaction' 
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'Transaction ID is required' 
      }, { status: 400 });
    }

    // Try database first
    if (prisma) {
      try {
        await prisma.transaction.delete({
          where: { id }
        });

        return NextResponse.json({ 
          success: true 
        });
      } catch (dbError) {
        console.log('Database unavailable for DELETE, using fallback:', dbError.message);
      }
    }

    // Fallback: return success (client will handle localStorage)
    return NextResponse.json({ 
      success: true,
      fallbackMode: true
    });
  } catch (error) {
    console.error('Delete transaction error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete transaction' 
    }, { status: 500 });
  }
}