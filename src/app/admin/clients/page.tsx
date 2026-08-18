import { prisma } from '@/lib/db';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'База Клієнтів | Адмін-панель',
};

export default async function AdminClientsPage() {
  const clients = await prisma.user.findMany({
    where: { role: 'USER' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[var(--color-bali-dark)]">База Клієнтів</h1>
          <p className="text-gray-500 mt-1">Керування зареєстрованими клієнтами та їх даними лояльності.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <span className="text-sm text-gray-500">Всього: </span>
          <span className="font-semibold text-[var(--color-bali-dark)]">{clients.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {clients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-4 font-medium">Ім'я</th>
                  <th className="px-6 py-4 font-medium">Телефон</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Poster ID</th>
                  <th className="px-6 py-4 font-medium">Зареєстровано</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{client.name || '—'}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{client.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{client.email || '—'}</td>
                    <td className="px-6 py-4">
                      {client.posterClientId ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ID: {client.posterClientId}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Не синхронізовано
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(client.createdAt).toLocaleDateString('uk-UA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            Поки що немає зареєстрованих клієнтів.
          </div>
        )}
      </div>
    </div>
  );
}
