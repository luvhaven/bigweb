import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllServiceSlugs, getServiceBySlug, getServices } from '@/lib/data';
import ServiceDetailClient from './ServiceDetailClient';

export const revalidate = 0;

export async function generateStaticParams() {
  return getAllServiceSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.name} — BIGWEB Digital`,
    description: service.outcome,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();
  
  const allServices = await getServices();
  const relatedServices = allServices.filter((s: { tier: number, slug: string }) => s.tier === service.tier && s.slug !== service.slug).slice(0, 3);

  return <ServiceDetailClient service={service} relatedServices={relatedServices} />;
}
