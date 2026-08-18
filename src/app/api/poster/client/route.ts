import { NextResponse } from 'next/server';
import { getClientByPhone } from '@/lib/poster/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!dbUser || !dbUser.phone) {
      return NextResponse.json({ error: 'Phone number not set' }, { status: 404 });
    }

    const posterClient = await getClientByPhone(dbUser.phone);
    if (!posterClient) {
      return NextResponse.json({ error: 'Client not found in Poster' }, { status: 404 });
    }

    return NextResponse.json(posterClient);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
