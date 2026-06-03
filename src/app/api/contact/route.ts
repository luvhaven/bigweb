import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, website, revenue, interest, message } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'First name, last name, and email are required.' }, { status: 400 });
    }

    // 1. Save lead to Supabase
    const { error } = await supabase.from('leads').insert({
      first_name: firstName,
      last_name: lastName,
      email,
      company: company || null,
      website: website || null,
      revenue_range: revenue || null,
      interest: interest || null,
      message: message || null,
      status: 'new',
    });

    if (error) {
      console.error('Lead insert error:', error);
      return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
    }

    // 2. Fire sequence email 0 (immediate confirmation) — non-blocking
    fetch(`${SUPABASE_URL}/functions/v1/send-nurture-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        email,
        name: firstName,
        sequence_index: 0,
      }),
    }).catch(err => console.error('Nurture email 0 failed:', err));

    return NextResponse.json({ success: true, message: 'Lead submitted successfully.' });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
