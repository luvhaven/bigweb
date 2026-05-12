import { Metadata } from 'next';
import TopographyField from '@/components/ui/TopographyField';

export const metadata: Metadata = {
  title: 'Terms of Service — BIGWEB Digital',
  description: 'The terms and conditions governing our engagements.',
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-8))', paddingBottom: 'var(--space-12)', position: 'relative' }}>
      <TopographyField />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="section-title" style={{ marginBottom: 'var(--space-8)' }}>Terms of Service</h1>
          
          <div className="prose" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>1. Agreement to Terms</h2>
            <p>By accessing our website and engaging our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>2. Our Engagements</h2>
            <p>BIGWEB Digital operates on a project and sprint basis. We don't do vague retainers. All scopes, timelines, and deliverables are explicitly outlined and agreed upon in a formal Statement of Work (SOW) prior to the commencement of any project.</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>3. Intellectual Property</h2>
            <p>The site and its original content, features, and functionality are owned by BIGWEB Digital and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. Custom code, designs, and assets created during a client engagement transfer to the client upon full payment, as detailed in the SOW.</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>4. Disclaimer of Warranties</h2>
            <p>While we guarantee our effort, methodology, and the delivery of assets, we do not guarantee specific financial results. Conversion optimization and revenue growth depend on market factors, traffic quality, and product-market fit outside of our control. Our services are provided "as is" and "as available".</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>5. Limitation of Liability</h2>
            <p>In no event shall BIGWEB Digital, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>6. Changes</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>7. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:hello@bigwebdigital.com" style={{ color: 'var(--color-brand-primary)' }}>hello@bigwebdigital.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
