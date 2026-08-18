"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      });

      if (res?.error) {
        setError('Невірний email або пароль');
      } else {
        router.push('/admin/menu');
        router.refresh();
      }
    } catch (err) {
      setError('Помилка мережі');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bali-beige)] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[var(--color-bali-dark)] mb-2">Адмін-панель</h1>
          <p className="text-gray-500">Введіть email та пароль для доступу.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[var(--color-bali-gold)] transition-colors"
              placeholder="admin@bali.ua"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[var(--color-bali-gold)] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--color-bali-dark)] text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-70"
          >
            {loading ? 'Перевірка...' : 'Увійти'}
          </button>
        </form>
      </div>
    </div>
  );
}
