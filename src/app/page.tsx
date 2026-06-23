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
import InsightsPreview from '@/components/sections/InsightsPreview';
import FinalCTA from '@/components/sections/FinalCTA';
import ScrollSpy from '@/components/layout/ScrollSpy';
import KineticDivider from '@/components/ui/KineticDivider';
import ClientLogos from '@/components/sections/ClientLogos';
import ProjectSlideshow from '@/components/sections/ProjectSlideshow';
import ObsidianMorph from '@/components/layout/ObsidianMorph';

import { getCaseStudies, getTestimonials, getArticles, getServices, getSiteSettingsByCategory } from '@/lib/data';

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
      <ScrollSpy />
      <Hero />
      <ClientLogos />
      <ObsidianMorph>
        <ProjectSlideshow />
      </ObsidianMorph>
      <KineticDivider />
      <PhilosophyShift />
      <KineticDivider />
      <ServicesOverview services={services} />
      <KineticDivider />
      <GrowthPath />
      <KineticDivider />
      <RealityCheck />
      <KineticDivider />
      <Results caseStudies={caseStudies} testimonials={testimonials} />
      <KineticDivider />
      <AIAdvantage />
      <KineticDivider />
      <Process />
      <KineticDivider />
      <AboutPreview image={aboutSettings.about_image} />
      <KineticDivider />
      <ROISimulator />
      <KineticDivider />
      <InsightsPreview articles={articles} />
      <KineticDivider />
      <FinalCTA image={aboutSettings.contact_image} />
    </>
  );
}
