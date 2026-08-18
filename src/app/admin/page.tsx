export const dynamic = 'force-dynamic';
import { getPosterToken } from '@/lib/poster/auth';
import DisconnectPosterButton from '@/components/admin/DisconnectPosterButton';

export default async function AdminDashboard() {
  const tokenData = getPosterToken();

  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-serif text-[var(--color-bali-dark)] mb-2">Інтеграція Poster API</h1>
      <p className="text-gray-500 mb-8">Управління підключенням до системи обліку Poster.</p>

      {tokenData ? (
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <div className="flex items-center gap-3 text-green-800 font-medium mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Poster успішно підключено
          </div>
          <p className="text-green-700 text-sm">
            Акаунт: <span className="font-bold">{tokenData.account}</span>
          </p>
          <DisconnectPosterButton />
        </div>
      ) : (
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
          <h3 className="text-orange-800 font-medium mb-2">Poster не підключено</h3>
          <p className="text-orange-700 text-sm mb-6">
            Для того, щоб сайт міг отримувати меню та відправляти замовлення, необхідно авторизувати додаток в Poster.
          </p>
          <a 
            href="/api/poster/auth" 
            className="inline-block bg-[var(--color-bali-green)] text-white px-6 py-2 rounded-md font-medium hover:bg-[var(--color-bali-green)]/90 transition-colors"
          >
            Підключити Poster
          </a>
        </div>
      )}
    </div>
  );
}
