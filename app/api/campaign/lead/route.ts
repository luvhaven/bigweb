import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            fullName,
            email,
            phone,
            companyName,
            websiteUrl,
            message,
            packageSlug,
            source,
            utm_source,
            utm_medium,
            utm_campaign
        } = body

        // Get package ID from slug
        const { data: packageData } = await supabase
            .from('campaign_packages')
            .select('id')
            .eq('slug', packageSlug)
            .single()

        // Insert lead
        const { data, error } = await supabase
            .from('campaign_leads')
            .insert({
                package_id: packageData?.id,
                full_name: fullName,
                email,
                phone,
                company_name: companyName,
                website_url: websiteUrl,
                message,
                source,
                utm_source,
                utm_medium,
                utm_campaign,
                status: 'new'
            })
            .select()
            .single()

        if (error) throw error

        // Update spots taken
        if (packageData?.id) {
            await supabase.rpc('increment_spots_taken', { package_id: packageData.id })
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Lead capture error:', error)
        return NextResponse.json(
            { error: 'Failed to capture lead' },
            { status: 500 }
        )
    }
}
