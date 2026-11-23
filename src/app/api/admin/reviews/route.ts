import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ADMIN_COOKIE_NAME, getAdminSecret, verifySession, timingSafeEqualString } from '@/lib/auth';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

async function isAuthorized(req: NextRequest) {
  const sessionCookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const adminSecret = getAdminSecret();
  if (sessionCookie && adminSecret) {
    const verified = await verifySession(sessionCookie, adminSecret);
    if (verified.valid) return true;
  }
  const configuredSecret = process.env.REVALIDATION_SECRET;
  const token = req.headers.get('x-revalidation-token') || req.headers.get('authorization')?.replace('Bearer ', '');
  if (configuredSecret && token && await timingSafeEqualString(token.trim(), configuredSecret.trim())) {
    return true;
  }
  return false;
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing review id' }, { status: 400 });
  }

  if (supabase) {
    const { error } = await supabase.from('sarang_reviews').delete().eq('id', id);
    if (error) {
      console.warn('Supabase delete review error in API route:', error);
    }
  }

  revalidatePath('/');
  return NextResponse.json({ success: true, revalidated: true });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, approved, userName, userRole, rating, reviewText } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing review id' }, { status: 400 });
    }

    if (supabase) {
      const updates: any = {};
      if (typeof approved === 'boolean') updates.approved = approved;
      if (userName) updates.user_name = userName;
      if (userRole !== undefined) updates.user_role = userRole;
      if (rating !== undefined) updates.rating = rating;
      if (reviewText) updates.review_text = reviewText;

      const { error } = await supabase.from('sarang_reviews').update(updates).eq('id', id);
      if (error) {
        console.warn('Supabase update review error in API route:', error);
      }
    }

    revalidatePath('/');
    return NextResponse.json({ success: true, revalidated: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to update review' }, { status: 500 });
  }
}
