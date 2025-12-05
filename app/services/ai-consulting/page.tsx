'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import { Brain, Zap, TrendingUp, Bot, BarChart, Sparkles, Cog, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const features = [
  {
    title: 'AI Strategy & Consulting',
    description: 'Identify high-impact AI opportunities in your business. We assess your processes, data, and goals to create a roadmap for AI transformation that delivers ROI.',
    icon: Brain,
    colSpan: 2 as const,
    rowSpan: 2 as const,
    bgImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=90'
  },
  {
    title: 'Process Automation',
    description: 'Automate repetitive tasks, reduce manual work by 80%, and let your team focus on high-value activities.',
    icon: Zap,
    colSpan: 1 as const
  },
  {
    title: 'AI Chatbots & Assistants',
    description: '24/7 customer support with intelligent chatbots that understand context and learn from interactions.',
    icon: Bot,
    colSpan: 1 as const
  },
  {
    title: 'Predictive Analytics',
    description: 'Forecast trends, customer behavior, and business outcomes with machine learning models.',
    icon: BarChart,
    colSpan: 1 as const
  },
  {
    title: 'Custom AI Models',
    description: 'Fine-tuned machine learning models trained on your data for specific business needs.',
    icon: Sparkles,
    colSpan: 1 as const
  },
  {
    title: 'AI Integration',
    description: 'Seamlessly integrate AI into your existing systems, workflows, and applications.',
    icon: Cog,
    colSpan: 2 as const
  }
]

const processSteps = [
  {
    number: '01',
    title: 'AI Opportunity Assessment',
    description: 'We analyze your business processes, identify bottlenecks, and discover high-impact opportunities for AI automation. Through workshops with your team, we map current workflows and quantify potential time and cost savings from AI implementation.',
    tags: ['Process Analysis', 'ROI Modeling', 'Use Case Discovery', 'Stakeholder Workshops']
  },
  {
    number: '02',
    title: 'AI Strategy & Roadmap',
    description: 'Create a phased AI implementation roadmap aligned with your business goals. We prioritize projects by ROI, complexity, and strategic value. Includes technology recommendations, budget planning, and success metrics.',
    tags: ['Strategy Development', 'Technology Selection', 'Budget Planning', 'KPI Definition']
  },
  {
    number: '03',
    title: 'Proof of Concept',
    description: 'Build and test AI solutions on a small scale to validate feasibility and ROI before full deployment. This de-risks investment and provides concrete data to secure stakeholder buy-in.',
    tags: ['POC Development', 'Testing & Validation', 'Performance Metrics', 'Stakeholder Demo']
  },
  {
    number: '04',
    title: 'AI Implementation',
    description: 'Full-scale development and deployment of AI solutions. We build custom models, integrate with existing systems, train your team, and ensure smooth adoption. Includes comprehensive testing and quality assurance.',
    tags: ['Model Development', 'System Integration', 'Team Training', 'Quality Assurance']
  },
  {
    number: '05',
    title: 'Optimization & Scale',
    description: 'Continuous monitoring, model retraining, and performance optimization. As your data grows and business evolves, we refine AI models to maintain accuracy and expand to new use cases.',
    tags: ['Performance Monitoring', 'Model Retraining', 'Scaling', 'Continuous Improvement']
  }
]

