import { NextRequest, NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload received.' },
        { status: 400 }
      );
    }

    const { name, email, company, interest, message, honeypot } = body;

    // Check honeypot spam trap (silently acknowledge bots without persisting)
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message logged' });
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Please enter your full name.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Please provide message details.' },
        { status: 400 }
      );
    }

    // Fast asynchronous insertion (with timeout guard so requests never hang)
    const result = await saveContactMessage({
      name: name.trim(),
      email: email.trim(),
      company: company ? String(company).trim() : '',
      interest: interest ? String(interest).trim() : 'GMC & GPA Underwriting',
      message: message.trim()
    });

    // If an external notification gateway (Resend, SendGrid, Webhook) is triggered in the future,
    // ensure it executes in an isolated try/catch or detached promise so it never delays HTTP response.
    // e.g.:
    // void triggerNotificationGateway(result.record).catch(err => console.warn('[Email gateway notice]:', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been successfully received by Vishal Kamath.',
        record: result.record
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Server error processing contact submission. Please try again or email directly at kamathvishal109@gmail.com.' },
      { status: 500 }
    );
  }
}
