module.exports=[88907,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(99570),e=a.i(95445);function f(){let[a,f]=(0,c.useState)([]),[g,h]=(0,c.useState)(!1),i=a=>f(b=>[...b,`${new Date().toISOString().split("T")[1]} - ${a}`]),j=async()=>{h(!0),f([]),i("🚀 Starting connection test...");try{i("Checking environment variables...");let a="https://krstrtqdnvxzvmiphhwm.supabase.co",b="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc3RydHFkbnZ4enZtaXBoaHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODA3MzIsImV4cCI6MjA3OTY1NjczMn0.0pE8vhH867zDOnTbX0RVx8XI9l8CT9D1uPLOMOQgTdE";i(`✅ URL found: ${a.substring(0,15)}...`),i("✅ Key found"),i("Testing Supabase Client query...");let{data:c,error:d}=await e.supabase.from("testimonials").select("count",{count:"exact",head:!0});d?(i("❌ Query failed!"),i(`Error: ${JSON.stringify(d,null,2)}`),console.error("Debug Query Error:",d)):(i("✅ Query successful!"),i(`Data: ${JSON.stringify(c)}`)),i("Testing direct fetch...");let f=`${a}/rest/v1/testimonials?select=*&limit=1`,g=await fetch(f,{headers:{apikey:b,Authorization:`Bearer ${b}`}});if(i(`Fetch status: ${g.status}`),g.ok)await g.json(),i("✅ Direct fetch successful");else{let a=await g.text();i(`Fetch error body: ${a}`)}}catch(a){i(`❌ Test crashed: ${a.message}`),console.error(a)}finally{h(!1),i("🏁 Test complete")}},k=`-- Run this in your Supabase SQL Editor to fix the recursion error:

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
`;return(0,b.jsxs)("div",{className:"p-8 max-w-4xl mx-auto space-y-6",children:[(0,b.jsx)("h1",{className:"text-2xl font-bold",children:"Supabase Connection Debugger"}),(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("div",{className:"p-4 border rounded bg-secondary/10",children:[(0,b.jsx)("p",{className:"mb-4",children:"Click the button below to run a comprehensive connection test."}),(0,b.jsx)(d.Button,{onClick:j,disabled:g,children:g?"Running...":"Run Diagnostics"})]}),(0,b.jsx)("div",{className:"bg-black/90 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[300px] overflow-auto whitespace-pre-wrap",children:0===a.length?"Ready to test...":a.join("\n")})]}),(0,b.jsx)("div",{className:"space-y-4",children:(0,b.jsxs)("div",{className:"p-4 border rounded bg-blue-500/10 border-blue-200",children:[(0,b.jsx)("h2",{className:"font-bold mb-2",children:'💡 How to fix "Infinite Recursion"'}),(0,b.jsxs)("p",{className:"text-sm mb-4",children:["If you see ",(0,b.jsx)("code",{children:"infinite recursion detected"}),", it means your database policies are stuck in a loop. Run the SQL below in your Supabase Dashboard to fix it."]}),(0,b.jsxs)("div",{className:"relative",children:[(0,b.jsx)("pre",{className:"bg-secondary p-4 rounded text-xs overflow-auto max-h-[300px]",children:k}),(0,b.jsx)(d.Button,{size:"sm",variant:"secondary",className:"absolute top-2 right-2",onClick:()=>{navigator.clipboard.writeText(k),alert("SQL copied to clipboard!")},children:"Copy SQL"})]})]})})]})]})}a.s(["default",()=>f])}];

//# sourceMappingURL=app_admin_debug_page_tsx_434634ce._.js.map