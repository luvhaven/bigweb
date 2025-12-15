'use client'

import PortfolioForm from '../components/PortfolioForm'

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Add Project</h1>
                <p className="text-zinc-400 mt-1">Create a new case study for your portfolio</p>
            </div>
            <PortfolioForm />
        </div>
    )
}
