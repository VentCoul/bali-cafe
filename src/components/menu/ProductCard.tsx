"use client";
import { PosterProduct } from '@/lib/poster/types';
import { motion } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';

interface Props {
  product: PosterProduct;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  
  const cartItem = items.find(item => item.product.product_id === product.product_id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Use a fallback image if none provided by Poster
  const imageUrl = product.photo ? `https://joinposter.com${product.photo}` : '/placeholder-food.jpg';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col"
    >
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden shrink-0">
        <img 
          src={imageUrl} 
          alt={product.product_name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Немає+фото';
          }}
        />
      </div>
      
      <div className="p-5 flex flex-col justify-between flex-1 gap-2">
        <h3 className="font-serif text-lg font-semibold text-[var(--color-bali-dark)] line-clamp-2">
          {product.product_name}
        </h3>
        
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-xl font-medium text-[var(--color-bali-green)] shrink-0">
            {product.price} ₴
          </span>
          <button 
            onClick={() => addItem(product)}
            className="bg-[var(--color-bali-gold)] text-white h-10 px-4 rounded-full flex items-center justify-center hover:bg-[var(--color-bali-green)] transition-colors shadow-sm font-medium whitespace-nowrap shrink-0 ml-2"
          >
            {quantityInCart > 0 ? `Додати ще (${quantityInCart})` : '+ В кошик'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
