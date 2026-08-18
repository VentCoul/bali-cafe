import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { PhoneUpdateForm } from '@/components/profile/PhoneUpdateForm';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect('/login');
  }

  const { getClientByPhone } = await import('@/lib/poster/client');
  let bonusBalance = 0;
  let clientId = user.posterClientId;

  if (user.phone) {
    const posterClient = await getClientByPhone(user.phone);
    if (posterClient) {
      clientId = posterClient.client_id;
      if (typeof posterClient.bonus !== 'undefined') {
        const parsed = parseFloat(String(posterClient.bonus));
        bonusBalance = parsed > 1000 ? parsed / 100 : parsed;
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif text-[var(--color-bali-dark)] mb-8">Особистий кабінет</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium mb-4">Ваші дані</h2>
            <div className="space-y-3 text-gray-600">
              <p><span className="font-medium text-gray-900">Ім'я:</span> {user.name || '—'}</p>
              <div className="flex items-start gap-1 flex-col">
                <span className="font-medium text-gray-900">Телефон:</span> 
                <PhoneUpdateForm currentPhone={user.phone} />
              </div>
              <p><span className="font-medium text-gray-900">Email:</span> {user.email || '—'}</p>
            </div>
          </div>

          <div className="bg-[var(--color-bali-dark)] text-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-medium mb-2 text-[var(--color-bali-beige)]">Бонуси</h2>
            <p className="text-3xl font-serif mb-1">
              {bonusBalance} <span className="text-lg">₴</span>
            </p>
            <p className="text-sm opacity-80">Доступні для оплати</p>
            
            {clientId && (
              <p className="mt-4 text-xs opacity-60">ID клієнта: {clientId}</p>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full min-h-[300px]">
            <h2 className="text-xl font-medium mb-4">Історія замовлень</h2>
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <p>У вас поки немає замовлень.</p>
              <a href="/#menu" className="px-6 py-2 bg-[var(--color-bali-gold)] text-white rounded-full font-medium hover:bg-yellow-600 transition-colors">
                Перейти до меню
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
