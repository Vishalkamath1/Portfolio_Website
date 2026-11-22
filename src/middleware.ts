import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, getAdminSecret, verifySession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicitly allow /admin/login and its subpaths
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
    return NextResponse.next();
  }

  // Read the signed httpOnly session cookie
  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { valid } = await verifySession(sessionCookie, getAdminSecret());

  if (!valid) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: '',
      path: '/',
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
