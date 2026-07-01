const locations = [
  {
    name: 'Kruger National Park',
    distance: '45 min drive',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80',
    description: 'One of Africa\'s largest game reserves'
  },
  {
    name: 'Panorama Route',
    distance: '30 min drive',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
    description: 'Blyde River Canyon & God\'s Window'
  },
  {
    name: 'Sabie',
    distance: '20 min drive',
    image: 'https://images.unsplash.com/photo-1552083375-1447ce886485?w=600&q=80',
    description: 'Waterfalls, forests and charm'
  },
  {
    name: 'Golf Courses',
    distance: '10 min drive',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80',
    description: 'World-class golfing experiences'
  }
]

export default function LocationHighlights() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-widest uppercase font-medium mb-3">
            Explore the Region
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest mb-4">
            At Your Doorstep
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Solana Villas places you at the heart of Mpumalanga's most iconic destinations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer">
              <img
                src={loc.image}
                alt={loc.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-gold text-xs tracking-wider uppercase mb-1">
                  {loc.distance}
                </p>
                <h3 className="font-playfair text-xl font-bold mb-1">{loc.name}</h3>
                <p className="text-gray-300 text-xs">{loc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}