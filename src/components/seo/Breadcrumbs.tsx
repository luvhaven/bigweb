import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                    <Link
                        href="/"
                        className="flex items-center hover:text-foreground transition-colors"
                        aria-label="Home"
                    >
                        <Home className="w-4 h-4" />
                    </Link>
                </li>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    return (
                        <li key={item.href} className="flex items-center space-x-2">
                            <ChevronRight className="w-4 h-4" />
                            {isLast ? (
                                <span className="font-medium text-foreground" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link href={item.href} className="hover:text-foreground transition-colors">
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
