import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const clientId = process.env.POSTER_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  if (!clientId) {
    return NextResponse.json({ error: 'POSTER_CLIENT_ID is not configured' }, { status: 500 });
  }

  // According to Poster docs, redirect_uri must exactly match the one in app settings.
  // We use our callback route.
  const redirectUri = `${baseUrl}/api/poster/callback`;
  
  // Construct Poster authorization URL
  const authUrl = new URL('https://joinposter.com/api/auth');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('response_type', 'code');
  
  // Redirect user to Poster to approve the application
  return NextResponse.redirect(authUrl.toString());
}
