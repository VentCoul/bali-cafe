'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function PhoneUpdateForm({ currentPhone }: { currentPhone: string | null }) {
  const [phone, setPhone] = useState(currentPhone || '');
  const [isEditing, setIsEditing] = useState(!currentPhone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/user/phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Щось пішло не так');
      }

      setIsEditing(false);
      router.refresh(); // Refresh the page to load Poster data with the new phone
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <p>{phone}</p>
        <button
          onClick={() => setIsEditing(true)}
          className="text-xs text-[var(--color-bali-gold)] hover:underline"
        >
          Змінити
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Введіть ваш номер телефону
        </label>
        <div className="flex gap-2 items-stretch">
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+380..."
            className="flex-1 px-3 h-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[var(--color-bali-gold)] focus:border-[var(--color-bali-gold)]"
            required
          />
          <button
            type="submit"
            disabled={loading || !phone}
            className="px-4 h-10 bg-[var(--color-bali-dark)] text-white rounded-md hover:bg-black disabled:opacity-50 transition-colors flex items-center justify-center"
          >
            {loading ? 'Збереження...' : 'Зберегти'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {currentPhone && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-sm text-gray-500 hover:underline self-start"
          >
            Скасувати
          </button>
        )}
      </div>
    </form>
  );
}
