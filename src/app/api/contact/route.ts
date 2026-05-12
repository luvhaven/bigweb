import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, website, revenue, interest, message } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'First name, last name, and email are required.' }, { status: 400 });
    }

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

    return NextResponse.json({ success: true, message: 'Lead submitted successfully.' });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
