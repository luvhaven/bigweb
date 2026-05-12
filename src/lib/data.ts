import { supabase } from './supabase';

// ============================================
// SERVICES
// ============================================
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  if (error) {
    // Fallback to cms_services table name
    const { data: d2, error: e2 } = await supabase
      .from('cms_services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (e2) { console.warn('[getServices]', e2.message); return []; }
    return d2 ?? [];
  }
  return data ?? [];
}

export async function getServicesByTier(tier: number) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('tier', tier)
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  if (error) { console.warn('[getServicesByTier]', error.message); return []; }
  return data ?? [];
}

export async function getServiceBySlug(slug: string) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) {
    const { data: d2 } = await supabase
      .from('cms_services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    return d2 ?? null;
  }
  return data;
}

export async function getAllServiceSlugs() {
  const { data, error } = await supabase
    .from('services')
    .select('slug')
    .eq('is_published', true);
  if (error) { console.warn('[getAllServiceSlugs]', error.message); return []; }
  return (data ?? []).map((s: { slug: string }) => ({ slug: s.slug }));
}

// ============================================
// CASE STUDIES
// ============================================
export async function getCaseStudies() {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  if (error) {
    // Fallback to cms_case_studies
    const { data: d2, error: e2 } = await supabase
      .from('cms_case_studies')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });
    if (e2) { console.warn('[getCaseStudies]', e2.message); return []; }
    return d2 ?? [];
  }
  return data ?? [];
}

export async function getCaseStudyBySlug(slug: string) {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) {
    const { data: d2 } = await supabase
      .from('cms_case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    return d2 ?? null;
  }
  return data;
}

export async function getAllCaseStudySlugs() {
  const { data, error } = await supabase
    .from('case_studies')
    .select('slug')
    .eq('is_published', true);
  if (error) { console.warn('[getAllCaseStudySlugs]', error.message); return []; }
  return (data ?? []).map((cs: { slug: string }) => ({ slug: cs.slug }));
}

// ============================================
// ARTICLES / BLOG
// ============================================
export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  if (error) {
    // Fallback: try blog_posts table
    const { data: d2, error: e2 } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    if (e2) { console.warn('[getArticles]', e2.message); return []; }
    return d2 ?? [];
  }
  return data ?? [];
}

export async function getFeaturedArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(3);
  if (error) { console.warn('[getFeaturedArticles]', error.message); return []; }
  return data ?? [];
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  if (error) {
    const { data: d2 } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    return d2 ?? null;
  }
  return data;
}

export async function getAllArticleSlugs() {
  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('is_published', true);
  if (error) { console.warn('[getAllArticleSlugs]', error.message); return []; }
  return (data ?? []).map((a: { slug: string }) => ({ slug: a.slug }));
}

// ============================================
// TESTIMONIALS
// ============================================
export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });
  if (error) {
    // Fallback to cms_testimonials
    const { data: d2, error: e2 } = await supabase
      .from('cms_testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
    if (e2) { console.warn('[getTestimonials]', e2.message); return []; }
    return d2 ?? [];
  }
  return data ?? [];
}

// ============================================
// SITE SETTINGS
// ============================================
export async function getSiteSettings() {
  // Try new table name first, then fall back to cms_site_settings
  let { data, error } = await supabase
    .from('site_settings')
    .select('key, value, category');
  if (error) {
    const res = await supabase
      .from('cms_site_settings')
      .select('setting_key, setting_value');
    if (res.error) { console.warn('[getSiteSettings]', res.error.message); return {}; }
    const settings: Record<string, string> = {};
    for (const row of (res.data ?? [])) {
      settings[row.setting_key] = row.setting_value;
    }
    return settings;
  }
  const settings: Record<string, string> = {};
  for (const row of (data ?? [])) {
    settings[row.key] = row.value;
  }
  return settings;
}

export async function getSiteSettingsByCategory(category: string) {
  let { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .eq('category', category);
  if (error) { console.warn('[getSiteSettingsByCategory]', error.message); return {}; }
  const settings: Record<string, string> = {};
  for (const row of (data ?? [])) {
    settings[row.key] = row.value;
  }
  return settings;
}

// ============================================
// LEADS
// ============================================
export async function captureLead(email: string, source: string) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{ email, source }])
    .select()
    .single();

  if (error) {
    console.error('[captureLead]', error);
    throw error;
  }
  return data;
}
