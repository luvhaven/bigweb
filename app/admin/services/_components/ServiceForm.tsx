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
import { type Service } from '@/lib/api/services'

const formSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
    short_description: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    status: z.enum(['published', 'draft', 'archived']),
    is_featured: z.boolean().default(false),
    order_index: z.coerce.number().default(0),
    features: z.string().optional(), // We'll handle splitting this into an array
    starting_price: z.string().optional(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ServiceFormProps {
    initialData?: Service
    onSubmit: (data: any) => Promise<void>
    isSubmitting?: boolean
}

export default function ServiceForm({ initialData, onSubmit, isSubmitting = false }: ServiceFormProps) {
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            short_description: initialData?.short_description || '',
            description: initialData?.description || '',
            icon: initialData?.icon || '',
            status: initialData?.status || 'draft',
            is_featured: initialData?.is_featured || false,
            order_index: initialData?.order_index || 0,
            features: initialData?.features?.join('\n') || '',
            starting_price: initialData?.pricing?.starting_price || '',
            meta_title: initialData?.meta_title || '',
            meta_description: initialData?.meta_description || '',
        },
    })

    const handleSubmit = (values: FormValues) => {
        // Transform data before submitting
        const formattedData = {
            ...values,
            features: values.features ? values.features.split('\n').filter(line => line.trim() !== '') : [],
            pricing: values.starting_price ? { starting_price: values.starting_price } : undefined,
        }
        // Remove temporary fields
        delete (formattedData as any).starting_price

        onSubmit(formattedData)
    }

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        form.setValue('title', title)
        if (!initialData) { // Only auto-generate slug for new services
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            form.setValue('slug', slug)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Main Info (2/3 width) */}
                    <div className="md:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Service Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Service Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Web Development" {...field} onChange={handleTitleChange} />
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
                                            <FormLabel>Slug (URL)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="web-development" {...field} />
                                            </FormControl>
                                            <FormDescription>The URL-friendly version of the name.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="short_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Short Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Brief summary for cards..."
                                                    className="h-20"
                                                    {...field}
                                                />
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
                                                <Textarea
                                                    placeholder="Detailed explanation of the service..."
                                                    className="min-h-[200px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="features"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Key Features (One per line)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Responsive Design&#10;SEO Optimization&#10;Fast Loading"
                                                    className="min-h-[150px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>Enter each feature on a new line.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>SEO Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="meta_title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meta Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="SEO Title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="meta_description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meta Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="SEO Description" className="h-20" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Settings (1/3 width) */}
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
                                    name="icon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Icon Name (Lucide)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Code, Layout, Smartphone..." {...field} />
                                            </FormControl>
                                            <FormDescription>Name of the Lucide icon to use.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="starting_price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Starting Price</FormLabel>
                                            <FormControl>
                                                <Input placeholder="$999" {...field} />
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
                                                    Highlight this service
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
                        Save Service
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}
