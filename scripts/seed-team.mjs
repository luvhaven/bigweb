/**
 * seed-team.mjs
 * Uploads team headshot images to Supabase Storage (team bucket)
 * and seeds the team_members table.
 *
 * Usage: node scripts/seed-team.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://prngeuaxahrnuqniueld.supabase.co';
// Uses the anon key — upload policies allow this for the team bucket
// For service-role level ops, swap with your service key from Supabase dashboard
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybmdldWF4YWhybnVxbml1ZWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTcxMzMsImV4cCI6MjA5MjYzMzEzM30.aC7awlIHA6DTj7mI2N4bzUy-EIpb0weJYZdmJ4KXNBs';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── Image paths (generated headshots from Antigravity) ────────────────────────
const ANTIGRAVITY_DIR = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\4957dc05-246d-40b7-8517-9764740109a0';

const TEAM_MEMBERS = [
  {
    name: 'Daniel Oriazowan',
    role: 'Founder & Lead Frontend Developer',
    bio: 'Precision-focused engineer treating every platform as high-stakes digital infrastructure. Ex-enterprise architect with 15+ years building decade-defining digital experiences.',
    initials: 'DO',
    sort_order: 1,
    // Daniel's image comes from his own portfolio. Replace with the exact image URL from daniel-orz.vercel.app
    imageUrl: 'https://daniel-orz.vercel.app/daniel.jpg',
    imageFile: null, // Will be skipped — uses direct URL above
  },
  {
    name: 'Chidi Okonkwo',
    role: 'Head of Engineering',
    bio: 'Architect of every BIGWEB platform — from sub-second Next.js deployments to custom AI agents. Believes that performance is not a feature; it is the product.',
    initials: 'CO',
    sort_order: 2,
    imageFile: join(ANTIGRAVITY_DIR, 'team_chidi_okonkwo_1778937051611.png'),
    imageUrl: null,
  },
  {
    name: 'Edeghonghon Daniel',
    role: 'Lead Backend Developer',
    bio: 'Specialises in building robust, scalable server-side systems and APIs that power high-traffic revenue platforms without missing a beat.',
    initials: 'ED',
    sort_order: 3,
    imageFile: join(ANTIGRAVITY_DIR, 'team_edeghonghon_daniel_1778937271561.png'),
    imageUrl: null,
  },
  {
    name: 'Elohor Odjegba',
    role: 'Director of Conversion Design',
    bio: 'Expert in cognitive load and UX psychology. Elohor maps the hidden friction points in your user journey that silently kill conversions.',
    initials: 'EO',
    sort_order: 4,
    imageFile: join(ANTIGRAVITY_DIR, 'team_elohor_odjegba_1778937308594.png'),
    imageUrl: null,
  },
  {
    name: 'Victoria Alabi',
    role: 'Lead AI & Automation Engineer',
    bio: 'Pioneering intelligent automation and custom AI agents that scale client operations effortlessly. Believes AI is the ultimate revenue multiplier.',
    initials: 'VA',
    sort_order: 5,
    imageFile: join(ANTIGRAVITY_DIR, 'team_victoria_alabi_1778937346141.png'),
    imageUrl: null,
  },
  {
    name: 'Tonye Briggs',
    role: 'Head of Analytics & SEO',
    bio: 'Data scientist and search strategist who builds attribution models that reveal exactly where your next dollar comes from.',
    initials: 'TB',
    sort_order: 6,
    imageFile: join(ANTIGRAVITY_DIR, 'team_tonye_briggs_1778937405747.png'),
    imageUrl: null,
  },
  {
    name: 'Tomiwa Lawal',
    role: 'Head of Human Resources',
    bio: 'Dedicated HR professional ensuring the team stays aligned, supported, and performing at its best across every engagement.',
    initials: 'TL',
    sort_order: 7,
    imageFile: join(ANTIGRAVITY_DIR, 'team_tomiwa_lawal_1778937603962.png'),
    imageUrl: null,
  },
  {
    name: 'Efosa Omoruyi',
    role: 'Lead Digital Marketing Strategist',
    bio: 'Growth specialist bridging paid media, content strategy, and funnel optimization to drive qualified traffic that actually converts.',
    initials: 'EO2',
    sort_order: 8,
    // Efosa image generation hit quota — placeholder. Update via admin panel.
    imageUrl: null,
    imageFile: null,
  },
];

async function uploadImage(member) {
  if (!member.imageFile) return member.imageUrl; // Use direct URL or null

  const filename = `${member.initials.toLowerCase().replace(/\d/, '')}-${member.name.split(' ')[0].toLowerCase()}.png`;
  const path = `avatars/${filename}`;

  try {
    const buffer = readFileSync(member.imageFile);
    const { error } = await supabase.storage
      .from('team')
      .upload(path, buffer, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) {
      console.error(`  ✗ Upload failed for ${member.name}:`, error.message);
      return null;
    }

    const { data } = supabase.storage.from('team').getPublicUrl(path);
    console.log(`  ✓ Uploaded ${member.name}: ${data.publicUrl}`);
    return data.publicUrl;
  } catch (err) {
    console.error(`  ✗ Could not read file for ${member.name}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log('🌱 Seeding team members...\n');

  // Clear existing records
  const { error: deleteError } = await supabase
    .from('team_members')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // delete all

  if (deleteError) {
    console.warn('  ⚠ Could not clear existing records:', deleteError.message);
  }

  for (const member of TEAM_MEMBERS) {
    console.log(`📸 Processing ${member.name}...`);
    const imageUrl = await uploadImage(member);

    const { error } = await supabase.from('team_members').insert({
      name: member.name,
      role: member.role,
      bio: member.bio,
      initials: member.initials.replace(/\d+$/, ''), // strip number suffix used for dedup
      image: imageUrl,
      sort_order: member.sort_order,
      is_published: true,
    });

    if (error) {
      console.error(`  ✗ DB insert failed for ${member.name}:`, error.message);
    } else {
      console.log(`  ✓ Inserted ${member.name}\n`);
    }
  }

  console.log('✅ Team seeding complete!');
  console.log('\n📝 Next steps:');
  console.log('   • Update Daniel Oriazowan\'s image URL in the admin panel with the actual photo from daniel-orz.vercel.app');
  console.log('   • Add Efosa Omoruyi\'s photo when image quota resets (next week)');
}

seed().catch(console.error);
