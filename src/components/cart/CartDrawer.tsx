"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Tables State
  const [tables, setTables] = useState<any[]>([]);
  const [tablesLoading, setTablesLoading] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [orderType, setOrderType] = useState<'takeaway' | 'dine_in'>('takeaway');
  const [tableId, setTableId] = useState('');
  const [paymentType, setPaymentType] = useState<'cash' | 'liqpay'>('cash');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch tables when opening checkout
  useEffect(() => {
    if (isCheckout && tables.length === 0) {
      setTablesLoading(true);
      fetch('/api/poster/tables')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTables(data.tables);
          }
        })
        .finally(() => setTablesLoading(false));
    }
  }, [isCheckout, tables.length]);

  if (!isClient) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (orderType === 'dine_in' && !tableId) {
      alert('Будь ласка, оберіть столик');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/order/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name, phone, comment },
          orderType,
          tableId,
          paymentType,
          items: items
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        if (data.paymentUrl) {
          // LiqPay redirection flow
          window.location.href = data.paymentUrl;
          return;
        }

        setSuccess(true);
        clearCart();
        setTimeout(() => {
          setSuccess(false);
          setIsCheckout(false);
          onClose();
        }, 3000);
      } else {
        alert(data.error || 'Помилка при оформленні замовлення');
      }
    } catch (err) {
      alert('Помилка з\'єднання');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[var(--color-bali-beige)]">
              <h2 className="text-2xl font-serif text-[var(--color-bali-dark)]">
                {isCheckout ? 'Оформлення' : 'Ваш кошик'}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {success ? (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
                  <h3 className="text-xl font-medium mb-2">Замовлення прийнято!</h3>
                  <p className="text-gray-500">Ми вже готуємо ваші страви.</p>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p>Ваш кошик порожній</p>
                  <button onClick={onClose} className="mt-4 text-[var(--color-bali-green)] underline">Перейти до меню</button>
                </div>
              ) : isCheckout ? (
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-5">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button 
                      type="button" 
                      onClick={() => setOrderType('takeaway')}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${orderType === 'takeaway' ? 'border-[var(--color-bali-green)] bg-[var(--color-bali-green)]/10 text-[var(--color-bali-green)]' : 'border-gray-200 text-gray-600'}`}
                    >
                      На винос
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setOrderType('dine_in')}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${orderType === 'dine_in' ? 'border-[var(--color-bali-green)] bg-[var(--color-bali-green)]/10 text-[var(--color-bali-green)]' : 'border-gray-200 text-gray-600'}`}
                    >
                      В закладі
                    </button>
                  </div>

                  {orderType === 'dine_in' && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Оберіть столик *</label>
                      <select 
                        required 
                        value={tableId} 
                        onChange={e => setTableId(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[var(--color-bali-gold)]"
                        disabled={tablesLoading}
                      >
                        <option value="">{tablesLoading ? 'Завантаження...' : '--- Оберіть столик ---'}</option>
                        {tables.map(t => (
                          <option key={t.table_id} value={t.table_id}>{t.table_name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Ім'я *</label>
                    <input required value={name} onChange={e=>setName(e.target.value)} type="text" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[var(--color-bali-gold)]" placeholder="Як до вас звертатися?" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Телефон *</label>
                    <input required value={phone} onChange={e=>setPhone(e.target.value)} type="tel" className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[var(--color-bali-gold)]" placeholder="+38 (000) 000-00-00" />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Спосіб оплати</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="payment" checked={paymentType === 'cash'} onChange={() => setPaymentType('cash')} className="text-[var(--color-bali-green)]" />
                        <span>Готівкою або Карткою (на місці)</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 opacity-70">
                        <input type="radio" name="payment" checked={paymentType === 'liqpay'} onChange={() => setPaymentType('liqpay')} className="text-[var(--color-bali-green)]" />
                        <span>LiqPay (Apple Pay, Google Pay)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Коментар</label>
                    <textarea value={comment} onChange={e=>setComment(e.target.value)} className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[var(--color-bali-gold)]" placeholder="Побажання до замовлення..." rows={2}></textarea>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.product_id} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img src={item.product.photo ? `https://joinposter.com${item.product.photo}` : '/placeholder-food.jpg'} alt={item.product.product_name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <h4 className="font-medium text-[var(--color-bali-dark)] line-clamp-2 leading-snug">{item.product.product_name}</h4>
                        <div className="flex justify-between items-end mt-2">
                          <span className="font-medium text-[var(--color-bali-green)]">{item.product.price} ₴</span>
                          <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 border border-gray-200">
                            <button onClick={() => updateQuantity(item.product.product_id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black">-</button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.product_id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && !success && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between mb-4 text-lg font-medium">
                  <span>До сплати:</span>
                  <span className="text-[var(--color-bali-green)]">{getTotalPrice()} ₴</span>
                </div>
                {isCheckout ? (
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setIsCheckout(false)} className="px-4 py-3 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                      Назад
                    </button>
                    <button form="checkout-form" type="submit" disabled={loading} className="flex-1 bg-[var(--color-bali-green)] text-white py-3 rounded-md font-medium hover:bg-[var(--color-bali-green)]/90 transition-colors disabled:opacity-70">
                      {loading ? 'Відправка...' : (paymentType === 'liqpay' ? 'Сплатити' : 'Підтвердити замовлення')}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsCheckout(true)} className="w-full bg-[var(--color-bali-gold)] text-white py-3 rounded-md font-medium hover:bg-[var(--color-bali-gold)]/90 transition-colors">
                    Оформити замовлення
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
