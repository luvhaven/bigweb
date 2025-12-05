// Proposal Generator for Estimator
// Generates comprehensive HTML proposals to be sent via email

export interface ProposalData {
  clientInfo: {
    name: string
    email: string
    company: string
  }
  projectDetails: {
    service: string
    scope: string
    timeline: string
    budget: string
  }
  estimate: {
    basePrice: number
    features: Array<{name: string, price: number}>
    total: number
    duration: string
  }
  selectedFeatures: string[]
}

export function generateProposalHTML(data: ProposalData): string {
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Proposal - BIGWEB</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: #f5f5f5;
      padding: 40px 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      padding: 60px 40px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: 900;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
    .tagline {
      font-size: 14px;
      opacity: 0.9;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content {
      padding: 40px;
    }
    .section {
      margin-bottom: 40px;
    }
    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: #f97316;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid #f97316;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    .info-item {
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #f97316;
    }
    .info-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .price-box {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
    }
    .price-label {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .price-value {
      font-size: 56px;
      font-weight: 900;
      margin-bottom: 10px;
    }
    .price-note {
      font-size: 14px;
      opacity: 0.9;
    }
    .features-list {
      list-style: none;
    }
    .features-list li {
      padding: 15px 20px;
      background: #f8fafc;
      margin-bottom: 10px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .feature-name {
      font-weight: 600;
      color: #1a1a1a;
    }
    .feature-price {
      color: #f97316;
      font-weight: 700;
    }
    .timeline-box {
      background: #f0fdfa;
      border: 2px solid #14b8a6;
      border-radius: 12px;
      padding: 30px;
      margin: 20px 0;
    }
    .timeline-title {
      font-size: 18px;
      font-weight: 700;
      color: #14b8a6;
      margin-bottom: 15px;
    }
    .timeline-phases {
      display: grid;
      gap: 15px;
    }
    .phase {
      display: flex;
      align-items: flex-start;
      gap: 15px;
    }
    .phase-number {
      background: #14b8a6;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      flex-shrink: 0;
    }
    .phase-content h4 {
      font-size: 16px;
      margin-bottom: 5px;
      color: #1a1a1a;
    }
    .phase-content p {
      font-size: 14px;
      color: #64748b;
    }
    .deliverables {
      background: #fefce8;
      border: 2px solid #facc15;
      border-radius: 12px;
      padding: 30px;
      margin: 20px 0;
    }
    .deliverables-title {
      font-size: 18px;
      font-weight: 700;
      color: #ca8a04;
      margin-bottom: 15px;
    }
    .deliverables-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .deliverable-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #1a1a1a;
    }
    .checkmark {
      color: #22c55e;
      font-weight: 900;
      font-size: 18px;
    }
    .cta-box {
      background: #1e293b;
      color: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      margin: 40px 0;
    }
    .cta-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .cta-text {
      font-size: 16px;
      opacity: 0.9;
      margin-bottom: 25px;
    }
    .cta-button {
      display: inline-block;
      background: #f97316;
      color: white;
      padding: 15px 40px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 700;
      transition: background 0.3s;
    }
    .cta-button:hover {
      background: #ea580c;
    }
    .footer {
      background: #1e293b;
      color: white;
      padding: 40px;
      text-align: center;
    }
    .footer-text {
      font-size: 14px;
      opacity: 0.8;
      margin-bottom: 20px;
    }
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      margin-top: 20px;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      opacity: 0.9;
    }
    @media (max-width: 768px) {
      .info-grid,
      .deliverables-grid {
        grid-template-columns: 1fr;
      }
      .price-value {
        font-size: 42px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">BIGWEB</div>
      <div class="tagline">Elite Web Development</div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Date -->
      <p style="text-align: right; color: #64748b; margin-bottom: 30px;">${today}</p>

      <!-- Client Info -->
      <div class="section">
        <h2 class="section-title">Proposal For</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Client Name</div>
            <div class="info-value">${data.clientInfo.name}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Company</div>
            <div class="info-value">${data.clientInfo.company || 'N/A'}</div>
          </div>
          <div class="info-item" style="grid-column: span 2;">
            <div class="info-label">Email</div>
            <div class="info-value">${data.clientInfo.email}</div>
          </div>
        </div>
      </div>

      <!-- Project Overview -->
      <div class="section">
        <h2 class="section-title">Project Overview</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Service Type</div>
            <div class="info-value">${data.projectDetails.service}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Project Scope</div>
            <div class="info-value">${data.projectDetails.scope}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Timeline</div>
            <div class="info-value">${data.projectDetails.timeline}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Budget Range</div>
            <div class="info-value">${data.projectDetails.budget}</div>
          </div>
        </div>
      </div>

      <!-- Investment -->
      <div class="section">
        <h2 class="section-title">Investment Breakdown</h2>
        
        <ul class="features-list">
          <li>
            <span class="feature-name">Base ${data.projectDetails.service} Package</span>
            <span class="feature-price">$${data.estimate.basePrice.toLocaleString()}</span>
          </li>
          ${data.estimate.features.map(feature => `
          <li>
            <span class="feature-name">${feature.name}</span>
            <span class="feature-price">$${feature.price.toLocaleString()}</span>
          </li>
          `).join('')}
        </ul>

        <div class="price-box">
          <div class="price-label">Total Investment</div>
          <div class="price-value">$${data.estimate.total.toLocaleString()}</div>
          <div class="price-note">Estimated ${data.estimate.duration} development timeline</div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="section">
        <h2 class="section-title">Project Timeline</h2>
        <div class="timeline-box">
          <div class="timeline-title">Development Phases</div>
          <div class="timeline-phases">
            <div class="phase">
              <div class="phase-number">1</div>
              <div class="phase-content">
                <h4>Discovery & Planning</h4>
                <p>Requirements gathering, project scoping, and strategic planning</p>
              </div>
            </div>
            <div class="phase">
              <div class="phase-number">2</div>
              <div class="phase-content">
                <h4>Design & Prototyping</h4>
                <p>UI/UX design, interactive prototypes, and design system creation</p>
              </div>
            </div>
            <div class="phase">
              <div class="phase-number">3</div>
              <div class="phase-content">
                <h4>Development & Integration</h4>
                <p>Frontend and backend development with all feature integrations</p>
              </div>
            </div>
            <div class="phase">
              <div class="phase-number">4</div>
              <div class="phase-content">
                <h4>Testing & Launch</h4>
                <p>QA testing, performance optimization, and deployment to production</p>
              </div>
            </div>
            <div class="phase">
              <div class="phase-number">5</div>
              <div class="phase-content">
                <h4>Support & Optimization</h4>
                <p>Post-launch support, monitoring, and continuous improvements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Deliverables -->
      <div class="section">
        <h2 class="section-title">What You'll Receive</h2>
        <div class="deliverables">
          <div class="deliverables-title">Project Deliverables</div>
          <div class="deliverables-grid">
            <div class="deliverable-item">
              <span class="checkmark">✓</span>
              <span>Full source code</span>
            </div>
            <div class="deliverable-item">
              <span class="checkmark">✓</span>
              <span>Design files & assets</span>
            </div>
            <div class="deliverable-item">
              <span class="checkmark">✓</span>
              <span>Technical documentation</span>
            </div>
            <div class="deliverable-item">
              <span class="checkmark">✓</span>
              <span>Deployment support</span>
            </div>
            <div class="deliverable-item">
              <span class="checkmark">✓</span>
              <span>Training & onboarding</span>
            </div>
            <div class="deliverable-item">
              <span class="checkmark">✓</span>
              <span>30-day support</span>
            </div>
            <div class="deliverable-item">
              <span class="checkmark">✓</span>
              <span>Performance optimization</span>
            </div>
            <div class="deliverable-item">
              <span class="checkmark">✓</span>
              <span>SEO optimization</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-box">
        <div class="cta-title">Ready to Get Started?</div>
        <div class="cta-text">
          Let's bring your vision to life! Schedule a consultation to discuss your project in detail.
        </div>
        <a href="https://your-website.com/contact" class="cta-button">Schedule Consultation</a>
      </div>

      <!-- Terms -->
      <div class="section">
        <h2 class="section-title">Terms & Conditions</h2>
        <div style="font-size: 14px; color: #64748b; line-height: 1.8;">
          <p style="margin-bottom: 15px;">
            <strong>Payment Terms:</strong> 50% upfront deposit, 25% at milestone completion, 25% upon final delivery.
          </p>
          <p style="margin-bottom: 15px;">
            <strong>Project Duration:</strong> Estimated timeline is ${data.estimate.duration}. Actual duration may vary based on scope changes and client feedback cycles.
          </p>
          <p style="margin-bottom: 15px;">
            <strong>Revisions:</strong> Includes 3 rounds of revisions per phase. Additional revisions available at $150/hour.
          </p>
          <p style="margin-bottom: 15px;">
            <strong>Support:</strong> 30 days of post-launch support included. Extended support packages available.
          </p>
          <p style="margin-bottom: 15px;">
            <strong>Validity:</strong> This proposal is valid for 30 days from the date above.
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        Thank you for considering BIGWEB for your project. We look forward to working with you!
      </p>
      <div class="contact-info">
        <div class="contact-item">
          <span>📧</span>
          <span>hello@bigweb.com</span>
        </div>
        <div class="contact-item">
          <span>📞</span>
          <span>+1 (555) 123-4567</span>
        </div>
        <div class="contact-item">
          <span>🌐</span>
          <span>www.bigweb.com</span>
        </div>
      </div>
      <p style="margin-top: 30px; font-size: 12px; opacity: 0.6;">
        © ${new Date().getFullYear()} BIGWEB. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `
}

// Generate proposal text summary for email body
export function generateProposalText(data: ProposalData): string {
  return `
Hi ${data.clientInfo.name},

Thank you for your interest in working with BIGWEB! Based on your project requirements, we've prepared a comprehensive proposal for your ${data.projectDetails.service} project.

PROJECT SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Service: ${data.projectDetails.service}
Scope: ${data.projectDetails.scope}
Timeline: ${data.projectDetails.timeline}
Investment: $${data.estimate.total.toLocaleString()}
Development Time: ${data.estimate.duration}

WHAT'S INCLUDED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Full source code & design files
✓ Technical documentation
✓ Deployment & training
✓ 30-day post-launch support
✓ Performance & SEO optimization

NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Review the attached detailed proposal
2. Schedule a consultation call
3. Sign off on the project scope
4. Begin development!

We're excited to bring your vision to life. Please reply to this email or schedule a consultation at your convenience.

Best regards,
The BIGWEB Team

📧 hello@bigweb.com
📞 +1 (555) 123-4567
🌐 www.bigweb.com
  `.trim()
}
