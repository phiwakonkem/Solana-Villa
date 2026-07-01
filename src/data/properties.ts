import {
  solanaInteriorImages, solanaExteriorImages,
  studiosInteriorImages, studiosExteriorImages
} from './villaImages'

export type PropertyStatus = 'active' | 'coming-soon' | 'sold'

export interface Property {
  slug: string
  name: string
  status: PropertyStatus
  tagline: string
  guests: number
  bedrooms: number
  bathrooms: number
  price: number
  location: string
  description: string
  interiorImages: string[]
  exteriorImages: string[]
  amenities: { icon: string; name: string }[]
  houseRules: string[]
  externalListing?: string
}

export const properties: Property[] = [
  {
    slug: 'solana',
    name: 'Solana Villas',
    status: 'active',
    tagline: 'Your Home Away From Home in the Lowveld',
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    price: 3500,
    location: 'Sabie River Eco Estate, Hazyview',
    description: `Nestled inside the Sabie River Eco Estate, Solana Villas offers an extraordinary luxury escape just minutes from Kruger National Park. This 3-bedroom villa combines contemporary design with authentic Lowveld warmth.

Wake up to birdsong and bushveld views. Spend your days by the pool, explore Kruger 45 minutes away, or simply unwind in the beautifully appointed living spaces. Evenings are made for the braai, the stars, and good company.`,
    interiorImages: solanaInteriorImages,
    exteriorImages: solanaExteriorImages,
    amenities: [
      { icon: '🏊', name: 'Private Pool' },
      { icon: '📶', name: 'High-Speed WiFi' },
      { icon: '📺', name: 'Smart TV' },
      { icon: '🔥', name: 'Braai Area' },
      { icon: '🚗', name: 'Secure Parking' },
      { icon: '💼', name: 'Workstation' },
      { icon: '🍳', name: 'Fully Equipped Kitchen' },
      { icon: '👨‍👩‍👧', name: 'Family Friendly' },
    ],
    houseRules: [
      'Check-in: 14:00 to 19:00 | Check-out: 10:00',
      'No smoking inside the villa',
      'No pets allowed!',
      'No parties or events without prior approval',
      'Maximum occupancy: 6 guests',
      'Please respect the neighbours and natural surroundings',
    ]
  },
  {
    slug: 'solana-studios',
    name: 'Solana Studios',
    status: 'active',
    tagline: 'A Cosy Self-Catering Studio in the Estate',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 2000,
    location: 'Sabie River Eco Estate, Hazyview',
    description: `Solana Studios is our intimate self-catering unit, perfect for couples or solo travellers wanting a quiet, comfortable base inside the Sabie River Eco Estate.

The studio is compact but complete — everything you need for a relaxed stay, with the same estate access, security and surroundings as our larger villa, at a more pocket-friendly rate.`,
    interiorImages: studiosInteriorImages,
    exteriorImages: studiosExteriorImages,
    amenities: [
      { icon: '📶', name: 'WiFi' },
      { icon: '📺', name: 'TV' },
      { icon: '🍳', name: 'Full Kitchen' },
      { icon: '🚗', name: 'Free Secure Parking' },
      { icon: '🛁', name: 'Private Bathroom' },
    ],
    houseRules: [
      'Check-in: 14:00 to 19:00 | Check-out: 10:00',
      'No smoking inside the studio',
      'Maximum occupancy: 2 guests',
      'No parties or events',
      'Please respect the estate\'s quiet hours after 22:00',
    ],
    externalListing: 'https://www.lekkeslaap.co.za/accommodation/solana-studio-unit'
  },
  {
    slug: 'solana-prestige',
    name: 'Solana Prestige Villa',
    status: 'coming-soon',
    tagline: 'Our Newest Addition — Currently Under Construction',
    guests: 0,
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    location: 'Sabie River Eco Estate, Hazyview',
    description: '',
    interiorImages: [],
    exteriorImages: [],
    amenities: [],
    houseRules: []
  },
]

export const getActiveProperties = () => properties.filter(p => p.status === 'active')
export const getProperty = (slug: string) => properties.find(p => p.slug === slug)