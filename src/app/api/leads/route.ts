import { NextRequest, NextResponse } from 'next/server';
import { buildProposalEmail } from '@/lib/email-templates';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = 'BIGWEB Digital <hello@bigwebdigital.com>';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, answers, recommendations, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // ── 1. Save lead to Supabase ─────────────────────────────────────────────
    try {
      await supabase.from('leads').insert({
        name,
        email,
        phone: phone || null,
        answers: answers || {},
        recommendations: recommendations || [],
        source: source || 'BIGWEB AI',
        status: 'new',
        created_at: new Date().toISOString(),
      });
    } catch (dbErr) {
      console.warn('[leads] DB insert skipped:', dbErr);
    }

    // ── 2. Build beautiful HTML email ────────────────────────────────────────
    const { html, text } = buildProposalEmail({
      name,
      recommendations: recommendations || [],
      answers: answers || {},
    });

    // ── 3. Send email to the prospect ────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: email,
          replyTo: 'hello@bigwebdigital.com',
          subject: `${name.split(' ')[0]}, here's your personalised growth proposal`,
          html,
          text,
        });

        // Also CC the internal team
        if (process.env.TEAM_EMAIL) {
          await resend.emails.send({
            from: 'BIGWEB AI Alerts <hello@bigwebdigital.com>',
            to: process.env.TEAM_EMAIL,
            replyTo: email,
            subject: `[New Lead] ${name} via BIGWEB AI`,
            html: `<p style="font-family:sans-serif">
              <strong>New lead from BIGWEB AI</strong><br/><br/>
              <b>Name:</b> ${name}<br/>
              <b>Email:</b> ${email}<br/>
              <b>Phone:</b> ${phone || 'Not provided'}<br/>
              <b>Recommendations:</b> ${(recommendations || []).map((r: { name: string }) => r.name).join(', ')}<br/>
              <br/><b>Answers:</b><br/>
              ${Object.entries(answers || {}).map(([k, v]) => `${k}: ${v}`).join('<br/>')}
            </p>`,
          });
        }
      } catch (emailErr) {
        console.error('[leads] Resend failed:', emailErr);
      }
    } else {
      console.warn('[leads] No RESEND_API_KEY configured — email not sent.');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[leads] API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
