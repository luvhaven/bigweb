'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { Save, Upload, Image as ImageIcon, X } from 'lucide-react';
import { useToast } from '@/components/admin/ToastProvider';

interface Setting { id: string; key: string; value: string; category: string; }

const CATEGORIES = ['general', 'homepage', 'about', 'contact', 'footer', 'social'];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [activeCategory, setActiveCategory] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    async function load() {
      const supabase = createBrowserClient();
      const { data } = await supabase.from('site_settings').select('*').order('key');
      setSettings(data || []);
    }
    load();
  }, []);

  const filtered = settings.filter(s => s.category === activeCategory);

  function updateSetting(id: string, value: string) {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, value } : s));
    setSaved(false);
  }

  async function saveAll() {
    setSaving(true);
    const supabase = createBrowserClient();
    for (const s of settings) {
      await supabase.from('site_settings').update({ value: s.value }).eq('id', s.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function addSetting() {
    if (!newKey) return;
    const supabase = createBrowserClient();
    const { data } = await supabase.from('site_settings').insert({ key: newKey, value: newValue, category: activeCategory }).select().single();
    if (data) {
      setSettings(prev => [...prev, data]);
      setNewKey('');
      setNewValue('');
    }
  }

  async function deleteSetting(id: string) {
    if (!confirm('Delete this setting?')) return;
    const supabase = createBrowserClient();
    await supabase.from('site_settings').delete().eq('id', id);
    setSettings(prev => prev.filter(s => s.id !== id));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const supabase = createBrowserClient();
    setUploading(id);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file);

    if (uploadError) {
      addToast('Error uploading file: ' + uploadError.message, 'error');
      setUploading(null);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(fileName);
    updateSetting(id, data.publicUrl);
    addToast('File uploaded successfully', 'success');
    setUploading(null);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F2F0EB' }}>Site Settings</h1>
        <button onClick={saveAll} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', background: saved ? '#2A7A4A' : '#D4AF6A', color: saved ? '#fff' : '#0A0A0B', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <Save size={14} /> {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save All'}
        </button>
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} style={{
            padding: '6px 14px', borderRadius: 6, border: '1px solid', fontSize: 12, fontWeight: 500, cursor: 'pointer', textTransform: 'uppercase',
            background: activeCategory === c ? 'rgba(212,175,106,0.1)' : 'transparent',
            borderColor: activeCategory === c ? '#D4AF6A' : '#262630',
            color: activeCategory === c ? '#D4AF6A' : '#5A5753',
          }}>{c}</button>
        ))}
      </div>

      {/* Settings List */}
      <div style={{ background: '#111114', border: '1px solid #262630', borderRadius: 10, padding: 24 }}>
        {filtered.map(s => (
          <div key={s.id} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 200px' }}>
              <label style={{ fontSize: 12, color: '#9B9793', fontFamily: 'monospace' }}>{s.key}</label>
            </div>
            <div style={{ flex: 1 }}>
              {s.key.includes('_image') || s.key.includes('_video') || s.key.includes('_media') ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {s.value ? (
                    <div style={{ position: 'relative', width: 60, height: 60, borderRadius: 6, overflow: 'hidden', border: '1px solid #262630', background: '#111114' }}>
                      {s.value.match(/\.(mp4|webm|ogg)$/i) ? (
                        <video src={s.value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted autoPlay loop playsInline />
                      ) : (
                        <img src={s.value} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                      <button onClick={() => updateSetting(s.id, '')} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', padding: 2, cursor: 'pointer', color: '#fff' }}><X size={12} /></button>
                    </div>
                  ) : (
                    <div style={{ width: 60, height: 60, borderRadius: 6, border: '1px dashed #262630', background: '#18181C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5A5753' }}>
                      <ImageIcon size={20} />
                    </div>
                  )}
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#262630', color: '#F2F0EB', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    <Upload size={14} />
                    {uploading === s.id ? 'Uploading...' : 'Upload Media'}
                    <input type="file" accept="image/*,video/*" style={{ display: 'none' }} disabled={uploading === s.id} onChange={e => handleImageUpload(e, s.id)} />
                  </label>
                  <input type="text" value={s.value || ''} onChange={e => updateSetting(s.id, e.target.value)} placeholder="Or paste media URL..." style={{ flex: 1, padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13 }} />
                </div>
              ) : s.value && s.value.length > 80 ? (
                <textarea value={s.value} onChange={e => updateSetting(s.id, e.target.value)} rows={3}
                  style={{ width: '100%', padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13, resize: 'vertical' }} />
              ) : (
                <input type="text" value={s.value || ''} onChange={e => updateSetting(s.id, e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13 }} />
              )}
            </div>
            <button onClick={() => deleteSetting(s.id)} style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', padding: 8, fontSize: 14 }}>×</button>
          </div>
        ))}

        {/* Add new setting */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24, paddingTop: 16, borderTop: '1px solid #262630', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: '#5A5753', marginBottom: 4 }}>KEY</label>
            <input type="text" value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="new_setting_key"
              style={{ padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13, fontFamily: 'monospace' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#5A5753', marginBottom: 4 }}>VALUE</label>
            <input type="text" value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Value"
              style={{ width: '100%', padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13 }} />
          </div>
          <button onClick={addSetting} style={{ padding: '8px 16px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#9B9793', fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}>+ Add</button>
        </div>
      </div>
    </div>
  );
}
