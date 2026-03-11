import { getCmsHero, getPageMeta } from '@/actions/cms'
import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
    const meta = await getPageMeta('contact')
    return {
        title: meta?.meta_title || 'Contact | BIGWEB Digital',
        description: meta?.meta_description || 'Ready to talk revenue? Get in touch with BIGWEB Digital today.',
    }
}

export default async function ContactPage() {
    const hero = await getCmsHero('contact')
    return <ContactClient hero={hero} />
}
