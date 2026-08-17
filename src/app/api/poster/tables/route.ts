import { NextResponse } from 'next/server';
import { getTables } from '@/lib/poster/client';

export const revalidate = 3600; // Cache tables for an hour

export async function GET() {
  try {
    const tables = await getTables();
    return NextResponse.json({ success: true, tables });
  } catch (error: any) {
    console.error("Poster API Tables Error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to fetch tables"
    }, { status: 500 });
  }
}
