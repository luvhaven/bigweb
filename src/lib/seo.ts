import { Metadata } from 'next'

export interface SEOConfig {
    title: string
    description: string
    keywords?: string[]
    ogImage?: string
    canonical?: string
    noindex?: boolean
}

export function generateMetadata({
    title,
    description,
    keywords = [],
    ogImage = '/og-image.png',
    canonical,
    noindex = false,
}: SEOConfig): Metadata {
    const siteName = 'BIGWEB Digital'
    const baseUrl = 'https://bigwebdigital.com'
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: canonical || baseUrl,
        },
        robots: {
            index: !noindex,
            follow: !noindex,
            googleBot: {
                index: !noindex,
                follow: !noindex,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        openGraph: {
            title: fullTitle,
            description,
            url: canonical || baseUrl,
            siteName,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [ogImage],
            creator: '@bigwebdigital',
        },
        verification: {
            google: 'your-google-verification-code',
            // yandex: 'your-yandex-verification-code',
            // bing: 'your-bing-verification-code',
        },
    }
}

// Default SEO config for homepage
export const defaultSEO: SEOConfig = {
    title: 'BIGWEB Digital - Award-Winning Digital Agency',
    description:
        'Transform your digital presence with BIGWEB Digital. Expert web development, UI/UX design, mobile apps, AI automation, and SEO services. Trusted by 500+ brands worldwide.',
    keywords: [
        'digital agency',
        'web development',
        'UI/UX design',
        'mobile app development',
        'AI automation',
        'SEO services',
        'digital transformation',
        'enterprise software',
    ],
}

// Service-specific SEO configurations
export const serviceSEO = {
    'ui-ux-design': {
        title: 'UI/UX Design Services - User-Centered Design Agency',
        description:
            'Award-winning UI/UX design services that drive engagement and conversions. User research, wireframing, prototyping, and visual design. 300+ successful projects.',
        keywords: [
            'UI/UX design',
            'user experience design',
            'user interface design',
            'UX research',
            'design systems',
            'usability testing',
        ],
    },
    'web-development': {
        title: 'Web Development Services - Custom Websites & Web Apps',
        description:
            'Enterprise-grade web development with Next.js, React, and modern tech stack. Fast, scalable, SEO-optimized websites and web applications. 99.9% uptime guaranteed.',
        keywords: [
            'web development',
            'custom website',
            'web application',
            'Next.js development',
            'React development',
            'full-stack development',
        ],
    },
    'mobile-apps': {
        title: 'Mobile App Development - iOS & Android Apps',
        description:
            'Native and cross-platform mobile app development. React Native, Flutter, Swift, and Kotlin. From MVP to enterprise-scale apps. 4.8+ average app store ratings.',
        keywords: [
            'mobile app development',
            'iOS app development',
            'Android app development',
            'React Native',
            'Flutter development',
            'cross-platform apps',
        ],
    },
    'ai-consulting': {
        title: 'AI Automation & Consulting - Intelligent Business Solutions',
        description:
            'Transform your business with AI automation. Machine learning, chatbots, predictive analytics, and process automation. Reduce costs by 40% on average.',
        keywords: [
            'AI automation',
            'AI consulting',
            'machine learning',
            'business automation',
            'chatbot development',
            'predictive analytics',
        ],
    },
    'seo-marketing': {
        title: 'SEO & Digital Marketing - First Page Rankings Guaranteed',
        description:
            'Data-driven SEO and digital marketing services. Technical SEO, content marketing, link building, and PPC management. 300% average traffic increase.',
        keywords: [
            'SEO services',
            'digital marketing',
            'search engine optimization',
            'content marketing',
            'link building',
            'PPC management',
        ],
    },
}
