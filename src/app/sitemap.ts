import { MetadataRoute } from 'next';
import { getAllServiceSlugs, getAllArticleSlugs } from '@/lib/data';

const BASE_URL = 'https://bigweb.digital';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = ['', '/about', '/services', '/work', '/insights', '/contact', '/privacy', '/terms'].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  const [services, articles] = await Promise.all([
    getAllServiceSlugs(),
    getAllArticleSlugs()
  ]);

  // Dynamic Service pages
  const servicePages = services.map((service: { slug: string }) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic Article pages
  const articlePages = articles.map((article: { slug: string }) => ({
    url: `${BASE_URL}/insights/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...articlePages];
}
