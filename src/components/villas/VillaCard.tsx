import Link from 'next/link'
import { Users, BedDouble, ArrowRight, Clock } from 'lucide-react'
import type { Property } from '@/types'

export default function VillaCard({ property }: { property: Property }) {
  if (property.status === 'coming-soon') {
    return (
      <div className="bg-[#FAF7F2] rounded-2xl border-2 border-dashed border-[#1B4332]/15 flex flex-col items-center justify-center text-center p-12 min-h-[380px]">
        <Clock size={32} className="text-[#D4A853] mb-4 animate-pulse" />
        <h3 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-2">
          {property.name}
        </h3>
        <p className="text-gray-500 text-sm mb-6">Currently under construction</p>
        <span className="bg-[#D4A853]/10 text-[#D4A853] text-xs px-4 py-2 rounded-full font-medium">
          Coming Soon
        </span>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      <div className="relative overflow-hidden h-64">
        <img
          src={property.exteriorImages[0] || property.interiorImages[0]}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-[#1B4332] font-semibold text-sm">
            From R{property.price.toLocaleString()}/night
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-[Playfair_Display] text-xl font-bold text-[#1B4332] mb-2">
          {property.name}
        </h3>
        <p className="text-gray-500 text-sm mb-5 leading-relaxed">{property.tagline}</p>
        <div className="flex items-center gap-5 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-[#D4A853]" />
            <span>{property.guests} Guests</span>
          </div>
          <div className="flex items-center gap-2">
            <BedDouble size={15} className="text-[#D4A853]" />
            <span>{property.bedrooms} Bed</span>
          </div>
        </div>
        <Link
          href={`/villas/${property.slug}`}
          className="flex items-center justify-between bg-[#1B4332] hover:bg-green-900 text-white px-5 py-3.5 rounded-xl transition-colors group/btn"
        >
          <span className="font-medium text-sm">Book Now</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}