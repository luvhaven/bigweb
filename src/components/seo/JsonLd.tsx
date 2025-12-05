import React from 'react'

interface JsonLdProps {
    data: Record<string, any>
}

export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}

// Organization Schema
import { agency } from '@/config/agency'

export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: agency.name,
        alternateName: 'BIGWEB',
        url: agency.domain,
        logo: `${agency.domain}/logo.png`,
        description: agency.description,
        foundingDate: agency.foundingYear.toString(),
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: agency.contact.phone,
            contactType: 'Customer Service',
            availableLanguage: ['English'],
            email: agency.contact.email,
        },
        sameAs: Object.values(agency.socials),
        address: {
            '@type': 'PostalAddress',
            streetAddress: agency.contact.address.street,
            addressLocality: agency.contact.address.city,
            addressRegion: agency.contact.address.state,
            postalCode: agency.contact.address.zip,
            addressCountry: agency.contact.address.country,
        },
    }

    return <JsonLd data={schema} />
}

// Local Business Schema
export function LocalBusinessSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://bigwebdigital.com',
        name: 'BIGWEB Digital',
        image: 'https://bigwebdigital.com/og-image.png',
        url: 'https://bigwebdigital.com',
        telephone: '+1-555-0123',
        priceRange: '$$$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Digital Street',
            addressLocality: 'San Francisco',
            addressRegion: 'CA',
            postalCode: '94102',
            addressCountry: 'US',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 37.7749,
            longitude: -122.4194,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
        },
    }

    return <JsonLd data={schema} />
}

// Service Schema Generator
export function ServiceSchema({
    name,
    description,
    serviceType,
    ratingValue = 4.9,
    reviewCount = 150,
}: {
    name: string
    description: string
    serviceType: string
    ratingValue?: number
    reviewCount?: number
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        serviceType,
        provider: {
            '@type': 'Organization',
            name: agency.name,
            url: agency.domain,
        },
        areaServed: {
            '@type': 'Country',
            name: 'United States',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue,
            reviewCount,
            bestRating: '5',
            worstRating: '1',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `${name} Services`,
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name,
                    },
                },
            ],
        },
    }

    return <JsonLd data={schema} />
}

// FAQ Schema
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }

    return <JsonLd data={schema} />
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }

    return <JsonLd data={schema} />
}

// Aggregate Rating Schema
export function AggregateRatingSchema({
    ratingValue,
    reviewCount,
}: {
    ratingValue: number
    reviewCount: number
}) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'BIGWEB Digital',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue,
            reviewCount,
            bestRating: '5',
            worstRating: '1',
        },
    }

    return <JsonLd data={schema} />
}
