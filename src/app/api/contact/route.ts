import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');
const FROM_EMAIL = 'BIGWEB Digital <hello@bigwebdigital.com>';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, website, revenue, interest, message } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'First name, last name, and email are required.' }, { status: 400 });
    }

    // 1. Save lead to Supabase
    const { error } = await supabaseAdmin.from('leads').insert({
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

    // 2. Fire immediate confirmation via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: 'hello@bigwebdigital.com',
        subject: `Your Strategy Session with BIGWEB Digital`,
        html: `
          <div style="font-family: sans-serif; color: #111; line-height: 1.6;">
            <p>Hi ${firstName},</p>
            <p>We’ve received your diagnostic request.</p>
            <p>One of our senior strategists is reviewing your submission right now. We will follow up within 4 hours to confirm your 20-minute strategy call time.</p>
            <br/>
            <p>Speak soon,</p>
            <p><strong>The BIGWEB Team</strong></p>
          </div>
        `,
      });

      // Internal notification
      if (process.env.TEAM_EMAIL) {
        await resend.emails.send({
          from: 'BIGWEB Alerts <hello@bigwebdigital.com>',
          to: process.env.TEAM_EMAIL,
          subject: `[New Lead] ${firstName} ${lastName} - Contact Wizard`,
          html: `<p>New lead received from <strong>${firstName} ${lastName}</strong> (${email}).</p>`,
        });
      }
    }

    return NextResponse.json({ success: true, message: 'Lead submitted successfully.' });
  } catch (err) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
