import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bigwebdigital.com'
    const currentDate = new Date()

    // Static pages
    const routes = [
        '',
        '/about',
        '/services',
        '/portfolio',
        '/blog',
        '/contact',
        '/careers',
        '/estimator',
        '/audit',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Service pages
    const services = [
        'ui-ux-design',
        'web-development',
        'mobile-apps',
        'ecommerce',
        'ai-consulting',
        'seo-marketing',
        'analytics',
        'conversion-optimization',
    ].map((service) => ({
        url: `${baseUrl}/services/${service}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return [...routes, ...services]
}