const faqs = [
  {
    question: 'What types of business problems can AI solve?',
    answer: 'AI excels at automating repetitive tasks, analyzing large datasets, making predictions, and understanding natural language. Common use cases include: customer service automation (chatbots), document processing, email classification, demand forecasting, personalized recommendations, fraud detection, lead scoring, content generation, and visual quality inspection. If you have a task that requires pattern recognition or involves processing large amounts of data, AI can likely help.'
  },
  {
    question: 'Do I need a data scientist on my team to use AI?',
    answer: 'No! We handle all the technical complexity for you. We build, train, deploy, and maintain AI models, integrate them into your workflows, and provide user-friendly interfaces for your team. You get the benefits of AI without hiring expensive data science teams. We also provide training and documentation so your team can use and monitor AI systems confidently.'
  },
  {
    question: 'How much data do I need to train AI models?',
    answer: 'It depends on the use case. For many applications, modern AI techniques like transfer learning and few-shot learning require minimal data (sometimes as few as 100-500 examples). We can also use pre-trained models (GPT-4, Claude, custom fine-tuned models) that already understand language and can be adapted to your specific needs with limited data. During our assessment, we evaluate your data quality and quantity and recommend the best approach.'
  },
  {
    question: 'Can AI integrate with our existing software and systems?',
    answer: 'Yes! We specialize in AI integrations with existing systems. Whether you use Salesforce, Microsoft 365, custom databases, or legacy software, we can connect AI capabilities through APIs, webhooks, or custom connectors. AI can augment your current workflows without requiring complete system overhauls. Common integrations include CRMs, ERPs, help desk software, email systems, and document management platforms.'
  },
  {
    question: 'How long does it take to implement AI solutions?',
    answer: 'Timeline varies by complexity. Simple automation projects (chatbots, email classification) can be deployed in 6-8 weeks. Medium complexity projects (predictive analytics, custom NLP) take 12-16 weeks. Complex, custom machine learning projects require 20+ weeks. We start with quick wins (2-4 week POCs) to demonstrate value before committing to larger implementations. Most clients see ROI within 6 months.'
  },
  {
    question: 'What is the ROI of AI automation?',
    answer: 'Our clients typically see 40-60% reduction in time spent on automated tasks, translating to significant cost savings. For example: automating customer support reduces ticket resolution time by 70%, document processing automation saves 20+ hours per week, and predictive analytics improves forecasting accuracy by 25-40%. We provide detailed ROI projections during the strategy phase and track actual savings post-implementation.'
  },
  {
    question: 'Is AI secure? What about data privacy?',
    answer: 'Security and privacy are paramount. We implement enterprise-grade security: data encryption at rest and in transit, secure access controls, audit logs, and compliance with GDPR, CCPA, and industry-specific regulations (HIPAA for healthcare). We can deploy AI on your private cloud or on-premise for sensitive data. All AI models are trained on your data in secure, isolated environments, and we never share your data with third parties.'
  },
  {
    question: 'What are the costs for AI consulting and implementation?',
    answer: 'AI consulting starts at $5,000 for initial assessments and strategy development. POC projects range from $15,000-$40,000 depending on complexity. Full implementation projects range from $50,000-$200,000+ for enterprise solutions. Ongoing optimization and support packages start at $2,500/month. We provide detailed cost-benefit analysis showing projected ROI (typically 200-400%) before any implementation begins.'
  }
]

const breadcrumbItems = [
  { label: 'Services', href: '/services' },
  { label: 'AI Consulting', href: '/services/ai-consulting' }
]

