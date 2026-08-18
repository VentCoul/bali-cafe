"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DisconnectPosterButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDisconnect = async () => {
    if (!confirm('Ви впевнені, що хочете відключити інтеграцію з Poster?')) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/poster/disconnect', { method: 'POST' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Помилка при відключенні');
      }
    } catch (err) {
      alert('Помилка мережі');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDisconnect}
      disabled={loading}
      className="mt-4 bg-red-50 text-red-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      {loading ? 'Відключення...' : 'Відключити акаунт'}
    </button>
  );
}
