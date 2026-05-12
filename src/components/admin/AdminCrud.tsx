'use client';

import { useEffect, useState, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { Plus, Pencil, Trash2, Save, X, GripVertical, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/admin/ToastProvider';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'json' | 'boolean' | 'markdown' | 'string_array' | 'media';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

interface AdminCrudProps {
  tableName: string;
  title: string;
  fields: FieldDef[];
  displayColumns: string[];
  orderBy?: string;
}

export default function AdminCrud({ tableName, title, fields, displayColumns, orderBy = 'sort_order' }: AdminCrudProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { addToast } = useToast();

  const load = useCallback(async () => {
    const supabase = createBrowserClient();
    const { data } = await supabase.from(tableName).select('*').order(orderBy, { ascending: true });
    setItems(data || []);
  }, [tableName, orderBy]);

  useEffect(() => { load(); }, [load]);

  function startNew() {
    const blank: Record<string, unknown> = {};
    fields.forEach(f => {
      if (f.type === 'json') blank[f.key] = '[]';
      else if (f.type === 'string_array') blank[f.key] = [];
      else if (f.type === 'boolean') blank[f.key] = true;
      else if (f.type === 'number') blank[f.key] = 0;
      else blank[f.key] = '';
    });
    setEditing(blank);
    setIsNew(true);
  }

  function startEdit(item: Record<string, unknown>) {
    const copy = { ...item };
    fields.forEach(f => {
      if (f.type === 'json' && copy[f.key] && typeof copy[f.key] !== 'string') {
        copy[f.key] = JSON.stringify(copy[f.key], null, 2);
      }
      if (f.type === 'string_array' && !Array.isArray(copy[f.key])) {
        copy[f.key] = [];
      }
    });
    setEditing(copy);
    setIsNew(false);
  }

  async function save() {
    if (!editing) return;
    const supabase = createBrowserClient();
    const payload: Record<string, unknown> = {};

    fields.forEach(f => {
      let val = editing[f.key];
      if (f.type === 'json' && typeof val === 'string') {
        try { val = JSON.parse(val as string); } catch { val = []; }
      }
      if (f.type === 'number') val = Number(val) || 0;
      if (f.type === 'boolean') val = Boolean(val);
      payload[f.key] = val;
    });

    if (isNew) {
      const { error } = await supabase.from(tableName).insert(payload);
      if (error) { addToast(error.message, 'error'); return; }
      addToast('Created successfully', 'success');
    } else {
      const { error } = await supabase.from(tableName).update(payload).eq('id', editing.id);
      if (error) { addToast(error.message, 'error'); return; }
      addToast('Updated successfully', 'success');
    }

    setEditing(null);
    setIsNew(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this item permanently?')) return;
    const supabase = createBrowserClient();
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) addToast(error.message, 'error');
    else {
      addToast('Deleted successfully', 'success');
      load();
    }
  }

  function updateField(key: string, value: unknown) {
    setEditing(prev => prev ? { ...prev, [key]: value } : null);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const supabase = createBrowserClient();
    setUploading(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file);

    if (uploadError) {
      addToast('Error uploading image: ' + uploadError.message, 'error');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    updateField(key, data.publicUrl);
    addToast('Image uploaded successfully', 'success');
    setUploading(false);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F2F0EB' }}>{title}</h1>
          <p style={{ color: '#5A5753', fontSize: 13 }}>{items.length} items</p>
        </div>
        <button onClick={startNew} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#D4AF6A', color: '#0A0A0B', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          <Plus size={14} /> Add New
        </button>
      </div>

      {/* Edit Form */}
      {editing && (
        <div style={{ background: '#111114', border: '1px solid #D4AF6A', borderRadius: 10, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#F2F0EB' }}>{isNew ? 'Create New' : 'Edit'}</h3>
            <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer' }}><X size={18} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {fields.map(f => (
              <div key={f.key} style={{ gridColumn: (f.type === 'textarea' || f.type === 'json' || f.type === 'markdown') ? '1 / -1' : undefined }}>
                <label style={{ display: 'block', fontSize: 11, color: '#9B9793', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {f.label} {f.required && '*'}
                </label>
                {f.type === 'select' ? (
                  <select value={String(editing[f.key] || '')} onChange={e => updateField(f.key, e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13 }}>
                    {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === 'boolean' ? (
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={Boolean(editing[f.key])} onChange={e => updateField(f.key, e.target.checked)} />
                    <span style={{ color: '#9B9793', fontSize: 13 }}>Enabled</span>
                  </label>
                ) : f.type === 'markdown' ? (
                  <MarkdownEditor
                    value={String(editing[f.key] || '')}
                    onChange={(val) => updateField(f.key, val)}
                    placeholder={f.placeholder}
                  />
                ) : f.type === 'textarea' || f.type === 'json' ? (
                  <textarea value={String(editing[f.key] || '')} onChange={e => updateField(f.key, e.target.value)}
                    rows={f.type === 'json' ? 8 : 4}
                    style={{ width: '100%', padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13, fontFamily: f.type === 'json' ? 'monospace' : 'inherit', resize: 'vertical' }}
                    placeholder={f.placeholder}
                  />
                ) : f.type === 'string_array' ? (
                  <div style={{ background: '#18181C', border: '1px solid #262630', borderRadius: 6, padding: '8px 12px', minHeight: 40, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(Array.isArray(editing[f.key]) ? editing[f.key] as string[] : []).map((tag, idx) => (
                      <div key={idx} style={{ background: '#D4AF6A', color: '#0A0A0B', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                        {tag}
                        <button onClick={() => {
                          const arr = [...(editing[f.key] as string[])];
                          arr.splice(idx, 1);
                          updateField(f.key, arr);
                        }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}><X size={10} color="#0A0A0B" /></button>
                      </div>
                    ))}
                    <input type="text" placeholder="Type and hit Enter..." 
                      style={{ background: 'transparent', border: 'none', color: '#F2F0EB', fontSize: 13, outline: 'none', flex: 1, minWidth: 120 }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val) {
                            updateField(f.key, [...(Array.isArray(editing[f.key]) ? editing[f.key] as string[] : []), val]);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                ) : f.type === 'media' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {editing[f.key] ? (
                      <div style={{ position: 'relative', width: 60, height: 60, borderRadius: 6, overflow: 'hidden', border: '1px solid #262630', background: '#111114' }}>
                        {String(editing[f.key]).match(/\.(mp4|webm|ogg)$/i) ? (
                          <video src={String(editing[f.key])} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted autoPlay loop playsInline />
                        ) : (
                          <img src={String(editing[f.key])} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                        <button onClick={() => updateField(f.key, '')} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', padding: 2, cursor: 'pointer', color: '#fff' }}><X size={12} /></button>
                      </div>
                    ) : (
                      <div style={{ width: 60, height: 60, borderRadius: 6, border: '1px dashed #262630', background: '#18181C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5A5753' }}>
                        <ImageIcon size={20} />
                      </div>
                    )}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#262630', color: '#F2F0EB', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      <Upload size={14} />
                      {uploading ? 'Uploading...' : 'Upload Media'}
                      <input type="file" accept="image/*,video/*" style={{ display: 'none' }} disabled={uploading} onChange={e => handleImageUpload(e, f.key)} />
                    </label>
                    <input type="text" value={String(editing[f.key] || '')} onChange={e => updateField(f.key, e.target.value)} placeholder="Or paste media URL..." style={{ flex: 1, padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13 }} />
                  </div>
                ) : (
                  <input type={f.type === 'number' ? 'number' : 'text'} value={String(editing[f.key] || '')} onChange={e => updateField(f.key, e.target.value)}
                    required={f.required} placeholder={f.placeholder}
                    style={{ width: '100%', padding: '8px 12px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', fontSize: 13 }}
                  />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
            <button onClick={save} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 20px', background: '#D4AF6A', color: '#0A0A0B', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              <Save size={14} /> Save
            </button>
            <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ padding: '8px 20px', background: 'transparent', border: '1px solid #262630', borderRadius: 6, color: '#9B9793', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Items Table */}
      <div style={{ background: '#111114', border: '1px solid #262630', borderRadius: 10, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #262630' }}>
              <th style={{ width: 32 }} />
              {displayColumns.map(col => (
                <th key={col} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{col}</th>
              ))}
              <th style={{ width: 80 }} />
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={String(item.id)} style={{ borderBottom: '1px solid #1a1a1f' }}>
                <td style={{ padding: '8px', color: '#262630' }}><GripVertical size={14} /></td>
                {displayColumns.map(col => {
                  const val = item[col];
                  const display = typeof val === 'boolean' ? (val ? '✓' : '✗') : typeof val === 'object' ? JSON.stringify(val).slice(0, 40) + '...' : String(val || '—');
                  return <td key={col} style={{ padding: '12px 16px', fontSize: 13, color: '#F2F0EB', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{display}</td>;
                })}
                <td style={{ padding: '8px 16px', display: 'flex', gap: 4 }}>
                  <button onClick={() => startEdit(item)} style={{ background: 'none', border: 'none', color: '#9B9793', cursor: 'pointer', padding: 4 }}><Pencil size={14} /></button>
                  <button onClick={() => remove(String(item.id))} style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', padding: 4 }}><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
