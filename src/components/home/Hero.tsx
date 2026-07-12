'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { solanaExteriorImages, solanaInteriorImages, studiosExteriorImages, studiosInteriorImages } from '@/data/villaImages'

const heroImages = [
  ...solanaExteriorImages,
  solanaInteriorImages[0],
  solanaInteriorImages[1],
  ...studiosExteriorImages,
  studiosInteriorImages[0],
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {heroImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-6 font-medium">
          Sabie River Eco Estate · Hazyview · Mpumalanga
        </p>
        <h1 className="font-[Playfair_Display] text-5xl md:text-7xl font-bold leading-tight mb-6">
          Your Home Away
          <span className="block text-[#D4A853]">From Home</span>
          in the Lowveld
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Two family-run villas in the heart of Mpumalanga — fifteen minutes from Kruger,
          and a world away from ordinary.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/villas"
                className="bg-[#D4A853] hover:bg-amber-600 text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-colors rounded">
            View Villas
          </Link>
          <Link href="/contact"
                className="border border-white hover:border-[#D4A853] hover:text-[#D4A853] text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-colors rounded">
            Book Now
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce z-10">
        <ChevronDown size={32} />
      </div>
    </section>
  )
}