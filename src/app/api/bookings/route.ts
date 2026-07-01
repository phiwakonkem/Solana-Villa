import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBookingEmails } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { propertySlug, checkIn, checkOut, guests, name, email, phone, message, total } = body

    const property = await prisma.property.findUnique({ where: { slug: propertySlug } })
    if (!property) return NextResponse.json({ error: 'Property not found' }, { status: 404 })

    const booking = await prisma.booking.create({
      data: {
        propertyId: property.id,
        guestName: name,
        guestEmail: email,
        guestPhone: phone,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests,
        totalPrice: total,
        message,
        status: 'pending',
        paymentStatus: 'unpaid'
      }
    })

    await sendBookingEmails({
      villaName: property.name, checkIn, checkOut, guests, name, email, phone, message, total
    })

    return NextResponse.json({ success: true, bookingId: booking.id })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const bookings = await prisma.booking.findMany({
    include: { property: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(bookings)
}