import Link from 'next/link'
import { Users, BedDouble, ArrowRight, Clock } from 'lucide-react'
import { properties } from '@/data/properties'

export default function VillasPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="bg-[#1B4332] text-white py-32 px-6 text-center">
        <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-4">Our Properties</p>
        <h1 className="font-[Playfair_Display] text-5xl font-bold mb-4">Our Villas</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Located within the Sabie River Eco Estate, our properties offer
          a private, peaceful base for exploring the Lowveld.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-16">
          {properties.map((property, i) => {
            if (property.status === 'coming-soon') {
              return (
                <div key={property.slug}
                     className="grid md:grid-cols-2 gap-12 items-center opacity-90">
                  <div className="relative rounded-2xl overflow-hidden h-96 bg-[#1B4332]/5 border-2 border-dashed border-[#1B4332]/20 flex items-center justify-center">
                    <div className="text-center px-8">
                      <Clock size={36} className="text-[#D4A853] mx-auto mb-4 animate-pulse" />
                      <p className="text-[#1B4332] font-medium">Under Construction</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-2">{property.location}</p>
                    <h2 className="font-[Playfair_Display] text-4xl font-bold text-[#1B4332] mb-4">
                      {property.name}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-6">
                      We're busy building our second property right here in the Sabie River
                      Eco Estate. Follow our Instagram for build updates, or get in touch to
                      be the first to know when bookings open.
                    </p>
                    <span className="inline-flex items-center gap-2 bg-[#D4A853]/10 text-[#D4A853] px-5 py-3 rounded-xl text-sm font-medium">
                      <Clock size={16} />
                      Coming Soon
                    </span>
                  </div>
                </div>
              )
            }

            return (
              <div key={property.slug}
                   className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                <div className={`relative rounded-2xl overflow-hidden h-96 ${i % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <img src={property.exteriorImages[0] || property.interiorImages[0]}
                       alt={property.name}
                       className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1.5 rounded-full">
                    <span className="text-[#1B4332] font-semibold text-sm">
                      From R{property.price.toLocaleString()}/night
                    </span>
                  </div>
                </div>

                <div className={i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-2">{property.location}</p>
                  <h2 className="font-[Playfair_Display] text-4xl font-bold text-[#1B4332] mb-4">
                    {property.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {property.description.split('\n\n')[0]}
                  </p>

                  <div className="flex gap-6 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#D4A853]" />
                      <span>{property.guests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble size={16} className="text-[#D4A853]" />
                      <span>{property.bedrooms} Bedrooms</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {property.amenities.slice(0, 6).map(a => (
                      <span key={a.name} className="bg-[#1B4332]/10 text-[#1B4332] text-xs px-3 py-1.5 rounded-full">
                        {a.name}
                      </span>
                    ))}
                  </div>

                  <Link href={`/villas/${property.slug}`}
                        className="inline-flex items-center gap-3 bg-[#1B4332] hover:bg-green-900 text-white px-8 py-4 rounded-xl transition-colors group">
                    <span className="font-medium">View Villa & Book</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}