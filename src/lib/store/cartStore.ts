import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PosterProduct } from '../poster/types';

export interface CartItem {
  product: PosterProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: PosterProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(item => item.product.product_id === product.product_id);
        
        if (existingItem) {
          const increment = product.weight_flag === '1' ? 100 : 1;
          set({
            items: currentItems.map(item => 
              item.product.product_id === product.product_id 
                ? { ...item, quantity: item.quantity + increment }
                : item
            )
          });
        } else {
          const initialQuantity = product.weight_flag === '1' ? 100 : 1;
          set({ items: [...currentItems, { product, quantity: initialQuantity }] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.product.product_id !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map(item => 
            item.product.product_id === productId 
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + (item.product.weight_flag === '1' ? 1 : item.quantity), 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const itemTotal = item.product.weight_flag === '1' 
            ? (item.product.price * (item.quantity / 100))
            : (item.product.price * item.quantity);
          return total + itemTotal;
        }, 0);
      }
    }),
    {
      name: 'bali-cart-storage',
    }
  )
);
