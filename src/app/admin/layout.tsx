import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      <aside className="w-full md:w-64 bg-[var(--color-bali-dark)] text-white p-6 shrink-0">
        <h2 className="text-2xl font-serif mb-8 text-[var(--color-bali-beige)]">Bali Admin</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="hover:text-[var(--color-bali-gold)] transition-colors">
            Інтеграція Poster
          </Link>
          <Link href="/admin/menu" className="hover:text-[var(--color-bali-gold)] transition-colors">
            Управління Меню
          </Link>
          <Link href="/" className="mt-8 text-sm opacity-50 hover:opacity-100 transition-opacity">
            ← Повернутися на сайт
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
