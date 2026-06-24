import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Solana Villas | Luxury Holiday Accommodation in Mpumalanga',
  description: 'Experience exceptional luxury villa accommodation in the heart of Mpumalanga.',
  keywords: 'luxury villas Mpumalanga, holiday accommodation Hazyview, Kruger National Park',
  openGraph: {
    title: 'Solana Villas | Luxury Holiday Accommodation in Mpumalanga',
    description: 'Discover luxury villas designed for unforgettable escapes in Mpumalanga.',
    url: 'https://solanavillas.co.za',
    siteName: 'Solana Villas',
    locale: 'en_ZA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButon />
      </body>
    </html>
  )
}
