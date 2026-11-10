import { prisma } from './src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error('Задайте ADMIN_PASSWORD у змінних середовища перед запуском seed.');
  }
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email: 'admin@bali.ua' },
    update: { passwordHash: hash, role: 'ADMIN' },
    create: { email: 'admin@bali.ua', passwordHash: hash, role: 'ADMIN', name: 'Admin', phone: '+380000000000' }
  });
  console.log('Admin seeded!');
}

main().catch(console.error);
