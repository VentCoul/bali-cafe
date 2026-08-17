"use client";
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { PosterProduct, PosterCategory } from '@/lib/poster/types';

export default function MenuList() {
  const [items, setItems] = useState<PosterProduct[]>([]);
  const [categories, setCategories] = useState<PosterCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch('/api/poster/menu');
        const data = await res.json();
        
        if (data.success) {
          setItems(data.items);
          setCategories(data.categories);
          if (data.categories.length > 0) {
            setActiveCategory(data.categories[0].category_id);
          }
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

  // Filter items by category
  const displayItems = activeCategory 
    ? items.filter(item => item.menu_category_id === activeCategory)
    : items;

  return (
    <div>
      {/* Category Navigation */}
      <div className="flex overflow-x-auto gap-4 pb-4 mb-8 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat.category_id}
            onClick={() => setActiveCategory(cat.category_id)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-colors ${
              activeCategory === cat.category_id 
                ? 'bg-[var(--color-bali-green)] text-white' 
                : 'bg-white text-[var(--color-bali-green)] border border-gray-200 hover:border-[var(--color-bali-gold)]'
            }`}
          >
            {cat.category_name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayItems.length > 0 ? (
          displayItems.map(item => (
            <ProductCard key={item.product_id} product={item} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            У цій категорії поки немає страв
          </div>
        )}
      </div>
    </div>
  );
}
