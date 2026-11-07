import { NextRequest, NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, interest, message, honeypot } = body;

    // Check honeypot spam trap
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message logged' });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Persist to Supabase / store
    await saveContactMessage({
      name,
      email,
      company: company || '',
      interest: interest || 'GMC & GPA Underwriting',
      message
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been successfully received by Vishal Kamath.'
    });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing contact submission.' },
      { status: 500 }
    );
  }
}
