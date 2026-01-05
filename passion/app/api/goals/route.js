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

    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ 
      success: true, 
      goals 
    });
  } catch (error) {
    console.error('Get goals error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch goals' 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId, name, targetAmount, currentAmount = 0, deadline, color = "bg-blue-600" } = await request.json();

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID is required' 
      }, { status: 400 });
    }

    const goal = await prisma.goal.create({
      data: {
        userId,
        name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount),
        deadline: deadline ? new Date(deadline) : null,
        color
      }
    });

    return NextResponse.json({ 
      success: true, 
      goal 
    });
  } catch (error) {
    console.error('Create goal error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create goal' 
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, name, targetAmount, currentAmount, deadline, color } = await request.json();

    const goal = await prisma.goal.update({
      where: { id },
      data: {
        name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount),
        deadline: deadline ? new Date(deadline) : null,
        color
      }
    });

    return NextResponse.json({ 
      success: true, 
      goal 
    });
  } catch (error) {
    console.error('Update goal error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update goal' 
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
        error: 'Goal ID is required' 
      }, { status: 400 });
    }

    await prisma.goal.delete({
      where: { id }
    });

    return NextResponse.json({ 
      success: true 
    });
  } catch (error) {
    console.error('Delete goal error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete goal' 
    }, { status: 500 });
  }
}