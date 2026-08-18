import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    // Verify ownership first
    const notification = await prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    if (notification.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
