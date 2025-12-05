'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Save, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type PortfolioItem } from '@/lib/api/portfolio'

const formSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    client_name: z.string().optional(),
    industry: z.string().optional(),
    project_type: z.string().optional(),
    featured_image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    live_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    status: z.enum(['published', 'draft', 'archived']),
    is_featured: z.boolean().default(false),
    order_index: z.coerce.number().default(0),
    technologies: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    results: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface PortfolioFormProps {
    initialData?: PortfolioItem
    onSubmit: (data: any) => Promise<void>
    isSubmitting?: boolean
}

export default function PortfolioForm({ initialData, onSubmit, isSubmitting = false }: PortfolioFormProps) {
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            excerpt: initialData?.excerpt || '',
            description: initialData?.description || '',
            client_name: initialData?.client_name || '',
            industry: initialData?.industry || '',
            project_type: initialData?.project_type || '',
            featured_image: initialData?.featured_image || '',
            live_url: initialData?.live_url || '',
            status: initialData?.status || 'draft',
            is_featured: initialData?.is_featured || false,
            order_index: initialData?.order_index || 0,
            technologies: initialData?.technologies?.join('\n') || '',
            challenge: initialData?.challenge || '',
            solution: initialData?.solution || '',
            results: initialData?.results || '',
        },
    })

    const handleSubmit = (values: FormValues) => {
        const formattedData = {
            ...values,
            technologies: values.technologies ? values.technologies.split('\n').filter(line => line.trim() !== '') : [],
        }
        onSubmit(formattedData)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        form.setValue('title', title)
        if (!initialData) {
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            form.setValue('slug', slug)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Main Info */}
                    <div className="md:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="E-commerce Platform" {...field} onChange={handleTitleChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e-commerce-platform" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="excerpt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Excerpt (Short Summary)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Brief overview..." className="h-20" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Detailed case study..." className="min-h-[200px]" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Case Study Content</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="challenge"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>The Challenge</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="What problem did we solve?" className="h-32" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="solution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>The Solution</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="How did we solve it?" className="h-32" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="results"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>The Results</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="What was the outcome?" className="h-32" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Settings */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="published">Published</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="client_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Client Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Client Co." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="industry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Industry</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Fintech, Health..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="project_type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Type</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Web App, Mobile..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="featured_image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Featured Image URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="live_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Live URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="technologies"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Technologies (One per line)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="React&#10;Node.js" className="h-32" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="order_index"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Order Index</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={e => field.onChange(parseInt(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="is_featured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Featured</FormLabel>
                                                <FormDescription>
                                                    Show on home page
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        Save Project
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}
