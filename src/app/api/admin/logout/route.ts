import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const isProduction = process.env.NODE_ENV === 'production';
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
