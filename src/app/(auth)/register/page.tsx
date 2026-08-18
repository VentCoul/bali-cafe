"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Suspense } from 'react';

function RegisterContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Помилка реєстрації');
        setLoading(false);
        return;
      }

      // Після успішної реєстрації автоматично логінимо
      const signInRes = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });

      if (signInRes?.error) {
        setError('Помилка автоматичного входу');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Помилка мережі');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bali-beige)] px-4 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[var(--color-bali-dark)] mb-2">Створення акаунту</h1>
          <p className="text-gray-500">Зареєструйтесь, щоб накопичувати бонуси!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ім'я (опціонально)</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[var(--color-bali-gold)] transition-colors"
              placeholder="Іван Іванов"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[var(--color-bali-gold)] transition-colors"
              placeholder="+380990000000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[var(--color-bali-gold)] transition-colors"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль *</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[var(--color-bali-gold)] transition-colors"
              placeholder="Мінімум 6 символів"
              minLength={6}
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
            className="w-full bg-[var(--color-bali-gold)] text-white py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors disabled:opacity-70 mt-2"
          >
            {loading ? 'Завантаження...' : 'Зареєструватися'}
          </button>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">або</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button 
            type="button" 
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Увійти через Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Вже маєте акаунт?{' '}
          <Link href={`/login${callbackUrl !== '/profile' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`} className="text-[var(--color-bali-gold)] font-medium hover:underline">
            Увійти
          </Link>
        </p>
      </div>
      
      <Link href="/" className="mt-8 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        ← Повернутися на головну
      </Link>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
