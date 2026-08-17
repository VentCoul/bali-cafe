import { NextResponse } from 'next/server';
import { getMenuProducts, getCategories } from '@/lib/poster/client';

export const revalidate = 300; // Cache for 5 minutes

export async function GET() {
  try {
    const [products, categories] = await Promise.all([
      getMenuProducts(),
      getCategories()
    ]);

    // Format the response for the frontend
    return NextResponse.json({
      success: true,
      categories,
      items: products
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
