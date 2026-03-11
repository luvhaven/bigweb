import { caseStudies as hardcodedCaseStudies } from '@/lib/case-study-data'
import { projectsAPI } from '@/lib/api/projects'
import { agency } from '@/config/agency'
import { notFound } from 'next/navigation'
import CaseStudyDetailsClient from './CaseStudyDetailsClient'

interface CaseStudyPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
    const { slug } = await params
    const dbProject = await projectsAPI.getById(slug)
    const hardcodedStudy = hardcodedCaseStudies.find((s) => s.slug === slug)

    const study = dbProject || hardcodedStudy
    if (!study) return {}

    return {
        title: `${study.title || (study as any).name} | ${agency.name}`,
        description: (study as any).summary || (study as any).challenge?.substring(0, 160),
    }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const { slug } = await params

    // 1. Try to fetch from database
    const dbProject = await projectsAPI.getById(slug)

    // 2. Try to find in hardcoded data for rich content fallback
    const hardcodedStudy = hardcodedCaseStudies.find((s) => s.slug === slug)

    if (!dbProject && !hardcodedStudy) {
        notFound()
    }

    // Merge DB data with hardcoded data
    const study = {
        slug: slug,
        title: dbProject?.title || hardcodedStudy?.title || 'Case Study',
        client: dbProject?.client_name || hardcodedStudy?.client || 'Client',
        summary: dbProject?.summary || hardcodedStudy?.summary || dbProject?.challenge?.substring(0, 150) + '...',
        challenge: dbProject?.challenge || hardcodedStudy?.challenge,
        solution: dbProject?.solution || hardcodedStudy?.solution,
        results: dbProject?.results
            ? (typeof dbProject.results === 'string' ? dbProject.results.split(', ') : dbProject.results)
            : (hardcodedStudy?.results || []),
        technologies: dbProject?.tech_stack || hardcodedStudy?.technologies || [],
        image: dbProject?.cover_image_url || hardcodedStudy?.image || '/images/projects/placeholder.png',
        author: hardcodedStudy?.author || {
            name: 'Julian Reed',
            role: 'UI/UX Architect',
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
        },
        date: hardcodedStudy?.date || '2025-12-01',
        demoComponent: hardcodedStudy?.demoComponent
    }

    return <CaseStudyDetailsClient study={study} />
}
