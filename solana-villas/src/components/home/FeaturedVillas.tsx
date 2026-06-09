import Link from 'next/link'
import { Users, BedDouble, ArrowRight } from 'lucide-react'

const villas = [
  {
    id: 'solana',
    name: 'Solana Villas',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    guests: 8,
    bedrooms: 3,
    price: 3500,
    description: 'Luxury 3-bedroom villa with private pool, fully equipped kitchen and stunning bush views.',
    slug: 'solana'
  },
  {
    id: 'bukiwe',
    name: 'Bukiwe Villas',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    guests: 6,
    bedrooms: 3,
    price: 2800,
    description: 'Elegant villa offering a perfect blend of modern comfort and authentic African warmth.',
    slug: 'bukiwe'
  }
]

export default function FeaturedVillas() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-widest uppercase font-medium mb-3">
            Our Properties
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest mb-4">
            Featured Villas
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Each villa is thoughtfully designed to provide the ultimate luxury experience
            in the heart of Mpumalanga.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {villas.map(villa => (
            <div key={villa.id}
                 className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              {/* Image */}
              <div className="relative overflow-hidden h-72">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-forest font-semibold text-sm">
                    From R{villa.price.toLocaleString()}/night
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-forest mb-2">
                  {villa.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {villa.description}
                </p>

                <div className="flex items-center gap-6 mb-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gold" />
                    <span>{villa.guests} Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble size={16} className="text-gold" />
                    <span>{villa.bedrooms} Bedrooms</span>
                  </div>
                </div>

                <Link
                  href={`/villas/${villa.slug}`}
                  className="flex items-center justify-between bg-forest hover:bg-green-900 text-white px-6 py-4 rounded-xl transition-colors group/btn"
                >
                  <span className="font-medium">Book Now</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}