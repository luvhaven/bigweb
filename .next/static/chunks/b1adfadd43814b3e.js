(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,41646,e=>{"use strict";var s=e.i(43476),t=e.i(71645),i=e.i(19455),r=e.i(11795);function a(){let[e,a]=(0,t.useState)([]),[o,n]=(0,t.useState)(!1),c=e=>a(s=>[...s,`${new Date().toISOString().split("T")[1]} - ${e}`]),l=async()=>{n(!0),a([]),c("🚀 Starting connection test...");try{c("Checking environment variables...");let e="https://krstrtqdnvxzvmiphhwm.supabase.co",s="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc3RydHFkbnZ4enZtaXBoaHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODA3MzIsImV4cCI6MjA3OTY1NjczMn0.0pE8vhH867zDOnTbX0RVx8XI9l8CT9D1uPLOMOQgTdE";c(`✅ URL found: ${e.substring(0,15)}...`),c("✅ Key found"),c("Testing Supabase Client query...");let{data:t,error:i}=await r.supabase.from("testimonials").select("count",{count:"exact",head:!0});i?(c("❌ Query failed!"),c(`Error: ${JSON.stringify(i,null,2)}`),console.error("Debug Query Error:",i)):(c("✅ Query successful!"),c(`Data: ${JSON.stringify(t)}`)),c("Testing direct fetch...");let a=`${e}/rest/v1/testimonials?select=*&limit=1`,o=await fetch(a,{headers:{apikey:s,Authorization:`Bearer ${s}`}});if(c(`Fetch status: ${o.status}`),o.ok)await o.json(),c("✅ Direct fetch successful");else{let e=await o.text();c(`Fetch error body: ${e}`)}}catch(e){c(`❌ Test crashed: ${e.message}`),console.error(e)}finally{n(!1),c("🏁 Test complete")}},d=`-- Run this in your Supabase SQL Editor to fix the recursion error:

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
`;return(0,s.jsxs)("div",{className:"p-8 max-w-4xl mx-auto space-y-6",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold",children:"Supabase Connection Debugger"}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,s.jsxs)("div",{className:"space-y-4",children:[(0,s.jsxs)("div",{className:"p-4 border rounded bg-secondary/10",children:[(0,s.jsx)("p",{className:"mb-4",children:"Click the button below to run a comprehensive connection test."}),(0,s.jsx)(i.Button,{onClick:l,disabled:o,children:o?"Running...":"Run Diagnostics"})]}),(0,s.jsx)("div",{className:"bg-black/90 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[300px] overflow-auto whitespace-pre-wrap",children:0===e.length?"Ready to test...":e.join("\n")})]}),(0,s.jsx)("div",{className:"space-y-4",children:(0,s.jsxs)("div",{className:"p-4 border rounded bg-blue-500/10 border-blue-200",children:[(0,s.jsx)("h2",{className:"font-bold mb-2",children:'💡 How to fix "Infinite Recursion"'}),(0,s.jsxs)("p",{className:"text-sm mb-4",children:["If you see ",(0,s.jsx)("code",{children:"infinite recursion detected"}),", it means your database policies are stuck in a loop. Run the SQL below in your Supabase Dashboard to fix it."]}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("pre",{className:"bg-secondary p-4 rounded text-xs overflow-auto max-h-[300px]",children:d}),(0,s.jsx)(i.Button,{size:"sm",variant:"secondary",className:"absolute top-2 right-2",onClick:()=>{navigator.clipboard.writeText(d),alert("SQL copied to clipboard!")},children:"Copy SQL"})]})]})})]})]})}e.s(["default",()=>a])}]);