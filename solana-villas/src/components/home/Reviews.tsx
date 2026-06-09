import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Sarah M.',
    location: 'Johannesburg',
    rating: 5,
    text: 'Absolutely breathtaking! The villa exceeded every expectation. Waking up to those views every morning was something I\'ll never forget. We\'ll definitely be back.',
    date: 'March 2026'
  },
  {
    name: 'James & Lisa K.',
    location: 'Cape Town',
    rating: 5,
    text: 'Perfect family getaway. The kids loved the pool and we loved the proximity to Kruger. The kitchen was stocked and the property was immaculate.',
    date: 'February 2026'
  },
  {
    name: 'Thabo N.',
    location: 'Pretoria',
    rating: 5,
    text: 'We celebrated our anniversary here and it was magical. The private braai area, the stars at night, the peaceful surroundings — everything was perfect.',
    date: 'January 2026'
  }
]

export default function Reviews() {
  return (
    <section className="py-24 bg-forest text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-widest uppercase font-medium mb-3">
            Guest Experiences
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-gold fill-gold" />
            ))}
            <span className="text-gray-300 ml-2">4.9 out of 5 on Google</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={16} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-gray-200 text-sm leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.location}</p>
                </div>
                <span className="text-gray-500 text-xs">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}