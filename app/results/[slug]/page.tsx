import { getProjectBySlug } from '@/actions/portfolio'
import ProjectDetailsClient from '@/components/portfolio/ProjectDetailsClient'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import StickyCTABar from '@/components/mobile/StickyCTABar'
import { notFound } from 'next/navigation'

// Revalidate case studies every hour
export const revalidate = 3600

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = await getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    const breadcrumbItems = [
        { label: 'Results', href: '/results' },
        { label: project.title, href: `/results/${project.slug}` }
    ]

    const parsedResults = typeof project.results === 'string'
        ? JSON.parse(project.results)
        : (project.results || [])

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-accent/20">
            {/* SEO */}
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
            ]} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        mainEntityOfPage: {
                            '@type': 'WebPage',
                            '@id': `https://bigwebdigital.com/results/${project.slug}`
                        },
                        headline: project.title,
                        description: project.description,
                        author: {
                            '@type': 'Organization',
                            name: 'BIGWEB Digital'
                        },
                        publisher: {
                            '@type': 'Organization',
                            name: 'BIGWEB Digital',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://bigwebdigital.com/logo.png'
                            }
                        }
                    })
                }}
            />

            <AdvancedNavigation />

            <ProjectDetailsClient
                project={project}
                results={parsedResults}
            />

            <Footer />
            <StickyCTABar />
        </main>
    )
}
