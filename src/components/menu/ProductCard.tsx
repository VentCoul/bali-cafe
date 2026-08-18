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
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex p-3 gap-4 h-full"
    >
      {/* Thumbnail */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative flex flex-col items-center justify-center border border-gray-200">
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
          <div className="w-full h-full bg-[var(--color-bali-beige)] flex flex-col items-center justify-center text-[var(--color-bali-gold)] opacity-70">
            <Utensils size={28} className="mb-2 opacity-50" />
            <span className="text-[10px] font-serif tracking-wider uppercase opacity-60">Bali Cafe</span>
          </div>
        )}
      </div>
      
      {/* Details */}
      <div className="flex flex-col flex-1 py-1 min-w-0">
        <h3 className="font-serif text-base sm:text-lg font-semibold text-[var(--color-bali-dark)] line-clamp-2 leading-tight mb-2">
          {product.product_name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-[var(--color-bali-green)] shrink-0">
            {product.price} ₴ {product.weight_flag === '1' && <span className="text-sm font-normal text-gray-500">/ 100г</span>}
          </span>
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-200 shadow-sm ml-2 h-9">
              <button onClick={() => updateQuantity(product.product_id, quantityInCart - (product.weight_flag === '1' ? 50 : 1))} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 rounded-full transition-colors text-lg font-medium">-</button>
              {product.weight_flag === '1' ? (
                <div className="flex items-center bg-white px-1 rounded-sm border border-gray-100 h-full">
                  <input 
                    type="number" 
                    value={quantityInCart} 
                    onChange={(e) => updateQuantity(product.product_id, parseInt(e.target.value) || 0)} 
                    className="w-10 text-center text-sm font-bold bg-transparent outline-none m-0 p-0" 
                    style={{ MozAppearance: 'textfield' }}
                  />
                  <span className="text-[10px] text-gray-500 font-medium">г</span>
                </div>
              ) : (
                <span className="text-sm font-bold w-6 text-center select-none">{quantityInCart}</span>
              )}
              <button onClick={() => updateQuantity(product.product_id, quantityInCart + (product.weight_flag === '1' ? 50 : 1))} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 rounded-full transition-colors text-lg font-medium">+</button>
            </div>
          ) : (
            <button 
              onClick={() => addItem(product)}
              className="h-9 px-4 rounded-full flex items-center justify-center transition-colors shadow-sm font-medium text-sm whitespace-nowrap shrink-0 ml-2 bg-[var(--color-bali-gold)] text-white hover:bg-[var(--color-bali-green)]"
            >
              + Додати
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
