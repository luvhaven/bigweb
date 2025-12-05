'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly to us when using our services, including your name, email address, phone number, company details, and project requirements. We also automatically collect certain information about your device and how you interact with our website, such as IP address, browser type, pages visited, and time spent on pages."
    },
    {
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, communicate with you about projects and updates, respond to your inquiries, send marketing communications (with your consent), analyze usage patterns to enhance user experience, and protect against fraudulent or unauthorized activity."
    },
    {
      title: "Information Sharing",
      content: "We do not sell your personal information. We may share your information with service providers who assist in our operations (such as hosting, analytics, and email services), professional advisors (lawyers, accountants, consultants), and when required by law or to protect our rights. All third parties are contractually obligated to protect your information."
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your information, including encryption, secure servers, regular security audits, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    },
    {
      title: "Your Rights",
      content: "You have the right to access your personal information, request corrections to inaccurate data, request deletion of your information (subject to legal obligations), opt-out of marketing communications, and object to certain processing activities. Contact us at hello@bigwebdigital.com to exercise these rights."
    },
    {
      title: "Cookies and Tracking",
      content: "We use cookies and similar technologies to enhance your experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings. For more details, please see our Cookie Policy."
    },
    {
      title: "Third-Party Links",
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information."
    },
    {
      title: "Children's Privacy",
      content: "Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us immediately."
    },
    {
      title: "International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy."
    },
    {
      title: "Data Retention",
      content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we securely delete or anonymize it."
    },
    {
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the 'Last Updated' date. Your continued use of our services after changes constitutes acceptance of the updated policy."
    },
    {
      title: "Contact Us",
      content: "If you have questions or concerns about this Privacy Policy or our data practices, please contact us at hello@bigwebdigital.com or +234 703 057 6537. We will respond to your inquiry within 30 days."
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
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground">
                Last Updated: January 2025
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                <p className="text-lg leading-relaxed">
                  At BIGWEB Digital, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully to understand our practices regarding your personal data.
                </p>
              </div>

              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
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
                <h3 className="text-xl font-bold mb-4">Your Consent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By using our website and services, you consent to this Privacy Policy and agree to its terms. If you do not agree with this policy, please do not use our services.
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
