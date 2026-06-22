import { Metadata } from 'next';
import { getCaseStudies } from '@/lib/data';
import WorkClient from './WorkClient';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Our Work — BIGWEB Digital',
  description: 'Real results for real businesses. Case studies showing how BIGWEB Digital drives measurable revenue growth.',
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();
  return <WorkClient caseStudies={caseStudies} />;
}
