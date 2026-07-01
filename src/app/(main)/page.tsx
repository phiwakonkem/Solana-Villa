import Hero from '@/components/home/Hero'
import FeaturedVillas from '@/components/home/FeaturedVillas'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Reviews from '@/components/home/Reviews'
import LocationHighlights from '@/components/home/LocationHighlights'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVillas />
      <WhyChooseUs />
      <LocationHighlights />
      <Reviews />
    </>
  )
}