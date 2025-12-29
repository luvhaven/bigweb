'use client'

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, Edit, Trash2, Check } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface PricingTier {
    id: string
    name: string
    price: string
    description: string
    is_popular: boolean
    features: string[]
    sort_order: number
}

export default function PricingIndexPage() {
    const [tiers, setTiers] = useState<PricingTier[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadTiers()
    }, [])

    const loadTiers = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('pricing_tiers')
                .select('*')
                .order('sort_order', { ascending: true })

            if (error) throw error
            setTiers(data || [])
        } catch (error) {
            console.error('Error loading pricing tiers:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this pricing tier?')) return

        try {
            const { error } = await supabase
                .from('pricing_tiers')
                .delete()
                .eq('id', id)

            if (error) throw error
            loadTiers()
        } catch (error) {
            console.error('Error deleting tier:', error)
        }
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">Pricing Tiers</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your pricing packages and features.
                        </p>
                    </div>

                    <Link href="/admin/pricing/new">
                        <Button size="lg" className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add New Tier
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {tiers.map((tier) => (
                            <Card key={tier.id} className={`relative flex flex-col ${tier.is_popular ? 'border-primary ring-1 ring-primary' : ''}`}>
                                {tier.is_popular && (
                                    <div className="absolute top-0 right-0 -mt-3 -mr-3">
                                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                                    </div>
                                )}

                                <CardHeader>
                                    <CardTitle className="text-xl flex justify-between items-center">
                                        {tier.name}
                                        <span className="text-2xl font-bold">{tier.price}</span>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="flex-1 flex flex-col">
                                    <p className="text-muted-foreground mb-6">{tier.description}</p>

                                    <div className="space-y-2 mb-8 flex-1">
                                        {tier.features?.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm">
                                                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-2 mt-auto pt-6 border-t">
                                        <Link href={`/admin/pricing/${tier.id}`} className="flex-1">
                                            <Button variant="outline" className="w-full gap-2">
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(tier.id)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {tiers.length === 0 && (
                            <div className="col-span-full text-center py-12 border-2 border-dashed rounded-lg">
                                <h3 className="text-lg font-medium text-muted-foreground">No pricing tiers found</h3>
                                <p className="text-sm text-muted-foreground mt-1">Create your first pricing package.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
