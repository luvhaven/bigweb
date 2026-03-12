import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedFavicon() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'favicon-bar-b.svg');
    const fileBuffer = fs.readFileSync(filePath);
    
    console.log("Uploading favicon to Supabase Storage...");
    const fileName = `settings/favicon-${Date.now()}.svg`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(fileName, fileBuffer, {
        contentType: 'image/svg+xml',
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(fileName);
      
    console.log(`Uploaded generated favicon to: ${publicUrl}`);

    console.log("Fetching current settings...");
    const { data: settings, error: fetchError } = await supabase
      .from('cms_settings')
      .select('id')
      .limit(1)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (!settings) {
      console.log("No settings found, creating base record...");
      const { error: insertError } = await supabase
        .from('cms_settings')
        .insert({
          site_name: 'BIGWEB Digital',
          favicon_url: publicUrl
        });
      
      if (insertError) throw insertError;
      console.log("Seeded new settings with favicon.");
    } else {
      console.log(`Updating existing settings record (ID: ${settings.id})...`);
      const { error: updateError } = await supabase
        .from('cms_settings')
        .update({ favicon_url: publicUrl })
        .eq('id', settings.id);
        
      if (updateError) throw updateError;
      console.log("Successfully updated settings with new premium favicon URL.");
    }

  } catch (err) {
    console.error("Error seeding favicon:", err);
  }
}

seedFavicon();
