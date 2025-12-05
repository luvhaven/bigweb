module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'query',
        'error',
        'warn'
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/src/lib/analytics-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Analytics Utility Functions
 * Handles User-Agent parsing and other analytics helpers without external dependencies.
 */ __turbopack_context__.s([
    "getCityFromHeaders",
    ()=>getCityFromHeaders,
    "getCountryFromHeaders",
    ()=>getCountryFromHeaders,
    "parseUserAgent",
    ()=>parseUserAgent
]);
function parseUserAgent(ua) {
    const lowerUA = ua.toLowerCase();
    // Detect Device
    let device = 'desktop';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(lowerUA)) {
        device = 'tablet';
    } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        device = 'mobile';
    }
    // Detect OS
    let os = 'Unknown OS';
    if (lowerUA.includes('windows')) os = 'Windows';
    else if (lowerUA.includes('mac os')) os = 'macOS';
    else if (lowerUA.includes('linux')) os = 'Linux';
    else if (lowerUA.includes('android')) os = 'Android';
    else if (lowerUA.includes('ios') || lowerUA.includes('iphone') || lowerUA.includes('ipad')) os = 'iOS';
    // Detect Browser
    let browser = 'Unknown Browser';
    if (lowerUA.includes('firefox')) browser = 'Firefox';
    else if (lowerUA.includes('samsung')) browser = 'Samsung Internet';
    else if (lowerUA.includes('opera') || lowerUA.includes('opr')) browser = 'Opera';
    else if (lowerUA.includes('edge')) browser = 'Edge';
    else if (lowerUA.includes('chrome')) browser = 'Chrome';
    else if (lowerUA.includes('safari')) browser = 'Safari';
    else if (lowerUA.includes('trident') || lowerUA.includes('msie')) browser = 'Internet Explorer';
    return {
        browser,
        os,
        device
    };
}
function getCountryFromHeaders(headers) {
    // Check standard headers used by Vercel, Cloudflare, Netlify, etc.
    return headers.get('x-vercel-ip-country') || headers.get('cf-ipcountry') || headers.get('x-country-code') || null;
}
function getCityFromHeaders(headers) {
    return headers.get('x-vercel-ip-city') || headers.get('x-city') || null;
}
}),
"[project]/app/api/analytics/track/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/analytics-utils.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { type, data } = body;
        const headers = request.headers;
        const userAgent = headers.get('user-agent') || '';
        // Parse User Agent and Geo Data
        const uaInfo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUserAgent"])(userAgent);
        const country = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCountryFromHeaders"])(headers) || 'Unknown';
        const city = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$analytics$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCityFromHeaders"])(headers) || 'Unknown';
        if (type === 'pageview') {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].pageView.create({
                data: {
                    page: data.page,
                    referrer: data.referrer || null,
                    userAgent: userAgent,
                    sessionId: data.sessionId,
                    country,
                    city,
                    device: uaInfo.device,
                    browser: uaInfo.browser,
                    os: uaInfo.os
                }
            });
        } else if (type === 'event') {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].event.create({
                data: {
                    event: data.event,
                    category: data.category,
                    label: data.label,
                    value: data.value,
                    metadata: data.metadata
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        console.error('Analytics Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to track'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7fd64b6b._.js.map