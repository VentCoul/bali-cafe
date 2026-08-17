import { getPosterToken } from './auth';
import { PosterProduct, PosterCategory } from './types';

// Helper to normalize Poster response which can sometimes be a dict instead of an array
function normalizeResponse<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap(v => Array.isArray(v) ? v : [v]) as T[];
  }
  return [];
}

/**
 * Make a request to Poster API
 */
async function fetchPosterAPI(endpoint: string, options: RequestInit = {}) {
  const tokenData = getPosterToken();
  if (!tokenData) throw new Error('Poster is not connected (No token found)');

  const url = `https://${tokenData.account}.joinposter.com/api/v3${endpoint}`;
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
 * Get all active menu products
 */
export async function getMenuProducts(): Promise<PosterProduct[]> {
  const rawData = await fetchPosterAPI('/menu.getProducts');
  const items = normalizeResponse<any>(rawData);
  
  return items.map(item => {
    // Process prices based on type. Sometimes prices are dicts based on spot.
    // For simplicity in MVP, we take the first available price or base price.
    let price = 0;
    if (typeof item.price === 'object' && item.price !== null) {
      price = parseInt(Object.values(item.price)[0] as string) || 0;
    } else {
      price = parseInt(item.price) || 0;
    }

    return {
      product_id: item.product_id,
      menu_category_id: item.menu_category_id,
      product_name: item.product_name,
      // Convert kopecks to UAH
      price: price / 100,
      photo: item.photo,
      type: item.type,
      ingredient_id: item.ingredient_id,
      weight_flag: item.weight_flag,
    };
  }).filter(item => item.product_name); // Filter out invalid items
}

/**
 * Get menu categories
 */
export async function getCategories(): Promise<PosterCategory[]> {
  const rawData = await fetchPosterAPI('/menu.getCategories');
  const items = normalizeResponse<any>(rawData);
  return items.map(item => ({
    category_id: item.category_id,
    category_name: item.category_name
  }));
}

export async function getTables(): Promise<any[]> {
  // We use spots.getTables to get all tables
  const rawData = await fetchPosterAPI('/spots.getTables');
  return normalizeResponse<any>(rawData).map(item => ({
    table_id: item.table_id,
    spot_id: item.spot_id,
    table_name: item.table_name
  }));
}

export async function createOrder(orderData: any): Promise<any> {
  // createIncomingOrder endpoint receives JSON directly
  return await fetchPosterAPI('/incomingOrders.createIncomingOrder', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

// Admin function to simulate creating a product in Poster
export async function createPosterProduct(data: any): Promise<any> {
  return await fetchPosterAPI('/menu.createProduct', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}
