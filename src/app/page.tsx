import Hero from '@/components/sections/Hero';
import RealityCheck from '@/components/sections/RealityCheck';
import PhilosophyShift from '@/components/sections/PhilosophyShift';
import ServicesOverview from '@/components/sections/ServicesOverview';
import GrowthPath from '@/components/sections/GrowthPath';
import Results from '@/components/sections/Results';
import AIAdvantage from '@/components/sections/AIAdvantage';
import Process from '@/components/sections/Process';
import AboutPreview from '@/components/sections/AboutPreview';
import ROISimulator from '@/components/sections/ROISimulator';
import Pricing from '@/components/sections/Pricing';
import InsightsPreview from '@/components/sections/InsightsPreview';
import FinalCTA from '@/components/sections/FinalCTA';
import ScrollSpy from '@/components/layout/ScrollSpy';
import ClientLogos from '@/components/sections/ClientLogos';
import ProjectSlideshow from '@/components/sections/ProjectSlideshow';
import GodTierTestimonials from '@/components/ui/GodTierTestimonials';
import AgencyReveal from '@/components/sections/AgencyReveal';
import { getCaseStudies, getTestimonials, getArticles, getServices, getSiteSettingsByCategory } from '@/lib/data';
import PressBar from '@/components/sections/PressBar';
import { FAQSchema } from '@/components/seo/JsonLd';

export const revalidate = 0;

export default async function HomePage() {
  const results = await Promise.allSettled([
    getCaseStudies(),
    getTestimonials(),
    getArticles(),
    getServices(),
    getSiteSettingsByCategory('about'),
    getSiteSettingsByCategory('media'),
  ]);

  const caseStudies = results[0].status === 'fulfilled' ? results[0].value : [];
  const testimonials = results[1].status === 'fulfilled' ? results[1].value : [];
  const articles = results[2].status === 'fulfilled' ? results[2].value : [];
  const services = results[3].status === 'fulfilled' ? results[3].value : [];
  const aboutSettings = results[4].status === 'fulfilled' ? results[4].value : {};
  const mediaSettings = results[5].status === 'fulfilled' ? results[5].value : {};

  return (
    <>
      <FAQSchema faqs={[
        { question: 'How long does a typical engagement take?', answer: 'Tier 1 diagnostic engagements take 1–2 weeks. Tier 2 growth retainers run month-to-month. Tier 3 digital transformation projects take 8–14 weeks.' },
        { question: 'What is your minimum engagement size?', answer: 'Our Diagnostic Blueprint starts at $2,500. Growth Engine retainers start at $8,000/month. Digital Transformation engagements start at $25,000.' },
        { question: 'Do you work with clients outside the USA?', answer: 'Yes. BIGWEB Digital is a fully remote global agency working with clients across the US, Canada, UK, Australia, New Zealand, and Europe.' },
        { question: 'What results can I expect?', answer: 'Our clients see an average 288% revenue increase. Across 42 campaigns in 2025, we generated $140M in additional revenue. Average client lift is $3.4M+ annually.' },
        { question: 'How does your pricing work?', answer: 'We publish all prices upfront. All engagements begin with a $500 Revenue Diagnostic strategy session, currently waived for qualified applicants.' },
      ]} />
      <ScrollSpy />
      <div className="relative">
        <div className="sticky top-0 h-screen w-full">
          {/* Add a wrapper with lower z-index so Hero is behind AgencyReveal */}
          <div className="absolute inset-0 z-0">
            <Hero />
          </div>
        </div>
        <div className="relative z-10 -mt-[100vh]">
          <AgencyReveal />
        </div>
      </div>
      <PressBar />
      <ClientLogos />
      <ProjectSlideshow />
      <div className="section-divider" />
      <RealityCheck />
      <div className="section-divider" />
      <PhilosophyShift />
      <div className="section-divider" />
      <ServicesOverview services={services} />
      <div className="section-divider" />
      <GrowthPath />
      <div className="section-divider" />
      <Results caseStudies={caseStudies} />
      <GodTierTestimonials />
      <div className="section-divider" />
      <AIAdvantage />
      <div className="section-divider" />
      <Process />
      <div className="section-divider" />
      <AboutPreview image={aboutSettings.about_image} />
      <div className="section-divider" />
      <ROISimulator />
      <div className="section-divider" />
      <Pricing />
      <div className="section-divider" />
      <InsightsPreview articles={articles} />
      <div className="section-divider" />
      <FinalCTA image={aboutSettings.contact_image} />
    </>
  );
}
