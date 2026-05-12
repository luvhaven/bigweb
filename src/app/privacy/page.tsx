import { Metadata } from 'next';
import TopographyField from '@/components/ui/TopographyField';

export const metadata: Metadata = {
  title: 'Privacy Policy — BIGWEB Digital',
  description: 'How we handle, protect, and use your data.',
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-8))', paddingBottom: 'var(--space-12)', position: 'relative' }}>
      <TopographyField />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="section-title" style={{ marginBottom: 'var(--space-8)' }}>Privacy Policy</h1>
          
          <div className="prose" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>1. Information We Collect</h2>
            <p>At BIGWEB Digital, we believe in being transparent about the data we collect. When you interact with our website or services, we may collect:</p>
            <ul style={{ paddingLeft: 'var(--space-4)', marginBottom: 'var(--space-4)', listStyleType: 'square' }}>
              <li>Contact information (name, email address, phone number) when you book a call or fill out a form.</li>
              <li>Usage data and analytics to understand how our website is used and how we can improve it.</li>
              <li>Information related to your business and website when you engage our conversion audit or development services.</li>
            </ul>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>2. How We Use Your Information</h2>
            <p>We use the collected information primarily to:</p>
            <ul style={{ paddingLeft: 'var(--space-4)', marginBottom: 'var(--space-4)', listStyleType: 'square' }}>
              <li>Provide, operate, and maintain our services.</li>
              <li>Communicate with you regarding your projects, inquiries, or our services.</li>
              <li>Improve, personalize, and expand our website and offerings.</li>
              <li>Find exactly where your business is bleeding revenue (during audits).</li>
            </ul>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>4. Third-Party Services</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>5. Your Rights</h2>
            <p>You have the right to access, update, or delete the personal information we have on you. If you would like to exercise any of these rights, please contact us.</p>

            <h2 style={{ color: 'var(--color-text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)', fontSize: '1.5rem' }}>6. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@bigwebdigital.com" style={{ color: 'var(--color-brand-primary)' }}>hello@bigwebdigital.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
