import { Metadata } from 'next';
import TopographyField from '@/components/ui/TopographyField';

export const metadata: Metadata = {
    title: 'Affiliate Partner Agreement — BIGWEB Digital',
    description: 'The legally binding Affiliate Partner Agreement governing the BIGWEB Digital Partner Programme.',
};

const UPDATED = 'June 4, 2025';
const CONTACT = 'partners@bigwebdigital.com';

const Section = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 48 }}>
        <h2 style={{
            color: 'var(--color-text-primary)', fontSize: '1.15rem', fontWeight: 700,
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12,
        }}>
            <span style={{
                background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.2)',
                borderRadius: 6, padding: '2px 10px', fontSize: '0.75rem', fontWeight: 800,
                color: '#D4AF6A', letterSpacing: '0.05em', flexShrink: 0,
            }}>{num}</span>
            {title}
        </h2>
        <div style={{ color: 'var(--color-text-secondary)', lineHeight: 1.85, fontSize: '0.9375rem' }}>
            {children}
        </div>
    </div>
);

export default function AffiliateAgreementPage() {
    return (
        <div style={{ paddingTop: 'calc(var(--nav-height) + 60px)', paddingBottom: 120, position: 'relative' }}>
            <TopographyField />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: 820, margin: '0 auto' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <div style={{
                            display: 'inline-block', background: 'rgba(212,175,106,0.08)', border: '1px solid rgba(212,175,106,0.2)',
                            borderRadius: 8, padding: '6px 18px', fontSize: 11, letterSpacing: '0.12em',
                            color: '#D4AF6A', textTransform: 'uppercase', marginBottom: 24,
                        }}>
                            Legal Document
                        </div>
                        <h1 className="section-title" style={{ marginBottom: 16 }}>Affiliate Partner Agreement</h1>
                        <p style={{ color: 'var(--color-text-tertiary)', fontSize: 14 }}>
                            Effective Date: {UPDATED} &nbsp;·&nbsp; Version 1.0
                        </p>
                    </div>

                    {/* Preamble */}
                    <div style={{
                        background: 'rgba(212,175,106,0.04)', border: '1px solid rgba(212,175,106,0.15)',
                        borderRadius: 12, padding: '28px 32px', marginBottom: 56,
                        color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem',
                    }}>
                        <strong style={{ color: 'var(--color-text-primary)' }}>IMPORTANT — PLEASE READ CAREFULLY.</strong>{' '}
                        This Affiliate Partner Agreement ("Agreement") is a legally binding contract between you ("Partner," "Affiliate") and BIGWEB Digital Ltd ("BIGWEB," "the Company"). By submitting a Partner Programme application and clicking "I Agree," you acknowledge that you have read, understood, and agree to be fully bound by all terms herein. If you do not agree, do not proceed with the application.
                    </div>

                    <Section num="§1" title="Definitions">
                        <p><strong style={{ color: 'var(--color-text-primary)' }}>"Affiliate" / "Partner"</strong> — The individual or entity approved into the BIGWEB Partner Programme.</p>
                        <p style={{ marginTop: 10 }}><strong style={{ color: 'var(--color-text-primary)' }}>"Referral"</strong> — A prospective client submitted by the Partner to BIGWEB as a qualified introduction, either via the Partner's unique referral link or by direct email introduction to partners@bigwebdigital.com.</p>
                        <p style={{ marginTop: 10 }}><strong style={{ color: 'var(--color-text-primary)' }}>"Qualified Lead"</strong> — A Referral that meets BIGWEB's minimum engagement criteria: (a) an annual revenue or funding of ≥ $500,000 USD; (b) a genuine, expressed intent to engage a digital agency; and (c) has not previously contacted or been engaged by BIGWEB via any other channel.</p>
                        <p style={{ marginTop: 10 }}><strong style={{ color: 'var(--color-text-primary)' }}>"Contract Value"</strong> — The total invoice amount, excluding taxes, of the signed Statement of Work between BIGWEB and the referred client.</p>
                        <p style={{ marginTop: 10 }}><strong style={{ color: 'var(--color-text-primary)' }}>"Commission"</strong> — Ten percent (10%) of the Contract Value payable to the Partner, subject to the conditions in §4.</p>
                    </Section>

                    <Section num="§2" title="Programme Eligibility & Approval">
                        <p>2.1 &nbsp;Membership in the BIGWEB Partner Programme is subject to manual review and approval at BIGWEB's sole discretion. Submission of an application does not constitute acceptance.</p>
                        <p style={{ marginTop: 10 }}>2.2 &nbsp;Approved Partners will receive written confirmation via email along with their unique referral code and referral link.</p>
                        <p style={{ marginTop: 10 }}>2.3 &nbsp;BIGWEB reserves the right to revoke Partner status at any time, with or without cause, upon fourteen (14) days' written notice. Commissions earned prior to revocation for Qualified Leads already in the sales pipeline are unaffected by revocation.</p>
                    </Section>

                    <Section num="§3" title="Referral Attribution & Exclusivity">
                        <p>3.1 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Attribution Window.</strong> A Referral must sign a contract with BIGWEB within ninety (90) calendar days of the Partner's original introduction. Introductions that do not convert within this window expire and no Commission is owed unless a new, separate introduction is made.</p>
                        <p style={{ marginTop: 10 }}>3.2 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>First-Touch Attribution.</strong> Where more than one Partner claims credit for the same client, commission is awarded solely to the Partner whose documented introduction was first received by BIGWEB. BIGWEB's internal records are conclusive in resolving attribution disputes.</p>
                        <p style={{ marginTop: 10 }}>3.3 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>No Self-Referral.</strong> Partners may not refer themselves, their own companies, or any entity in which they hold a financial interest exceeding 20%.</p>
                        <p style={{ marginTop: 10 }}>3.4 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Pre-Existing Contacts.</strong> BIGWEB maintains an internal prospect ledger. Any referral of a company or individual already engaged in active discussions with BIGWEB prior to the Partner's introduction is ineligible for commission. BIGWEB will notify the Partner of such conflicts within five (5) business days of receipt.</p>
                    </Section>

                    <Section num="§4" title="Commission Structure & Payment">
                        <p>4.1 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Rate.</strong> The Commission rate for all Partners is a flat ten percent (10.0%) of the Contract Value of the referred client's first signed engagement with BIGWEB.</p>
                        <p style={{ marginTop: 10 }}>4.2 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Trigger Event.</strong> Commission is earned upon receipt of the referred client's first payment (cleared funds) against the signed Statement of Work, not upon contract signature alone.</p>
                        <p style={{ marginTop: 10 }}>4.3 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Payment Timeline.</strong> BIGWEB will transfer the Commission to the Partner's nominated payout account within thirty (30) calendar days of the Trigger Event.</p>
                        <p style={{ marginTop: 10 }}>4.4 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Payout Methods.</strong> Commissions are paid via PayPal, Wise (TransferWise), or SWIFT bank transfer. BIGWEB bears no responsibility for transaction fees levied by the Partner's financial institution.</p>
                        <p style={{ marginTop: 10 }}>4.5 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Minimum Threshold.</strong> BIGWEB will not process a Commission payment for any amount less than two hundred and fifty US dollars ($250 USD). Sub-threshold commissions are accumulated and paid upon reaching the threshold.</p>
                        <p style={{ marginTop: 10 }}>4.6 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Tax Obligations.</strong> Partners are solely responsible for declaring and paying all applicable taxes on Commission income in their respective jurisdictions. Upon request, BIGWEB will provide a payment record for tax purposes.</p>
                    </Section>

                    <Section num="§5" title="Clawback Provisions">
                        <p>5.1 &nbsp;BIGWEB reserves the right to apply a full Commission clawback (recover all paid commission) in the following circumstances:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <li><strong style={{ color: 'var(--color-text-primary)' }}>Client Refund:</strong> The referred client receives a contractual refund of 50% or more of the Contract Value within 60 days of contract execution.</li>
                            <li><strong style={{ color: 'var(--color-text-primary)' }}>Fraudulent Referral:</strong> The Partner misrepresented material facts about the client, including their identity, financial status, or business intent.</li>
                            <li><strong style={{ color: 'var(--color-text-primary)' }}>Chargeback:</strong> The referred client initiates an illegitimate payment chargeback, and the bank resolves in the client's favour.</li>
                        </ul>
                        <p style={{ marginTop: 12 }}>5.2 &nbsp;BIGWEB will provide written notice of any clawback within ten (10) business days of the triggering event, detailing the specific circumstances. The Partner will have fifteen (15) days to dispute the clawback decision in writing to <a href={`mailto:${CONTACT}`} style={{ color: '#D4AF6A' }}>{CONTACT}</a>.</p>
                    </Section>

                    <Section num="§6" title="Partner Conduct & Brand Standards">
                        <p>6.1 &nbsp;Partners must represent BIGWEB's services accurately and truthfully at all times. Permitted marketing activities include sharing the Partner's referral link, word-of-mouth referrals, and written introductions.</p>
                        <p style={{ marginTop: 10 }}>6.2 &nbsp;<strong style={{ color: 'var(--color-text-primary)' }}>Prohibited Activities.</strong> Partners are expressly prohibited from:</p>
                        <ul style={{ paddingLeft: '1.5rem', marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <li>Bidding on BIGWEB's branded terms ("BIGWEB," "bigwebdigital") in paid search campaigns.</li>
                            <li>Sending unsolicited bulk email (spam) using BIGWEB's name or any materials derived from it.</li>
                            <li>Making false or misleading claims about BIGWEB's services, team, outcomes, or pricing.</li>
                            <li>Operating fake social media profiles or review accounts to promote BIGWEB.</li>
                            <li>Sub-affiliate arrangements — you may not recruit other affiliates on BIGWEB's behalf.</li>
                        </ul>
                        <p style={{ marginTop: 12 }}>6.3 &nbsp;Violation of §6.2 will result in immediate termination and full forfeiture of any pending commissions.</p>
                    </Section>

                    <Section num="§7" title="Confidentiality">
                        <p>7.1 &nbsp;Both parties agree to keep the terms of this Agreement, all client contract values, and all internal communications strictly confidential.</p>
                        <p style={{ marginTop: 10 }}>7.2 &nbsp;Partners must not disclose any client information shared during the referral process to any third party without the written consent of both the client and BIGWEB.</p>
                    </Section>

                    <Section num="§8" title="Intellectual Property">
                        <p>8.1 &nbsp;BIGWEB grants Partners a limited, non-exclusive, non-transferable licence to use BIGWEB's approved brand assets (logos, pitch decks, and marketing copy) solely for the purpose of making Referrals under this Agreement.</p>
                        <p style={{ marginTop: 10 }}>8.2 &nbsp;Partners may not modify BIGWEB's brand assets, create derivative works, or use them for any purpose other than those explicitly permitted herein.</p>
                    </Section>

                    <Section num="§9" title="Limitation of Liability">
                        <p>9.1 &nbsp;BIGWEB's total liability to any Partner under this Agreement shall not exceed the total Commission paid to that Partner in the twelve (12) months preceding the event giving rise to the claim.</p>
                        <p style={{ marginTop: 10 }}>9.2 &nbsp;BIGWEB is not liable for any indirect, consequential, incidental, or punitive damages arising from the Partner Programme, including loss of anticipated referral income.</p>
                    </Section>

                    <Section num="§10" title="Governing Law & Dispute Resolution">
                        <p>10.1 &nbsp;This Agreement is governed by and construed in accordance with the laws of England and Wales (or the jurisdiction of BIGWEB's principal place of business).</p>
                        <p style={{ marginTop: 10 }}>10.2 &nbsp;Any dispute arising out of or in connection with this Agreement shall first be submitted to good-faith mediation. If unresolved after 30 days of mediation, the dispute shall be submitted to binding arbitration.</p>
                    </Section>

                    <Section num="§11" title="Amendments">
                        <p>11.1 &nbsp;BIGWEB may modify this Agreement at any time by providing thirty (30) days' written notice to the Partner's registered email address. Continued participation in the Partner Programme after the notice period constitutes acceptance of the updated terms.</p>
                    </Section>

                    <Section num="§12" title="Contact">
                        <p>All partnership enquiries, commission disputes, and legal notices must be directed to: <a href={`mailto:${CONTACT}`} style={{ color: '#D4AF6A' }}>{CONTACT}</a></p>
                    </Section>

                    {/* Footer CTA */}
                    <div style={{
                        marginTop: 64, padding: '28px 32px', background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, textAlign: 'center',
                    }}>
                        <p style={{ color: 'var(--color-text-tertiary)', fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
                            Ready to apply? By submitting your application you confirm you have read, understood, and accepted these terms.
                        </p>
                        <a href="/partners#apply" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.3)',
                            color: '#D4AF6A', padding: '12px 28px', borderRadius: 8,
                            textDecoration: 'none', fontSize: 13, fontWeight: 700,
                            letterSpacing: '0.06em', textTransform: 'uppercase',
                        }}>
                            Apply to the Partner Programme →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
