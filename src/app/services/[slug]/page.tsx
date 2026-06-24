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

  const faqs = [
    { q: "How quickly can we start?", a: "Depending on our current bandwidth and your Tier level, we can typically onboard and initiate discovery within 7-14 days of contract signature." },
    { q: "Do you require long-term retainers?", a: "For foundational builds, we operate on a project basis. For revenue scaling and AI systems, we require a minimum 6-month commitment." },
    { q: "What is expected from our team?", a: "We require a single point of contact with decision-making authority. We do the heavy lifting, but we need your domain expertise." },
    { q: "Are the timelines guaranteed?", a: `Yes. We guarantee the ${service.timeline} timeline for this specific engagement, provided that your team meets the 24-hour SLA for necessary feedback and asset delivery.` }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.name,
            provider: { '@type': 'Organization', name: 'BIGWEB Digital', url: 'https://bigwebdigital.com' },
            description: service.description || service.outcome,
            offers: { '@type': 'Offer', priceCurrency: 'USD', price: service.price.replace(/[^0-9.]/g, '') || '0', url: `https://bigwebdigital.com/services/${slug}` }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a }
            }))
          })
        }}
      />
      <ServiceDetailClient service={service} relatedServices={relatedServices} />
    </>
  );
}
