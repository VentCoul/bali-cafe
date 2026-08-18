import { NextResponse } from 'next/server';
import { getMenuProducts, getCategories } from '@/lib/poster/client';
import { getMenuConfig } from '@/lib/poster/menuConfig';

export const revalidate = 0; // Don't cache admin changes dynamically

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';

    const [products, categories] = await Promise.all([
      getMenuProducts(),
      getCategories()
    ]);

    const config = getMenuConfig();

    let finalCategories: any[] = categories;
    let finalProducts = products;

    if (!showAll) {
      if (config.customCategories && config.customCategories.length > 0) {
        // Use custom categories
        finalCategories = config.customCategories.map(c => ({
          category_id: c.id,
          category_name: c.name,
          productIds: c.productIds // custom property for the frontend
        }));
      } else {
        // Use Poster categories but filter hidden
        finalCategories = categories.filter(c => !config.hiddenCategories.includes(c.category_id));
      }

      finalProducts = products.filter(p => !config.hiddenProducts.includes(p.product_id));
      
      // Inject custom photos
      finalProducts = finalProducts.map(p => {
        if (config.customProductPhotos[p.product_id]) {
          return { ...p, photo: config.customProductPhotos[p.product_id] };
        }
        return p;
      });
    }

    // Format the response for the frontend
    return NextResponse.json({
      success: true,
      categories: finalCategories,
      items: finalProducts,
      config: showAll ? config : undefined
    });
  } catch (error: any) {
    console.error("Poster API Error:", error);
    
    // Fallback or error state
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to fetch menu from Poster"
    }, { status: 500 });
  }
}
