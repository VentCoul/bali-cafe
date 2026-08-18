import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { syncUserWithPoster } from '@/lib/poster/client-sync';

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!email || !phone || !password) {
      return NextResponse.json(
        { error: 'Email, телефон та пароль обов\'язкові' },
        { status: 400 }
      );
    }

    // Check if user already exists in DB
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Користувач з таким email або телефоном вже існує' },
        { status: 400 }
      );
    }

    // Sync with Poster first to get the Client ID
    // If it fails, we still create the user, just without posterClientId
    let posterClientId: string | null = null;
    try {
      posterClientId = await syncUserWithPoster(phone, {
        name: name || undefined,
        email: email
      });
    } catch (posterErr) {
      console.error('Failed to sync user with Poster during registration:', posterErr);
      // We don't fail registration if Poster is down, they just won't have the ID synced yet
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash: hashedPassword,
        role: 'USER',
        posterClientId: posterClientId
      }
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}
