import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Сповіщення | Bali Cafe',
};

export default async function NotificationsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif text-[var(--color-bali-dark)]">Всі сповіщення</h1>
        <Link href="/profile" className="text-sm font-medium text-gray-500 hover:text-[var(--color-bali-gold)] transition-colors">
          &larr; Назад до кабінету
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            У вас поки немає сповіщень.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map(n => (
              <div 
                key={n.id} 
                className={`p-6 transition-colors ${n.read ? 'bg-white' : 'bg-blue-50/30'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg ${n.read ? 'font-medium' : 'font-semibold'} text-gray-800`}>{n.title}</h3>
                  <div className="text-sm text-gray-400 whitespace-nowrap ml-4">
                    {new Date(n.createdAt).toLocaleString('uk-UA', { 
                      day: '2-digit', month: '2-digit', year: 'numeric',
                      hour: '2-digit', minute: '2-digit' 
                    })}
                  </div>
                </div>
                <p className="text-gray-600">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
