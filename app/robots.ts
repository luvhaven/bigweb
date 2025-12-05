import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/case-studies/', '/services/', '/blog/'],
                disallow: ['/api/auth/', '/admin/'],
            },
            {
                userAgent: ['Googlebot', 'GPTBot', 'Claude-Web', 'Bingbot'],
                allow: ['/'],
            }
        ],
        sitemap: 'https://bigwebdigital.com/sitemap.xml',
    }
}
