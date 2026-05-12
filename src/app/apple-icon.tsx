import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          borderRadius: '24px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100px', height: '100px', gap: '8px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              background: '#0A0A0B',
              border: '6px solid #D4AF6A',
              borderRadius: '8px',
            }}
          />
          <div
            style={{
              width: '46px',
              height: '46px',
              background: '#D4AF6A',
              borderRadius: '8px',
            }}
          />
          <div
            style={{
              width: '46px',
              height: '46px',
              background: '#B8923F',
              borderRadius: '8px',
            }}
          />
          <div
            style={{
              width: '46px',
              height: '46px',
              background: '#0A0A0B',
              border: '6px dashed #D4AF6A',
              borderRadius: '8px',
            }}
          />
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
