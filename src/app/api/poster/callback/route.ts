import { NextResponse } from 'next/server';
import { savePosterToken } from '@/lib/poster/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const account = searchParams.get('account');
  const error = searchParams.get('error');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const redirectUri = `${baseUrl}/api/poster/callback`; // Must match EXACTLY the one sent to /api/auth

  if (error) {
    return NextResponse.redirect(`${baseUrl}/admin?error=${encodeURIComponent(error)}`);
  }

  if (!code || !account) {
    return NextResponse.redirect(`${baseUrl}/admin?error=Missing+code+or+account`);
  }

  const clientId = process.env.POSTER_CLIENT_ID;
  const clientSecret = process.env.POSTER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'OAuth credentials not configured on server' }, { status: 500 });
  }

  try {
    // Exchange code for access_token on the account's subdomain
    const tokenUrl = `https://${account}.joinposter.com/api/v2/auth/access_token`;
    
    const formData = new URLSearchParams();
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('code', code);
    formData.append('redirect_uri', redirectUri);

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Poster OAuth exchange failed:', errorText);
      return NextResponse.redirect(`${baseUrl}/admin?error=Token+exchange+failed`);
    }

    const data = await response.json();
    
    if (data.access_token) {
      // Save token securely
      savePosterToken(data.access_token, account);
      // Redirect back to admin page with success
      return NextResponse.redirect(`${baseUrl}/admin?success=true`);
    } else {
      return NextResponse.redirect(`${baseUrl}/admin?error=No+access_token+in+response`);
    }
  } catch (err) {
    console.error('Poster OAuth error:', err);
    return NextResponse.redirect(`${baseUrl}/admin?error=Internal+server+error`);
  }
}
