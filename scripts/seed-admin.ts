import 'dotenv/config';
import { prisma } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@bali.ua';
  const password = process.env.ADMIN_PASSWORD || 'securepassword123';
  const phone = process.env.ADMIN_PHONE || '+380990000000';

  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  });

  if (existingAdmin) {
    console.log(`Адмін з email ${email} вже існує.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Адміністратор',
      email: email,
      phone: phone,
      passwordHash: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Адміністратора успішно створено!');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
