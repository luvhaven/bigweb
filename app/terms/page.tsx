'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using BIGWEB Digital's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of our services immediately. These terms constitute a legally binding agreement between you and BIGWEB Digital."
    },
    {
      title: "Services Description",
      content: "BIGWEB Digital provides web development, mobile app development, e-commerce solutions, UI/UX design, SEO & marketing, and analytics services. All services are provided on a project basis or subscription model as agreed upon in individual service agreements. Specific deliverables, timelines, and pricing are outlined in project proposals and contracts."
    },
    {
      title: "Client Responsibilities",
      content: "Clients agree to provide accurate information, timely feedback, and necessary materials for project completion. Clients are responsible for content accuracy, obtaining necessary licenses for materials provided, maintaining confidentiality of access credentials, and making timely payments as agreed. Failure to meet these responsibilities may result in project delays or additional fees."
    },
    {
      title: "Payment Terms",
      content: "Payment terms are specified in individual service agreements. Generally, projects require an initial deposit before work begins, milestone payments during development, and final payment upon completion. Late payments may incur interest charges of 1.5% per month. We reserve the right to suspend services for non-payment and retain ownership of work until full payment is received."
    },
    {
      title: "Intellectual Property",
      content: "Upon full payment, clients receive ownership of custom work created specifically for them. BIGWEB Digital retains rights to: pre-existing tools, frameworks, and methodologies; reusable components and templates; general knowledge and techniques; and the right to showcase completed work in our portfolio. Third-party licenses remain subject to their original terms."
    },
    {
      title: "Project Timeline and Delivery",
      content: "Project timelines are estimates based on information available at project initiation. Actual completion dates may vary due to scope changes, client delays in providing feedback or materials, technical challenges, or force majeure events. BIGWEB Digital is not liable for delays caused by circumstances beyond our reasonable control."
    },
    {
      title: "Revisions and Change Requests",
      content: "Each project includes a specified number of revision rounds. Additional revisions or scope changes will be quoted separately and may affect timeline and cost. Major changes may require a new project agreement. All change requests must be submitted in writing and approved before implementation."
    },
    {
      title: "Warranties and Disclaimers",
      content: "We warrant that services will be performed in a professional manner consistent with industry standards. However, we provide services 'as is' without warranties of uninterrupted or error-free operation. We do not guarantee specific results, rankings, traffic, or revenue. We are not responsible for third-party services, content accuracy, or compatibility with future technologies."
    },
    {
      title: "Limitation of Liability",
      content: "To the maximum extent permitted by law, BIGWEB Digital's total liability for any claims arising from our services shall not exceed the total amount paid by the client for the specific services giving rise to the claim. We are not liable for indirect, incidental, consequential, or punitive damages, including lost profits, data loss, or business interruption, even if advised of the possibility of such damages."
    },
    {
      title: "Indemnification",
      content: "Clients agree to indemnify and hold BIGWEB Digital harmless from any claims, damages, losses, or expenses (including legal fees) arising from: client-provided content or materials; client's use of deliverables; violation of these terms; or infringement of third-party rights. This indemnification survives termination of the service agreement."
    },
    {
      title: "Confidentiality",
      content: "Both parties agree to maintain confidentiality of proprietary information shared during the course of the engagement. This obligation continues for two years after project completion. Confidentiality does not apply to information that is publicly available, independently developed, or required to be disclosed by law."
    },
    {
      title: "Termination",
      content: "Either party may terminate services with written notice. Client terminations require payment for work completed plus a cancellation fee as specified in the service agreement. Upon termination, BIGWEB Digital will deliver work completed to date, and client will make final payment within 15 days. Certain provisions survive termination, including payment obligations, intellectual property rights, and confidentiality."
    },
    {
      title: "Dispute Resolution",
      content: "Any disputes shall first be addressed through good-faith negotiation. If unresolved within 30 days, parties agree to mediation before pursuing litigation. Legal proceedings shall be conducted in Lagos, Nigeria, under Nigerian law. Each party shall bear its own legal costs unless otherwise awarded by a court."
    },
    {
      title: "Force Majeure",
      content: "Neither party shall be liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, war, terrorism, pandemics, government actions, or internet/utility failures. Performance obligations are suspended during force majeure events."
    },
    {
      title: "Updates to Terms",
      content: "We reserve the right to modify these terms at any time. Material changes will be communicated to active clients. Continued use of services after changes constitutes acceptance. It is your responsibility to review terms periodically."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Terms of Service</h1>
              <p className="text-lg text-muted-foreground">
                Last Updated: January 2025
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                <p className="text-lg leading-relaxed">
                  These Terms of Service govern your use of BIGWEB Digital's website and services. By engaging our services, you enter into a binding agreement with us. Please read these terms carefully as they contain important information about your rights and obligations.
                </p>
              </div>

              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card border border-border rounded-xl p-8"
                  >
                    <h2 className="text-2xl font-bold mb-4">{index + 1}. {section.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-accent/10 border border-accent/20 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold mb-4">Questions About These Terms?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at hello@bigwebdigital.com or +234 703 057 6537. We're here to help clarify any concerns you may have.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
