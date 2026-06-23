// Premium HTML Email Template for BIGWEB AI Proposal
// Called from /api/leads when a user completes the AI qualification flow

interface Service {
  name: string;
  price: string;
  tier: number;
  tags: string[];
}

const TIER_LABEL: Record<number, string> = {
  1: '⚡ Tier 01 — Quick Wins',
  2: '🚀 Tier 02 — Growth Engine',
  3: '💎 Tier 03 — Revenue Transformation',
};

export function buildProposalEmail({
  name,
  recommendations,
  answers,
}: {
  name: string;
  recommendations: Service[];
  answers: Record<string, string>;
}) {
  const firstName = name.split(' ')[0];
  const goalMap: Record<string, string> = {
    ecommerce: 'increasing revenue and conversion rates',
    leadgen: 'generating high-quality leads',
    scale: 'scaling your brand online',
    brand: 'elevating your brand design and UX',
    traffic: 'dominating search rankings',
  };
  const goalPhrase = goalMap[answers.goal] || 'growing your business';

  const serviceCards = recommendations.map((s) => `
    <tr>
      <td style="padding: 0 0 20px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="background: #111114; border: 1px solid #262630; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 28px 32px;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
                text-transform: uppercase; color: #D4AF6A; font-family: 'DM Sans', Arial, sans-serif;">
                ${TIER_LABEL[s.tier] || 'Recommended Service'}
              </p>
              <h3 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #F2F0EB;
                font-family: 'Playfair Display', Georgia, serif; line-height: 1.2;">
                ${s.name}
              </h3>
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                <tr>
                  <td style="background: rgba(212,175,106,0.1); border: 1px solid rgba(212,175,106,0.25);
                    border-radius: 8px; padding: 10px 18px;">
                    <p style="margin: 0; font-size: 11px; color: #9B9793; letter-spacing: 0.1em;
                      text-transform: uppercase; font-family: 'DM Sans', Arial, sans-serif;">Investment</p>
                    <p style="margin: 4px 0 0 0; font-size: 22px; font-weight: 700; color: #D4AF6A;
                      font-family: 'Playfair Display', Georgia, serif;">${s.price}</p>
                  </td>
                </tr>
              </table>
              <a href="https://bigwebdigital.com/services/${s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}"
                style="display: inline-block; background: #D4AF6A; color: #0A0A0B; padding: 12px 24px;
                border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none;
                font-family: 'DM Sans', Arial, sans-serif; letter-spacing: 0.05em;">
                View Full Details →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your BIGWEB Digital Proposal</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #0A0A0B; font-family: 'DM Sans', Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  <!-- Email wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #0A0A0B; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 48px 16px;">

        <!-- Email card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width: 620px; background: #0D0D10; border: 1px solid #1F1F24; border-radius: 20px; overflow: hidden;">

          <!-- Header / Brand bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #111114 0%, #0D0D10 100%);
              border-bottom: 1px solid rgba(212,175,106,0.2); padding: 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Logo mark (SVG inline) -->
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 12px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect x="1" y="1" width="9" height="9" stroke="#D4AF6A" stroke-width="1.5"/>
                                  <rect x="12" y="1" width="9" height="9" fill="#D4AF6A" opacity="0.8"/>
                                  <rect x="1" y="12" width="9" height="9" fill="#D4AF6A" opacity="0.4"/>
                                  <rect x="12" y="12" width="9" height="9" stroke="#D4AF6A" stroke-width="1.5" stroke-dasharray="2 2"/>
                                </svg>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0; font-size: 18px; font-weight: 800; color: #F2F0EB;
                            font-family: 'DM Sans', Arial, sans-serif; letter-spacing: -0.02em;">
                            <span style="color: #D4AF6A;">BIG</span>WEB<span style="font-weight: 400; color: #9B9793; font-size: 14px;"> Digital</span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right">
                    <p style="margin: 0; font-size: 11px; color: #5A5753; font-family: 'DM Sans', Arial, sans-serif;
                      text-transform: uppercase; letter-spacing: 0.15em;">Custom Proposal</p>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #5A5753; font-family: monospace;">
                      ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold accent bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #D4AF6A 0%, #B8923F 50%, #D4AF6A 100%);
              height: 3px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Hero greeting -->
          <tr>
            <td style="padding: 48px 40px 32px;">
              <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.2em;
                text-transform: uppercase; color: #D4AF6A; font-family: 'DM Sans', Arial, sans-serif;">
                Personalised For You
              </p>
              <h1 style="margin: 0 0 20px 0; font-size: 36px; font-weight: 800; color: #F2F0EB; line-height: 1.15;
                font-family: 'Playfair Display', Georgia, serif;">
                ${firstName}, here's<br/>
                <em style="color: #D4AF6A; font-style: italic;">your growth roadmap.</em>
              </h1>
              <p style="margin: 0; font-size: 16px; color: #9B9793; line-height: 1.7;
                font-family: 'DM Sans', Arial, sans-serif; max-width: 480px;">
                Based on your goal of <strong style="color: #F2F0EB;">${goalPhrase}</strong>,
                our strategists have shortlisted the exact engagements most likely to move the needle
                for your business. No fluff. Just the work that compounds.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="height: 1px; background: #1F1F24; font-size: 0;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- Section: Recommended services -->
          <tr>
            <td style="padding: 36px 40px 8px;">
              <p style="margin: 0 0 24px 0; font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
                text-transform: uppercase; color: #5A5753; font-family: 'DM Sans', Arial, sans-serif;">
                Recommended Engagements
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${serviceCards}
              </table>
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background: rgba(212,175,106,0.05); border: 1px solid rgba(212,175,106,0.15);
                border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 28px 32px;">
                    <p style="margin: 0 0 14px 0; font-size: 13px; font-weight: 700; letter-spacing: 0.12em;
                      text-transform: uppercase; color: #D4AF6A; font-family: 'DM Sans', Arial, sans-serif;">
                      What Happens Next
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${[
      ['01', 'Book a 20-minute strategy call — zero hard pitch, all value.'],
      ['02', 'We map your exact revenue gap and prioritise the highest-ROI action.'],
      ['03', 'You receive a scoped engagement proposal within 48 hours.'],
    ].map(([num, text]) => `
                      <tr>
                        <td style="padding: 8px 0; vertical-align: top;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="vertical-align: top; padding-right: 14px; padding-top: 2px;">
                                <span style="display: inline-block; width: 26px; height: 26px; border-radius: 50%;
                                  background: rgba(212,175,106,0.1); border: 1px solid rgba(212,175,106,0.3);
                                  text-align: center; line-height: 26px; font-size: 10px; font-weight: 700;
                                  color: #D4AF6A; font-family: monospace;">${num}</span>
                              </td>
                              <td style="vertical-align: middle;">
                                <p style="margin: 0; font-size: 14px; color: #9B9793; line-height: 1.6;
                                  font-family: 'DM Sans', Arial, sans-serif;">${text}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>`).join('')}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding: 0 40px 48px;">
              <a href="https://bigwebdigital.com/contact"
                style="display: inline-block; background: linear-gradient(135deg, #D4AF6A 0%, #B8923F 100%);
                color: #0A0A0B; padding: 16px 40px; border-radius: 9999px; font-size: 15px; font-weight: 800;
                text-decoration: none; font-family: 'DM Sans', Arial, sans-serif; letter-spacing: 0.03em;
                box-shadow: 0 8px 32px rgba(212,175,106,0.3);">
                Book Your Strategy Call →
              </a>
              <p style="margin: 16px 0 0 0; font-size: 12px; color: #5A5753;
                font-family: 'DM Sans', Arial, sans-serif;">
                No commitment. Pure clarity.
              </p>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding: 0 40px 40px; border-top: 1px solid #1F1F24;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding-top: 32px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #F2F0EB;
                      font-family: 'Playfair Display', Georgia, serif; font-style: italic;">The BIGWEB Team</p>
                    <p style="margin: 0; font-size: 12px; color: #5A5753; font-family: 'DM Sans', Arial, sans-serif;">
                      Revenue-First Digital Agency · Lagos, Nigeria
                    </p>
                  </td>
                  <td align="right">
                    <a href="mailto:hello@bigwebdigital.com"
                      style="font-size: 12px; color: #D4AF6A; text-decoration: none;
                      font-family: 'DM Sans', Arial, sans-serif;">hello@bigwebdigital.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer legal -->
          <tr>
            <td style="background: #0A0A0B; border-top: 1px solid #1A1A1E; padding: 20px 40px;">
              <p style="margin: 0; font-size: 11px; color: #3A3A40; text-align: center;
                font-family: 'DM Sans', Arial, sans-serif; line-height: 1.6;">
                You received this because you interacted with BIGWEB AI on bigwebdigital.com.<br/>
                © 2018–${new Date().getFullYear()} BIGWEB Digital. All rights reserved.
                &nbsp;·&nbsp;
                <a href="https://bigwebdigital.com/privacy" style="color: #5A5753; text-decoration: none;">Privacy</a>
                &nbsp;·&nbsp;
                <a href="https://bigwebdigital.com/terms" style="color: #5A5753; text-decoration: none;">Terms</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- / Email card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  const text = `
Hi ${firstName},

Thank you for connecting with BIGWEB AI.

Based on your goal of ${goalPhrase}, here's what we recommend:

${recommendations.map(s => `• ${s.name} — ${s.price}`).join('\n')}

Next steps:
1. Book a 20-minute strategy call at https://bigwebdigital.com/contact
2. We map your revenue gap and prioritise the highest-ROI action
3. You receive a scoped engagement proposal within 48 hours

The BIGWEB Team
hello@bigwebdigital.com
  `.trim();

  return { html, text };
}
