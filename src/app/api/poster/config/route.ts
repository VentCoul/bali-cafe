import { NextResponse } from 'next/server';
import { saveMenuConfig, MenuConfig } from '@/lib/poster/menuConfig';

export async function POST(request: Request) {
  try {
    const config: MenuConfig = await request.json();
    
    const success = saveMenuConfig(config);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to save config' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
