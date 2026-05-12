'use client';

import React, { useState } from 'react';
import { Type, Eye } from 'lucide-react';

function renderMarkdown(md: string): string {
  if (!md) return '';
  let html = md.replace(/^### (.*$)/gim, '<h3>$1</h3>')
               .replace(/^## (.*$)/gim, '<h2>$1</h2>')
               .replace(/^# (.*$)/gim, '<h1>$1</h1>')
               .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
               .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
               .replace(/\*(.*)\*/gim, '<i>$1</i>')
               .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
               .replace(/\n$/gim, '<br />');

  // Simple paragraph wrap for lines not starting with a tag
  return html.split('\n').map(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('<')) {
      return `<p>${line}</p>`;
    }
    return line;
  }).join('\n');
}

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [mode, setMode] = useState<'write' | 'preview'>('write');

  return (
    <div style={{ background: '#111114', border: '1px solid #262630', borderRadius: 6, overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', borderBottom: '1px solid #262630', background: '#18181C' }}>
        <button
          type="button"
          onClick={() => setMode('write')}
          style={{
            padding: '8px 16px',
            background: mode === 'write' ? '#262630' : 'transparent',
            color: mode === 'write' ? '#F2F0EB' : '#9B9793',
            border: 'none',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <Type size={14} /> Write
        </button>
        <button
          type="button"
          onClick={() => setMode('preview')}
          style={{
            padding: '8px 16px',
            background: mode === 'preview' ? '#262630' : 'transparent',
            color: mode === 'preview' ? '#F2F0EB' : '#9B9793',
            border: 'none',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <Eye size={14} /> Preview
        </button>
      </div>

      {/* Editor Area */}
      <div style={{ position: 'relative' }}>
        {mode === 'write' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Write markdown here...'}
            style={{
              width: '100%',
              minHeight: 300,
              padding: 16,
              background: '#18181C',
              border: 'none',
              color: '#F2F0EB',
              fontSize: 14,
              fontFamily: 'monospace',
              lineHeight: 1.6,
              resize: 'vertical',
              outline: 'none'
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              minHeight: 300,
              padding: 16,
              background: '#18181C',
              color: '#F2F0EB',
              fontSize: 14,
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
            className="prose prose-invert max-w-none"
          />
        )}
      </div>
    </div>
  );
}
