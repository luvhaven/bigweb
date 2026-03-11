import { getProcessPhases } from '@/lib/data/cms'
import CinematicHero from '@/components/CinematicHero'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ProcessClient from './ProcessClient'

export default async function ProcessPage() {
    // Fetch process phases from database
    const phases = await getProcessPhases()

    const steps = phases.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        icon: p.icon || undefined
    }))

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <AdvancedNavigation />

            <CinematicHero
                title={
                    <>
                        <span className="hero-line block">A Clinical</span>
                        <span className="hero-line block text-zinc-600"><em className="text-accent italic">Methodology.</em></span>
                    </>
                }
                subtitle="Diagnose. Execute. Scale. Dominate. A proven architecture for extracting maximum yield from your digital traffic."
                ctaText="Discuss Your Needs"
                showSecondaryCta={false}
            />

            <ProcessClient steps={steps} />

            <Footer />
        </main>
    )
}
