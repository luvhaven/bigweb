'use client';

import { useEffect } from 'react';

interface CalEmbedProps {
    calLink?: string; // e.g. "bigwebdigital/strategy-session"
}

export default function CalEmbed({ calLink = 'bigwebdigital/strategy-session' }: CalEmbedProps) {
    useEffect(() => {
        // Dynamically inject Cal.com embed script
        if (typeof window === 'undefined') return;
        if ((window as any).Cal) return;

        const script = document.createElement('script');
        script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") { cal.ns[namespace] = api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); }
            else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "strategy-session", { origin: "https://app.cal.com" });
      Cal.ns["strategy-session"]("inline", {
        elementOrSelector: "#cal-booking-embed",
        calLink: "${calLink}",
        layout: "month_view",
        theme: "dark",
      });
      Cal.ns["strategy-session"]("ui", {
        styles: { branding: { brandColor: "#D4AF6A" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    `;
        document.body.appendChild(script);
    }, [calLink]);

    return (
        <div
            style={{
                marginTop: 'var(--space-10)',
                padding: 'var(--space-6)',
                border: '1px solid rgba(212, 175, 106, 0.15)',
                borderRadius: '8px',
                background: 'rgba(212,175,106,0.03)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Gold accent top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.5), transparent)' }} />

            <p style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-gold-bright)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 700,
                marginBottom: 'var(--space-4)',
            }}>
                ⚡ Or book your session instantly
            </p>

            {/* Cal.com inline embed target */}
            <div
                id="cal-booking-embed"
                style={{
                    minHeight: '600px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                }}
            />

            <p style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-tertiary)',
                textAlign: 'center',
                marginTop: 'var(--space-3)',
            }}>
                Powered by Cal.com · All times shown in your local timezone
            </p>
        </div>
    );
}
