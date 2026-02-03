'use client'

import GenericAdminTable from '@/components/admin/GenericAdminTable'
import { motion } from 'framer-motion'
import { Briefcase, Boxes, Sparkles } from 'lucide-react'

export default function AdminServicesPage() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                            <Briefcase className="w-7 h-7 text-white" />
                        </div>
                        Service_Architecture
                    </h1>
                    <p className="text-zinc-500 mt-2 font-medium max-w-xl">
                        Define and refine the core service capabilities of BigWeb Digital. These are the modular blocks of our conversion ecosystem.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-end px-8 py-4 bg-zinc-900/40 rounded-[2rem] border border-white/5 backdrop-blur-xl">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">Capabilities_Live</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-2xl font-black text-white italic">06_Active</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Management Table Container */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-transparent rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden">
                    <GenericAdminTable
                        tableName="services"
                        title="Service Inventory"
                        columns={[
                            { key: 'title', label: 'Service Title', type: 'text' },
                            { key: 'slug', label: 'URL Slug', type: 'text' },
                            { key: 'description', label: 'Description', type: 'text' },
                            { key: 'fullDescription', label: 'Detailed Content', type: 'text' },
                            { key: 'icon', label: 'Icon Code', type: 'text' },
                            { key: 'popular', label: 'Popular', type: 'boolean' },
                            { key: 'isActive', label: 'Active', type: 'boolean' }
                        ]}
                        defaultSort="title"
                    />
                </div>
            </div>

            {/* Strategic Footer Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] border border-white/5 bg-zinc-900/20">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        Service_Clarity
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Each service should solve a specific, high-intent problem. Keep descriptions focused on the transformation rather than the feature set.
                    </p>
                </div>
                <div className="p-8 rounded-[2rem] border border-white/5 bg-zinc-900/20">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Boxes className="w-4 h-4 text-blue-500" />
                        Cross_Linking
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                        Ensure services are linked correctly in the mega-menu navigation. Updates here reflect globally across all digital touchpoints.
                    </p>
                </div>
            </div>
        </div>
    )
}
