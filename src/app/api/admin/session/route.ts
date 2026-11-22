import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, getAdminSecret, verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!cookie) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const { valid, payload } = await verifySession(cookie, getAdminSecret());
  if (!valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    email: payload?.email || 'admin@sarang-ai.com',
  });
}
