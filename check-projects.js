const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Basic env parser since dotenv is missing
function loadEnv(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let value = match[2] || '';
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            env[match[1]] = value;
        }
    });
    return env;
}

const env = { ...loadEnv(path.resolve(process.cwd(), '.env')), ...loadEnv(path.resolve(process.cwd(), '.env.local')) };

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProjects() {
    try {
        console.log('Checking Portfolio Projects...');
        const { data: projects, error } = await supabase
            .from('portfolio_projects')
            .select('id, title, featured, isActive, slug')
            .order('isActive', { ascending: false })
            .limit(10);

        if (error) throw error;
        console.table(projects);

        console.log('Checking Services...');
        const { data: services, error: sError } = await supabase
            .from('services')
            .select('id, title, isActive')
            .limit(5);

        if (sError) throw sError;
        console.table(services);

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkProjects();
