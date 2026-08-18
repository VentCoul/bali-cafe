'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/user/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/user/notifications/${id}/read`, { method: 'PATCH' });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {
      console.error(e);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/user/notifications/read-all', { method: 'PATCH' });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative group/bell">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
      >
        <Bell size={24} className="text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-gray-800">Сповіщення</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-[var(--color-bali-gold)] hover:underline"
              >
                Прочитати всі
              </button>
            )}
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">
                У вас поки немає сповіщень.
              </div>
            ) : (
              notifications.slice(0, 5).map(n => (
                <div 
                  key={n.id} 
                  onClick={() => !n.read && markAsRead(n.id)}
                  className={`p-4 border-b last:border-0 cursor-pointer transition-colors ${n.read ? 'bg-white opacity-70' : 'bg-blue-50/30'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm ${n.read ? 'font-medium' : 'font-semibold'} text-gray-800`}>{n.title}</h4>
                    {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{n.message}</p>
                  <span className="text-[10px] text-gray-400">
                    {new Date(n.createdAt).toLocaleDateString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 border-t bg-gray-50 text-center">
            <Link 
              href="/profile/notifications" 
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-[var(--color-bali-gold)] transition-colors"
            >
              Всі сповіщення
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
