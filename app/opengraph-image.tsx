import { ImageResponse } from 'next/og';

export const alt = 'Nithin Balamurugan · Data Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 80,
          background: 'radial-gradient(circle at 15% 10%, rgba(139,92,246,0.45), transparent 50%), radial-gradient(circle at 90% 90%, rgba(34,211,238,0.3), transparent 45%), #07070b',
          color: '#ededf2',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: '#9b9bab', textTransform: 'uppercase' }}>Data Engineer · ML Infrastructure</div>
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1, marginTop: 20 }}>Nithin Balamurugan</div>
        <div style={{ fontSize: 30, color: '#c4b5fd', marginTop: 28 }}>TD · CIBC · arXiv co-author · CS @ Western ’27</div>
      </div>
    ),
    size,
  );
}
