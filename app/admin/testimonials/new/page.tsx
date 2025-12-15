'use client'

import TestimonialForm from '../components/TestimonialForm'

export default function NewTestimonialPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Add Review</h1>
                <p className="text-zinc-400 mt-1">Add a new client testimonial</p>
            </div>
            <TestimonialForm />
        </div>
    )
}
