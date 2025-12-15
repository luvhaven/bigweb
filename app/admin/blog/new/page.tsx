'use client'

import BlogForm from '../components/BlogForm'

export default function NewPostPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Create Post</h1>
                <p className="text-zinc-400 mt-1">Write a new blog post</p>
            </div>
            <BlogForm />
        </div>
    )
}
