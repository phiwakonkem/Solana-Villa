import { Shield, Star, Home, Users, CreditCard, Award } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Direct Booking Benefits',
    description: 'Best rates guaranteed when you book directly. No hidden fees or commission charges.'
  },
  {
    icon: Star,
    title: 'Luxury Accommodation',
    description: 'Every villa is furnished to the highest standard with premium amenities throughout.'
  },
  {
    icon: Home,
    title: 'Private Spaces',
    description: 'Exclusive use of the entire property — your private sanctuary in Mpumalanga.'
  },
  {
    icon: Users,
    title: 'Family Friendly',
    description: 'Thoughtfully designed spaces perfect for families, with safe environments for children.'
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Book with confidence using our secure payment system with multiple options.'
  },
  {
    icon: Award,
    title: 'Exceptional Experiences',
    description: 'Curated local experiences and activities to make your stay truly memorable.'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-widest uppercase font-medium mb-3">
            Why Solana Villas
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-forest mb-4">
            The Solana Difference
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We go beyond accommodation to create extraordinary memories
            that last a lifetime.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i}
                 className="bg-white rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-forest transition-colors duration-300">
                <feature.icon size={22} className="text-forest group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-forest mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}