import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin/login';
  const isProtectedApi = req.nextUrl.pathname === '/api/poster/config';

  if (isAdminPath || isProtectedApi) {
    if (!req.auth || (req.auth.user as any)?.role !== 'ADMIN') {
      if (isAdminPath) {
        return NextResponse.redirect(new URL('/api/auth/signin?callbackUrl=' + encodeURIComponent(req.url), req.url));
      } else {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
    }
  }
  return NextResponse.next();
})

export const config = {
  matcher: ['/admin/:path*', '/api/poster/config'],
};
