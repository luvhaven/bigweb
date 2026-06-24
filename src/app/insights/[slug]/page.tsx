import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllArticleSlugs, getArticleBySlug, getArticles } from '@/lib/data';
import InsightDetailClient from './InsightDetailClient';

export const revalidate = 0;

export async function generateStaticParams() {
  return getAllArticleSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found — BIGWEB Digital' };
  }

  return {
    title: `${article.title} — BIGWEB Insights`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles (excluding this one)
  const allArticles = await getArticles();
  const relatedArticles = allArticles.filter((a: { slug: string }) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            image: article.image || 'https://bigwebdigital.com/og-image.png',
            description: article.excerpt,
            author: { '@type': 'Organization', name: 'BIGWEB Digital' },
            publisher: {
              '@type': 'Organization',
              name: 'BIGWEB Digital',
              logo: { '@type': 'ImageObject', url: 'https://bigwebdigital.com/icon.svg' }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://bigwebdigital.com/insights/${slug}`
            }
          })
        }}
      />
      <InsightDetailClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
