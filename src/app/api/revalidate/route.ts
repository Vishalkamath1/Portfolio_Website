import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { timingSafeEqualString, ADMIN_COOKIE_NAME, getAdminSecret, verifySession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const configuredSecret = process.env.REVALIDATION_SECRET;

    // Check 1: Valid admin session cookie
    const sessionCookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const adminSecret = getAdminSecret();
    const isSessionValid = sessionCookie && adminSecret ? (await verifySession(sessionCookie, adminSecret)).valid : false;

    // Check 2: Valid x-revalidation-token or Authorization Bearer token matching REVALIDATION_SECRET
    const customToken = req.headers.get('x-revalidation-token');
    const authHeader = req.headers.get('authorization');
    let providedToken = customToken ? customToken.trim() : null;

    if (!providedToken && authHeader && authHeader.startsWith('Bearer ')) {
      providedToken = authHeader.slice(7).trim();
    }

    const isSecretValid = (configuredSecret && providedToken)
      ? await timingSafeEqualString(providedToken, configuredSecret.trim())
      : false;

    if (!isSessionValid && !isSecretValid) {
      return NextResponse.json(
        { revalidated: false, message: 'Unauthorized: Invalid or missing revalidation credentials.' },
        { status: 401 }
      );
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const path = typeof body?.path === 'string' && body.path.startsWith('/') ? body.path : '/';
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: Date.now(),
    });
  } catch (err: any) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { revalidated: false, error: err?.message || 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
