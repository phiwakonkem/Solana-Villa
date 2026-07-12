import Hero from '@/components/home/Hero'
import FeaturedVillas from '@/components/home/FeaturedVillas'
import AvailabilityWidget from '@/components/home/AvailabilityWidget'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import LocationHighlights from '@/components/home/LocationHighlights'
import Reviews from '@/components/home/Reviews'
import SocialConnect from '@/components/home/SocialConnect'
import BookingPlatforms from '@/components/home/BookingPlatforms'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AvailabilityWidget />
      <FeaturedVillas />
      <WhyChooseUs />
      <LocationHighlights />
      <Reviews />
      <SocialConnect />
      <BookingPlatforms />
    </>
  )
}