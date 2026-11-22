import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { timingSafeEqualString } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const configuredSecret = process.env.REVALIDATION_SECRET;

    if (!configuredSecret || !configuredSecret.trim()) {
      return NextResponse.json(
        { revalidated: false, message: 'Unauthorized: Revalidation secret is not configured on the server.' },
        { status: 401 }
      );
    }

    // Accept token via header 'x-revalidation-token' or 'Authorization: Bearer <token>'
    const customToken = req.headers.get('x-revalidation-token');
    const authHeader = req.headers.get('authorization');
    let providedToken = customToken ? customToken.trim() : null;

    if (!providedToken && authHeader && authHeader.startsWith('Bearer ')) {
      providedToken = authHeader.slice(7).trim();
    }

    if (!providedToken) {
      return NextResponse.json(
        { revalidated: false, message: 'Unauthorized: Missing revalidation token header.' },
        { status: 401 }
      );
    }

    const isMatch = await timingSafeEqualString(providedToken, configuredSecret.trim());

    if (!isMatch) {
      return NextResponse.json(
        { revalidated: false, message: 'Unauthorized: Invalid revalidation token.' },
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
