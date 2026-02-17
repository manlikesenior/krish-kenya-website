import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'KRISH-KENYA | East Africa\'s Underground Electronic Pulse';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Gold accent lines */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#D4AF37',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#D4AF37',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Artist Name */}
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '8px',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            KRISH-KENYA
          </h1>
          
          {/* Tagline */}
          <p
            style={{
              fontSize: '24px',
              color: '#D4AF37',
              letterSpacing: '4px',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            East Africa&apos;s Underground Electronic Pulse
          </p>
          
          {/* Genres */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '20px',
            }}
          >
            {['AMAPIANO', 'AFRO HOUSE', 'AFRO TECH'].map((genre) => (
              <span
                key={genre}
                style={{
                  fontSize: '16px',
                  color: '#9ca3af',
                  padding: '8px 16px',
                  border: '1px solid #374151',
                  borderRadius: '4px',
                }}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        
        {/* Website URL */}
        <p
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '18px',
            color: '#6b7280',
            letterSpacing: '2px',
          }}
        >
          krishkenya.com
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
