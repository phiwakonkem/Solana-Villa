import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// This endpoint receives booking/availability updates FROM a channel manager
// (Hostaway, Smoobu, etc.) once you sign up with one. Point their webhook
// URL at: https://solanavillas.co.za/api/channel-manager/webhook
export async function POST(req: NextRequest) {
  const payload = await req.json()

  // Each channel manager has its own payload shape — this is a generic shell.
  // When you pick a provider, their docs will show you exact field names
  // to map here (e.g. payload.reservation.checkIn, payload.listingId, etc.)
  const { propertySlug, checkIn, checkOut, guestName, source } = payload

  const property = await prisma.property.findUnique({ where: { slug: propertySlug } })
  if (!property) return NextResponse.json({ error: 'Unknown property' }, { status: 404 })

  await prisma.booking.create({
    data: {
      propertyId: property.id,
      guestName: guestName || 'OTA Guest',
      guestEmail: 'via-ota@solanavillas.co.za',
      guestPhone: '',
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests: 1,
      totalPrice: 0,
      status: 'confirmed',
      paymentStatus: 'paid',
      message: `Booked via ${source || 'external platform'}`
    }
  })

  return NextResponse.json({ success: true })
}