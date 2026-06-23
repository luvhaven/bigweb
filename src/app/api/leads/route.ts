import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildProposalEmail } from '@/lib/email-templates';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ── Nodemailer transport ─────────────────────────────────────────────────────
// Configure via environment variables. Supports Gmail (SMTP), Mailgun, SendGrid
// SMTP, Resend, or any SMTP provider.
//
// Required env vars:
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
// OR for Gmail:
//   GMAIL_USER, GMAIL_APP_PASSWORD
function getTransport() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  // Gmail shorthand
  if (process.env.GMAIL_USER) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return null;
}

const FROM_ADDRESS = process.env.SMTP_FROM || process.env.GMAIL_USER || 'hello@bigwebdigital.com';

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
      // Table may not exist yet — log but don't fail the request
      console.warn('[leads] DB insert skipped:', dbErr);
    }

    // ── 2. Build beautiful HTML email ────────────────────────────────────────
    const { html, text } = buildProposalEmail({
      name,
      recommendations: recommendations || [],
      answers: answers || {},
    });

    // ── 3. Send email to the prospect ────────────────────────────────────────
    const transport = getTransport();
    if (transport) {
      try {
        await transport.sendMail({
          from: `"BIGWEB Digital" <${FROM_ADDRESS}>`,
          to: email,
          subject: `${name.split(' ')[0]}, here's your personalised growth proposal`,
          html,
          text,
        });

        // Also CC the internal team
        if (process.env.TEAM_EMAIL) {
          await transport.sendMail({
            from: `"BIGWEB AI" <${FROM_ADDRESS}>`,
            to: process.env.TEAM_EMAIL,
            subject: `[New Lead] ${name} via BIGWEB AI — ${source || 'AI Widget'}`,
            html: `<p style="font-family:sans-serif">
              <strong>New lead from BIGWEB AI</strong><br/><br/>
              <b>Name:</b> ${name}<br/>
              <b>Email:</b> ${email}<br/>
              <b>Phone:</b> ${phone || 'Not provided'}<br/>
              <b>Recommendations:</b> ${(recommendations || []).map((r: { name: string }) => r.name).join(', ')}<br/>
              <br/><b>Answers:</b><br/>
              ${Object.entries(answers || {}).map(([k, v]) => `${k}: ${v}`).join('<br/>')}
            </p>`,
            text: JSON.stringify({ name, email, phone, answers, recommendations }, null, 2),
          });
        }
      } catch (emailErr) {
        console.error('[leads] Email send failed:', emailErr);
        // Still return success — lead is captured even if email fails
      }
    } else {
      console.warn('[leads] No SMTP transport configured — email not sent. Set SMTP_HOST or GMAIL_USER in .env.local');
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[leads] API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
