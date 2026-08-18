"use client";
import { useState, useEffect } from 'react';

export default function MenuSettings() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [config, setConfig] = useState<any>({
    hiddenCategories: [],
    hiddenProducts: [],
    customProductPhotos: {},
    customCategories: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // UI state for adding new categories
  const [newCatName, setNewCatName] = useState('');
  const [activeTab, setActiveTab] = useState<'poster' | 'custom'>('custom');

  useEffect(() => {
    fetchMenu();
  }, []);

  async function fetchMenu() {
    try {
      const res = await fetch('/api/poster/menu?all=true');
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
        setCategories(data.categories);
        setConfig(data.config || {
          hiddenCategories: [],
          hiddenProducts: [],
          customProductPhotos: {},
          customCategories: []
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveConfig() {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/poster/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Зміни успішно збережено!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Помилка збереження.');
      }
    } catch (err) {
      setMessage('Помилка мережі.');
    } finally {
      setSaving(false);
    }
  }

  // --- Original Poster Logic ---
  const toggleCategory = (id: string) => {
    setConfig((prev: any) => {
      const hidden = prev.hiddenCategories.includes(id);
      return {
        ...prev,
        hiddenCategories: hidden 
          ? prev.hiddenCategories.filter((c: string) => c !== id)
          : [...prev.hiddenCategories, id]
      };
    });
  };

  const toggleProduct = (id: string) => {
    setConfig((prev: any) => {
      const hidden = prev.hiddenProducts.includes(id);
      return {
        ...prev,
        hiddenProducts: hidden 
          ? prev.hiddenProducts.filter((p: string) => p !== id)
          : [...prev.hiddenProducts, id]
      };
    });
  };

  const setCustomPhoto = (id: string, url: string) => {
    setConfig((prev: any) => ({
      ...prev,
      customProductPhotos: {
        ...prev.customProductPhotos,
        [id]: url
      }
    }));
  };

  // --- Custom Categories Logic ---
  const addCustomCategory = () => {
    if (!newCatName.trim()) return;
    const newCat = {
      id: 'custom_' + Date.now().toString(),
      name: newCatName.trim(),
      productIds: []
    };
    setConfig((prev: any) => ({
      ...prev,
      customCategories: [...(prev.customCategories || []), newCat]
    }));
    setNewCatName('');
  };

  const removeCustomCategory = (id: string) => {
    if (!confirm('Видалити цю категорію?')) return;
    setConfig((prev: any) => ({
      ...prev,
      customCategories: prev.customCategories.filter((c: any) => c.id !== id)
    }));
  };

  const toggleProductInCustomCategory = (catId: string, productId: string) => {
    setConfig((prev: any) => {
      const newCustomCats = prev.customCategories.map((c: any) => {
        if (c.id === catId) {
          const hasProduct = c.productIds.includes(productId);
          return {
            ...c,
            productIds: hasProduct
              ? c.productIds.filter((p: string) => p !== productId)
              : [...c.productIds, productId]
          };
        }
        return c;
      });
      return { ...prev, customCategories: newCustomCats };
    });
  };

  if (loading) return <div className="p-8">Завантаження налаштувань...</div>;

  const hasCustomCategories = config.customCategories && config.customCategories.length > 0;

  return (
    <div className="max-w-5xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-serif text-[var(--color-bali-dark)] mb-2">Налаштування Меню</h1>
          <p className="text-gray-500">Управляйте тим, що відображається на вашому сайті.</p>
        </div>
        <button 
          onClick={saveConfig}
          disabled={saving}
          className="bg-[var(--color-bali-green)] text-white px-6 py-2 rounded-md font-medium hover:bg-[var(--color-bali-green)]/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Збереження...' : 'Зберегти зміни'}
        </button>
      </div>

      {message && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-8">
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-8 pb-px">
        <button 
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'custom' ? 'border-[var(--color-bali-gold)] text-[var(--color-bali-dark)]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Власні Категорії (Рекомендується)
        </button>
        <button 
          onClick={() => setActiveTab('poster')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'poster' ? 'border-[var(--color-bali-gold)] text-[var(--color-bali-dark)]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Структура Poster
        </button>
      </div>

      {activeTab === 'custom' && (
        <div>
          <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md mb-8 text-sm">
            <strong>Увага:</strong> Якщо ви створюєте хоча б одну власну категорію, сайт буде використовувати <strong>тільки їх</strong> (стандартні категорії з Poster будуть ігноруватися). Ви можете додавати одну страву в декілька категорій (наприклад, "Сніданки" і "Основне меню").
          </div>

          <div className="mb-8 flex gap-4 bg-gray-50 p-6 rounded-xl border border-gray-100 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Назва нової категорії</label>
              <input 
                type="text" 
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                placeholder="Наприклад: Ранкове меню"
                className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-[var(--color-bali-gold)]"
                onKeyDown={e => e.key === 'Enter' && addCustomCategory()}
              />
            </div>
            <button 
              onClick={addCustomCategory}
              className="bg-[var(--color-bali-dark)] text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800"
            >
              Додати
            </button>
          </div>

          {!hasCustomCategories && (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
              У вас поки немає власних категорій.
            </div>
          )}

          {config.customCategories?.map((cat: any) => (
            <div key={cat.id} className="mb-8 border border-[var(--color-bali-gold)]/30 rounded-xl overflow-hidden bg-white shadow-sm">
              <div className="bg-[var(--color-bali-gold)]/10 p-4 flex justify-between items-center border-b border-[var(--color-bali-gold)]/20">
                <h3 className="text-xl font-bold text-[var(--color-bali-dark)]">{cat.name}</h3>
                <button onClick={() => removeCustomCategory(cat.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Видалити категорію</button>
              </div>
              
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto bg-gray-50/50">
                {items.map(item => {
                  const isChecked = cat.productIds.includes(item.product_id);
                  return (
                    <label key={item.product_id} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${isChecked ? 'bg-white border-[var(--color-bali-green)] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input 
                        type="checkbox" 
                        className="mt-1 accent-[var(--color-bali-green)]" 
                        checked={isChecked}
                        onChange={() => toggleProductInCustomCategory(cat.id, item.product_id)}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 leading-tight mb-1">{item.product_name}</div>
                        <div className="text-xs text-[var(--color-bali-green)]">{item.price} ₴</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'poster' && (
        <div className={hasCustomCategories ? 'opacity-50 pointer-events-none relative' : ''}>
          {hasCustomCategories && (
             <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
               <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
                 <h4 className="text-lg font-bold text-[var(--color-bali-dark)] mb-2">Налаштування заблоковано</h4>
                 <p className="text-gray-500 text-sm">Оскільки у вас є "Власні Категорії", стандартна структура Poster ігнорується сайтом.</p>
               </div>
             </div>
          )}
          
          {categories.map(cat => {
            const catItems = items.filter(item => item.menu_category_id === cat.category_id);
            const isCatHidden = config.hiddenCategories.includes(cat.category_id);

            return (
              <div key={cat.category_id} className="mb-10 border border-gray-200 rounded-xl overflow-hidden">
                <div className={`p-4 flex items-center justify-between ${isCatHidden ? 'bg-gray-100' : 'bg-gray-50'}`}>
                  <h3 className="text-lg font-bold text-gray-800">{cat.category_name}</h3>
                  <label className="flex items-center cursor-pointer">
                    <span className="mr-3 text-sm font-medium text-gray-900">Показувати категорію</span>
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={!isCatHidden}
                      onChange={() => toggleCategory(cat.category_id)}
                    />
                    <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-bali-green)]"></div>
                  </label>
                </div>

                {!isCatHidden && (
                  <div className="p-4 bg-white divide-y divide-gray-100">
                    {catItems.map(item => {
                      const isProdHidden = config.hiddenProducts.includes(item.product_id);
                      const customPhoto = config.customProductPhotos[item.product_id] || '';
                      const originalPhoto = item.photo ? (item.photo.startsWith('http') ? item.photo : `https://joinposter.com${item.photo}`) : null;
                      
                      return (
                        <div key={item.product_id} className={`py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between ${isProdHidden ? 'opacity-50' : ''}`}>
                          <div className="flex gap-4 items-center flex-1">
                            <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden shrink-0 border border-gray-100">
                              {(customPhoto || originalPhoto) ? (
                                <img src={customPhoto || originalPhoto} alt="food" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Немає</div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{item.product_name}</h4>
                              <span className="text-sm text-gray-500">{item.price} ₴</span>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row gap-4 items-center shrink-0">
                            <div className="flex flex-col">
                              <label className="text-xs text-gray-500 mb-1">Кастомне посилання на фото (необов'язково)</label>
                              <input 
                                type="text" 
                                placeholder="https://..."
                                value={customPhoto}
                                onChange={(e) => setCustomPhoto(item.product_id, e.target.value)}
                                className="text-sm border border-gray-300 rounded-md p-2 w-64 focus:ring-1 focus:ring-[var(--color-bali-gold)] outline-none"
                              />
                            </div>

                            <label className="flex items-center cursor-pointer mt-4 md:mt-0">
                              <span className="mr-3 text-sm font-medium text-gray-900">Показувати</span>
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={!isProdHidden}
                                onChange={() => toggleProduct(item.product_id)}
                              />
                              <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-bali-green)]"></div>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                    {catItems.length === 0 && (
                      <div className="text-gray-400 text-sm py-2">Немає страв у цій категорії</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
