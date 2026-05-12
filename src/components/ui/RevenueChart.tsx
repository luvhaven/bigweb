'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export type ChartDataPoint = {
  month: string;
  revenue: number;
  label: string;
};

const defaultData: ChartDataPoint[] = [
  { month: 'Jan', revenue: 12000, label: 'Audit' },
  { month: 'Feb', revenue: 15000, label: 'Fixes Live' },
  { month: 'Mar', revenue: 22000, label: 'Scaling' },
  { month: 'Apr', revenue: 45000, label: 'Optimization' },
  { month: 'May', revenue: 68000, label: 'Peak' },
  { month: 'Jun', revenue: 85000, label: 'New Baseline' },
];

export default function RevenueChart({ data = defaultData }: { data?: ChartDataPoint[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxRev = Math.max(...data.map(d => d.revenue));
  const minRev = Math.min(...data.map(d => d.revenue));
  
  // Dimensions
  const width = 800;
  const height = 400;
  const paddingX = 40;
  const paddingY = 40;

  const points = data.map((d, i) => {
    const x = paddingX + (i * (width - 2 * paddingX)) / (data.length - 1);
    const y = height - paddingY - ((d.revenue - minRev) / (maxRev - minRev)) * (height - 2 * paddingY);
    return { x, y, ...d };
  });

  const pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => {
    // Smoothing curve (Catmull-Rom or simple bezier approximation)
    return `L ${p.x} ${p.y}`;
  }).join(' ');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', background: 'var(--color-bg-secondary)', borderRadius: '24px', padding: 'var(--space-8)', border: '1px solid var(--color-bg-border)' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-2)' }}>
          Revenue Trajectory
        </h3>
        <div style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', color: 'var(--color-gold-bright)', fontWeight: 600 }}>
          {hoveredIndex !== null 
            ? `$${data[hoveredIndex].revenue.toLocaleString()}` 
            : `$${data[data.length - 1].revenue.toLocaleString()}`
          }
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400, marginLeft: '8px', letterSpacing: '0' }}>
            {hoveredIndex !== null ? `/ ${data[hoveredIndex].month}` : 'Current Run Rate'}
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', aspectRatio: '2/1' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-gold-bright)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-gold-bright)" stopOpacity="0" />
            </linearGradient>
            <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 0.5, 1].map((ratio, i) => (
            <line 
              key={i}
              x1={paddingX} 
              y1={paddingY + (height - 2 * paddingY) * ratio} 
              x2={width - paddingX} 
              y2={paddingY + (height - 2 * paddingY) * ratio} 
              stroke="var(--color-border)" 
              strokeDasharray="4 4"
            />
          ))}

          {/* Area */}
          <motion.path 
            d={areaD} 
            fill="url(#chart-glow)" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Line */}
          <motion.path 
            d={pathD} 
            fill="none" 
            stroke="var(--color-gold-bright)" 
            strokeWidth="4"
            filter="url(#glow-blur)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Points */}
          {points.map((p, i) => (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={hoveredIndex === i ? 8 : 4} 
                fill="var(--color-bg-primary)" 
                stroke="var(--color-gold-bright)" 
                strokeWidth="3"
                style={{ transition: 'all 0.2s' }}
              />
              {/* Invisible larger hit area for easier hovering */}
              <circle cx={p.x} cy={p.y} r="20" fill="transparent" />
              
              <text 
                x={p.x} 
                y={height - paddingY + 24} 
                textAnchor="middle" 
                fill={hoveredIndex === i ? 'var(--color-gold-bright)' : 'var(--color-text-muted)'}
                fontSize="12"
                fontWeight="600"
                style={{ transition: 'all 0.2s' }}
              >
                {p.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip/Label */}
        {hoveredIndex !== null && (
          <div 
            style={{
              position: 'absolute',
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100}%`,
              transform: 'translate(-50%, -150%)',
              background: 'var(--color-text-primary)',
              color: 'var(--color-bg-primary)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              pointerEvents: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            {points[hoveredIndex].label}
            <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid var(--color-text-primary)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
