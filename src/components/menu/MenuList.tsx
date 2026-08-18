"use client";
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { PosterProduct, PosterCategory } from '@/lib/poster/types';
import { motion } from 'framer-motion';

export default function MenuList() {
  const [items, setItems] = useState<PosterProduct[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // Using any to support custom productIds field
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/poster/menu');
        const data = await res.json();
        
        if (data.success) {
          setItems(data.items);
          setCategories(data.categories);
        } else {
          setError(data.error || 'Failed to load menu');
        }
      } catch (err) {
        setError('Connection error while loading menu');
      } finally {
        setLoading(false);
      }
    }
    
    fetchMenu();
  }, []);

  // ScrollSpy logic
  useEffect(() => {
    if (categories.length === 0) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Offset for sticky header
      
      let current = categories[0].category_id;
      for (const cat of categories) {
        const element = document.getElementById(`category-${cat.category_id}`);
        if (element && element.offsetTop <= scrollPosition) {
          current = cat.category_id;
        }
      }
      setActiveCategory(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  if (loading) {
    return <div className="text-center py-20 text-[var(--color-bali-gold)]">Завантаження меню...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <p className="text-sm text-gray-500">
          Якщо ви власник, переконайтеся, що ви підключили Poster в <a href="/admin" className="underline text-[var(--color-bali-green)]">Адмін-панелі</a>.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Sticky Category Navigation */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm -mx-4 px-4 mb-8">
          <div className="flex overflow-x-auto hide-scrollbar py-3 gap-2">
            {categories.filter(cat => {
              const catItems = cat.productIds 
                ? items.filter(item => cat.productIds.includes(item.product_id))
                : items.filter(item => item.menu_category_id === cat.category_id);
              return catItems.length > 0;
            }).map(cat => {
              const isActive = activeCategory === cat.category_id;
              return (
                <button
                  key={`nav-${cat.category_id}`}
                  onClick={() => {
                    const el = document.getElementById(`category-${cat.category_id}`);
                    if (el) {
                      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
                    }
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[var(--color-bali-gold)] text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.category_name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-12">
        {categories.map(cat => {
          const catItems = cat.productIds 
            ? items.filter(item => cat.productIds.includes(item.product_id))
            : items.filter(item => item.menu_category_id === cat.category_id);
        
        // Don't render empty categories on the public menu
        if (catItems.length === 0) return null;

        return (
          <div key={cat.category_id} className="scroll-mt-24" id={`category-${cat.category_id}`}>
            <h3 
              className="text-2xl font-serif text-[var(--color-bali-dark)] mb-6 border-b border-gray-200 pb-2 flex items-center gap-3"
            >
              <div className="w-2 h-8 bg-[var(--color-bali-gold)] rounded-full"></div>
              {cat.category_name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catItems.map(item => (
                <ProductCard key={item.product_id} product={item} />
              ))}
            </div>
          </div>
        );
      })}

      {categories.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          Меню порожнє. Зайдіть в налаштування, щоб додати категорії.
        </div>
      )}
      </div>
    </div>
  );
}
