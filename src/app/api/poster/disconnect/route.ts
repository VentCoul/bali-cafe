import { NextResponse } from 'next/server';
import { deletePosterToken } from '@/lib/poster/auth';

export async function POST() {
  try {
    deletePosterToken();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
