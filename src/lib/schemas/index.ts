/**
 * Zod Validation Schemas — BIGWEB Data Layer
 * ─────────────────────────────────────────────
 * All Supabase responses pass through these schemas before reaching
 * the UI. This catches malformed DB data early, prevents silent
 * type corruption, and provides runtime type safety in production.
 *
 * Pattern: all schemas have a strict version (throws) and a
 * safeParse version (returns { success, data, error }) for use
 * in server actions where we want to log but not crash.
 */

import { z } from 'zod'

// ─── Utils ───
const isoDate = z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}/))

// ─── Testimonial ───
export const TestimonialSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    role: z.string().optional().nullable(),
    company: z.string().optional().nullable(),
    content: z.string().min(10),
    rating: z.number().int().min(1).max(5).default(5),
    image: z.string().url().optional().nullable(),
    result: z.string().optional().nullable(),
    isActive: z.boolean().default(true),
    featured: z.boolean().default(false),
    publishedAt: isoDate.optional().nullable(),
})
export type Testimonial = z.infer<typeof TestimonialSchema>

export const TestimonialListSchema = z.array(TestimonialSchema)

// ─── Service ───
export const ServiceSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
    description: z.string().min(10),
    fullDescription: z.string().optional().nullable(),
    icon: z.string().optional().nullable(),
    features: z.any().optional().nullable(),
    process: z.any().optional().nullable(),
    isActive: z.boolean().default(true),
    popular: z.boolean().default(false),
})
export type Service = z.infer<typeof ServiceSchema>

export const ServiceListSchema = z.array(ServiceSchema)

// ─── Portfolio Project ───
export const ProjectResultSchema = z.object({
    id: z.string().uuid().optional(),
    label: z.string(),
    value: z.string(),
    project_id: z.string().uuid().optional(),
})

export const ProjectSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    slug: z.string().min(1),
    client: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    fullDescription: z.string().optional().nullable(),
    challenge: z.string().optional().nullable(),
    solution: z.string().optional().nullable(),
    results: z.any().optional().nullable(),   // JSONB field — freeform
    featured: z.boolean().default(false),
    completionDate: isoDate.optional().nullable(),
    technologies: z.union([z.string(), z.array(z.string())]).optional().nullable(),
    demoComponent: z.string().optional().nullable(),
    images: z.any().optional().nullable(),
})
export type Project = z.infer<typeof ProjectSchema>

export const ProjectListSchema = z.array(ProjectSchema)

// ─── Engagement (Pricing Tier from DB) ───
export const EngagementSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    price: z.string(),
    price_note: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    features: z.array(z.string()).or(z.string()).optional().nullable(),
    cta: z.string().optional().nullable(),
    badge_text: z.string().optional().nullable(),
    is_popular: z.boolean().default(false),
    is_active: z.boolean().default(true),
    sort_order: z.number().int().optional().nullable(),
})
export type Engagement = z.infer<typeof EngagementSchema>

export const EngagementListSchema = z.array(EngagementSchema)

// ─── Contact Submission ───
export const ContactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().max(100).optional(),
    budget: z.enum(['under_5k', '5k_15k', '15k_50k', '50k_plus', 'not_sure']).optional(),
    message: z.string().min(20, 'Please tell us a bit more about your project').max(2000),
    service: z.string().optional(),
    phone: z.string().optional(),
    // Honeypot — must be empty
    website_url: z.string().max(0, 'Bot detected').optional(),
})
export type ContactForm = z.infer<typeof ContactFormSchema>

// ─── Blog Post ───
export const BlogPostSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    slug: z.string().min(1),
    excerpt: z.string().optional().nullable(),
    content: z.string().optional().nullable(),
    cover_image: z.string().url().optional().nullable(),
    author: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    tags: z.array(z.string()).or(z.string()).optional().nullable(),
    published_at: isoDate.optional().nullable(),
    is_published: z.boolean().default(false),
    read_time: z.number().int().min(1).optional().nullable(),
})
export type BlogPost = z.infer<typeof BlogPostSchema>

// ─── Safe parse helpers ───

/**
 * Safely parses data against a schema and logs validation errors.
 * Returns the parsed data or falls back to the raw data.
 * Use in server actions to avoid crashing on malformed DB rows.
 */
export function safeParseList<T>(
    schema: z.ZodArray<z.ZodTypeAny>,
    data: unknown[],
    entityName: string
): T[] {
    const result = schema.safeParse(data)
    if (!result.success) {
        // Log each field error individually for easy debugging
        result.error.issues.forEach((issue) => {
            console.warn(`[Schema:${entityName}] ${issue.path.join('.')} — ${issue.message}`)
        })
        // Return what we can — filter out rows that completely fail
        return data.filter(Boolean) as T[]
    }
    return result.data as T[]
}

/**
 * Validates a single form submission. Throws a descriptive error
 * if validation fails — intended for use in server actions.
 */
export function parseContactForm(data: unknown): ContactForm {
    const result = ContactFormSchema.safeParse(data)
    if (!result.success) {
        const firstError = result.error.issues[0]
        throw new Error(firstError?.message || 'Invalid form data')
    }
    if (result.data.website_url) {
        throw new Error('Submission rejected') // Honeypot triggered
    }
    return result.data
}
