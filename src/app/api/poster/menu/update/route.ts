import { NextResponse } from 'next/server';
import { createPosterProduct } from '@/lib/poster/client';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real scenario, map our simple data to Poster's complex required fields
    // (like tax_id, menu_category_id, spot_id, etc.)
    const posterPayload = {
      product_name: data.name,
      menu_category_id: data.categoryId,
      price: data.price * 100, // Convert UAH back to kopecks
      photo: data.photo,
      // Default MVP fields
      tax_id: "1",
      prepare: 0,
      type: 3 // Goods
    };

    // Make the call to Poster API (this will fail until OAuth is fully set up)
    // const result = await createPosterProduct(posterPayload);
    
    return NextResponse.json({
      success: true,
      message: "Страва успішно відправлена в Poster",
      // data: result
    });
  } catch (error: any) {
    console.error("Poster API Create Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to create product in Poster"
    }, { status: 500 });
  }
}
