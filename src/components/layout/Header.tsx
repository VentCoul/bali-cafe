"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import CartDrawer from '../cart/CartDrawer';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import NotificationBell from '../notifications/NotificationBell';

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  useEffect(() => {
    // Delay setting client state to avoid synchronous state updates in effect
    const timeout = setTimeout(() => setIsClient(true), 0);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Check initial scroll position in case we loaded with a hash or navigated to one
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // When pathname changes (e.g. from /login to /#menu), make sure to check scroll
  useEffect(() => {
    // A small timeout to let the browser jump to the hash first
    const timeout = setTimeout(() => {
      setIsScrolled(window.scrollY > 20);
    }, 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated' && session?.user && !session.user.phone) {
      // Check if we already showed it this session to avoid spamming
      const hasSeenPrompt = sessionStorage.getItem('phonePromptSeen');
      if (!hasSeenPrompt && pathname !== '/profile') {
        toast.warning(
          "Для накопичення та використання бонусів підв'яжіть будь ласка ваш номер телефону у вашому особистому кабінеті",
          {
            duration: 10000,
            action: {
              label: 'Перейти',
              onClick: () => router.push('/profile')
            }
          }
        );
        sessionStorage.setItem('phonePromptSeen', 'true');
      }
    }
  }, [status, session, pathname, router]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 pointer-events-none">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`mx-auto max-w-7xl pointer-events-auto transition-all duration-300 rounded-full ${
            isScrolled 
              ? 'glass-panel py-3 px-6 shadow-lg text-white' 
              : 'bg-transparent py-4 px-6 text-white'
          }`}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className={`text-2xl font-serif ${isScrolled ? 'text-white' : 'text-white'} hover:opacity-80 transition-opacity`}>
              Bali <span className="text-[var(--color-bali-gold)]">Cafe</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link href="/#menu" className="font-medium hover:text-[var(--color-bali-gold)] transition-colors">Меню</Link>
              
              {status === "loading" ? (
                <div className="w-16 h-8 bg-white/20 animate-pulse rounded-md"></div>
              ) : session?.user ? (
                <div className="relative group">
                  <button className="font-medium hover:text-[var(--color-bali-gold)] transition-colors py-2 flex items-center gap-1">
                    {session.user.name || 'Акаунт'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden text-[var(--color-bali-dark)]">
                    <div className="py-2">
                      {session.user.role === 'ADMIN' ? (
                        <>
                          <Link href="/admin/menu" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[var(--color-bali-gold)] transition-colors">Меню сайту</Link>
                          <Link href="/admin/clients" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[var(--color-bali-gold)] transition-colors">База клієнтів</Link>
                          <Link href="/api/poster/config" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[var(--color-bali-gold)] transition-colors">Poster API</Link>
                        </>
                      ) : (
                        <>
                          <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[var(--color-bali-gold)] transition-colors">Особистий кабінет</Link>
                        </>
                      )}
                      <div className="h-px bg-gray-100 my-1"></div>
                      <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        Вийти
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} className="font-medium text-[var(--color-bali-gold)] hover:text-white transition-colors">
                  Увійти
                </Link>
              )}
              
              {status === "authenticated" && <NotificationBell />}

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ShoppingCart size={24} />
                {isClient && totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-[var(--color-bali-gold)] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-transparent">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Floating Cart Button */}
      {isClient && totalItems > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-40 flex justify-center pointer-events-none md:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto bg-[var(--color-bali-dark)] text-white w-full max-w-sm rounded-2xl shadow-2xl flex items-center justify-between p-4 px-6 active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[var(--color-bali-gold)] text-white font-bold w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-sm">
                {totalItems}
              </div>
              <span className="font-serif font-medium text-lg tracking-wide">Кошик</span>
            </div>
            <span className="font-bold text-lg text-[var(--color-bali-gold)]">{totalPrice} ₴</span>
          </button>
        </div>
      )}
    </>
  );
}