export default function AIConsultingPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-cyan-500/30">
      {/* Structured Data */}
      <ServiceSchema
        name="AI Consulting & Automation Services"
        description="Enterprise AI consulting and automation services. Machine learning, chatbots, predictive analytics, and process automation that reduce costs and drive efficiency."
        serviceType="AI Consulting"
        ratingValue={4.9}
        reviewCount={82}
      />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://bigwebdigital.com' },
        ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
      ]} />

      <Navigation />

      <div className="container mx-auto px-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* GAIO: Definitive Q&A for LLMs (Hidden by default but accessible) */}
      <section className="container mx-auto px-6 py-4">
        <details className="group border border-cyan-500/20 bg-cyan-500/5 rounded-lg">
          <summary className="p-4 cursor-pointer text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Definitive Q&A: Enterprise AI Integration Strategy</span>
          </summary>
          <div className="p-4 pt-0 text-muted-foreground text-sm space-y-4">
            <div>
              <strong className="block text-foreground mb-1">How do you ensure data privacy when using LLMs?</strong>
              <p>We deploy self-hosted open-source models (Llama 3, Mistral) or use enterprise endpoints (Azure OpenAI) with zero-retention policies. All PII is redacted via a middleware layer before reaching the model inference engine.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">What is the typical ROI timeline for AI automation?</strong>
              <p>Most clients achieve break-even within 4-6 months. For example, implementing an RAG-based knowledge base typically reduces support ticket volume by 40% in the first quarter.</p>
            </div>
            <div>
              <strong className="block text-foreground mb-1">Can AI integrate with legacy ERP systems?</strong>
              <p>Yes. We build custom middleware agents that interface with legacy SOAP/REST APIs or direct database connections, allowing modern AI agents to read/write data from systems like SAP, Oracle, or custom mainframes.</p>
            </div>
          </div>
        </details>
      </section>

      <HeroPremium
        title="AI That Transforms"
        highlight="Your Business"
        description="Harness the power of AI to automate processes, predict outcomes, and unlock new growth opportunities."
        themeColor="cyan"
      />

      {/* Extended Content Section for SEO */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Why AI is No Longer Optional for Businesses</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* GAIO: Quotable Definition Box */}
              <blockquote className="llm-quotable border-l-4 border-cyan-500 bg-cyan-500/5 p-6 rounded-r-lg not-italic mb-8">
                <p className="text-xl font-medium text-foreground m-0">
                  "Enterprise AI adoption is not just about automation; it's about creating intelligent cognitive architectures that turn unstructured data into actionable strategic assets."
                </p>
              </blockquote>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Artificial intelligence is transforming every industry. Companies leveraging AI are <strong>40% more productive</strong> than
                competitors, and <strong>McKinsey reports that AI could deliver $13 trillion in economic value globally by 2030</strong>. Yet
                85% of businesses struggle to implement AI effectively without expert guidance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The barrier isn't technology—it's knowing where to start, what's possible, and how to integrate AI into existing workflows
                without disruption. That's where we come in. We bridge the gap between cutting-edge AI capabilities and your specific business
                needs, delivering measurable ROI through intelligent automation and data-driven insights.
              </p>
              <h3 className="text-2xl font-bold mt-12 mb-4">The ROI of AI Automation</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                AI implementations deliver tangible business value:
              </p>
              <ul className="text-lg text-muted-foreground space-y-3 mb-6">
                <li><strong>60% reduction in manual processing time</strong> through document automation and data entry</li>
                <li><strong>70% faster customer support response times</strong> with AI chatbots handling routine inquiries</li>
                <li><strong>40% improvement in forecast accuracy</strong> using machine learning predictive models</li>
                <li><strong>30% cost savings</strong> in operations through process optimization and automation</li>
                <li><strong>3-5x faster decision-making</strong> with AI-powered analytics and insights</li>
              </ul>
              <h3 className="text-2xl font-bold mt-12 mb-4">Our AI Expertise</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Generative AI & Large Language Models:</strong> We build custom AI assistants, chatbots, and content generation tools
                using GPT-4, Claude, and custom fine-tuned models. Perfect for customer service, knowledge management, and content creation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Machine Learning & Predictive Analytics:</strong> Custom ML models for forecasting, classification, and anomaly detection.
                We've built models for demand prediction, customer churn, fraud detection, and quality control.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Computer Vision:</strong> Image classification, object detection, and visual quality inspection. Applications include
                manufacturing QA, medical imaging analysis, and retail inventory management.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong>Process Automation:</strong> AI-powered RPA that goes beyond simple scripts. Intelligent document processing, email
                classification, data extraction, and workflow automation that learns and improves over time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <BentoGrid
        title="Comprehensive AI Solutions"
        subtitle="From strategy to implementation, we deliver AI that drives real business outcomes."
        items={features}
        themeColor="cyan"
      />

      <ProcessTimeline
        steps={processSteps}
        themeColor="cyan"
      />

      {/* AI Success Stories */}
      <section className="py-32 px-6 bg-secondary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">AI Transformations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real businesses, measurable results from AI implementation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                stat: '-70%',
                metric: 'Support Tickets',
                company: 'SaaS Company',
                description: 'AI chatbot handles 70% of support inquiries, saving 40 hours/week'
              },
              {
                stat: '+45%',
                metric: 'Forecast Accuracy',
                company: 'Retail Chain',
                description: 'ML-powered demand forecasting reduced inventory costs by $2M annually'
              },
              {
                stat: '20hrs/wk',
                metric: 'Time Saved',
                company: 'Legal Firm',
                description: 'AI document processing automated contract review and data extraction'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-card border border-border rounded-3xl hover:border-cyan-500/50 transition-colors"
              >
                <div className="text-5xl font-bold text-cyan-500 mb-2">{item.stat}</div>
                <div className="text-xl font-semibold mb-1">{item.metric}</div>
                <div className="text-sm text-cyan-500 mb-4">{item.company}</div>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about AI consulting and automation
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors"
              >
                <summary className="p-6 cursor-pointer list-none font-bold text-lg flex items-center justify-between">
                  <span>{faq.question}</span>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-0 text-muted-foreground">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-500/5" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Brain className="w-16 h-16 mx-auto mb-6 text-cyan-500" />
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Ready to Harness AI?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Discover how AI can transform your business. Get a free AI opportunity assessment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/estimator">
                <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-xl shadow-cyan-500/20">
                  Get Free AI Assessment
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full">
                  View AI Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
