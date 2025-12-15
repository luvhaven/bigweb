'use client'

import ServiceForm from '../components/ServiceForm'

export default function NewServicePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Create Service</h1>
                <p className="text-zinc-400 mt-1">Add a new service to your catalog</p>
            </div>
            <ServiceForm />
        </div>
    )
}
