import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    // Upsert to handle duplicates gracefully
    const { error } = await supabase.from('subscribers').upsert(
      { email, is_active: true },
      { onConflict: 'email' }
    );

    if (error) {
      console.error('Subscriber insert error:', error);
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully.' });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
