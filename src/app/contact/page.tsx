import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="bg-[#1B4332] text-white py-32 px-6 text-center">
        <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-4">Our Story</p>
        <h1 className="font-[Playfair_Display] text-5xl font-bold mb-4">About Solana Villas</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          A family passion for exceptional hospitality in the heart of Mpumalanga.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-3">Who We Are</p>
            <h2 className="font-[Playfair_Display] text-3xl font-bold text-[#1B4332] mb-6">
              Built From a Love of Mpumalanga
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Solana Villas was born from a deep love of Mpumalanga and a desire to share its
              magic with the world. We believe that where you stay shapes how you experience
              a destination — and we have poured every detail into creating spaces that inspire,
              restore and delight.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our villas are more than properties. They are carefully curated experiences
              designed to connect guests with the natural beauty, warmth and rhythm of
              South Africa's most breathtaking province.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From the moment you arrive, our commitment is simple — to exceed your every
              expectation and leave you counting the days until your next visit.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden h-96">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
              alt="Solana Villas"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-[#1B4332] text-white rounded-2xl p-12 mb-20 text-center">
          <p className="text-[#D4A853] text-xs tracking-widest uppercase mb-4">A Note From Us</p>
          <p className="text-gray-200 leading-relaxed italic text-lg max-w-2xl mx-auto">
            "We started Solana Villas because we wanted to give people the kind of stay
            we wished existed when we were looking for a place to bring our own family.
            Every detail in these villas, we chose ourselves."
          </p>
          <p className="text-[#D4A853] font-medium mt-6">— The Solana Family</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: 'Authenticity', desc: 'Every detail reflects genuine African warmth and character, from our décor to our hospitality.' },
            { title: 'Excellence', desc: 'We set the highest standards in everything we do — cleanliness, comfort, service and experience.' },
            { title: 'Connection', desc: 'We create spaces where families reconnect, couples rediscover each other and individuals find peace.' }
          ].map((v, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#D4A853] transition-colors">
              <div className="w-10 h-1 bg-[#D4A853] mb-6 rounded" />
              <h3 className="font-[Playfair_Display] text-xl font-bold text-[#1B4332] mb-3">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/villas"
                className="bg-[#1B4332] hover:bg-green-900 text-white px-8 py-4 rounded-xl font-medium transition-colors inline-block">
            View Our Villas
          </Link>
        </div>
      </div>
    </div>
  )
}