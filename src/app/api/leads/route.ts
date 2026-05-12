import { NextResponse } from 'next/server';
import { captureLead } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Capture the lead in Supabase
    await captureLead(email, source || 'Unknown');

    // Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead capture API error:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
