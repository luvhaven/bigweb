'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Send, Clock, Users2, TrendingUp, CheckCircle } from 'lucide-react'
import { createMessage, initializeDataStore } from '@/lib/dataStore'
import { toast } from 'sonner'
import { sendContactEmail } from '@/actions/send-email'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    inspiration: '',
    budget: '$5,000 - $10,000',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    initializeDataStore();
  }, []);

  const competitorBrands = [
    'wix', 'squarespace', 'wordpress.com', 'weebly', 'webflow',
    'fiverr', 'upwork', '99designs', 'toptal', 'freelancer'
  ];

  const containsCompetitorBrand = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return competitorBrands.some(brand => lowerText.includes(brand));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Check company field for competitor brands
    if (formData.company.trim() && containsCompetitorBrand(formData.company)) {
      newErrors.company = 'Please enter your company name';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project';
    } else if (containsCompetitorBrand(formData.message)) {
      newErrors.message = 'Please focus on your specific requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData from state
      const formDataObj = new FormData()
      formDataObj.append('firstName', formData.firstName)
      formDataObj.append('lastName', formData.lastName)
      formDataObj.append('email', formData.email)
      formDataObj.append('company', formData.company)
      formDataObj.append('inspiration', formData.inspiration)
      formDataObj.append('budget', formData.budget)
      formDataObj.append('message', formData.message)

      // Call server action
      const result = await sendContactEmail({}, formDataObj)

      if (result.error) {
        throw new Error(result.error)
      }

      // Also save to data store as backup/local record
      createMessage({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        inspiration: formData.inspiration,
        budget: formData.budget,
        message: formData.message
      });

      setIsSuccess(true);
      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you within 24 hours.'
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        inspiration: '',
        budget: '$5,000 - $10,000',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(var(--accent), 0.03) 50px, rgba(var(--accent), 0.03) 51px),
              repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(var(--accent), 0.03) 50px, rgba(var(--accent), 0.03) 51px)
            `,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold letter-spacing-wide mb-6">
                Let's Build Something <span className="text-accent">Extraordinary</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to transform your digital presence? Tell us about your project and let's create something that drives real results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold letter-spacing-wide mb-6">Send us a message</h2>

                  <AnimatePresence mode="wait">
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-semibold text-green-500">Message sent successfully!</p>
                          <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg bg-background border focus:border-accent focus:outline-none transition-colors duration-300 ${errors.firstName ? 'border-red-500' : 'border-border'
                            }`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg bg-background border focus:border-accent focus:outline-none transition-colors duration-300 ${errors.lastName ? 'border-red-500' : 'border-border'
                            }`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-background border focus:border-accent focus:outline-none transition-colors duration-300 ${errors.email ? 'border-red-500' : 'border-border'
                          }`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors duration-300"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Brands That Inspire Your Vision</label>
                      <input
                        type="text"
                        value={formData.inspiration}
                        onChange={(e) => handleChange('inspiration', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors duration-300"
                        placeholder="e.g., Apple, Tesla, Airbnb..."
                      />
                      <p className="text-xs text-muted-foreground mt-1">Share brands whose design or experience inspires you</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Project Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleChange('budget', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors duration-300"
                      >
                        <option>Under $5,000</option>
                        <option>$5,000 - $10,000</option>
                        <option>$10,000 - $25,000</option>
                        <option>$25,000 - $50,000</option>
                        <option>$50,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Tell us about your project *</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg bg-background border focus:border-accent focus:outline-none transition-colors duration-300 ${errors.message ? 'border-red-500' : 'border-border'
                          }`}
                        placeholder="Share your vision, goals, and what success looks like..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-white letter-spacing-wide group disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
                  <h2 className="text-2xl font-bold letter-spacing-wide mb-6">Get in touch</h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Email</p>
                        <p className="text-muted-foreground">hello@bigwebdigital.com</p>
                        <p className="text-muted-foreground">support@bigwebdigital.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Phone</p>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri 9am-6pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Office</p>
                        <p className="text-muted-foreground">123 Design Street</p>
                        <p className="text-muted-foreground">San Francisco, CA 94102</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
                  <h3 className="text-xl font-bold letter-spacing-wide mb-6">Why partner with us?</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Fast Response</p>
                        <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users2 className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Expert Team</p>
                        <p className="text-sm text-muted-foreground">50+ specialists ready to help</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold mb-1">Proven Results</p>
                        <p className="text-sm text-muted-foreground">$500M+ generated for clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
