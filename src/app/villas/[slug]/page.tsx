import { notFound } from 'next/navigation'
import { Clock } from 'lucide-react'
import Link from 'next/link'
import { getProperty } from '@/data/properties'
import VillaGallerySplit from '@/components/villas/VillaGallerySplit'
import BookingForm from '@/components/villas/BookingForm'
import ReviewSection from '@/components/villas/ReviewSection'

export default async function VillaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const villa = getProperty(slug)
  if (!villa) return notFound()

  if (villa.status === 'coming-soon') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <Clock size={48} className="text-[#D4A853] mx-auto mb-6 animate-pulse" />
          <h1 className="font-[Playfair_Display] text-4xl font-bold text-[#1B4332] mb-4">{villa.name}</h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            This property is currently under construction within the Sabie River Eco Estate.
            Follow our Instagram for progress updates, or get in touch and we'll notify you the moment it's ready.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://www.instagram.com/solana_hazyview?igsh=MWI6aTEybjc1YzJ2bQ=="
               target="_blank"
               className="bg-[#1B4332] hover:bg-green-900 text-white px-6 py-3 rounded-xl text-sm transition-colors">
              Follow on Instagram
            </a>
            <Link href="/villas"
                  className="border border-[#1B4332] text-[#1B4332] px-6 py-3 rounded-xl text-sm hover:bg-[#1B4332] hover:text-white transition-colors">
              See Available Villas
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={villa.exteriorImages[0] || villa.interiorImages[0]}
          alt={villa.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-2">{villa.location}</p>
          <h1 className="font-[Playfair_Display] text-5xl md:text-6xl font-bold mb-2">{villa.name}</h1>
          <p className="text-gray-200 text-xl">{villa.tagline}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Quick stats */}
            <div className="flex gap-8 mb-10 pb-10 border-b border-gray-200">
              {[
                { label: 'Guests', value: villa.guests },
                { label: 'Bedrooms', value: villa.bedrooms },
                { label: 'Bathrooms', value: villa.bathrooms },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-[#1B4332]">{s.value}</p>
                  <p className="text-gray-500 text-sm">{s.label}</p>
                </div>
              ))}
              <div className="text-center">
                <p className="text-3xl font-bold text-[#D4A853]">R{villa.price.toLocaleString()}</p>
                <p className="text-gray-500 text-sm">Per night</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-4">About this Villa</h2>
              {villa.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
              ))}
            </div>

            {/* Gallery */}
            <div className="mb-10">
              <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-4">Gallery</h2>
              <VillaGallerySplit
                interiorImages={villa.interiorImages}
                exteriorImages={villa.exteriorImages}
              />
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-6">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {villa.amenities.map(a => (
                  <div key={a.name} className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:border-[#D4A853] transition-colors">
                    <span className="text-2xl mb-2 block">{a.icon}</span>
                    <span className="text-gray-700 text-sm font-medium">{a.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House rules */}
            <div className="mb-10">
              <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-4">House Rules</h2>
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <ul className="space-y-3">
                  {villa.houseRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="text-[#D4A853] mt-0.5">✓</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Location */}
            <div className="mb-10">
              <h2 className="font-[Playfair_Display] text-2xl font-bold text-[#1B4332] mb-4">Location</h2>
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-lg mb-2">📍 {villa.location}</p>
                  <a href="https://maps.google.com/?q=Sabie+River+Eco+Estate+Hazyview+Mpumalanga"
                     target="_blank"
                     className="text-[#1B4332] text-sm underline">
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </div>

            <ReviewSection propertySlug={villa.slug} propertyName={villa.name} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm villaName={villa.name} pricePerNight={villa.price} propertySlug={villa.slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}