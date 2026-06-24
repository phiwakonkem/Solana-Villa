import Link from 'next/link'
import { Users, BedDouble, ArrowRight, Clock } from 'lucide-react'
import { properties } from '@/data/properties'

export default function FeaturedVillas() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#D4A853] text-xs tracking-widest uppercase font-medium mb-3">
            Our Properties
          </p>
          <h2 className="font-[Playfair_Display] text-4xl md:text-5xl font-bold text-[#1B4332] mb-4">
            Featured Villas
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Each villa is thoughtfully designed to provide the ultimate luxury experience
            in the Sabie River Eco Estate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {properties.map(property => {
            if (property.status === 'coming-soon') {
              return (
                <div key={property.slug}
                     className="bg-[#FAF7F2] rounded-2xl border-2 border-dashed border-[#1B4332]/15 flex flex-col items-center justify-center text-center p-12 min-h-[420px]">
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
              <div key={property.slug}
                   className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden h-72">
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

                <div className="p-8">
                  <h3 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-2">
                    {property.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {property.tagline}
                  </p>

                  <div className="flex items-center gap-6 mb-8 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-[#D4A853]" />
                      <span>{property.guests} Guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble size={16} className="text-[#D4A853]" />
                      <span>{property.bedrooms} Bedrooms</span>
                    </div>
                  </div>

                  <Link
                    href={`/villas/${property.slug}`}
                    className="flex items-center justify-between bg-[#1B4332] hover:bg-green-900 text-white px-6 py-4 rounded-xl transition-colors group/btn"
                  >
                    <span className="font-medium">Book Now</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}