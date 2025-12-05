'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface AdminHeaderProps {
    title?: string
    description?: string
    children?: ReactNode
    backLink?: string
    backText?: string
}

export default function AdminHeader({ title, description, children, backLink, backText = 'Back' }: AdminHeaderProps) {
    const pathname = usePathname()

    // Generate breadcrumbs from pathname
    const generateBreadcrumbs = () => {
        const paths = pathname.split('/').filter(Boolean)
        const breadcrumbs = [{ name: 'Home', href: '/' }]

        let currentPath = ''
        paths.forEach((path, index) => {
            currentPath += `/${path}`
            const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
            breadcrumbs.push({
                name,
                href: currentPath
            })
        })

        return breadcrumbs
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <div className="mb-8 space-y-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center gap-2">
                        {index === 0 && <Home className="w-4 h-4" />}
                        <Link
                            href={crumb.href}
                            className={`hover:text-foreground transition-colors ${index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : ''
                                }`}
                        >
                            {crumb.name}
                        </Link>
                        {index < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4" />}
                    </div>
                ))}
            </div>

            {/* Back Button */}
            {backLink && (
                <div>
                    <Link href={backLink}>
                        <Button variant="ghost" size="sm" className="pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {backText}
                        </Button>
                    </Link>
                </div>
            )}

            {/* Title and Description */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {title && (
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
                        {description && <p className="text-muted-foreground">{description}</p>}
                    </div>
                )}
                {children && (
                    <div className="flex items-center gap-2">
                        {children}
                    </div>
                )}
            </div>
        </div>
    )
}
