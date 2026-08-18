"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import { useSession } from 'next-auth/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { data: session } = useSession();
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
  
  // Bonus State
  const [bonusBalance, setBonusBalance] = useState<number>(0);
  const [applyBonuses, setApplyBonuses] = useState<number>(0);

  useEffect(() => {
    if (session?.user) {
      if (session.user.name && !name) setName(session.user.name);
      
      // Fetch poster client info to get bonuses
      fetch('/api/poster/client')
        .then(res => res.json())
        .then(data => {
          if (data && data.phone && !phone) setPhone(data.phone);
          if (data && typeof data.bonus !== 'undefined') {
            // Usually bonuses are in kopecks or UAH string
            const parsed = parseFloat(String(data.bonus));
            setBonusBalance(parsed > 1000 ? parsed / 100 : parsed); // crude heuristic for kopecks vs UAH
          }
        })
        .catch(console.error);
    }
  }, [session]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  // Fetch tables when opening checkout
  useEffect(() => {
    const fetchTables = async () => {
      if (isCheckout && tables.length === 0) {
        setTablesLoading(true);
        try {
          const res = await fetch('/api/poster/tables');
          const data = await res.json();
          if (data.success) {
            setTables(data.tables);
          }
        } finally {
          setTablesLoading(false);
        }
      }
    };
    
    fetchTables();
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
          items: items,
          appliedBonuses: applyBonuses
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

  const finalPrice = Math.max(0, getTotalPrice() - applyBonuses);

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
                  <h3 className="text-xl font-medium mb-2">{orderType === 'dine_in' ? 'Страви додано до столика!' : 'Замовлення прийнято!'}</h3>
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
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 bg-[var(--color-bali-green)]/5">
                        <input type="radio" name="payment" checked={true} readOnly className="text-[var(--color-bali-green)]" />
                        <span className="font-medium text-[var(--color-bali-dark)]">Оплата на місці (готівкою або карткою)</span>
                      </label>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md opacity-50 bg-gray-50">
                        <div className="flex items-center gap-3">
                          <input type="radio" disabled name="payment" className="text-gray-300" />
                          <span className="text-gray-500 line-through">LiqPay (Apple Pay, Google Pay)</span>
                        </div>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Скоро</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Коментар</label>
                    <textarea value={comment} onChange={e=>setComment(e.target.value)} className="w-full p-3 border border-gray-200 rounded-md outline-none focus:border-[var(--color-bali-gold)]" placeholder="Побажання до замовлення..." rows={2}></textarea>
                  </div>

                  {bonusBalance > 0 && (
                    <div className="bg-[var(--color-bali-gold)]/10 border border-[var(--color-bali-gold)] p-4 rounded-md">
                      <label className="block text-sm font-medium text-[var(--color-bali-dark)] mb-2">
                        Використати бонуси (доступно {bonusBalance} ₴)
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          min={0}
                          max={Math.min(bonusBalance, getTotalPrice())}
                          value={applyBonuses || ''} 
                          onChange={e => setApplyBonuses(Math.min(parseFloat(e.target.value) || 0, bonusBalance, getTotalPrice()))} 
                          className="flex-1 p-2 border border-gray-200 rounded-md outline-none focus:border-[var(--color-bali-gold)] bg-white" 
                          placeholder="Сума до списання" 
                        />
                        <button 
                          type="button" 
                          onClick={() => setApplyBonuses(Math.min(bonusBalance, getTotalPrice()))}
                          className="px-4 py-2 bg-[var(--color-bali-gold)] text-white text-sm rounded-md font-medium"
                        >
                          Макс
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.product_id} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img src={item.product.photo ? (item.product.photo.startsWith('http') ? item.product.photo : `https://joinposter.com${item.product.photo}`) : '/placeholder-food.jpg'} alt={item.product.product_name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-medium text-[var(--color-bali-dark)] line-clamp-2 leading-snug">{item.product.product_name}</h4>
                          <button onClick={() => removeItem(item.product.product_id)} className="text-gray-400 hover:text-red-500 p-1 shrink-0" title="Видалити">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <span className="font-bold text-[var(--color-bali-green)] text-lg">
                            {item.product.weight_flag === '1' ? (item.product.price * (item.quantity / 100)) : (item.product.price * item.quantity)} ₴
                          </span>
                          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-200 shadow-sm">
                            <button onClick={() => updateQuantity(item.product.product_id, item.quantity - (item.product.weight_flag === '1' ? 50 : 1))} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 rounded-md transition-colors text-lg font-medium">-</button>
                            {item.product.weight_flag === '1' ? (
                              <div className="flex items-center border border-gray-300 rounded px-1 bg-white">
                                <input 
                                  type="number" 
                                  value={item.quantity} 
                                  onChange={(e) => updateQuantity(item.product.product_id, parseInt(e.target.value) || 0)} 
                                  className="w-12 text-center text-sm font-bold bg-transparent outline-none m-0 p-0" 
                                  style={{ MozAppearance: 'textfield' }}
                                />
                                <span className="text-xs text-gray-500 font-medium">г</span>
                              </div>
                            ) : (
                              <span className="text-sm font-bold w-10 text-center select-none">{item.quantity}</span>
                            )}
                            <button onClick={() => updateQuantity(item.product.product_id, item.quantity + (item.product.weight_flag === '1' ? 50 : 1))} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-200 rounded-md transition-colors text-lg font-medium">+</button>
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
                <div className="flex flex-col gap-1 mb-4 text-lg font-medium">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Сума замовлення:</span>
                    <span>{getTotalPrice()} ₴</span>
                  </div>
                  {applyBonuses > 0 && (
                    <div className="flex justify-between text-[var(--color-bali-gold)] text-sm">
                      <span>Списано бонусів:</span>
                      <span>-{applyBonuses} ₴</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl mt-1 pt-2 border-t border-gray-200">
                    <span>До сплата:</span>
                    <span className="text-[var(--color-bali-green)] font-bold">{finalPrice} ₴</span>
                  </div>
                </div>
                {isCheckout ? (
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setIsCheckout(false)} className="px-4 py-3 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
                      Назад
                    </button>
                    <button form="checkout-form" type="submit" disabled={loading} className="flex-1 bg-[var(--color-bali-green)] text-white py-3 rounded-md font-medium hover:bg-[var(--color-bali-green)]/90 transition-colors disabled:opacity-70">
                      {loading ? 'Відправка...' : (paymentType === 'liqpay' ? 'Сплатити' : (orderType === 'dine_in' ? 'Додати до замовлення' : 'Підтвердити замовлення'))}
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
