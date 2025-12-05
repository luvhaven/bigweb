(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/debug/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DebugPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function DebugPage() {
    _s();
    const [logs, setLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const addLog = (msg)=>setLogs((prev)=>[
                ...prev,
                `${new Date().toISOString().split('T')[1]} - ${msg}`
            ]);
    const runTest = async ()=>{
        setLoading(true);
        setLogs([]);
        addLog('🚀 Starting connection test...');
        try {
            // 1. Check Env Vars
            addLog('Checking environment variables...');
            const url = ("TURBOPACK compile-time value", "https://krstrtqdnvxzvmiphhwm.supabase.co");
            const key = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc3RydHFkbnZ4enZtaXBoaHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODA3MzIsImV4cCI6MjA3OTY1NjczMn0.0pE8vhH867zDOnTbX0RVx8XI9l8CT9D1uPLOMOQgTdE");
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            else addLog(`✅ URL found: ${url.substring(0, 15)}...`);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            else addLog('✅ Key found');
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // 2. Test Supabase Client
            addLog('Testing Supabase Client query...');
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('testimonials').select('count', {
                count: 'exact',
                head: true
            });
            if (error) {
                addLog('❌ Query failed!');
                addLog(`Error: ${JSON.stringify(error, null, 2)}`);
                console.error('Debug Query Error:', error);
            } else {
                addLog('✅ Query successful!');
                addLog(`Data: ${JSON.stringify(data)}`);
            }
            // 3. Test Direct Fetch (Bypass Client)
            addLog('Testing direct fetch...');
            const directUrl = `${url}/rest/v1/testimonials?select=*&limit=1`;
            const response = await fetch(directUrl, {
                headers: {
                    'apikey': key,
                    'Authorization': `Bearer ${key}`
                }
            });
            addLog(`Fetch status: ${response.status}`);
            if (!response.ok) {
                const text = await response.text();
                addLog(`Fetch error body: ${text}`);
            } else {
                const json = await response.json();
                addLog('✅ Direct fetch successful');
            }
        } catch (err) {
            addLog(`❌ Test crashed: ${err.message}`);
            console.error(err);
        } finally{
            setLoading(false);
            addLog('🏁 Test complete');
        }
    };
    const sqlFix = `-- Run this in your Supabase SQL Editor to fix the recursion error:

CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _role text;
BEGIN
  IF auth.uid() IS NULL THEN RETURN NULL; END IF;
  SELECT role INTO _role FROM profiles WHERE id = auth.uid();
  RETURN _role;
END;
$$;

DROP POLICY IF EXISTS "Admins and editors can manage testimonials" ON testimonials;
CREATE POLICY "Admins and editors can manage testimonials" ON testimonials FOR ALL USING (
  get_current_user_role() IN ('admin', 'editor')
);

-- Repeat for other tables (services, portfolio_items, etc) using get_current_user_role()
-- See supabase/migrations/20250128000002_fix_rls_recursion.sql for full script
`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8 max-w-4xl mx-auto space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold",
                children: "Supabase Connection Debugger"
            }, void 0, false, {
                fileName: "[project]/app/admin/debug/page.tsx",
                lineNumber: 101,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 border rounded bg-secondary/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4",
                                        children: "Click the button below to run a comprehensive connection test."
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/debug/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: runTest,
                                        disabled: loading,
                                        children: loading ? 'Running...' : 'Run Diagnostics'
                                    }, void 0, false, {
                                        fileName: "[project]/app/admin/debug/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/admin/debug/page.tsx",
                                lineNumber: 105,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-black/90 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[300px] overflow-auto whitespace-pre-wrap",
                                children: logs.length === 0 ? 'Ready to test...' : logs.join('\n')
                            }, void 0, false, {
                                fileName: "[project]/app/admin/debug/page.tsx",
                                lineNumber: 112,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/admin/debug/page.tsx",
                        lineNumber: 104,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border rounded bg-blue-500/10 border-blue-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-bold mb-2",
                                    children: '💡 How to fix "Infinite Recursion"'
                                }, void 0, false, {
                                    fileName: "[project]/app/admin/debug/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mb-4",
                                    children: [
                                        "If you see ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                            children: "infinite recursion detected"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/debug/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 40
                                        }, this),
                                        ", it means your database policies are stuck in a loop. Run the SQL below in your Supabase Dashboard to fix it."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/debug/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                            className: "bg-secondary p-4 rounded text-xs overflow-auto max-h-[300px]",
                                            children: sqlFix
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/debug/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            size: "sm",
                                            variant: "secondary",
                                            className: "absolute top-2 right-2",
                                            onClick: ()=>{
                                                navigator.clipboard.writeText(sqlFix);
                                                alert('SQL copied to clipboard!');
                                            },
                                            children: "Copy SQL"
                                        }, void 0, false, {
                                            fileName: "[project]/app/admin/debug/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/admin/debug/page.tsx",
                                    lineNumber: 124,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/admin/debug/page.tsx",
                            lineNumber: 118,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/admin/debug/page.tsx",
                        lineNumber: 117,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/admin/debug/page.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/admin/debug/page.tsx",
        lineNumber: 100,
        columnNumber: 9
    }, this);
}
_s(DebugPage, "vc6M3o8tU6sKa4J8QlvJ9ANUZhs=");
_c = DebugPage;
var _c;
__turbopack_context__.k.register(_c, "DebugPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_admin_debug_page_tsx_d6c53a6c._.js.map