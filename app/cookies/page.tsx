'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function CookiesPage() {
  const sections = [
    {
      title: "What Are Cookies",
      content: "Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our site, and delivering personalized content. Cookies do not contain any information that personally identifies you."
    },
    {
      title: "Types of Cookies We Use",
      content: "Essential Cookies: Required for basic site functionality, including navigation, form submission, and security. These cannot be disabled. Performance Cookies: Help us understand how visitors interact with our site by collecting anonymous analytics data. Functionality Cookies: Remember your preferences and settings to enhance your experience. Marketing Cookies: Track your browsing to deliver relevant advertisements across other websites."
    },
    {
      title: "Strictly Necessary Cookies",
      content: "These cookies are essential for our website to function properly. They enable core functionality such as security, network management, and accessibility. Without these cookies, services you have requested cannot be provided. These cookies do not store any personally identifiable information."
    },
    {
      title: "Analytics and Performance Cookies",
      content: "We use analytics cookies to collect information about how visitors use our website, including which pages are visited most often, how long users stay on pages, and any error messages encountered. This helps us improve our website's performance and user experience. We use Google Analytics and similar tools for this purpose."
    },
    {
      title: "Functionality Cookies",
      content: "These cookies allow our website to remember choices you make (such as your language preference, region, or login details) and provide enhanced, personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog."
    },
    {
      title: "Marketing and Targeting Cookies",
      content: "These cookies are used to deliver advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. These cookies remember that you have visited a website and this information may be shared with other organizations such as advertisers."
    },
    {
      title: "Third-Party Cookies",
      content: "Some cookies on our site are placed by third-party services that appear on our pages. These include social media platforms, analytics providers, and advertising networks. We do not control these cookies and recommend reviewing the privacy policies of these third parties for more information."
    },
    {
      title: "Managing Your Cookie Preferences",
      content: "You can control and manage cookies in various ways. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Please note that disabling cookies may impact your ability to use certain features of our website. You can also use browser add-ons or privacy tools to manage cookie preferences."
    },
    {
      title: "Cookie Duration",
      content: "Session Cookies: Temporary cookies that expire when you close your browser. These are used for essential functions like maintaining your session. Persistent Cookies: Remain on your device for a set period or until you delete them. These remember your preferences across visits and typically expire after 30 days to 2 years depending on their purpose."
    },
    {
      title: "Do Not Track Signals",
      content: "Some browsers include a 'Do Not Track' feature. Currently, there is no industry standard for how to respond to these signals. We do not currently respond to Do Not Track signals, but we provide you with tools to manage cookies through your browser settings and our cookie consent tool."
    },
    {
      title: "Updates to This Policy",
      content: "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will post any changes on this page with an updated revision date. We encourage you to review this policy periodically."
    },
    {
      title: "Contact Us",
      content: "If you have questions about our use of cookies or this Cookie Policy, please contact us at hello@bigwebdigital.com or +234 703 057 6537. We are committed to protecting your privacy and will respond to your inquiries promptly."
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
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-lg text-muted-foreground">
                Last Updated: January 2025
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                <p className="text-lg leading-relaxed">
                  This Cookie Policy explains how BIGWEB Digital uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies in accordance with this policy.
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
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
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
                  By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy. You can withdraw your consent at any time by adjusting your browser settings or contacting us directly.
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
