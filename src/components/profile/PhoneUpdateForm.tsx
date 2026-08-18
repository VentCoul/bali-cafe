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
      <div className="flex items-center gap-3 w-full mt-1">
        <p className="text-gray-800">{phone}</p>
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm font-medium text-[var(--color-bali-gold)] hover:text-yellow-600 transition-colors"
        >
          Змінити
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mt-1">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center w-full">
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+380..."
            className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-bali-gold)] focus:border-transparent transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading || !phone}
            className="px-5 py-2 bg-[var(--color-bali-dark)] text-white rounded-lg hover:bg-black disabled:opacity-50 transition-colors font-medium whitespace-nowrap"
          >
            {loading ? 'Збереження...' : 'Зберегти'}
          </button>
        </div>
        <div className="flex items-center justify-between mt-1">
          {error ? <p className="text-red-500 text-sm">{error}</p> : <div />}
          {currentPhone && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              Скасувати
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
