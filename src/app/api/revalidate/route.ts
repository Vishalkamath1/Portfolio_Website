import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const path = body?.path || '/';
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: Date.now()
    });
  } catch (err: any) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { revalidated: false, error: err?.message || 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
