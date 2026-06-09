'use client'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80')`
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-gold text-xs tracking-widest uppercase mb-6 font-medium">
          Mpumalanga · South Africa
        </p>
        <h1 className="font-playfair text-5xl md:text-7xl font-bold leading-tight mb-6">
          Exceptional Holiday
          <span className="block text-gold">Experiences</span>
          in Mpumalanga
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover luxury villas designed for unforgettable escapes.
          Nestled in the heart of South Africa's most breathtaking landscapes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/villas"
                className="bg-gold hover:bg-amber-600 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-colors rounded">
            View Villas
          </Link>
          <Link href="/villas#book"
                className="border border-white hover:border-gold hover:text-gold text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-colors rounded">
            Book Now
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  )
}