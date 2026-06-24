export interface Property {
  id: string
  slug: string
  name: string
  status: 'active' | 'coming-soon' | 'sold'
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
  externalListing?: string | null
}

export interface Booking {
  id: string
  propertyId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  paymentRef?: string | null
  paymentStatus: 'unpaid' | 'paid' | 'refunded'
  message?: string | null
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string | null
  isAdmin: boolean
  subscribedToPromos: boolean
}

export interface Housekeeper {
  id: string
  name: string
  phone: string
  propertyId: string
  checkInDate: string
  notes?: string | null
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface BookingFormData {
  propertyId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  message?: string
}