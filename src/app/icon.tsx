import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div style={{
      background: '#1B4332',
      width: '100%',
      height: '100%',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      color: '#D4A853',
      fontWeight: 'bold',
      fontFamily: 'serif',
    }}>
      S
    </div>,
    { ...size }
  )
}