"use client";
import { useState } from 'react';

export default function MenuEditor() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="max-w-4xl bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-[var(--color-bali-dark)] mb-2">Управління Меню</h1>
          <p className="text-gray-500">Просте додавання та редагування страв. Усі зміни автоматично зберігаються в Poster.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[var(--color-bali-gold)] text-white px-6 py-2 rounded-md font-medium hover:bg-[var(--color-bali-gold)]/90 transition-colors"
        >
          {isAdding ? 'Скасувати' : '+ Додати страву'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-medium mb-4">Нова страва</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Назва страви</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-bali-gold)] outline-none" placeholder="Наприклад: Сирники з вишнею" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Ціна (грн)</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-bali-gold)] outline-none" placeholder="150" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Категорія</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-bali-gold)] outline-none">
                  <option>Сніданки</option>
                  <option>Десерти</option>
                  <option>Кава</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Посилання на фото</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-bali-gold)] outline-none" placeholder="https://..." />
            </div>

            <button type="submit" className="w-full bg-[var(--color-bali-green)] text-white py-3 rounded-md font-medium mt-4 hover:bg-[var(--color-bali-green)]/90 transition-colors">
              Зберегти в Poster
            </button>
          </form>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium mb-4">Існуючі страви</h3>
        <div className="text-gray-500 text-sm p-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
          Тут буде список ваших страв з Poster після підключення API...
        </div>
      </div>
    </div>
  );
}
