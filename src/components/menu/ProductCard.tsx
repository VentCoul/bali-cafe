"use client";
import { PosterProduct } from '@/lib/poster/types';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { Utensils } from 'lucide-react';

interface Props {
  product: PosterProduct;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const items = useCartStore((state) => state.items);
  
  const cartItem = items.find(item => item.product.product_id === product.product_id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Photo logic: If it starts with http (custom photo), use it directly.
  // Otherwise, if it has a photo path, prefix with Poster URL.
  let imageUrl = '';
  if (product.photo) {
    imageUrl = product.photo.startsWith('http') 
      ? product.photo 
      : `https://joinposter.com${product.photo}`;
  }

  return (
    <div 
      className="glass-panel rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/10 flex p-3 gap-4 h-full group"
    >
      {/* Thumbnail */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white/10 rounded-lg overflow-hidden shrink-0 relative flex flex-col items-center justify-center border border-white/10">
        {product.photo ? (
          <img 
            src={imageUrl} 
            alt={product.product_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Немає+фото';
            }}
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center text-[var(--color-bali-gold)] opacity-70">
            <Utensils size={28} className="mb-2 opacity-50 text-white/50" />
            <span className="text-[10px] font-serif tracking-wider uppercase text-white/50 opacity-60">Bali Cafe</span>
          </div>
        )}
      </div>
      
      {/* Details */}
      <div className="flex flex-col flex-1 py-1 min-w-0">
        <h3 className="font-serif text-base sm:text-lg font-semibold text-white group-hover:text-[var(--color-bali-gold)] transition-colors line-clamp-2 leading-tight mb-2">
          {product.product_name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-[var(--color-bali-gold)] shrink-0">
            {product.price} ₴ {product.weight_flag === '1' && <span className="text-sm font-normal text-white/60">/ 100г</span>}
          </span>
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/10 shadow-sm ml-2 h-9">
              <button onClick={() => updateQuantity(product.product_id, quantityInCart - (product.weight_flag === '1' ? 50 : 1))} className="w-8 h-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors text-lg font-medium">-</button>
              {product.weight_flag === '1' ? (
                <div className="flex items-center bg-white/10 px-1 rounded-sm border border-white/10 h-full">
                  <input 
                    type="number" 
                    value={quantityInCart} 
                    onChange={(e) => updateQuantity(product.product_id, parseInt(e.target.value) || 0)} 
                    className="w-10 text-center text-sm font-bold bg-transparent text-white outline-none m-0 p-0" 
                    style={{ MozAppearance: 'textfield' }}
                  />
                  <span className="text-[10px] text-white/70 font-medium">г</span>
                </div>
              ) : (
                <span className="text-sm font-bold w-6 text-center text-white select-none">{quantityInCart}</span>
              )}
              <button onClick={() => updateQuantity(product.product_id, quantityInCart + (product.weight_flag === '1' ? 50 : 1))} className="w-8 h-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors text-lg font-medium">+</button>
            </div>
          ) : (
            <button 
              onClick={() => addItem(product)}
              className="h-9 px-4 rounded-full flex items-center justify-center transition-colors shadow-sm font-medium text-sm whitespace-nowrap shrink-0 ml-2 bg-[var(--color-bali-gold)] text-white hover:bg-white/20"
            >
              + Додати
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
