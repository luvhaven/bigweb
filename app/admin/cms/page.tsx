import Link from 'next/link'
import { Card } from '@/components/ui/card'
import {
    Sparkles,
    Navigation,
    FooterIcon,
    Settings,
    Users,
    HelpCircle,
    FileText,
    BarChart
} from 'lucide-react'

const cmsModules = [
    {
        title: 'Hero Sections',
        description: 'Manage hero content for all pages',
        href: '/admin/cms/hero',
        icon: Sparkles,
        color: 'text-emerald-400'
    },
    {
        title: 'Navigation',
        description: 'Edit menu items and structure',
        href: '/admin/cms/navigation',
        icon: Navigation,
        color: 'text-blue-400'
    },
    {
        title: 'Footer',
        description: 'Manage footer sections and links',
        href: '/admin/cms/footer',
        icon: FooterIcon,
        color: 'text-purple-400'
    },
    {
        title: 'Site Settings',
        description: 'Global configuration and branding',
        href: '/admin/cms/settings',
        icon: Settings,
        color: 'text-orange-400'
    },
    {
        title: 'Team Members',
        description: 'Manage team profiles',
        href: '/admin/cms/team',
        icon: Users,
        color: 'text-cyan-400'
    },
    {
        title: 'FAQs',
        description: 'Frequently asked questions',
        href: '/admin/cms/faqs',
        icon: HelpCircle,
        color: 'text-pink-400'
    },
    {
        title: 'Blog Posts',
        description: 'Manage blog content',
        href: '/admin/blog',
        icon: FileText,
        color: 'text-yellow-400'
    },
    {
        title: 'Analytics',
        description: 'View site analytics',
        href: '/admin/analytics',
        icon: BarChart,
        color: 'text-green-400'
    }
]

export default function CMSDashboard() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Content Management</h1>
                <p className="text-slate-400">
                    Manage all website content from one place
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cmsModules.map((module) => {
                    const Icon = module.icon
                    return (
                        <Link key={module.href} href={module.href}>
                            <Card className="p-6 bg-slate-900 border-slate-800 hover:border-slate-700 transition-all hover:scale-105 cursor-pointer h-full">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg bg-slate-800 ${module.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold mb-1">{module.title}</h3>
                                        <p className="text-sm text-slate-400">
                                            {module.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    )
                })}
            </div>

            <div className="mt-12 p-6 bg-slate-900 border border-slate-800 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Quick Tips</h2>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li>• Changes are reflected immediately on the frontend after saving</li>
                    <li>• Use the preview mode to see changes before publishing</li>
                    <li>• All content is version controlled and can be reverted</li>
                    <li>• Images are automatically optimized for web performance</li>
                </ul>
            </div>
        </div>
    )
}
