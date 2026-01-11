import React from 'react'
import { Metadata } from 'next'
import ConversionNavigation from '@/components/ConversionNavigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - The Conversion Lab',
  description: 'Get in touch with our conversion engineering team. We respond within 24 hours.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <ConversionNavigation />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's Talk <span className="text-accent">Revenue</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Whether you need a diagnostic, a full rebuild, or ongoing optimization,
              we're here to help you convert more visitors into customers.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card rounded-2xl p-6 border-white/10">
                <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a href="mailto:hello@conversionlab.com" className="text-muted-foreground hover:text-accent transition-colors">
                        hello@conversionlab.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Location</p>
                      <p className="text-muted-foreground">
                        Remote-First<br />
                        Serving Clients Globally
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Response Time</p>
                      <p className="text-muted-foreground">
                        Within 24 hours<br />
                        Monday - Friday
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="glass-card rounded-2xl p-6 border-white/10">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <a
                    href="/offers/diagnostic"
                    className="block p-3 rounded-lg bg-secondary/30 hover:bg-accent/10 border border-white/5 hover:border-accent/30 transition-all"
                  >
                    <p className="font-medium text-sm">Start Diagnostic</p>
                    <p className="text-xs text-muted-foreground">$399 - 48hr turnaround</p>
                  </a>
                  <a
                    href="/case-studies"
                    className="block p-3 rounded-lg bg-secondary/30 hover:bg-accent/10 border border-white/5 hover:border-accent/30 transition-all"
                  >
                    <p className="font-medium text-sm">View Case Studies</p>
                    <p className="text-xs text-muted-foreground">See our results</p>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm
                type="contact"
                title="Send Us a Message"
                description="Tell us about your conversion challenges and we'll get back to you with a tailored solution."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Not Ready to Commit?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Start with our $399 Diagnostic. No strings attached.
            Just pure, actionable insights into your conversion blockers.
          </p>
          <a
            href="/offers/diagnostic"
            className="inline-flex h-14 items-center justify-center rounded-md bg-white text-accent hover:bg-white/90 px-8 text-lg font-bold transition-colors shadow-xl"
          >
            Get Your Diagnostic
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
