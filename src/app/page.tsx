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
import { getCaseStudies, getTestimonials, getArticles, getServices, getSiteSettingsByCategory } from '@/lib/data';

export const revalidate = 0;

export default async function HomePage() {
  const [caseStudies, testimonials, articles, services, aboutSettings] = await Promise.allSettled([
    getCaseStudies(),
    getTestimonials(),
    getArticles(),
    getServices(),
    getSiteSettingsByCategory('about'),
    getSiteSettingsByCategory('media'),
  ]).then(results => results.map(r => r.status === 'fulfilled' ? r.value : (Array.isArray((r as PromiseRejectedResult)) ? [] : {})));

  return (
    <>
      <ScrollSpy />
      <Hero />
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
      <Results caseStudies={caseStudies} testimonials={testimonials} />
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
