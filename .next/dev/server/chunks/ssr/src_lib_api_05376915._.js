module.exports = [
"[project]/src/lib/api/testimonials.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "testimonialsAPI",
    ()=>testimonialsAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const testimonialsAPI = {
    // Get all testimonials
    async getAll (status) {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('testimonials').select('*').order('order_index', {
            ascending: true
        });
        if (status) {
            query = query.eq('status', status);
        }
        const { data, error } = await query;
        if (error) {
            console.error('🔥 Supabase API Error (getAll):', error);
            console.error('Query:', {
                table: 'testimonials',
                status
            });
            throw error;
        }
        return data;
    },
    // Get featured testimonials
    async getFeatured () {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('testimonials').select('*').eq('status', 'active').eq('is_featured', true).order('order_index', {
            ascending: true
        });
        if (error) throw error;
        return data;
    },
    // Get by ID
    async getById (id) {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('testimonials').select('*').eq('id', id).single();
        if (error) throw error;
        return data;
    },
    // Create testimonial
    async create (testimonial) {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('testimonials').insert(testimonial).select().single();
        if (error) throw error;
        return data;
    },
    // Update testimonial
    async update (id, updates) {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('testimonials').update(updates).eq('id', id).select().single();
        if (error) throw error;
        return data;
    },
    // Update order
    async updateOrder (testimonials) {
        const updates = testimonials.map((t)=>({
                id: t.id,
                order_index: t.order_index
            }));
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('testimonials').upsert(updates).select();
        if (error) throw error;
        return data;
    },
    // Toggle featured status
    async toggleFeatured (id) {
        const testimonial = await this.getById(id);
        return this.update(id, {
            is_featured: !testimonial.is_featured
        });
    },
    // Delete testimonial
    async delete (id) {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('testimonials').delete().eq('id', id);
        if (error) throw error;
    }
};
}),
"[project]/src/lib/api/messages.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "messagesAPI",
    ()=>messagesAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-ssr] (ecmascript)");
;
const messagesAPI = {
    getAll: async ()=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('messages').select('*');
        if (error) throw error;
        return data;
    },
    getById: async (id)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('messages').select('*').eq('id', id).single();
        if (error) throw error;
        return data;
    },
    create: async (payload)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('messages').insert(payload).single();
        if (error) throw error;
        return data;
    },
    update: async (id, payload)=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('messages').update(payload).eq('id', id).single();
        if (error) throw error;
        return data;
    },
    delete: async (id)=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('messages').delete().eq('id', id);
        if (error) throw error;
    }
};
}),
];

//# sourceMappingURL=src_lib_api_05376915._.js.map