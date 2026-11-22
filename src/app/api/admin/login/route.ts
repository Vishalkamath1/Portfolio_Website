import { NextRequest, NextResponse } from 'next/server';
import { getAdminSecret, timingSafeEqualString, signSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ message: 'Invalid JSON request payload' }, { status: 400 });
    }

    const { email, password } = body || {};

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ message: 'Administrator password is required' }, { status: 400 });
    }

    const configuredPassword = process.env.ADMIN_PASSWORD;

    if (!configuredPassword || !configuredPassword.trim()) {
      return NextResponse.json(
        { message: 'Server administration credentials not configured. Please contact system owner.' },
        { status: 503 }
      );
    }

    const isMatch = await timingSafeEqualString(password.trim(), configuredPassword.trim());

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid admin credentials' }, { status: 401 });
    }

    // Credentials verified successfully
    const secret = getAdminSecret();
    const token = await signSession(
      {
        email: typeof email === 'string' && email.trim() ? email.trim() : 'admin@sarang-ai.com',
        timestamp: Date.now(),
      },
      secret
    );

    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      email: typeof email === 'string' && email.trim() ? email.trim() : 'Vishal Kamath',
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('[ADMIN LOGIN API] Unexpected error:', err);
    return NextResponse.json({ message: 'An unexpected authentication error occurred' }, { status: 500 });
  }
}
