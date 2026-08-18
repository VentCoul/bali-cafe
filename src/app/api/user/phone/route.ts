import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { getClientByPhone } from '@/lib/poster/client';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    let { phone } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Номер телефону обов\'язковий' }, { status: 400 });
    }

    // Basic format check
    phone = phone.trim();
    if (!phone.startsWith('+')) {
      phone = '+' + phone.replace(/^0/, '380');
    }

    // Check if phone already in use by someone else
    const existingUser = await prisma.user.findFirst({
      where: { 
        phone,
        id: { not: session.user.id } 
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Цей номер вже використовується' }, { status: 400 });
    }

    // Check if user exists in Poster with this phone
    const posterClient = await getClientByPhone(phone);
    const posterClientId = posterClient ? posterClient.client_id : null;

    // Update user
    await prisma.user.update({
      where: { id: session.user.id },
      data: { 
        phone,
        posterClientId: posterClientId || undefined
      }
    });

    return NextResponse.json({ success: true, phone, posterClientId });
  } catch (error) {
    console.error('Error updating phone:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
