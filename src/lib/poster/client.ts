import { getPosterToken } from './auth';
import { PosterProduct, PosterCategory } from './types';

// Визначаємо явні типи замість 'any'
interface RawPosterItem {
  product_id: string;
  menu_category_id: string;
  product_name: string;
  price: string | Record<string, string>;
  photo: string | null;
  type: number;
  ingredient_id: string;
  weight_flag: string;
}

interface RawPosterCategory {
  category_id: string;
  category_name: string;
}

interface RawPosterTable {
  table_id: string;
  spot_id: string;
  table_name: string;
}

export interface PosterOrderData {
  spot_id: string;
  phone: string;
  first_name: string;
  comment?: string;
  products: { product_id: string; count: number; price: number }[];
  table_id?: string;
  client_id?: string | number;
  bonus?: string | number; // Amount of bonuses to deduct
}

// Допоміжна функція для нормалізації відповіді Poster, яка іноді може бути об'єктом, а не масивом
function normalizeResponse<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data;
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap(v => Array.isArray(v) ? v : [v]) as T[];
  }
  return [];
}

/**
 * Виконує запит до Poster API
 */
export async function fetchPosterAPI(endpoint: string, options: RequestInit = {}) {
  const tokenData = getPosterToken();
  if (!tokenData) throw new Error('Poster is not connected (No token found)');

  const url = `https://${tokenData.account}.joinposter.com/api${endpoint}`;
  const urlWithToken = new URL(url);
  urlWithToken.searchParams.append('token', tokenData.access_token);

  const response = await fetch(urlWithToken.toString(), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  });

  if (!response.ok) {
    throw new Error(`Poster API error: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.error) throw new Error(`Poster API returned error: ${json.error}`);
  
  return json.response;
}

/**
 * Отримує всі активні товари з меню
 */
export async function getMenuProducts(): Promise<PosterProduct[]> {
  const rawData = await fetchPosterAPI('/menu.getProducts');
  const items = normalizeResponse<RawPosterItem>(rawData);
  
  return items.map(item => {
    // Обробляємо ціни залежно від типу. Іноді ціни - це об'єкти, що залежать від закладу (spot).
    // Для простоти в MVP ми беремо першу доступну або базову ціну.
    let price = 0;
    if (typeof item.price === 'object' && item.price !== null) {
      price = parseInt(Object.values(item.price)[0] as string) || 0;
    } else {
      price = parseInt(item.price as string) || 0;
    }

    return {
      product_id: item.product_id,
      menu_category_id: item.menu_category_id,
      product_name: item.product_name,
      // Конвертуємо копійки в гривні
      price: price / 100,
      photo: item.photo,
      type: item.type,
      ingredient_id: item.ingredient_id,
      weight_flag: item.weight_flag,
    };
  }).filter(item => item.product_name); // Відфільтровуємо невалідні товари
}

/**
 * Отримує категорії меню
 */
export async function getCategories(): Promise<PosterCategory[]> {
  const rawData = await fetchPosterAPI('/menu.getCategories');
  const items = normalizeResponse<RawPosterCategory>(rawData);
  return items.map(item => ({
    category_id: item.category_id,
    category_name: item.category_name
  }));
}

export async function getTables(): Promise<RawPosterTable[]> {
  // Використовуємо spots.getTables, щоб отримати всі столики
  const rawData = await fetchPosterAPI('/spots.getTables');
  return normalizeResponse<RawPosterTable>(rawData).map(item => ({
    table_id: item.table_id,
    spot_id: item.spot_id,
    table_name: item.table_name
  }));
}

export async function createOrder(orderData: PosterOrderData): Promise<unknown> {
  // Ендпоінт createIncomingOrder приймає JSON напряму
  return await fetchPosterAPI('/incomingOrders.createIncomingOrder', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

// Адмінська функція для імітації створення товару в Poster
export async function createPosterProduct(data: Record<string, unknown>): Promise<unknown> {
  return await fetchPosterAPI('/menu.createProduct', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export interface PosterClientInfo {
  client_id: string;
  client_name: string;
  phone: string;
  bonus: string | number; // usually string in kopecks or UAH depending on Poster version, we'll parse it
  discount_per: string;
  client_groups_id_client: string;
}

/**
 * Отримує клієнта по номеру телефону
 */
export async function getClientByPhone(phone: string): Promise<PosterClientInfo | null> {
  // Згідно з документацією Poster, пошук по телефону можна робити так:
  // /clients.getClients?phone=...
  // Але fetchPosterAPI автоматично додає ?token=... тому нам треба додавати &phone=
  // Трохи змінимо fetchPosterAPI, або просто передамо параметр
  try {
    const rawData = await fetchPosterAPI(`/clients.getClients?phone=${encodeURIComponent(phone)}`);
    const clients = normalizeResponse<PosterClientInfo>(rawData);
    
    if (clients.length > 0) {
      return clients[0];
    }
  } catch (error) {
    console.error('Помилка отримання клієнта з Poster:', error);
  }
  return null;
}

/**
 * Створює нового клієнта в Poster
 */
export async function createPosterClient(clientData: { phone: string; client_name: string; client_sex?: number }): Promise<PosterClientInfo | null> {
  try {
    const rawData = await fetchPosterAPI('/clients.createClient', {
      method: 'POST',
      body: JSON.stringify({
        ...clientData,
        client_groups_id_client: '1' // Дефолтна група клієнтів (можна винести в налаштування)
      })
    });
    
    // Poster повертає ID створеного клієнта у response
    if (typeof rawData === 'number' || typeof rawData === 'string') {
      return await getClientByPhone(clientData.phone);
    }
  } catch (error) {
    console.error('Помилка створення клієнта в Poster:', error);
  }
  return null;
}
